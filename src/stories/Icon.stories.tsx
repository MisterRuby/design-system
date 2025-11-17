import React from "react";
import { Icon, IconName } from "../components/atomic/Icon";

export default {
  title: "Components/Icon",
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
    color: "#047857",
  },
  parameters: {
    docs: {
      source: {
        code: `<Icon name="heart" size={32} color="#047857" />`,
      },
    },
  },
};

export const AllIcons = {
  render: () => {
    const iconNames: IconName[] = [
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
    ];

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: "16px",
          maxWidth: "800px",
        }}>
        {iconNames.map((name) => (
          <div
            key={name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "16px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "12px",
              textAlign: "center",
            }}>
            <Icon name={name} size={24} color="#047857" />
            <span>{name}</span>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `// 사용 가능한 모든 아이콘들
const iconNames = [
  'search', 'eye', 'eye-off', 'arrow-right', 'arrow-left',
  'arrow-down', 'arrow-up', 'close', 'check', 'plus', 'minus',
  'edit', 'delete', 'calendar', 'clock', 'user', 'settings',
  'menu', 'home', 'mail', 'phone', 'lock', 'unlock',
  'star', 'star-filled', 'heart', 'heart-filled', 'bookmark',
  'share', 'download', 'upload', 'refresh', 'info',
  'warning', 'error', 'success'
];

<Icon name="search" />`,
      },
    },
  },
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", alignItems: "end", gap: "24px" }}>
      <div style={{ textAlign: "center" }}>
        <Icon name="star" size={16} color="#047857" />
        <div style={{ fontSize: "12px", marginTop: "8px" }}>16px</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="star" size={24} color="#047857" />
        <div style={{ fontSize: "12px", marginTop: "8px" }}>24px</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="star" size={32} color="#047857" />
        <div style={{ fontSize: "12px", marginTop: "8px" }}>32px</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon name="star" size={48} color="#047857" />
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

export const CommonIcons = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
      {[
        { name: "search" as IconName, label: "검색" },
        { name: "user" as IconName, label: "사용자" },
        { name: "calendar" as IconName, label: "캘린더" },
        { name: "clock" as IconName, label: "시간" },
        { name: "settings" as IconName, label: "설정" },
        { name: "menu" as IconName, label: "메뉴" },
        { name: "home" as IconName, label: "홈" },
        { name: "mail" as IconName, label: "메일" },
      ].map(({ name, label }) => (
        <div key={name} style={{ textAlign: "center", minWidth: "60px" }}>
          <Icon name={name} size={32} color="#047857" />
          <div style={{ fontSize: "12px", marginTop: "8px", color: "#6b7280" }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `// 자주 사용되는 아이콘들
<Icon name="search" />
<Icon name="user" />
<Icon name="calendar" />
<Icon name="clock" />
<Icon name="settings" />`,
      },
    },
  },
};
