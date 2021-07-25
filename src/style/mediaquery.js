import facepaint from 'facepaint';

// smallPhone: 320
// phone: 375
// tablet: 768
// desktop: 1024
// largeDesktop: 1440
const breakpoints = [320, 375, 768, 1024, 1440];

const mediaquery = facepaint(
  breakpoints.map((breakpoint) => `@media (min-width: ${breakpoint}px)`),
);

export default mediaquery;
