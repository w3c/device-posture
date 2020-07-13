// import { LitElement, css, html } from 'https://cdn.pika.dev/lit-element@^2.3.1';
import { ScreenFoldFeature } from "./index.js";



customElements.define("foldangle-settings", class extends LitElement {
  static styles = css`
    :host {
      position: absolute;
      background-color: #f2f2f2;
      border: 1px solid #cccccc;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
      z-index: 9999;
    }

    .header-background {
      background-color: #f2f2f2;
      border-bottom: 1px solid #cccccc;
      height: 28px;
    }

    .header {
      cursor: move;
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
      touch-action: none;
    }

    .mini {
      font-size: 0.9em;
      height: 20px;
      margin-bottom: 5px;
    }

    .icon-row {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }

    .icon-row > * {
      width: 20px;
      height: 20px;

      cursor: pointer;
      opacity: 0.5;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon-row > *:hover {
      opacity: 1;
    }

    .content {
      padding: 8px;
    }
  `;

  _position = { x: 0, y: 0};
  _offset = { x: 0, y: 0 };

  startDrag(ev) {
    this._position.x = ev.clientX - this._offset.x;
    this._position.y = ev.clientY - this._offset.y;
    this._pointerId = ev.pointerId;
    this._header.setPointerCapture(ev.pointerId);
  }

  endDrag() {
    this._header.releasePointerCapture(this._pointerId);
    this._pointerId = null;
  }

  move(ev) {
    if (!this._pointerId) {
      return;
    }

    let x = ev.clientX - this._position.x;
    let y = ev.clientY - this._position.y;

    const style = window.getComputedStyle(this.shadowRoot.host);
    const configuratorWidth = parseFloat(style.width);
    const configuratorHeight = parseFloat(style.height);

    console.log(configuratorWidth, configuratorHeight);
    if (x < 0)
      x = 0;
    if (y < 0)
      y = 0;
    if (y + configuratorHeight >= window.innerHeight)
      y = window.innerHeight - configuratorHeight;
    if (x + configuratorWidth >= window.innerWidth)
      x = window.innerWidth - configuratorWidth;
      
    this._offset = { x, y };
    this.shadowRoot.host.style.transform = `translate3d(${x}px,${y}px, 0)`;
  }

  firstUpdated() {
    this._header = this.shadowRoot.querySelector(".header");

    const slider = this.shadowRoot.querySelector("#slider");
    const feature = new ScreenFoldFeature;
    slider.onchange = ev => {
      feature.angle = ev.target.value;
    }

    const select = this.shadowRoot.querySelector("#select");
    select.onchange = ev => {
      feature.orientation = ev.target.value;
    }
  }

  render() {
    return html`
      <div class="header-background header mini"
          @pointerdown=${this.startDrag}
          @pointerup=${this.endDrag}
          @pointercancel=${this.endDrag}
          @pointermove=${this.move}>
        Configurator
        <div class="icon-row">
          <svg xmlns="http://www.w3.org/2000/svg"
              width="18" height="18" viewBox="0 0 18 18">
            <path d="M14.53 4.53l-1.06-1.06L9
                     7.94 4.53 3.47 3.47 4.53
                     7.94 9l-4.47 4.47 1.06
                     1.06L9 10.06l4.47 4.47
                     1.06-1.06L10.06 9z"/>
          </svg>
        </div>
      </div>
      <div class="content">
        <label for="angle">Angle</label>
        <input type="range" id="slider" name="angle" min="0" max="360">
        <br>
        <label for="orientation">Orientation</label>
        <select name="orientation" id="select">
          <option value="none">No override</option>
          <option value="portrait-primary">Portrait (primary)</option>
          <option value="portrait-secondary">Portrait (secondary)</option>
          <option value="landscape-primary">Landscape (primary)</option>
          <option value="landscape-secondary">Landscape (secondary)</option>
        </select>
      </div>
    `;
  }
});