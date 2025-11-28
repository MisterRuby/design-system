export const transitions = {
  fast: '0.1s ease-in-out',
  normal: '0.2s ease-in-out',
  slow: '0.3s ease-in-out',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
} as const;

export const animations = {
  duration: {
    fast: '0.1s',
    normal: '0.2s',
    slow: '0.3s',
    slower: '0.5s',
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  }
} as const;