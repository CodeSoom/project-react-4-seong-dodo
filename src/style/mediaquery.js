/**
 * 모바일 우선 (min-width) : 작은 가로폭부터 큰 가로폭 순서로 만든다.
 *
 * @media (min-width: 320px) : iPhone 4, iPhone 5/SE
 * @media (min-width: 360px) : Glalaxy Note 3, Glalaxy S5
 * @media (min-width: 375px) : iPhone 6/7/8, iPhone X
 * @media (min-width: 768px) : iPad, iPad Mini
 * @media (min-width: 1024px) : iPad Pro, Desktop
 * @media (min-width: 1440px) : large Desktop
 */

import facepaint from 'facepaint';

const breakpoints = [320, 375, 768, 1024, 1440];

const mediaquery = facepaint(
  breakpoints.map((breakpoint) => `@media (min-width: ${breakpoint}px)`),
);

export default mediaquery;
