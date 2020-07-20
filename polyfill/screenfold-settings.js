import { ScreenFoldFeature } from "./index.js";
class ScreenFoldSettings extends HTMLElement {

  constructor() {
    super();

    const feature = new ScreenFoldFeature;
    
    let shadow = this.attachShadow({mode:'open'});
    let settings_styles = `/*sf-settings-styles*/
    #sf-settings {
      position: absolute;
      padding: .4rem;
      width: max-content;
      border: solid #3d3d3d 4px;
      border-radius: 1rem;
      background-color: #EAEAEA;
      font-family: sans-serif;
      box-shadow: 0px 0px 5px #000;
      z-index: 9999;
      color: #3d3d3d;
    }
    svg {
      pointer-events: none;
    }
    header {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        cursor: move;
        touch-action: none;
        user-select: none;
    }
    .sf-cog {
        width: 2rem;
        height: 2rem;
        margin: 0 .3rem .3rem 0;
    }
    .main-settings {
        display: grid;
        grid-template-columns: 30px auto 60px;
        gap: .9rem;
        border-top: dotted rgba(61, 61, 61, .5) 4px;
        margin-bottom: .5rem;
        padding-top: .5rem;
    }
    .icon {
        height: 1rem;
    }
    #iangle {
      grid-column: 2/3;
      grid-row: 1/2;
    }
    #iorientation {
      grid-column: 2/3;
      grid-row: 2/3;
    }
    #langle {
      grid-column: 1/2;
      grid-row: 1/2;
    }
    #lorientation {
      grid-column: 1/2;
      grid-row: 2/3;
    }
    .state-info {
      grid-column: 3/4;
      grid-row: 1/3;
      justify-self: center;
      align-self: center;
      text-align: center;
      font-weight: bold;
    }`;
    let settings_ui_root = document.createElement('article');
    settings_ui_root.setAttribute('id', 'sf-settings');
    let settings_style = document.createElement('style');
    settings_style.innerText = settings_styles;
    let settings_header = document.createElement('header');
    settings_header.innerHTML = `<svg class="sf-cog" viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" stroke-linecap="round" stroke-miterlimit="1"><path d="M5.902.025a5.486 5.486 0 00-1.041 0l-.161.9c-.327.05-.648.136-.956.256l-.59-.698a5.418 5.418 0 00-.901.52l.31.86a4.543 4.543 0 00-.7.7l-.86-.31a5.418 5.418 0 00-.52.901l.698.59c-.12.308-.206.629-.256.956l-.9.161a5.486 5.486 0 000 1.041l.9.162c.05.327.136.647.256.956l-.698.589c.144.317.318.619.52.902l.86-.31c.207.258.442.493.7.699l-.31.86c.283.203.585.377.901.521l.59-.699c.308.121.629.207.956.257l.161.899c.346.034.695.034 1.041 0l.162-.899c.327-.05.647-.136.956-.257l.589.699c.317-.144.619-.318.902-.521l-.31-.86c.258-.206.493-.441.699-.699l.86.31c.203-.283.377-.585.521-.902l-.699-.589c.121-.309.207-.629.257-.956l.899-.162a5.325 5.325 0 000-1.041L9.839 4.7a4.458 4.458 0 00-.257-.956l.699-.59a5.355 5.355 0 00-.521-.901l-.86.31a4.492 4.492 0 00-.699-.7l.31-.86a5.387 5.387 0 00-.902-.52l-.589.698a4.531 4.531 0 00-.956-.256l-.162-.9z" fill="#3d3d3d"/><path d="M6.472 6.011l1.015-.586c.041-.024-.003-.088-.1-.144L5.556 4.224c-.096-.056-.208-.081-.249-.058l-1.015.587" fill="#3d3d3d" stroke="#fff" stroke-width=".27"/><path d="M6.472 4.753l2.03-1.173c.082-.047.072-.131-.025-.187L6.646 2.336c-.096-.056-.242-.062-.324-.014l-2.03 1.172M4.292 6.011l-2.03 1.172c-.083.048-.072.132.024.188l1.831 1.057c.096.055.242.061.326.013L6.472 7.27" fill="#3d3d3d" stroke="#fff" stroke-width=".27"/><path d="M6.472 4.753l-2.18-1.259v2.517l2.18 1.259V4.753z" fill="#3d3d3d"/><path d="M6.472 4.753l-2.18-1.259M6.472 7.27l-2.18-1.259" fill="none" stroke="#fff" stroke-width=".18" stroke-linejoin="round" stroke-miterlimit="1.5" stroke-dasharray="0,.36,0,0"/><path d="M4.299 6.015l-.007-2.521M6.472 7.27V4.753" fill="none" stroke="#fff" stroke-width=".27"/></svg>Screen Fold Settings`;
    let settings_form = document.createElement('section');
    settings_form.setAttribute('class', 'main-settings');
    //range angle
    let lbl_angle = document.createElement('label');
    lbl_angle.setAttribute('for', 'angle');
    lbl_angle.setAttribute('id', 'langle');
    lbl_angle.innerHTML = `<svg class="icon" viewBox="0 0 15 13" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="1"><g fill="none" stroke="#3d3d3d"><path d="M14.32 12.189H.577L9.131.577" stroke-width="1.15"/><path d="M5.353 6.4s2.619 1.941 2.783 5.384" stroke-width=".5"/></g></svg>`;
    let rng_angle = document.createElement('input');
    rng_angle.setAttribute('type', 'range');
    rng_angle.setAttribute('name', 'angle');
    rng_angle.setAttribute('id', 'iangle');
    rng_angle.setAttribute('min', '0');
    rng_angle.setAttribute('max', '360');
    rng_angle.setAttribute('step', '1');
    rng_angle.setAttribute('value', '0');
    rng_angle.onchange = ev => {
      feature.angle = ev.target.value;
      txt_state_info.innerText = `${screen.fold.angle}° (${screen.fold.posture})`;
    };
    settings_form.appendChild(lbl_angle);
    settings_form.appendChild(rng_angle);
    //select orientation
    let lbl_orientation = document.createElement('label');
    lbl_orientation.setAttribute('for', 'orientation');
    lbl_orientation.setAttribute('id', 'lorientation');
    lbl_orientation.innerHTML = `<svg class="icon" viewBox="0 0 20 13" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="1"><g fill="none" stroke="#3d3d3d"><path d="M12.587.5H6.662l-.038 11.851h5.926L12.587.5z"/><path d="M4.524 2.438l.789.709-.709.789" stroke-width=".5" stroke-linejoin="miter" stroke-miterlimit="10"/><path d="M5.645 9.723a3.286 3.286 0 01-3.286-3.298 3.31 3.31 0 012.954-3.278" stroke-width=".5"/><path d="M14.687 10.413l-.789-.709.71-.789" stroke-width=".5" stroke-linejoin="miter" stroke-miterlimit="10"/><path d="M13.566 3.128a3.286 3.286 0 013.287 3.297 3.312 3.312 0 01-2.955 3.279" stroke-width=".5"/></g></svg>`;
    let sel_orientation = document.createElement('select');
    sel_orientation.setAttribute('name', 'orientation'); 
    sel_orientation.setAttribute('id', 'iorientation'); 
    sel_orientation.innerHTML = `<option value="none">No override</option>
      <option value="portrait-primary">Portrait (primary)</option>
      <option value="portrait-secondary">Portrait (secondary)</option>
      <option value="landscape-primary">Landscape (primary)</option>
      <option value="landscape-secondary">Landscape (secondary)</option>`;
    sel_orientation.onchange = ev => {
      feature.orientation = ev.target.value;
    };
    settings_form.appendChild(lbl_orientation);
    settings_form.appendChild(sel_orientation);
    //settings state info
    let txt_state_info = document.createElement('span');
    txt_state_info.innerText = 'N/A - N/A';
    txt_state_info.setAttribute('class', 'state-info');
    settings_form.appendChild(txt_state_info);

    settings_ui_root.appendChild(settings_style);
    settings_ui_root.appendChild(settings_header);
    settings_ui_root.appendChild(settings_form);

    shadow.appendChild(settings_ui_root);
    
    //movement
    let widget= settings_ui_root;
    let _position = { x: 0, y: 0};
    let _offset = { x: 0, y: 0 };
    let _pointerId;

    let startDrag = (ev) => {
      _position.x = ev.clientX - _offset.x;
      _position.y = ev.clientY - _offset.y;
      _pointerId = ev.pointerId;
      settings_header.setPointerCapture(ev.pointerId);
    };

    let endDrag = (ev) => {
      settings_header.releasePointerCapture(_pointerId);
      _pointerId = null;
    };

    let drag = (ev) => {
      if (!_pointerId) {
        return;
      }
  
      let x = ev.clientX - _position.x;
      let y = ev.clientY - _position.y;
  
      const style = window.getComputedStyle(settings_ui_root);
      const configuratorWidth = parseFloat(style.width);
      const configuratorHeight = parseFloat(style.height);
      if (x < 0)
        x = 0;
      if (y < 0)
        y = 0;
      if (y + configuratorHeight >= window.innerHeight)
        y = window.innerHeight - configuratorHeight;
      if (x + configuratorWidth >= window.innerWidth)
        x = window.innerWidth - configuratorWidth;
        
      _offset = { x, y };
      settings_ui_root.style.transform = `translate3d(${x}px,${y}px, 0)`;
    };

    settings_header.addEventListener('pointerdown', startDrag);
    settings_header.addEventListener('pointerup', endDrag);
    settings_header.addEventListener('pointercancel', endDrag);
    settings_header.addEventListener('pointermove', drag);
  }

}
customElements.define('screenfold-settings', ScreenFoldSettings);
  