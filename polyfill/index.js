const ns = "__screen_fold__";

let needsDispatch = false;
async function invalidate() {
  if (!needsDispatch) {
    needsDispatch = true;
    needsDispatch = await Promise.resolve(false);
    window[ns].dispatchEvent(new Event('change'));
    window.screen.fold.dispatchEvent(new Event('change'));
  }
}

class ScreenFold {
  constructor() {
    if (window.screen.fold !== undefined) {
      return window.screen.fold;
    }

    const eventTarget = document.createDocumentFragment();
    this.addEventListener = eventTarget['addEventListener'].bind(eventTarget);
    this.removeEventListener = eventTarget['removeEventListener'].bind(eventTarget);
    this.dispatchEvent = event => {
      if (event.type !== "change") {
        return;
      }
      const methodName = `on${event.type}`;
      if (typeof this[methodName] == 'function') {
        this[methodName](event);
      }
      return eventTarget.dispatchEvent(event);
    }
  }

  get posture() { return sessionStorage.getItem(`${ns}-posture`) || "no-fold" }
  get angle() { return +sessionStorage.getItem(`${ns}-angle`) || 0 }
}

/**
 *
 * @typedef ScreenFoldFeature
 * @type {object}
 * @property {number} angle - Fold angle in degrees
 * @property {string} posture - "no-fold" | "laptop" | "flat" | "tent" | "tablet" | "book"
 * @property {EventHandler} onchange - An event handler for the "change" event.
 */
export class ScreenFoldFeature extends ScreenFold {
  constructor() {
    if (window[ns] !== undefined) {
      return window[ns];
    }

    super();
  
    window.screen.orientation.addEventListener("change", this._updatePosture);

    // Web-based emulator runs this polyfill in an iframe, we need to
    // communicate emulator state changes to the site.
    // Should only be registered once (in CSS or JS polyfill, not both).
    window.addEventListener("message", ev => {
      if (ev.data.action === "update") {
        Object.assign(this, ev.data.value);
      }
    });
  }

  _updatePosture() {
    const angle = this.angle;
    let posture = "no-fold";
    if (angle >= 0 && angle < 140) {
      if (this.orientation.startsWith("portrait")) {
        posture = "book";
      } else {
        posture = "laptop";
      }
    } else if (angle >= 140 && angle <= 185) {
      posture = "flat";
    } else if (angle > 185 && angle < 335) {
      posture = "tent";
    } else {
      posture = "tablet";
    }
    sessionStorage.setItem(`${ns}-posture`, posture);
  }

  get angle() { return super.angle }
  set angle(v) {
    if (!(Number(v) >= 0)) {
      throw new TypeError(v);
    }
    const angle = this.angle;
    sessionStorage.setItem(`${ns}-angle`, v);
    if (angle !== v) {
      this._updatePosture();
      invalidate();
    }
  }

  get orientation() {
    const override = sessionStorage.getItem(`${ns}-orientation`)
    if (!override || override === "none") {
      return screen.orientation.type;
    }
    return override;
  }
  set orientation(v) {
    if (!["none", "portrait-primary", "portrait-secondary", "landscape-primary", "landscape-secondary"].includes(v)) {
      throw new TypeError(v);
    }
    sessionStorage.setItem(`${ns}-orientation`, v);
    this._updatePosture();
    invalidate();
  }
}

window[ns] = new ScreenFoldFeature;
window.screen.fold = new ScreenFold;