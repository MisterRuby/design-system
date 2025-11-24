import React from "react";
import { Icon, IconName } from "../components";
import { colors } from "../theme";

export default {
  title: "Components/Atomic/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Schedule AI에서 사용되는 SVG 기반 아이콘 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: [
        "search",
        "eye",
        "eye-off",
        "arrow-right",
        "arrow-left",
        "arrow-down",
        "arrow-up",
        "close",
        "check",
        "plus",
        "minus",
        "edit",
        "delete",
        "calendar",
        "clock",
        "user",
        "settings",
        "menu",
        "home",
        "mail",
        "phone",
        "lock",
        "unlock",
        "star",
        "star-filled",
        "heart",
        "heart-filled",
        "bookmark",
        "share",
        "download",
        "upload",
        "refresh",
        "info",
        "warning",
        "error",
        "success",
      ],
      description: "표시할 아이콘의 이름",
    },
    size: {
      control: { type: "number", min: 8, max: 64, step: 4 },
      description: "아이콘의 크기 (픽셀)",
    },
    color: {
      control: "color",
      description: "아이콘의 색상",
    },
  },
};

const accentColor = colors.semantic.success;
const cardBorderColor = colors.gray[200];

export const Default = {
  args: {
    name: "search" as IconName,
    size: 24,
  },
  parameters: {
    docs: {
      source: {
        code: `<Icon name="search" size={24} />`,
      },
    },
  },
};

export const CustomColor = {
  args: {
    name: "heart" as IconName,
    size: 32,
    color: accentColor,
  },
  parameters: {
    docs: {
      source: {
        code: `import { colors } from "../theme";

<Icon name="heart" size={32} color={colors.semantic.success} />`,
      },
    },
  },
};

export const NavigationIcons = {
  render: () => {
    const navigationIcons: IconName[] = [
      "arrow-right",
      "arrow-left",
      "arrow-down",
      "arrow-up",
      "home",
      "menu",
    ];

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: "16px",
          maxWidth: "800px",
        }}>
        {navigationIcons.map((name) => (
          <div
            key={name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "16px",
              border: `1px solid ${cardBorderColor}`,
              borderRadius: "8px",
              fontSize: "12px",
              textAlign: "center",
            }}>
            <Icon name={name} size={24} color={accentColor} />
            <span>{name}</span>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `// 네비게이션 관련 아이콘들
<Icon name="arrow-right" />
<Icon name="arrow-left" />
<Icon name="home" />
<Icon name="menu" />`,
      },
    },
  },
};

export const ActionIcons = {
  render: () => {
    const actionIcons: IconName[] = [
      "search",
      "close",
      "check",
      "plus",
      "minus",
      "edit",
      "delete",
      "refresh",
    ];

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: "16px",
          maxWidth: "800px",
        }}>
        {actionIcons.map((name) => (
          <div
            key={name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "16px",
              border: `1px solid ${cardBorderColor}`,
              borderRadius: "8px",
              fontSize: "12px",
              textAlign: "center",
            }}>
            <Icon name={name} size={24} color={accentColor} />
            <span>{name}</span>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `// 액션 관련 아이콘들
<Icon name="search" />
<Icon name="edit" />
<Icon name="delete" />
<Icon name="plus" />`,
      },
    },
  },
};

export const UserIcons = {
  render: () => {
    const userIcons: IconName[] = [
      "user",
      "mail",
      "phone",
      "calendar",
      "clock",
      "settings",
    ];

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: "16px",
          maxWidth: "800px",
        }}>
        {userIcons.map((name) => (
          <div
            key={name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "16px",
              border: `1px solid ${cardBorderColor}`,
              borderRadius: "8px",
              fontSize: "12px",
              textAlign: "center",
            }}>
            <Icon name={name} size={24} color={accentColor} />
            <span>{name}</span>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `// 사용자 관련 아이콘들
<Icon name="user" />
<Icon name="mail" />
<Icon name="calendar" />
<Icon name="settings" />`,
      },
    },
  },
};

export const SecurityIcons = {
  render: () => {
    const securityIcons: IconName[] = ["eye", "eye-off", "lock", "unlock"];

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: "16px",
          maxWidth: "800px",
        }}>
        {securityIcons.map((name) => (
          <div
            key={name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "16px",
              border: `1px solid ${cardBorderColor}`,
              borderRadius: "8px",
              fontSize: "12px",
              textAlign: "center",
            }}>
            <Icon name={name} size={24} color={accentColor} />
            <span>{name}</span>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `// 보안 관련 아이콘들
<Icon name="eye" />
<Icon name="eye-off" />
<Icon name="lock" />
<Icon name="unlock" />`,
      },
    },
  },
};

export const ContentIcons = {
  render: () => {
    const contentIcons: IconName[] = [
      "star",
      "star-filled",
      "heart",
      "heart-filled",
      "bookmark",
      "share",
      "download",
      "upload",
    ];

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: "16px",
          maxWidth: "800px",
        }}>
        {contentIcons.map((name) => (
          <div
            key={name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "16px",
              border: `1px solid ${cardBorderColor}`,
              borderRadius: "8px",
              fontSize: "12px",
              textAlign: "center",
            }}>
            <Icon name={name} size={24} color={accentColor} />
            <span>{name}</span>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `// 콘텐츠 관련 아이콘들
<Icon name="star" />
<Icon name="heart" />
<Icon name="bookmark" />
<Icon name="share" />`,
      },
    },
  },
};

export const StatusIcons = {
  render: () => {
    const statusIcons: IconName[] = ["info", "warning", "error", "success"];

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: "16px",
          maxWidth: "800px",
        }}>
        {statusIcons.map((name) => (
          <div
            key={name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "16px",
              border: `1px solid ${cardBorderColor}`,
              borderRadius: "8px",
              fontSize: "12px",
              textAlign: "center",
            }}>
            <Icon name={name} size={24} color={accentColor} />
            <span>{name}</span>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `// 상태 표시 아이콘들
<Icon name="info" />
<Icon name="warning" />
<Icon name="error" />
<Icon name="success" />`,
      },
    },
  },
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", alignItems: "end", gap: "24px" }}>
      <div style={{ textAlign: "center" }}>
        <Icon name="star" size={16} color={accentColor} />
        <div style={{ fontSize: "12px", marginTop: "8px" }}>16px</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="star" size={24} color={accentColor} />
        <div style={{ fontSize: "12px", marginTop: "8px" }}>24px</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="star" size={32} color={accentColor} />
        <div style={{ fontSize: "12px", marginTop: "8px" }}>32px</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="star" size={48} color={accentColor} />
        <div style={{ fontSize: "12px", marginTop: "8px" }}>48px</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Icon name="star" size={16} />
<Icon name="star" size={24} />
<Icon name="star" size={32} />
<Icon name="star" size={48} />`,
      },
    },
  },
};
