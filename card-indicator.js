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
        gap: var(--ddd-spacing-4);
        padding: var(--ddd-spacing-4);
      }
      .current {
       width: 12px;
       height: 12px;
       border-radius: 50%;
       background-color: var(--ddd-theme-default-beaverBlue);
       opacity: 0.4;
       cursor: pointer;
      }
      .current.active {
      opacity: 1;
      }
    `];
  }

  // Lit render the HTML
  //tasks: have index, dispatch event on click
  render() {
    let all = [];
    for (let i = 0; i < this.total; i++) {
      all.push(html`
      <span @click="${this._handleClick}" data-index="${i}" class="current ${i === this.currentIndex ? 'active' : ''}"></span>
        `);
    }
    return html`
      <div class="all">
        ${all}
      </div>`;
  }

  _handleClick(e) {
    const indexCHange = new CustomEvent("play-list-index-changed", {
      composed: true,
      bubbles: true,
      detail: {
        index: parseInt(e.target.dataset.index)
      }
    })
    this.dispatchEvent(indexCHange);
  }

}

globalThis.customElements.define(CardIndicator.tag, CardIndicator);