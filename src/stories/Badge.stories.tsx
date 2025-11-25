import React from "react";
import { within, userEvent } from "@storybook/testing-library";
import { Badge } from "../components";
import { colors, componentBorders, fontSize, fontWeight } from "../theme";
import { action } from "./actions";

export default {
  title: "Components/Atomic/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "상태, 라벨, 카테고리 등을 표시하는 작은 배지 컴포넌트입니다.",
      },
      story: {
        inline: true,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "soft"],
      description: "배지 스타일 변형",
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "success", "error", "warning", "info"],
      description: "배지 색상",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "배지 크기",
    },
    rounded: {
      control: "boolean",
      description: "둥근 모서리 여부",
    },
    removable: {
      control: "boolean",
      description: "제거 버튼 표시 여부",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
    },
    icon: {
      control: "select",
      options: [
        undefined,
        "check",
        "star",
        "heart",
        "user",
        "settings",
        "mail",
        "calendar",
        "clock"
      ],
      description: "왼쪽에 표시할 아이콘",
    },
    children: {
      description: "배지에 표시될 내용",
    },
  },
};

export const Default = {
  args: {
    children: "Badge",
  },
  parameters: {
    docs: {
      source: {
        code: `<Badge>Badge</Badge>`,
      },
    },
  },
};

export const WithIcon = {
  args: {
    children: "New",
    color: "success",
    icon: "star",
  },
  parameters: {
    docs: {
      source: {
        code: `<Badge color="success" icon="star">New</Badge>`,
      },
    },
  },
};

export const Removable = {
  args: {
    children: "React",
    removable: true,
    onRemove: action("badge-remove"),
  },
  play: async ({
    canvasElement,
    step,
  }: {
    canvasElement: HTMLElement;
    step: any;
  }) => {
    const canvas = within(canvasElement);
    const removeButton = canvas.getByRole("button", { name: "제거" });

    await step("제거 버튼 호버", async () => {
      await userEvent.hover(removeButton);
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await step("제거 버튼 클릭", async () => {
      await userEvent.click(removeButton);
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<Badge removable onRemove={handleRemove}>
  React
</Badge>`,
      },
    },
  },
};

export const Rounded = {
  args: {
    children: "Rounded",
    rounded: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<Badge rounded>Rounded</Badge>`,
      },
    },
  },
};

export const Disabled = {
  args: {
    children: "Disabled",
    disabled: true,
    removable: true,
    onRemove: action("disabled-remove"),
  },
  parameters: {
    docs: {
      source: {
        code: `<Badge disabled removable>
  Disabled
</Badge>`,
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
        gap: "16px",
        width: "300px",
      }}>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <Badge variant="solid">Solid</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="soft">Soft</Badge>
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <Badge variant="solid" color="success">Success</Badge>
        <Badge variant="outline" color="error">Error</Badge>
        <Badge variant="soft" color="warning">Warning</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Badge variant="solid">Solid</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="soft">Soft</Badge>`,
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
        gap: "16px",
        width: "300px",
      }}>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <Badge size="sm" removable onRemove={action("sm-remove")}>Small</Badge>
        <Badge size="md" removable onRemove={action("md-remove")}>Medium</Badge>
        <Badge size="lg" removable onRemove={action("lg-remove")}>Large</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`,
      },
    },
  },
};

export const Colors = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "400px",
      }}>
      <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
        <Badge color="primary">Primary</Badge>
        <Badge color="secondary">Secondary</Badge>
        <Badge color="success">Success</Badge>
        <Badge color="error">Error</Badge>
        <Badge color="warning">Warning</Badge>
        <Badge color="info">Info</Badge>
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
        <Badge variant="outline" color="primary">Primary</Badge>
        <Badge variant="outline" color="secondary">Secondary</Badge>
        <Badge variant="outline" color="success">Success</Badge>
        <Badge variant="outline" color="error">Error</Badge>
        <Badge variant="outline" color="warning">Warning</Badge>
        <Badge variant="outline" color="info">Info</Badge>
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
        <Badge variant="soft" color="primary">Primary</Badge>
        <Badge variant="soft" color="secondary">Secondary</Badge>
        <Badge variant="soft" color="success">Success</Badge>
        <Badge variant="soft" color="error">Error</Badge>
        <Badge variant="soft" color="warning">Warning</Badge>
        <Badge variant="soft" color="info">Info</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Badge color="primary">Primary</Badge>
<Badge color="success">Success</Badge>
<Badge color="error">Error</Badge>
<Badge color="warning">Warning</Badge>`,
      },
    },
  },
};

export const TagExample = {
  render: () => {
    const [tags, setTags] = React.useState([
      "React",
      "TypeScript",
      "JavaScript",
      "CSS",
      "HTML"
    ]);

    const removeTag = (index: number) => {
      setTags(tags.filter((_, i) => i !== index));
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          width: "400px",
        }}>
        <div style={{ fontSize: fontSize.sm, fontWeight: fontWeight.medium }}>
          기술 스택 ({tags.length}개)
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="soft"
              color="primary"
              removable
              onRemove={() => removeTag(index)}
            >
              {tag}
            </Badge>
          ))}
        </div>
        {tags.length === 0 && (
          <div style={{
            color: colors.gray[500],
            fontSize: fontSize.xs,
            fontStyle: "italic"
          }}>
            모든 태그가 제거되었습니다.
          </div>
        )}
        <button
          onClick={() => setTags(["React", "TypeScript", "JavaScript", "CSS", "HTML"])}
          style={{
            padding: "8px 16px",
            border: componentBorders.button.outline,
            borderRadius: "4px",
            backgroundColor: colors.background.white,
            cursor: "pointer",
            fontSize: "12px"
          }}>
          태그 초기화
        </button>
      </div>
    );
  },
  play: async ({
    canvasElement,
    step,
  }: {
    canvasElement: HTMLElement;
    step: any;
  }) => {
    const canvas = within(canvasElement);

    await step("첫 번째 태그 제거", async () => {
      const removeButtons = canvas.getAllByRole("button", { name: "제거" });
      if (removeButtons.length > 0) {
        await userEvent.click(removeButtons[0]);
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await step("두 번째 태그 제거", async () => {
      const removeButtons = canvas.getAllByRole("button", { name: "제거" });
      if (removeButtons.length > 0) {
        await userEvent.click(removeButtons[0]);
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await step("태그 초기화", async () => {
      const resetButton = canvas.getByRole("button", { name: "태그 초기화" });
      await userEvent.click(resetButton);
    });
  },
  parameters: {
    docs: {
      source: {
        code: `const [tags, setTags] = useState(["React", "TypeScript"]);

const removeTag = (index) => {
  setTags(tags.filter((_, i) => i !== index));
};

<div>
  {tags.map((tag, index) => (
    <Badge
      key={index}
      variant="soft"
      removable
      onRemove={() => removeTag(index)}
    >
      {tag}
    </Badge>
  ))}
</div>`,
      },
    },
  },
};

export const WithIcons = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "400px",
      }}>
      <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
        <Badge icon="check" color="success">Completed</Badge>
        <Badge icon="clock" color="warning">Pending</Badge>
        <Badge icon="close" color="error">Failed</Badge>
        <Badge icon="user" color="info">Admin</Badge>
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
        <Badge variant="outline" icon="star" color="warning">Premium</Badge>
        <Badge variant="soft" icon="heart" color="error">Favorite</Badge>
        <Badge variant="soft" icon="mail" color="primary">Messages</Badge>
        <Badge variant="outline" icon="calendar" color="info">Scheduled</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Badge icon="check" color="success">Completed</Badge>
<Badge icon="clock" color="warning">Pending</Badge>
<Badge icon="star" color="warning">Premium</Badge>
<Badge icon="heart" color="error">Favorite</Badge>`,
      },
    },
  },
};

export const StatusExample = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "300px",
      }}>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <span style={{ fontSize: fontSize.sm, width: "80px" }}>서버:</span>
        <Badge color="success" rounded icon="check">
          Online
        </Badge>
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <span style={{ fontSize: fontSize.sm, width: "80px" }}>배포:</span>
        <Badge color="warning" rounded icon="clock">
          Pending
        </Badge>
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <span style={{ fontSize: fontSize.sm, width: "80px" }}>빌드:</span>
        <Badge color="error" rounded icon="close">
          Failed
        </Badge>
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <span style={{ fontSize: fontSize.sm, width: "80px" }}>테스트:</span>
        <Badge color="info" rounded icon="settings">
          Running
        </Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Badge color="success" rounded icon="check">Online</Badge>
<Badge color="warning" rounded icon="clock">Pending</Badge>
<Badge color="error" rounded icon="close">Failed</Badge>
<Badge color="info" rounded icon="settings">Running</Badge>`,
      },
    },
  },
};
