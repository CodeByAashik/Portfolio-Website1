const follower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        gsap.to(follower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.2,
            ease: "power2.out"
        });
    });

  
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default redirect

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
    })
    .then(response => {
      if (response.ok) {
        alert("✅ Message sent successfully!");
        form.reset(); // Clear input fields
      } else {
        alert("❌ Something went wrong. Please try again.");
      }
    })
    .catch(error => {
      alert("❌ Failed to send message. Check your connection.");
      console.error("Error:", error);
    });
  });


  //sidebar animation
const sideBar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon')


// Sidebar elements //
menu.addEventListener("click", function(){
    sideBar.classList.remove("close-sidebar")
    sideBar.classList.add("open-sidebar")
});

closeIcon.addEventListener("click", function(){
    sideBar.classList.remove("open-sidebar");
    sideBar.classList.add("close-sidebar");
    
})