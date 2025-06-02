const follower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        gsap.to(follower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.2,
            ease: "power2.out"
        });
    });