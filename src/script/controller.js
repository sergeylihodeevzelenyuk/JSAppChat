import Socket from "./socket.js";
import View from "./view/view.js";

import "../main.css";

class Controller {
  #container;

  constructor(container) {
    this.#container = container;

    this.view = new View(this.#container, {
      onSubmit: () => this.onFormSubmit(),
    });

    this.socket = new Socket({
      onMessage: (data) => this.createMessage(data),
      onOpen: (data) => this.showSocketRes(data),
      onClose: (data) => this.showSocketRes(data),
    });
  }

  onFormSubmit() {
    const data = this.view.getFormData();

    this.socket.sendMessage(JSON.stringify(data));
  }

  createMessage(data) {
    const msg = JSON.parse(data);
    const msgHtml = this.view.renderMsgHtml(msg);

    this.view.appendMsgTo(msgHtml);
  }

  showSocketRes(data) {
    this.view.showSocketRes(data);
  }
}

export default Controller;
