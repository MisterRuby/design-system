import React, { useState } from "react";
import { Alert } from '../../components';
import { action } from "../actions";
import { within, userEvent } from '@storybook/testing-library';
import { Step } from '../types';
import { spacing } from '../../tokens';

export default {
  title: "Components/Atomic/Alert",
  component: Alert,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "사용자에게 중요한 정보나 피드백을 전달하는 알림 컴포넌트입니다. 다양한 상황에 맞는 스타일과 상호작용을 지원합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "success", "error", "warning", "info"],
      description: "알림의 시각적 스타일 유형",
    },
    title: {
      control: "text",
      description: "알림 제목",
    },
    closable: {
      control: "boolean",
      description: "닫기 버튼 표시 여부",
    },
    icon: {
      control: "select",
      options: [true, false, "check", "close", "warning", "info", "search", "user"],
      description: "아이콘 표시 설정 (true: 기본 아이콘, false: 아이콘 없음, 문자열: 특정 아이콘)",
    },
    children: {
      description: "알림 내용",
    },
    onClose: {
      description: "닫기 버튼 클릭 시 실행될 함수",
    },
  },
};

export const Default = {
  args: {
    children: "이것은 기본 알림 메시지입니다. 사용자에게 중요한 정보를 전달할 때 사용합니다.",
    onClose: action('alert-close'),
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: Step }) => {
    const canvas = within(canvasElement);
    const alert = canvas.getByRole('alert');

    await step("알림 표시 확인", async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
    });

    await step("알림 영역 클릭 테스트", async () => {
      await userEvent.click(alert);
      await new Promise(resolve => setTimeout(resolve, 300));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<Alert>
  이것은 기본 알림 메시지입니다. 사용자에게 중요한 정보를 전달할 때 사용합니다.
</Alert>`,
      },
    },
  },
};

export const Variants = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.md, width: "100%" }}>
      <Alert variant="primary">Primary 알림: 주요 정보를 전달합니다.</Alert>
      <Alert variant="secondary">Secondary 알림: 부가적인 정보를 제공합니다.</Alert>
      <Alert variant="success">Success 알림: 작업이 성공적으로 완료되었습니다.</Alert>
      <Alert variant="error">Error 알림: 오류가 발생했습니다. 다시 시도해주세요.</Alert>
      <Alert variant="warning">Warning 알림: 주의가 필요한 상황입니다.</Alert>
      <Alert variant="info">Info 알림: 유용한 정보를 제공합니다.</Alert>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Alert variant="primary">Primary 알림: 주요 정보를 전달합니다.</Alert>
<Alert variant="secondary">Secondary 알림: 부가적인 정보를 제공합니다.</Alert>
<Alert variant="success">Success 알림: 작업이 성공적으로 완료되었습니다.</Alert>
<Alert variant="error">Error 알림: 오류가 발생했습니다. 다시 시도해주세요.</Alert>
<Alert variant="warning">Warning 알림: 주의가 필요한 상황입니다.</Alert>
<Alert variant="info">Info 알림: 유용한 정보를 제공합니다.</Alert>`,
      },
    },
  },
};

export const WithTitle = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.md, width: "100%" }}>
      <Alert variant="success" title="업로드 완료">
        파일이 성공적으로 업로드되었습니다. 처리 시간은 약 2-3분 소요됩니다.
      </Alert>
      <Alert variant="error" title="연결 실패">
        서버에 연결할 수 없습니다. 네트워크 상태를 확인하고 다시 시도해주세요.
      </Alert>
      <Alert variant="warning" title="저장 공간 부족">
        사용 가능한 저장 공간이 10% 미만입니다. 불필요한 파일을 정리해주세요.
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Alert variant="success" title="업로드 완료">
  파일이 성공적으로 업로드되었습니다. 처리 시간은 약 2-3분 소요됩니다.
</Alert>
<Alert variant="error" title="연결 실패">
  서버에 연결할 수 없습니다. 네트워크 상태를 확인하고 다시 시도해주세요.
</Alert>
<Alert variant="warning" title="저장 공간 부족">
  사용 가능한 저장 공간이 10% 미만입니다. 불필요한 파일을 정리해주세요.
</Alert>`,
      },
    },
  },
};

export const Closable = {
  args: {
    variant: "info",
    title: "새로운 기능 안내",
    children: "새로운 대시보드 기능이 추가되었습니다. 설정 메뉴에서 확인해보세요!",
    closable: true,
    onClose: action('closable-alert-close'),
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: Step }) => {
    const canvas = within(canvasElement);
    const closeButton = canvas.getByLabelText('알림 닫기');

    await step("알림 내용 읽기 대기", async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    await step("닫기 버튼 호버 효과 테스트", async () => {
      await userEvent.hover(closeButton);
      await new Promise(resolve => setTimeout(resolve, 600));
    });

    await step("닫기 버튼 클릭 테스트", async () => {
      await userEvent.click(closeButton);
      await new Promise(resolve => setTimeout(resolve, 400));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<Alert
  variant="info"
  title="새로운 기능 안내"
  closable
  onClose={() => console.log('알림 닫기')}
>
  새로운 대시보드 기능이 추가되었습니다. 설정 메뉴에서 확인해보세요!
</Alert>`,
      },
    },
  },
};

export const IconOptions = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.md, width: "100%" }}>
      <Alert variant="success" icon={true}>기본 아이콘 (variant에 따른 자동 선택)</Alert>
      <Alert variant="info" icon={false}>아이콘 없는 알림</Alert>
      <Alert variant="warning" icon="user">사용자 지정 아이콘 (user)</Alert>
      <Alert variant="error" icon="search">사용자 지정 아이콘 (search)</Alert>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Alert variant="success" icon={true}>기본 아이콘 (variant에 따른 자동 선택)</Alert>
<Alert variant="info" icon={false}>아이콘 없는 알림</Alert>
<Alert variant="warning" icon="user">사용자 지정 아이콘 (user)</Alert>
<Alert variant="error" icon="search">사용자 지정 아이콘 (search)</Alert>`,
      },
    },
  },
};

const ClosableAlertExample = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, variant: "success", title: "작업 완료", message: "데이터 내보내기가 완료되었습니다." },
    { id: 2, variant: "warning", title: "주의사항", message: "시스템 점검이 예정되어 있습니다." },
    { id: 3, variant: "info", title: "안내", message: "새로운 업데이트가 있습니다." }
  ]);

  const closeAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: spacing.md, width: "100%" }}>
      {alerts.map(alert => (
        <Alert
          key={alert.id}
          variant={alert.variant as any}
          title={alert.title}
          closable
          onClose={() => closeAlert(alert.id)}
        >
          {alert.message}
        </Alert>
      ))}
      {alerts.length === 0 && (
        <div style={{ textAlign: "center", padding: spacing.lg, color: "#666" }}>
          모든 알림이 닫혔습니다.
        </div>
      )}
    </div>
  );
};

export const InteractiveExample = {
  render: ClosableAlertExample,
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: Step }) => {
    const canvas = within(canvasElement);

    await step("모든 알림 표시 확인", async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
    });

    await step("첫 번째 알림 닫기", async () => {
      const firstCloseButton = canvas.getAllByLabelText('알림 닫기')[0];
      await userEvent.click(firstCloseButton);
      await new Promise(resolve => setTimeout(resolve, 600));
    });

    await step("두 번째 알림 닫기", async () => {
      const secondCloseButton = canvas.getAllByLabelText('알림 닫기')[0];
      await userEvent.click(secondCloseButton);
      await new Promise(resolve => setTimeout(resolve, 600));
    });

    await step("마지막 알림 닫기", async () => {
      const lastCloseButton = canvas.getByLabelText('알림 닫기');
      await userEvent.click(lastCloseButton);
      await new Promise(resolve => setTimeout(resolve, 800));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `const [alerts, setAlerts] = useState([...]);

const closeAlert = (id) => {
  setAlerts(alerts.filter(alert => alert.id !== id));
};

return (
  <div>
    {alerts.map(alert => (
      <Alert
        key={alert.id}
        variant={alert.variant}
        title={alert.title}
        closable
        onClose={() => closeAlert(alert.id)}
      >
        {alert.message}
      </Alert>
    ))}
  </div>
);`,
      },
    },
  },
};
