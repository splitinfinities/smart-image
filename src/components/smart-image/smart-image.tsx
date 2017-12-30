import { Component, Prop, State, Element } from '@stencil/core';
import { updateStyles } from '../../helpers';

@Component({
  tag: 'smart-image',
  styleUrl: 'smart-image.scss',
  shadow: true
})

export class SmartImage {
  @Element() element: HTMLElement;
  @State() figure: HTMLElement;

  @Prop() preload: string;

  @Prop() width: number;
  @Prop() height: number;

  @Prop() bg: string = "transparent";

  @State() aspectRatio: number;

  @State() sources: Array<any> = [];

  @State() io: IntersectionObserver;
  @State() active: boolean = false;

  componentWillLoad() {
    this.setBG();
    this.prepareSources();
    this.updateAspectRatio();
  }

  componentDidLoad() {
    this.addIntersectionObserver();

    this.figure = this.element.shadowRoot.querySelector('figure');
  }

  handleImage() {
    this.active = true;
  }

  addIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      this.io = new IntersectionObserver((data: any) => {
        // because there will only ever be one instance
        // of the element we are observing
        // we can just use data[0]
        if (data[0].isIntersecting) {
          this.handleImage();
          this.removeIntersectionObserver();
        }
      })

      this.io.observe(this.element.shadowRoot.querySelector('figure'));
    } else {
      // fall back to setTimeout for Safari and IE
      setTimeout(() => {
        this.handleImage();
      }, 300);
    }
  }

  removeIntersectionObserver() {
    if (this.io) {
      this.io.disconnect();
      this.io = null;
    }
  }

  setBG() {
    updateStyles(this.element, {
      "--bg": `${this.bg}`
    });
  }

  prepareSources() {
    const sources = this.element.querySelectorAll("source");

    let sourcesArray = [];

    [].forEach.call(sources, (source) => {
      sourcesArray = [...sourcesArray, source];
    });

    this.sources = sourcesArray;
  }

  updateAspectRatio() {
    this.aspectRatio = (this.height / this.width) * 100;

    updateStyles(this.element, {
      "--aspect_ratio": `${this.aspectRatio}%`,
      "--width": `${this.width}px`,
      "--height": `${this.height}px`,
    });

  }

  renderPicture() {
    if (this.active) {
      this.figure.classList.add('loaded');

      return [
        this.sources.map((source) =>
          <source srcSet={source.srcset} media={source.media} />
        ),
        <img src={this.preload} class="final_image" />
      ]
    }
  }

  render() {
    return (
      <figure itemtype="http://schema.org/ImageObject">
        <div class="overlay"></div>
        <picture>
          { this.renderPicture() }
        </picture>
        <img src={this.preload} class="placeholder" />
      </figure>
    );
  }
}
