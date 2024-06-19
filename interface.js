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

        let msg = document.getElementById("form");
        msg.addEventListener("submit", e => { 
            e.preventDefault();

            firebase.database().ref("Mensagens").push({
                nome: msg.name.value,
                email: msg.email.value,
                mensagem: msg.message.value,
                contato: msg.telefone.value
            });
            alert('Mensagem Enviada com Sucesso!')
            msg.reset();
        });
    }
}

var inter = new Interface();
