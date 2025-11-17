// Storybook 10 호환을 위한 간단한 action 구현
export const action = (name: string) => {
  return (...args: any[]) => {
    console.log(`[Action: ${name}]`, ...args);

    // Storybook의 Actions 패널이 있다면 해당 패널에도 로그
    if (window && (window as any).__STORYBOOK_ADDONS_CHANNEL__) {
      try {
        (window as any).__STORYBOOK_ADDONS_CHANNEL__.emit('storybook/actions/action-event', {
          id: name,
          count: 1,
          data: {
            name,
            args
          },
          options: {}
        });
      } catch (e) {
        // Actions 패널이 없어도 계속 진행
      }
    }
  };
};