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
        overflow-x: auto;
        max-width: 300px;
        gap: var(--ddd-spacing-2);
      }
      .thumb {
       width: 50px;
       height: 50px;
       object-fit: cover;
       border-radius: var(--ddd-radius-xs);
       border: var(--ddd-border-sm);
       cursor: pointer;
       opacity: 0.6;
       flex-shrink: 0;
       margin: 0 var(--ddd-spacing-1);
      }
      .thumb.active {
      opacity: 1;
      }
    `];
  }

  //tasks: i think we good actually
  render() {
  if (!this.images) return html``;
  const { start, end } = this.getVisibleRange();
  const visible = this.images.slice(start, end);

  return html`
    <div class="all">
      ${visible.map((src, i) => {
        const actualIndex = start + i;

        return html`
          <img 
            @click="${this._handleClick}"
            data-index="${actualIndex}"
            class="thumb ${actualIndex === this.currentIndex ? "active" : ""}"
            src="${src}"
            loading="lazy"
          />
        `;
      })}
    </div>
  `;
}

  _handleClick(e) {
  const index = parseInt(e.target.dataset.index);

  this.dispatchEvent(new CustomEvent("play-list-index-changed", {
    detail: { index },
    bubbles: true,
    composed: true
  }));
}
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('currentIndex')) {
      this._scrollToActive();
    }
  }

  _scrollToActive() {
    const activeThumb = this.shadowRoot.querySelector('.thumb.active');
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }

  getVisibleRange() {
  const range = 5;
  const half = Math.floor(range / 2);

  let start = this.currentIndex - half;
  let end = this.currentIndex + half + 1;

  if (start < 0) {
    start = 0;
    end = range;
  }

  if (end > this.images.length) {
    end = this.images.length;
    start = end - range;
  }

  return { start, end };
}

}

globalThis.customElements.define(CardIndicator.tag, CardIndicator);