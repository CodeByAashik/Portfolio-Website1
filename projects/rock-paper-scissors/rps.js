  
        let score = JSON.parse(localStorage.getItem('score')) || {
                wins:0,
                loses:0,
                ties:0
            };

        let result = '';
        let winsText = document.getElementById('Wins');
        let losesText = document.getElementById('Loses');
        let tiesText = document.getElementById('Ties');
        let resultText = document.getElementById('resultText');


        let rockButton = document.getElementById('js-rock-button');
        let paperButton = document.getElementById('js-paper-button');   
        let scissorsButton = document.getElementById('js-scissors-button');

        function pickComputerMove(){
            const RandomNumber2=Math.random();
            if(RandomNumber2 >= 0 && RandomNumber2 < 1/3){
                return 'Rock';
            } else if(RandomNumber2 >= 1/3 && RandomNumber2 <2/3){
                return 'Paper';
            }else{
                return 'Scissors';
            }
        }


        function playGame(playerMove){
            let computerMove = pickComputerMove();
            if(playerMove === 'Scissors'){
                if(computerMove === 'Rock'){
                    result='Computer Won';
                }else if(computerMove === 'Paper'){
                    result='You Won';
                }else{
                    result='Theres Tie';
                }
            } else if(playerMove === 'Paper'){
                if(computerMove === 'Rock'){
                    result='You Won';
                }else if(computerMove === 'Paper'){
                    result='Theres Tie';
                }else{
                    result='Computer Won';
                }
            }else if(playerMove === 'Rock'){
                if(computerMove === 'Rock'){
                    result='Theres Tie';
                }else if(computerMove === 'Paper'){
                    result='Computer Won';
                }else{
                    result='You Won';
                }
            }
            
            if(result === 'You Won'){
                score.wins+=1;
            }else if(result === 'Computer Won'){
                score.loses+=1;
            }else if(result === 'Theres Tie'){
                score.ties+=1;
            }

            localStorage.setItem('score',JSON.stringify(score));
            // alert(`You choose ${playerMove} , Computer choose ${computerMove} . ${result}\n Wins: ${score.wins}\n Loses : ${score.loses}\n Ties:${score.ties}`);    
            displayScores(playerMove, computerMove);

        }


        rockButton.addEventListener('click', () =>{
            playGame('Rock');
        });
        paperButton.addEventListener('click', () =>{
            playGame('Paper');
        });
        scissorsButton.addEventListener('click', () =>{
            playGame('Scissors');
        });


        document.body.addEventListener('keydown', (event) => {
            if(event.key === 'R' || event.key === 'r'){
                playGame('Rock');
            }else if(event.key === 'P' || event.key === 'p'){
                playGame('Paper');
            }else if(event.key === 'S' || event.key === 's'){
                playGame('Scissors');
            }
        })

        
        function displayScores(playerMove,computerMove) {
            if(score.wins === 0 && score.loses === 0 && score.ties === 0){
                resultText.innerHTML = 'Click a button to play!';
            }else if(playerMove && computerMove){
                if(computerMove === 'Rock'){
                    computerMove = '✊';
                } else if(computerMove === 'Paper'){
                    computerMove = '✋';
                } else if(computerMove === 'Scissors'){
                    computerMove = '✌️';
                }

                if(playerMove === 'Rock'){
                    playerMove = '✊';
                } else if(playerMove === 'Paper'){
                    playerMove = '✋';
                } else if(playerMove === 'Scissors'){
                    playerMove = '✌️';
                }
                 resultText.innerHTML = `You <span> ${playerMove}</span> / <span> ${computerMove}</span> Computer ${result}`;
            }
                winsText.innerHTML = score.wins;
                losesText.innerHTML = score.loses;
                tiesText.innerHTML = score.ties;
        } 

        

        let intervalID;
        let isAutoPlaying = false;
        function autoPlay(){
            if(!isAutoPlaying){
                intervalID = setInterval(function(){
                    const playermove = pickComputerMove();
                    playGame(playermove);
                },1000);  
                isAutoPlaying = true;
            }else{
                clearInterval(intervalID);
                isAutoPlaying = false;
            }
        }

        displayScores();
        