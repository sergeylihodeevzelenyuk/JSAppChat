import { CLASS } from "../const.js";

import formTemplate from "./form.html";
import chatTemplate from "./chat.html";
import msgTemplate from "./messange.html";

import "./chat.css";

class FormWiew {
  #container;
  #options;

  constructor(container, options) {
    this.#container = container;
    this.#options = options;
    this.initState();
  }

  initState() {
    this.appendTo("afterbegin", chatTemplate);
    this.appendTo("beforeEnd", formTemplate);

    this.formEl = this.#container.querySelector(CLASS.FORM);
    this.inputsArr = this.getFormInputs();

    this.formEl.addEventListener("submit", (e) => this.onFormSubmit(e));
    this.formEl.addEventListener("click", (e) => this.onFormClick(e));
  }

  onFormSubmit(e) {
    e.preventDefault();

    if (this.isInputsValue()) {
      this.#options.onSubmit();
    } else {
      this.showInputError();
    }

    this.resetForm();
  }

  onFormClick(e) {
    if (this.isInput(e.target) && this.isInputEmpty(e.target)) {
      this.clearInputError(e.target);
    }
  }

  getFormData() {
    const data = {};

    this.inputsArr.forEach((input) => {
      data[input.name] = input.value;
    });

    return data;
  }

  isInputsValue() {
    return this.inputsArr.every((input) => !this.isInputEmpty(input));
  }

  clearInputError(input) {
    this.removeErrorClass(input);
  }

  showInputError() {
    const emptyInputs = this.inputsArr.filter((input) =>
      this.isInputEmpty(input)
    );

    emptyInputs.map((input) => this.addErrorClass(input));
  }

  removeErrorClass(el) {
    el.classList.remove(CLASS.ERROR);
  }

  addErrorClass(el) {
    el.classList.add(CLASS.ERROR);
  }

  isInput(el) {
    return el.classList.contains(CLASS.INPUT);
  }

  isInputEmpty(input) {
    return input.value === "";
  }

  resetForm() {
    this.inputsArr.forEach((input) => {
      input.value = "";
    });
  }

  getFormInputs() {
    return Array.from(this.formEl.querySelectorAll("." + CLASS.INPUT));
  }

  renderMsgHtml(data) {
    let html = msgTemplate;

    for (let prop in data) {
      html = html.replace(`{{${prop}}}`, data[prop]);
    }

    return this.addTimeTo(html);
  }

  addTimeTo(html) {
    const now = new Date();
    const hour = now.getHours();
    const min = now.getMinutes();

    const currentTime = `${this.adaptedTime(hour)}:${this.adaptedTime(min)}`;

    return html.replace("{{time}}", currentTime);
  }

  adaptedTime(time) {
    const timeStr = time.toString();

    if (timeStr.length == 1) {
      return 0 + timeStr;
    } else {
      return timeStr;
    }
  }

  appendTo(target, el) {
    this.#container.insertAdjacentHTML(target, el);
  }

  appendMsgTo(el) {
    const chat = this.#container.querySelector(CLASS.MSGS);

    chat.insertAdjacentHTML("beforeEnd", el);
    this.scrollChat(chat);
  }

  scrollChat(el) {
    el.scrollTop = el.scrollHeight;
  }

  showSocketRes(res) {
    const resContainer = this.#container.querySelector(CLASS.SERVER_RES);

    resContainer.innerText = `Connection is ${res}`;
  }
}

export default FormWiew;
