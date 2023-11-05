/* eslint-disable max-len */
export const likeSvg = async () => {
  const likeUrl = new URL('/public/img/like.svg', import.meta.url);
  const response = await fetch(likeUrl);
  const svg = await response.text();

  return new DOMParser()
      .parseFromString(svg, 'image/svg+xml')
      .querySelector('svg');
};
