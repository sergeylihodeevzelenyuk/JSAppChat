import { SOCKET_URL } from "./const.js";

class Socket {
  #options;

  constructor(options) {
    this.#options = options;

    this.init();
  }

  init(data) {
    this.socket = new WebSocket(SOCKET_URL);
    this.socket.onopen = (e) => this.#options.onOpen(e.type);
    this.socket.onclose = (e) => this.init(e.type);
    this.socket.onmessage = (e) => this.#options.onMessage(e.data);

    if (data) {
      this.#options.onClose(data);
    }
  }

  sendMessage(data) {
    this.socket.send(data);
  }
}

export default Socket;
