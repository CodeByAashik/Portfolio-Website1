        const todoTableElem = document.getElementById('todoItems'); 
        let todoArray = JSON.parse(localStorage.getItem('prevTodo')) || [];
        renderTodos();
        function addTodo(){
            let name = document.getElementById('todonameip').value;
            let date = document.getElementById('tododateip').value;
            if(name && date){
                todoArray.push(
                    {
                        //name : todoname ,
                        //date : tododate

                        name,date
                    }
                );
                renderTodos();
                document.getElementById('todonameip').value = '';
                document.getElementById('tododateip').value = '';
            }    
        }

        function renderTodos(){
            let tablehtml = ``;
            // for(let i =0 ; i < todoArray.length ; i++){
            //     tablehtml += `<tr><td>${todoArray[i].name}</td><td>${todoArray[i].date}</td><td><button onclick="
            //         todoArray.splice(${i},1);
            //         renderTodos();
            //     ">Delete</button></td></tr>`;
            // }
            todoArray.forEach(function(value,index){
              tablehtml+=`<tr><td>${value.name}</td><td>${value.date}</td><td><button onclick = "
                  deleteTodo(${index});
                "><i class="fa-solid fa-trash-can"></i></button></td></tr>`
            })
            todoTableElem.innerHTML = tablehtml;
            localStorage.setItem('prevTodo',JSON.stringify(todoArray));

        }

        // delete logic 
        function deleteTodo(index){
          todoArray.splice(index,1);
          renderTodos();
        }


        // function to be added later 
        // function setAccent(){
        //     let newvalue = document.getElementById('accent').value;
        //     document.documentElement.style.setProperty('--basecolor', 'newvalue');
        // }