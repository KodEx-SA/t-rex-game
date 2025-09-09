document.addEventListener('DOMContentLoaded', () => {
    const dino = document.querySelector('.dino');
    const grid = document.querySelector('.grid');
    const alert = document.querySelector('#alert');
    const scoreDisplay = document.querySelector('#score');
    let isJumping = false;
    let gravity = 0.9;
    let position = 0;
    let score = 0;
    let gameOver = false;

    function control(e) {
        if (e.code === 'Space' && !isJumping && !gameOver) {
            jump();
        }
    }

    function jump() {
        isJumping = true;
        let count = 0;
        let timerID = setInterval(function() {
            // move down
            if (count === 15) {
                clearInterval(timerID);
                let downTimerID = setInterval(function() {
                    position -= 5;
                    position *= gravity;
                    dino.style.bottom = position + 'px';
                    if (position <= 0) {
                        clearInterval(downTimerID);
                        isJumping = false;
                        position = 0;
                        dino.style.bottom = '0px';
                    }
                }, 20);
            }

            // move up
            position += 30;
            position *= gravity;
            dino.style.bottom = position + 'px';
            count++;
        }, 20);
    }

    function generateObstacle() {
        if (gameOver) return;
        let obstacle = document.querySelector('.obstacle');
        let obstaclePosition = 1000;

        function moveObstacle() {
            if (obstaclePosition > -30) {
                obstaclePosition -= 5;
                obstacle.style.right = (1000 - obstaclePosition) + 'px';
            } else {
                obstaclePosition = 1000;
                obstacle.style.right = '0px';
            }

            // collision detection
            if (obstaclePosition > 900 && obstaclePosition < 960 && position < 60) {
                clearInterval(obstacleTimerID);
                alert.innerHTML = 'Game Over! Press Space to Restart';
                gameOver = true;
                return;
            }
        }

        let obstacleTimerID = setInterval(moveObstacle, 20);
        if (!gameOver) setTimeout(generateObstacle, 2000);
    }

    function updateScore() {
        if (!gameOver) {
            score += 1;
            scoreDisplay.innerHTML = `Score: ${score}`;
        }
    }

    function restartGame() {
        if (gameOver && event.code === 'Space') {
            gameOver = false;
            score = 0;
            scoreDisplay.innerHTML = `Score: ${score}`;
            alert.innerHTML = '';
            document.querySelector('.obstacle').style.right = '0px';
            generateObstacle();
        }
    }

    document.addEventListener('keyup', (e) => {
        control(e);
        restartGame(e);
    });

    generateObstacle();
    setInterval(updateScore, 100);
});