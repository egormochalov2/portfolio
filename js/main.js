// Utils
window.addEventListener('DOMContentLoaded', function () {
    const elem1 = document.querySelector(".arrow-left");
    const elem2 = document.querySelector(".arrow-right");
    elem1.style.transform = "none";
    elem2.style.transform = "none";
    document.addEventListener("mousemove", parallax);
        // Magic happens here
        function parallax(e) {
            const t = (window.innerWidth - e.pageX*3)
            elem1.style.transform = 'translateX('+-t/100+'px'+')';
            elem2.style.transform = 'translateX('+-t/100+'px'+')';
        }
});