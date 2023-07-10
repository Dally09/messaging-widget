import { CLOSE_ICON, MESSAGE_ICON, styles } from "./asset.js";

class MessageWidget {
  constructor(position = "bottom-right") {
    position = "";
    open = false;
    widgetContainer = null;
  }

  getPosition(position) {
    const [vertical, horizontal] = position.split("-");
    return {
      [vertical]: "30px",
      [horizontal]: "30px",
    };
  }

  async initialize() {
    
    const container = document.createElement("div");
    container.style.position = "fixed";
    Object.keys(this.position).forEach(
      (key) => (container.style[key] = this.position[key])
    );
    document.body.appendChild(container);

    const buttonContainer = document.createElement("button");
    buttonContainer.classList.add("button__container");

    const widgetIconElement = document.createElement("span");
    widgetIconElement.innerHTML = MESSAGE_ICON;
    widgetIconElement.classList.add("widget__icon");
    this.widgetIcon = widgetIconElement;

    const closeIconElement = document.createElement("span");
    closeIconElement.innerHTML = CLOSE_ICON;
    closeIconElement.classList.add("widget__icon", "widget__hidden");
    this.closeIcon = closeIconElement;

    buttonContainer.appendChild(this.widgetIcon);
    buttonContainer.appendChild(this.closeIcon);
    buttonContainer.addEventListener("click", this.toggleOpen.bind(this));

    this.widgetContainer = document.createElement("div");
    this.widgetContainer.classList.add("widget__hidden", "widget__container");

    this.createWidgetContent();

    container.appendChild(this.widgetContainer);
    container.appendChild(buttonContainer);
  }

  createWidgetContent() {
    this.widgetContainer.innerHTML = `
        <header class="widget__header">
            <h3>Start a conversation</h3>
            <p>We usually respond within a few hours</p>
        </header>
        <form>
            <div class="form__field">
                <label for="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                />
            </div>
            <div class="form__field">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                />
            </div>
            <div class="form__field">
                <label for="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Enter Message Subject"
                />
            </div>
            <div class="form__field">
                <label for="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Enter your message"
                  rows="6"
                ></textarea>
            </div>
            <button>Send Message</button>
        </form>
    `;
  }

  injectStyles() {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = styles.replace(/^\s+|\n/gm, "");
    document.head.appendChild(styleTag);
  }

  toggleOpen() {
    this.open = !this.open;
    if (this.open) {
      this.widgetIcon.classList.add("widget__hidden");
      this.closeIcon.classList.remove("widget__hidden");
      this.widgetContainer.classList.remove("widget__hidden");
    } else {
      this.createWidgetContent();
      this.widgetIcon.classList.remove("widget__hidden");
      this.closeIcon.classList.add("widget__hidden");
      this.widgetContainer.classList.add("widget__hidden");
    }
  }
}

function initializeWidget() {
  return new MessageWidget();
}

initializeWidget();