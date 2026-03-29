/**
 * Copyright 2026 Mayita
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `insta-card
 * 
 * @demo index.html
 * @element insta-card
 */
export class InstaCard extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "insta-card";
  }

  constructor() {
    super();
    this.title = "";
    this.topHeading = "";
    this.channel = "";
    this.img = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    ;
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      channel: { type: String },
      topHeading: { type: String },
      img: { type: String },
      active: { type: Boolean, reflect: true },
      liked: { type: Boolean },
      index: { type: Number },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: none;
      }
      :host([active]) {
        display: block;
        border-width: var(--ddd-border-size-lg);
        min-height: 200px;
        padding-right: var(--ddd-spacing-25);
        background-color: var(--ddd-theme-default-white);
        border-radius: var(--ddd-radius-md);
        padding: var(--ddd-spacing-4);
      }
      h3 {
        color: var(--ddd-theme-default-beaverBlue);
        font-size: var(--ddd-font-size-xxl);
        padding: var(--ddd-spacing-0);
        margin: var(--ddd-spacing-0);
      }
      .top-heading {
        color: var(--ddd-theme-default-link);
        font-size: var(--ddd-font-size-3xs);
        font-weight: var(--ddd-font-weight-bold);
        text-transform: uppercase;
        margin: var(--ddd-spacing-0);
        margin-top: var(--ddd-spacing-0);
        padding: var(--ddd-spacing-1);
      }
      .line {
        border-top: 1px solid var(--ddd-theme-primary); 
        font-size: var(--ddd-font-size-4xs);
        margin-top: var(--ddd-spacing-8);
        color: var(--ddd-theme-default-pughBlue);
      }
      .image {
        width: 320px;
        height: 240px;
        max-width: 100%;
        min-height: 240px;
        object-fit: cover;
        background-size: cover;
        background-position: center;
        border-radius: var(--ddd-radius-sm);
        display: block;
      }
      .icons {
        width: 100px; 
        margin: var(--ddd-spacing-0);
        padding-bottom: var(--ddd-spacing-0);
      }
    `];
  }
  updated(changedProperties) {
  if (changedProperties.has("index")) {
    const saved = localStorage.getItem("liked-" + this.index);
    this.liked = saved === "true";
  }
}

 toggleLike() {
  this.liked = !this.liked;
  localStorage.setItem("liked-" + this.index, this.liked);
}

  // Lit render the HTML
  //tasks: know index, show/hide based on idex (class? for active)
  render() {
    return html`
<div class="wrapper">
  <p class="top-heading">${this.topHeading}${this.channel}</p>
  ${this.img
          ? html`<div class="image" style="background-image: url(${this.img});"></div>`
      : html``}
      <div class="icons">
    <span class="icon" @click="${this.toggleLike}">
        ${this.liked ? "❤️" : "🤍"}
</span>
<span class="icon">💬</span>
<span class="icon">🔗</span>
  </div>
  <slot></slot>
</div>`;
  }

}

globalThis.customElements.define(InstaCard.tag, InstaCard);