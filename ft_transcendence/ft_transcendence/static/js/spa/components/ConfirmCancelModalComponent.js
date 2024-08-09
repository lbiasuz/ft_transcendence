import Component from "./Component.js";

export default class ConfirmCancelModalComponen extends Component {

    #bsModal;
    #cancelCallBack;
    #confirmCallBack;

    constructor(bodyConent, cancelButtonText = "Cancel", confirmButtonText = "Confirm") {

        super();

        const base = document.createElement("div");
        base.classList.add("modal", "fade");
        base.dataset.bsBackdrop = "static";
        base.dataset.bsKeyboard = "false";
        base.tabIndex = "-1";

        base.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body">
                        ${bodyConent}
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="modal-cancel" class="btn btn-sm">${cancelButtonText}</button>
                        <button type="button" id="modal-confirm" class="btn btn-sm btn-confirm">${confirmButtonText}</button>
                    </div>
                </div>
            </div>
        `;

        const cancelButton = base.querySelector("#modal-cancel");
        const confirmButton = base.querySelector("#modal-confirm");

        cancelButton.addEventListener("click", () => { this.#cancelCallBack?.(); })
        confirmButton.addEventListener("click", () => { this.#confirmCallBack?.(); })

        this._component = base;
        this.#bsModal = new bootstrap.Modal(base);

    }

    onCancel(callback) {
        this.#cancelCallBack = callback;
    }

    onConfirm(callback) {
        this.#confirmCallBack = callback;
    }

    show() {
        this.#bsModal.show();
    }

    hide() {
        this.#bsModal.hide();
    }

}