import Component from "./Component.js";

export default class ToastComponent extends Component {

    constructor(content, type = "success") {

        super();

        const classesType = ["success", "error"]
        const classType = (classesType.includes(type))? type : "success";

        const base = document.createElement("div");
        base.classList.add("toast", "align-items-center", "border-0", classType);
        base.role = "alert";
        base.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                ${content}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;

        this._component = base;

        document.querySelector(".toast-container")?.append(base);

    }

    show() {
        const toast = new bootstrap.Toast(this._component);
        toast.show();
    }

}