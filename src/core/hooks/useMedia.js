export const useMedia = breakpoint =>
  window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
