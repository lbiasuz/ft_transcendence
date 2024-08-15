import Lang from "../lang/Lang.js";
import Component from "./Component.js";

export default class NavbarAvatarComponent extends Component {

    constructor(userName) {

        super();

        const base = document.createElement("li");
        base.classList.add("nav-item", "dropdown", "nav-user");

        base.innerHTML = `
        
            <img src="static/static/img/avatar.jpeg" alt="">
            <a href="" id="user-name" class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false"></a>
            <ul class="dropdown-menu text-center">
                <li><a href="" data-link id="logout" class="dropdown-item"></a></li>
            </ul>

        `;

        base.querySelector("#user-name").textContent = userName;
        base.querySelector("#logout").textContent = Lang.text("Logout");
        base.querySelector("#logout").addEventListener("click", (event) => {
            event.preventDefault();
            window.location.href = "/logout/";
            return;
        });
        this._component = base;

    }

}