/**
 * Copyright 2026 Mayita
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 *  card-indicator`
 * 
 * @demo index.html
 * @element card-indicator
 */
export class CardIndicator extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "card-indicator";
  }

  constructor() {
    super();
    this.total = 0;
    this.currentIndex = 0;
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      total: { type: Number },
      currentIndex: { type: Number },
      images: { type: Array },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .all {
        display: flex;
        justify-content: center;
        padding: var(--ddd-spacing-4);
      }
      .thumb {
       width: 35px;
       height: 35px;
       object-fit: cover;
       border-radius: var(--ddd-radius-xs);
       border: var(--ddd-border-sm);
       cursor: pointer;
       opacity: 0.6;
       flex-shrink: 0;
      }
      .thumb.active {
      opacity: 1;
      }
    `];
  }

  //tasks: i think we good actually
  render() {
    const all = [];

    for (let i = 0; i < this.total; i++) {
      const src = Array.isArray(this.images) && this.images[i] ? this.images[i] : null;
      if (src) {
        all.push(html`
          <img 
            @click="${this._handleClick}"
            data-index="${i}"
            class="thumb ${i === this.currentIndex ? "active" : ""}"
            src="${src}"
            />
          `);
      } 
    }
    return html`
      <div class="all">
        ${all}
      </div>`;
  }

  _handleClick(e) {
    const index = parseInt(e.target.dataset.index, 10);
    const indexCHange = new CustomEvent("play-list-index-changed", {
      composed: true,
      bubbles: true,
      detail: { index }
    })
    this.dispatchEvent(indexCHange);
  }

}

globalThis.customElements.define(CardIndicator.tag, CardIndicator);