/**
 * Copyright 2026 Mayita
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `playlist-arrow
 * 
 * @demo index.html
 * @element playlist-arrow
 */
export class PlaylistArrow extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "playlist-arrow";
  }

  constructor() {
    super();
    
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };;
  }

  // Lit reactive properties
  //tasks: direction, dispatch event
  static get properties() {
    return {
      ...super.properties,
      direction: { type: String },
      right: { type: String, reflect: true },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
      }
      button { 
        display: block;
        background-color: var(--ddd-theme-default-disabled);
        color: var(--ddd-theme-default-beaverBlue);
        width: 40px;
        height: 40px;
        font-size: var(--counter-app-button-font-size, var(--ddd-font-size-s));
        margin: var(--ddd-spacing-2);
        border-radius: var(--ddd-radius-circle);
        border-color: var(--ddd-theme-default-beaverBlue);
        transition: background-color 0.3s, transform 0.3s;
        
      }
      button:hover{
        background-color: var(--ddd-theme-default-info);
        color: var(--ddd-theme-default-infoLight);
        transform: scale(1.1);
      }
    `];
  }

  // Lit render the HTML
  //im confew on how I will place these, can I insert them into a slotted elem in the play list item? or does it need to be in the index html? 
  render() {
    return html`
    <button
      @click=${() => this.dispatchEvent(
        new CustomEvent(
          this.direction === "next" ? "next-clicked" : "prev-clicked",
          { bubbles: true, composed: true }
        )
      )}
    >
      ${this.direction === "next" ? ">" : "<"}
    </button>
`;
  }
}

globalThis.customElements.define(PlaylistArrow.tag, PlaylistArrow);