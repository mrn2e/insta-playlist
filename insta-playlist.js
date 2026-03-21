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
    this.dataUrl = "https://randomfox.ca/floof/";
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
      dataUrl: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: gray;
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
  }
  next() {
  if (this.currentIndex < this.slides.length - 1) {
    this.currentIndex++;
    this._updateSlides();
  }
}
prev() {
  if (this.currentIndex > 0) {
    this.currentIndex--;
    this._updateSlides();
  }
}

async firstUpdated() {
  const slot = this.shadowRoot.querySelector("slot");
  const elements = slot.assignedElements({ flatten: true });

  this.slides = elements.filter(
    (el) => el.tagName === "INSTA-CARD"
  );

  this.currentIndex = 0;
  this.loadStaticData();
  await this.getFoxes(); 
  this._updateSlides();
  this.requestUpdate();
}

response = {
  "data": [
    {
      "source": "https://github.com/btopro.png",
      "title": "Inventor"
    },
    {
      "source": "https://github.com/haxtheweb.png",
      "title": "Invention"
    }
  ]
};

loadStaticData() {
  this.response.data.forEach((i, index) => {
    if (this.slides[index]) {
      this.slides[index].title = i.title;
      this.slides[index].img = i.source;
      ;
    }
  });
}

async getFoxes() {
  for (let i = 0; i < this.slides.length; i++) {
    const resp = await fetch(this.dataUrl);
    if (resp.ok) {
      const data = await resp.json();
      this.slides[i].img = data.image;
      ;
    }
  }
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