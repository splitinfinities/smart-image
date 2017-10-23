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

  componentWillLoad() {
    this.setBG();
    this.prepareSources();
    this.updateAspectRatio();
  }

  componentDidLoad() {
    this.figure = this.element.shadowRoot.querySelector('figure');
    this.figure.classList.add('loaded')
  }

  setBG () {
    updateStyles(this.element, {
      "--bg": `${this.bg}`
    });
  }

  prepareSources () {
    const sources = this.element.querySelectorAll("source");

    let sourcesArray = [];

    [].forEach.call(sources, (source) => {
      sourcesArray = [...sourcesArray, source];
    });

    this.sources = sourcesArray;

    console.log(this.sources);
  }

  updateAspectRatio () {
    this.aspectRatio = (this.height / this.width) * 100;

    updateStyles(this.element, {
      "--aspect_ratio": `${this.aspectRatio}%`,
      "--width": `${this.width}px`,
      "--height": `${this.height}px`,
    });

  }

  render() {
    return (
      <figure itemtype="http://schema.org/ImageObject">
        <picture>
          {this.sources.map((source) =>
            <source srcSet={source.srcset} media={source.media} />
          )}
          <img src={this.preload} class="final_image" />
        </picture>
        <img src={this.preload} class="placeholder" />
      </figure>
    );
  }
}
