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
      desc: { type: String },
      topHeading: { type: String },
      img: { type: String },
      active: { type: Boolean, reflect: true },
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
        padding-right: 100px;
        background-color: WHITE;
        border-radius: var(--ddd-radius-md);
        padding: var(--ddd-spacing-4);
      }
      h3 {
        color: var(--ddd-theme-default-beaverBlue);
        font-size: var(--ddd-font-size-xxl);
        padding: 0px;
        margin: 0px;
      }
      .top-heading {
        color: var(--ddd-theme-default-link);
        font-size: 18px;
        font-weight: var(--ddd-font-weight-bold);
        text-transform: uppercase;
        margin: 0;
        margin-top: 30px;
        padding: 3px;
      }
      .line {
        border-top: 1px solid var(--ddd-theme-primary); 
        font-size: 10px;
        margin-top: 30px;
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
        border-radius: 8px;
        display: block;
      }
      .icons {
        width: 100px; 
        margin: 0 px;
        padding-bottom: 0px;
      }
    `];
  }

  // Lit render the HTML
  //tasks: know index, show/hide based on idex (class? for active)
  render() {
    return html`
<div class="wrapper">
  <p class="top-heading">${this.topHeading}</p>
  ${this.img
          ? html`<div class="image" style="background-image: url(${this.img});"></div>`
      : html``}
  <img class="icons" src="https://static.vecteezy.com/system/resources/thumbnails/002/855/165/small/minimalist-social-media-icons-like-comment-share-and-save-icons-social-media-flat-icon-vector.jpg">
  <slot></slot>
</div>`;
  }

}

globalThis.customElements.define(InstaCard.tag, InstaCard);