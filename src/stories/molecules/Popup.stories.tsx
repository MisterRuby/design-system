import React, { useState } from "react";
import { Popup, Button } from "../../components";
import { action } from "../actions";
import { within, userEvent } from "@storybook/testing-library";

export default {
  title: "Components/Molecules/Popup",
  component: Popup,
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "responsive",
    },
    docs: {
      description: {
        component: "모달 형태의 팝업 컴포넌트입니다. 오버레이와 함께 표시되며 다양한 크기와 액션을 지원합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "팝업 표시 여부",
    },
    title: {
      control: "text",
      description: "팝업 제목",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "팝업 크기",
    },
    showCloseButton: {
      control: "boolean",
      description: "닫기 버튼 표시 여부",
    },
    closeOnOverlayClick: {
      control: "boolean",
      description: "오버레이 클릭 시 닫기 여부",
    },
    children: {
      description: "팝업 내용",
    },
    onClose: {
      description: "팝업 닫기 이벤트 핸들러",
    },
    actions: {
      description: "팝업 하단 액션 버튼 목록",
    },
  },
};

const PopupWrapper = ({ args }: any) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    action('popup-close')();
  };

  return (
    <div style={{
      padding: '20px',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Button onClick={handleOpen}>팝업 열기</Button>
      <Popup
        {...args}
        isOpen={isOpen}
        onClose={handleClose}
      />
    </div>
  );
};

export const Default = {
  render: (args: any) => <PopupWrapper args={args} />,
  args: {
    isOpen: false,
    title: "기본 팝업",
    children: "팝업 내용입니다. 여기에 다양한 콘텐츠를 표시할 수 있습니다.",
    size: "medium",
    showCloseButton: true,
    closeOnOverlayClick: true,
    onClose: action('popup-close'),
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement);

    await step("팝업 열기 테스트", async () => {
      const openButton = canvas.getByText('팝업 열기');
      await userEvent.click(openButton);

      // 딜레이 추가
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 팝업이 열렸는지 확인
      const popup = canvas.getByText('기본 팝업');
      if (!popup) throw new Error('팝업이 열리지 않았습니다');
    });

    await step("ESC 키로 팝업 닫기 테스트", async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      await userEvent.keyboard('{Escape}');

      // 닫기 후 딜레이
      await new Promise(resolve => setTimeout(resolve, 800));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<Popup
  isOpen={isOpen}
  onClose={handleClose}
  title="기본 팝업"
>
  팝업 내용입니다.
</Popup>`,
      },
    },
  },
};

const WithActionsWrapper = ({ args }: any) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    action('popup-close')();
  };

  const handleCancel = () => {
    action('cancel-clicked')();
    handleClose();
  };

  const handleConfirm = () => {
    action('confirm-clicked')();
    handleClose();
  };

  return (
    <div style={{
      padding: '20px',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Button onClick={handleOpen}>팝업 열기</Button>
      <Popup
        {...args}
        isOpen={isOpen}
        onClose={handleClose}
        actions={[
          {
            label: "취소",
            variant: "outline" as const,
            onClick: handleCancel,
          },
          {
            label: "확인",
            variant: "primary" as const,
            onClick: handleConfirm,
          },
        ]}
      />
    </div>
  );
};

export const WithActions = {
  render: (args: any) => <WithActionsWrapper args={args} />,
  args: {
    isOpen: false,
    title: "액션 버튼이 있는 팝업",
    children: "이 팝업에는 하단에 액션 버튼들이 있습니다.",
    onClose: action('popup-close'),
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement);

    await step("팝업 열기", async () => {
      const openButton = canvas.getByText('팝업 열기');
      await userEvent.click(openButton);

      // 딜레이 추가
      await new Promise(resolve => setTimeout(resolve, 1000));
    });

    await step("확인 버튼 클릭 테스트", async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const confirmButton = canvas.getByText('확인');
      await userEvent.click(confirmButton);

      // 닫기 후 딜레이
      await new Promise(resolve => setTimeout(resolve, 800));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<Popup
  isOpen={isOpen}
  onClose={handleClose}
  title="액션 버튼이 있는 팝업"
  actions={[
    {
      label: "취소",
      variant: "outline",
      onClick: handleCancel,
    },
    {
      label: "확인",
      variant: "primary",
      onClick: handleConfirm,
    },
  ]}
>
  이 팝업에는 하단에 액션 버튼들이 있습니다.
</Popup>`,
      },
    },
  },
};

const LongContentWrapper = ({ args }: any) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    action('popup-close')();
  };

  const handleCloseClick = () => {
    action('close-clicked')();
    handleClose();
  };

  return (
    <div style={{
      padding: '20px',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Button onClick={handleOpen}>팝업 열기</Button>
      <Popup
        {...args}
        isOpen={isOpen}
        onClose={handleClose}
        actions={[
          {
            label: "닫기",
            variant: "primary" as const,
            onClick: handleCloseClick,
          },
        ]}
      />
    </div>
  );
};

export const LongContent = {
  render: (args: any) => <LongContentWrapper args={args} />,
  args: {
    isOpen: false,
    title: "긴 내용이 있는 팝업",
    children: (
      <div>
        <p>이 팝업은 긴 내용을 가지고 있어서 스크롤이 필요합니다.</p>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i}>
            {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
        ))}
      </div>
    ),
    onClose: action('popup-close'),
  },
  parameters: {
    docs: {
      source: {
        code: `<Popup
  isOpen={isOpen}
  onClose={handleClose}
  title="긴 내용이 있는 팝업"
>
  <div>
    <p>긴 내용...</p>
    {/* 많은 내용들... */}
  </div>
</Popup>`,
      },
    },
  },
};

const SizesComponent = () => {
  const [openPopup, setOpenPopup] = useState<string | null>(null);

  const sizes = [
    { size: "small", title: "작은 팝업" },
    { size: "medium", title: "보통 팝업" },
    { size: "large", title: "큰 팝업" },
  ];

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      padding: "20px",
      minHeight: "100vh",
      width: "100%",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{ display: "flex", gap: "10px" }}>
        {sizes.map(({ size, title }) => (
          <Button
            key={size}
            onClick={() => setOpenPopup(size)}
            variant="outline"
          >
            {title} 열기
          </Button>
        ))}
      </div>

      {sizes.map(({ size, title }) => (
        <Popup
          key={size}
          isOpen={openPopup === size}
          onClose={() => setOpenPopup(null)}
          title={title}
          size={size as "small" | "medium" | "large"}
        >
          <p>{title}의 내용입니다. 크기에 따라 팝업의 너비가 달라집니다.</p>
          <ul>
            <li>Small: 400px</li>
            <li>Medium: 600px</li>
            <li>Large: 800px</li>
          </ul>
        </Popup>
      ))}
    </div>
  );
};

export const Sizes = {
  render: () => <SizesComponent />,
  parameters: {
    docs: {
      source: {
        code: `<Popup size="small">작은 팝업</Popup>
<Popup size="medium">보통 팝업</Popup>
<Popup size="large">큰 팝업</Popup>`,
      },
    },
  },
};

const NoCloseButtonWrapper = ({ args }: any) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    action('popup-close')();
  };

  const handleManualClose = () => {
    action('manual-close')();
    handleClose();
  };

  return (
    <div style={{
      padding: '20px',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Button onClick={handleOpen}>팝업 열기</Button>
      <Popup
        {...args}
        isOpen={isOpen}
        onClose={handleClose}
        actions={[
          {
            label: "닫기",
            variant: "primary" as const,
            onClick: handleManualClose,
          },
        ]}
      />
    </div>
  );
};

export const NoCloseButton = {
  render: (args: any) => <NoCloseButtonWrapper args={args} />,
  args: {
    isOpen: false,
    title: "닫기 버튼이 없는 팝업",
    children: "이 팝업은 닫기 버튼이 없습니다. 액션 버튼이나 ESC 키로만 닫을 수 있습니다.",
    showCloseButton: false,
    closeOnOverlayClick: false,
    onClose: action('popup-close'),
  },
  parameters: {
    docs: {
      source: {
        code: `<Popup
  isOpen={isOpen}
  onClose={handleClose}
  title="닫기 버튼이 없는 팝업"
  showCloseButton={false}
  closeOnOverlayClick={false}
  actions={[
    {
      label: "닫기",
      variant: "primary",
      onClick: handleClose,
    },
  ]}
>
  이 팝업은 닫기 버튼이 없습니다.
</Popup>`,
      },
    },
  },
};