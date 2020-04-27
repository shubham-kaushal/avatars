import * as svg from './utils/svg';
import * as base64 from './utils/base64';
import * as prng from './utils/prng';

export type Options = {
  [id: string]: any;
};

export type Style = (random: prng.Prng, options?: Options) => string | schema;

export function create(style: Style, seed: string, options: Options = {}) {
  let avatar = svg.parse(style(prng.create(seed), options));
  let svgElement = svg.getSvgElement(avatar);

  if (options.width) {
    svg.addWidth(avatar, options.width);
  }

  if (options.height) {
    svg.addHeight(avatar, options.height);
  }

  if (options.margin) {
    svg.addMargin(avatar, options.margin);
  }

  if (options.background) {
    svg.addBackground(avatar, options.background);
  }

  if (options.radius) {
    svg.addRadius(avatar, options.radius);
  }

  return options.base64
    ? `data:image/svg+xml;base64,${base64.encodeUnicode(svg.stringify(avatar))}`
    : svg.stringify(avatar);
}
