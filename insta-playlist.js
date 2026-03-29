/**
 * Copyright 2026 Mayita
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `insta-playlist`
 * 
 * @demo index.html
 * @element insta-playlist
 */
export class InstaPlaylist extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "insta-playlist";
  }

  constructor() {
    super();
    this.title = "";
    this.currentIndex = 0;
    
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/insta-playlist.ar.json", import.meta.url).href +
        "/../",
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      currentIndex: { type: Number, reflect: true },
      items: { type: Array },
      data: { type: Object },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-default-limestoneGray);
        font-family: var(--ddd-font-navigation);
        box-shadow: var(--ddd-shadow-elevation-2);
        border-radius: var(--ddd-radius-lg);
        max-width: 800px;
      }

      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        width: 93%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: gray;
      }
      .arrow {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: -50px;
        margin-right: -50px;
      }
      .indicator {
        display: flex;
        justify-content: left;
        margin-top: var(--ddd-spacing-2);
      }
      
    `];
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">

<div class="arrow">
  <playlist-arrow
  direction='prev'
  @prev-clicked="${this.prev}">

  </playlist-arrow>


  <div class="slides">
  <slot></slot>
  </div>

  
  <playlist-arrow
  direction='next'
  @next-clicked="${this.next}">
  </playlist-arrow>
  </div>

  <div class="indicator">
  <card-indicator
  @play-list-index-changed="${this.handleEvent}"
  .total="${this.slides ? this.slides.length : 0}"
  .currentIndex="${this.currentIndex}"
  .images="${this.slides ? this.slides.map(slide => slide.img) : []}">
  </card-indicator>
</div>
</div>
`;
  }


handleEvent(e) {
  this.currentIndex = e.detail.index;
  this._updateSlides();
  this.updateQueryParam("slide", this.currentIndex);
}

next() {
  if (this.currentIndex < this.slides.length - 1) {
    this.currentIndex++;
    this._updateSlides();
    this.updateQueryParam("slide", this.currentIndex);
  }
}

prev() {
  if (this.currentIndex > 0) {
    this.currentIndex--;
    this._updateSlides();
    this.updateQueryParam("slide", this.currentIndex);
  }
}

async firstUpdated() {
  const slot = this.shadowRoot.querySelector("slot");
  const elements = slot.assignedElements({ flatten: true });

  this.slides = elements.filter(
    (el) => el.tagName === "INSTA-CARD"
  );

const params = new URLSearchParams(window.location.search);
const slideFromUrl = parseInt(params.get("slide"));

if (!isNaN(slideFromUrl)) {
  this.currentIndex = slideFromUrl;
} else {
  this.currentIndex = 0;
}
  await this.loadData();
  this.dataToSlides();
  this._updateSlides();
  this.requestUpdate();
}


async loadData() {
  try {
    const url = new URL("./data.json", import.meta.url).href;
    const resp = await fetch(url);
    if (resp.ok) {
      this.data = await resp.json();
    }
  } catch (e) {
    console.error("Error", e);
  }
}

updateQueryParam(key, value) {
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set(key, value);
  history.pushState(null, '', currentUrl.toString());
}

dataToSlides() {
  if (!this.data) return;
  this.data.images.forEach((imgData, index) => {
    const slide = this.slides[index];
    if (!slide) return;
    const author = this.data.author.find(
      (a) => a.authorId === imgData.authorId
    );

    slide.img = imgData.fullSrc;
    slide.topHeading = author ? author.name : "Unknown";
    slide.channel = `${author?.channelName || ""} • ${imgData.dateTaken}`;
    slide.index = index;
  });
}

_handleArrow(direction) {
  if (!this.slides.length) return;

  if (direction === "next") {
    this.currentIndex =
      (this.currentIndex + 1) % this.slides.length;
  } else {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) %
      this.slides.length;
  }

  this._updateSlides();
}

_updateSlides() {
  this.slides.forEach((slide, index) => {
    slide.toggleAttribute("active", index === this.currentIndex);
  });
}



}

globalThis.customElements.define(InstaPlaylist.tag, InstaPlaylist);