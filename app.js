document.addEventListener('DOMContentLoaded', () => {
    const dino = document.querySelector('.dino');
    const grid = document.querySelector('.grid');

    function control(e) {
        if (e.code === 'Space') {
            jump();
        }
    }

    let position = 0;

    function jump() {
        let timerID = setInterval(function() {

            // move up
            position += 30;
            dino.style.bottom = position + 'px';
        }, 20);

    }


    document.addEventListener('keyup', control);
});