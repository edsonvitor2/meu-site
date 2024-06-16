class Interface {
    constructor() {
        this.initButtons();
    }

    initButtons() {
        let menu = document.getElementById("menu");

        menu.addEventListener("click", e => { 
            let menuList = document.querySelector(".menu-list");
            menuList.classList.toggle("visible");
        });
    }
}

var inter = new Interface();
