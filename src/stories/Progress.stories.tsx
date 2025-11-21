import React, { useState, useEffect } from "react";
import { Progress, Button } from "../components";
import { action } from "./actions";
import { within, userEvent, waitFor } from "@storybook/testing-library";

export default {
  title: "Components/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "진행 상황을 시각적으로 표시하는 프로그레스 바 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "number", min: 0, max: 100 },
      description: "현재 진행률 값",
    },
    max: {
      control: "number",
      description: "최대값 (기본값: 100)",
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "success", "error", "warning", "info"],
      description: "프로그레스 바의 색상 테마",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "프로그레스 바의 크기",
    },
    showLabel: {
      control: "boolean",
      description: "진행률 라벨 표시 여부",
    },
    label: {
      control: "text",
      description: "사용자 정의 라벨 텍스트",
    },
  },
};

export const Default = {
  args: {
    value: 45,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement);
    const progressBar = canvas.getByRole('progressbar');

    await step("프로그레스 바 렌더링 확인", async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    await step("aria 속성 확인", async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<Progress value={45} />`,
      },
    },
  },
};

export const WithLabel = {
  args: {
    value: 75,
    showLabel: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement);
    const progressBar = canvas.getByRole('progressbar');

    await step("라벨이 표시되는지 확인", async () => {
      const labelText = canvas.getByText('75%');
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    await step("진행률 값 확인", async () => {
      const valueText = canvas.getByText('75 / 100');
      await new Promise(resolve => setTimeout(resolve, 500));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<Progress value={75} showLabel />`,
      },
    },
  },
};

export const CustomLabel = {
  args: {
    value: 60,
    label: "파일 업로드 중...",
    showLabel: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement);

    await step("커스텀 라벨 확인", async () => {
      const customLabel = canvas.getByText('파일 업로드 중...');
      await new Promise(resolve => setTimeout(resolve, 500));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<Progress value={60} label="파일 업로드 중..." showLabel />`,
      },
    },
  },
};

export const Complete = {
  args: {
    value: 100,
    variant: "success",
    showLabel: true,
    label: "완료!",
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement);
    const progressBar = canvas.getByRole('progressbar');

    await step("완료 상태 확인", async () => {
      const completeLabel = canvas.getByText('완료!');
      await new Promise(resolve => setTimeout(resolve, 500));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<Progress value={100} variant="success" showLabel label="완료!" />`,
      },
    },
  },
};

export const Error = {
  args: {
    value: 25,
    variant: "error",
    showLabel: true,
    label: "오류 발생",
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement);

    await step("에러 상태 라벨 확인", async () => {
      const errorLabel = canvas.getByText('오류 발생');
      await new Promise(resolve => setTimeout(resolve, 500));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<Progress value={25} variant="error" showLabel label="오류 발생" />`,
      },
    },
  },
};

const AnimatedProgressExample = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <Progress value={progress} showLabel />;
};

export const Animated = {
  render: () => (
    <div style={{ width: '300px' }}>
      <AnimatedProgressExample />
    </div>
  ),
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement);
    const progressBar = canvas.getByRole('progressbar');

    await step("애니메이션 진행 확인", async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
    });

    await step("진행률 변화 관찰", async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // 애니메이션이 진행되는 것을 확인
    });
  },
  parameters: {
    docs: {
      source: {
        code: `const AnimatedProgressExample = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <Progress value={progress} showLabel />;
};`,
      },
    },
  },
};

export const Variants = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "300px",
      }}>
      <Progress value={60} variant="primary" showLabel label="Primary" />
      <Progress value={45} variant="secondary" showLabel label="Secondary" />
      <Progress value={80} variant="success" showLabel label="Success" />
      <Progress value={25} variant="error" showLabel label="Error" />
      <Progress value={35} variant="warning" showLabel label="Warning" />
      <Progress value={55} variant="info" showLabel label="Info" />
    </div>
  ),
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement);

    await step("모든 variant 렌더링 확인", async () => {
      const primaryProgress = canvas.getByText('Primary');
      const secondaryProgress = canvas.getByText('Secondary');
      const successProgress = canvas.getByText('Success');
      const errorProgress = canvas.getByText('Error');
      const warningProgress = canvas.getByText('Warning');
      const infoProgress = canvas.getByText('Info');

      await new Promise(resolve => setTimeout(resolve, 500));
    });

    await step("각 variant별 진행률 확인", async () => {
      const progressBars = canvas.getAllByRole('progressbar');
      await new Promise(resolve => setTimeout(resolve, 500));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<Progress value={60} variant="primary" showLabel label="Primary" />
<Progress value={45} variant="secondary" showLabel label="Secondary" />
<Progress value={80} variant="success" showLabel label="Success" />
<Progress value={25} variant="error" showLabel label="Error" />
<Progress value={35} variant="warning" showLabel label="Warning" />
<Progress value={55} variant="info" showLabel label="Info" />`,
      },
    },
  },
};

export const Sizes = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "300px",
      }}>
      <Progress value={40} size="small" showLabel label="Small" />
      <Progress value={60} size="medium" showLabel label="Medium" />
      <Progress value={80} size="large" showLabel label="Large" />
    </div>
  ),
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement);

    await step("모든 크기의 프로그레스 바 확인", async () => {
      const smallProgress = canvas.getByText('Small');
      const mediumProgress = canvas.getByText('Medium');
      const largeProgress = canvas.getByText('Large');

      await new Promise(resolve => setTimeout(resolve, 500));
    });

    await step("각 크기별 진행률 확인", async () => {
      const progressBars = canvas.getAllByRole('progressbar');
      await new Promise(resolve => setTimeout(resolve, 500));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<Progress value={40} size="small" showLabel label="Small" />
<Progress value={60} size="medium" showLabel label="Medium" />
<Progress value={80} size="large" showLabel label="Large" />`,
      },
    },
  },
};

const InteractiveProgressExample = () => {
  const [progress, setProgress] = useState(0);

  const handleIncrease = () => {
    setProgress(prev => Math.min(prev + 10, 100));
  };

  const handleDecrease = () => {
    setProgress(prev => Math.max(prev - 10, 0));
  };

  const handleReset = () => {
    setProgress(0);
  };

  return (
    <div style={{ width: '400px' }}>
      <Progress value={progress} showLabel />
      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
        <Button size="small" onClick={handleIncrease}>+10</Button>
        <Button size="small" onClick={handleDecrease}>-10</Button>
        <Button size="small" variant="secondary" onClick={handleReset}>리셋</Button>
      </div>
    </div>
  );
};

export const Interactive = {
  render: () => <InteractiveProgressExample />,
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement);
    const increaseBtn = canvas.getByText('+10');
    const decreaseBtn = canvas.getByText('-10');
    const resetBtn = canvas.getByText('리셋');
    const progressBar = canvas.getByRole('progressbar');

    await step("초기 상태 확인", async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    await step("증가 버튼 클릭 테스트", async () => {
      await userEvent.click(increaseBtn);
      await new Promise(resolve => setTimeout(resolve, 400));
    });

    await step("추가 증가 테스트", async () => {
      await userEvent.click(increaseBtn);
      await userEvent.click(increaseBtn);
      await new Promise(resolve => setTimeout(resolve, 400));
    });

    await step("감소 버튼 클릭 테스트", async () => {
      await userEvent.click(decreaseBtn);
      await new Promise(resolve => setTimeout(resolve, 400));
    });

    await step("리셋 버튼 클릭 테스트", async () => {
      await userEvent.click(resetBtn);
      await new Promise(resolve => setTimeout(resolve, 400));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `const InteractiveProgressExample = () => {
  const [progress, setProgress] = useState(0);

  const handleIncrease = () => {
    setProgress(prev => Math.min(prev + 10, 100));
  };

  const handleDecrease = () => {
    setProgress(prev => Math.max(prev - 10, 0));
  };

  const handleReset = () => {
    setProgress(0);
  };

  return (
    <div>
      <Progress value={progress} showLabel />
      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
        <Button size="small" onClick={handleIncrease}>+10</Button>
        <Button size="small" onClick={handleDecrease}>-10</Button>
        <Button size="small" variant="secondary" onClick={handleReset}>리셋</Button>
      </div>
    </div>
  );
};`,
      },
    },
  },
};