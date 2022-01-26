// Utils
window.addEventListener('DOMContentLoaded', function () {
    const elem1 = document.querySelector(".arrow-left");
    const elem2 = document.querySelector(".arrow-right");

    const windowWidth = window.innerWidth;
    if (windowWidth>639.98) {
        document.addEventListener("mousemove", parallax);
            function parallax(e) {
                const x = (window.innerWidth - e.pageX*3)
                const y = (window.innerWidth - e.pageY*3)
                elem1.style.transform = 'translate('+-x/100+'px'+','+-y/100+'px'+')';
                elem2.style.transform = 'translate('+-x/100+'px'+','+-y/100+'px'+')';
        }
    }
});