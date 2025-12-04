import React, { useState } from "react";
import { Pagination } from "../../components/molecules/Pagination";
import { action } from "../actions";
import { within, userEvent } from "@storybook/testing-library";
import { Step } from "../types";

export default {
  title: "Components/Molecules/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "데이터 목록이나 콘텐츠를 여러 페이지로 나누어 탐색할 수 있는 페이지네이션 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    currentPage: {
      description: "현재 페이지 번호 (1부터 시작)",
      control: { type: "number", min: 1 },
    },
    totalPages: {
      description: "전체 페이지 수",
      control: { type: "number", min: 1 },
    },
    onPageChange: {
      description: "페이지 변경 시 호출되는 콜백 함수",
    },
    siblingCount: {
      description: "현재 페이지 양쪽에 표시할 페이지 수",
      control: { type: "number", min: 0, max: 3 },
    },
    showFirstLast: {
      description: "첫 페이지/마지막 페이지 버튼 표시 여부",
      control: { type: "boolean" },
    },
    disabled: {
      description: "비활성화 상태",
      control: { type: "boolean" },
    },
    size: {
      description: "페이지네이션 크기",
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
};

export const Default = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={(page) => {
          setCurrentPage(page);
          action("page-changed")(page);
        }}
        siblingCount={1}
        showFirstLast={true}
        size="md"
      />
    );
  },
  play: async ({
    canvasElement,
    step,
  }: {
    canvasElement: HTMLElement;
    step: Step;
  }) => {
    const canvas = within(canvasElement);

    await step("페이지 2로 이동", async () => {
      const page2Button = canvas.getByRole("button", { name: "페이지 2" });
      await userEvent.click(page2Button);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    await step("다음 페이지 버튼 클릭", async () => {
      const nextButton = canvas.getByRole("button", { name: "다음 페이지" });
      await userEvent.click(nextButton);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    await step("이전 페이지 버튼 클릭", async () => {
      const prevButton = canvas.getByRole("button", { name: "이전 페이지" });
      await userEvent.click(prevButton);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `const [currentPage, setCurrentPage] = useState(1);

<Pagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={(page) => setCurrentPage(page)}
/>`,
      },
    },
  },
};

export const Sizes = {
  render: () => {
    const [currentPageSm, setCurrentPageSm] = useState(3);
    const [currentPageMd, setCurrentPageMd] = useState(3);
    const [currentPageLg, setCurrentPageLg] = useState(3);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <p style={{ marginBottom: "8px", fontSize: "14px", fontWeight: 500 }}>
            Small
          </p>
          <Pagination
            currentPage={currentPageSm}
            totalPages={10}
            onPageChange={(page) => {
              setCurrentPageSm(page);
              action("page-changed-sm")(page);
            }}
            size="sm"
          />
        </div>
        <div>
          <p style={{ marginBottom: "8px", fontSize: "14px", fontWeight: 500 }}>
            Medium
          </p>
          <Pagination
            currentPage={currentPageMd}
            totalPages={10}
            onPageChange={(page) => {
              setCurrentPageMd(page);
              action("page-changed-md")(page);
            }}
            size="md"
          />
        </div>
        <div>
          <p style={{ marginBottom: "8px", fontSize: "14px", fontWeight: 500 }}>
            Large
          </p>
          <Pagination
            currentPage={currentPageLg}
            totalPages={10}
            onPageChange={(page) => {
              setCurrentPageLg(page);
              action("page-changed-lg")(page);
            }}
            size="lg"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `const [currentPage, setCurrentPage] = useState(3);

<Pagination size="sm" currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
<Pagination size="md" currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
<Pagination size="lg" currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />`,
      },
    },
  },
};

export const WithoutFirstLast = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(5);

    return (
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={(page) => {
          setCurrentPage(page);
          action("page-changed")(page);
        }}
        showFirstLast={false}
        size="md"
      />
    );
  },
  play: async ({
    canvasElement,
    step,
  }: {
    canvasElement: HTMLElement;
    step: Step;
  }) => {
    const canvas = within(canvasElement);

    await step("이전/다음 버튼 테스트", async () => {
      const prevButton = canvas.getByRole("button", { name: "이전 페이지" });
      const nextButton = canvas.getByRole("button", { name: "다음 페이지" });
      await userEvent.click(nextButton);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await userEvent.click(prevButton);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `const [currentPage, setCurrentPage] = useState(5);

<Pagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={(page) => setCurrentPage(page)}
  showFirstLast={false}
/>`,
      },
    },
  },
};

export const Disabled = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(3);

    return (
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={(page) => {
          setCurrentPage(page);
          action("page-changed")(page);
        }}
        disabled={true}
        size="md"
      />
    );
  },
  play: async ({
    canvasElement,
    step,
  }: {
    canvasElement: HTMLElement;
    step: Step;
  }) => {
    const canvas = within(canvasElement);

    await step("비활성화 상태 확인", async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `const [currentPage, setCurrentPage] = useState(3);

<Pagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={(page) => setCurrentPage(page)}
  disabled={true}
/>`,
      },
    },
  },
};

export const FewPages = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(2);

    return (
      <Pagination
        currentPage={currentPage}
        totalPages={5}
        onPageChange={(page) => {
          setCurrentPage(page);
          action("page-changed")(page);
        }}
        size="md"
      />
    );
  },
  play: async ({
    canvasElement,
    step,
  }: {
    canvasElement: HTMLElement;
    step: Step;
  }) => {
    const canvas = within(canvasElement);

    await step("페이지 번호 클릭 테스트", async () => {
      const page3Button = canvas.getByRole("button", { name: "페이지 3" });
      await userEvent.click(page3Button);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const page1Button = canvas.getByRole("button", { name: "페이지 1" });
      await userEvent.click(page1Button);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `const [currentPage, setCurrentPage] = useState(2);

<Pagination
  currentPage={currentPage}
  totalPages={5}
  onPageChange={(page) => setCurrentPage(page)}
/>`,
      },
    },
  },
};

export const ManyPages = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(15);

    return (
      <Pagination
        currentPage={currentPage}
        totalPages={50}
        onPageChange={(page) => {
          setCurrentPage(page);
          action("page-changed")(page);
        }}
        siblingCount={2}
        size="md"
      />
    );
  },
  play: async ({
    canvasElement,
    step,
  }: {
    canvasElement: HTMLElement;
    step: Step;
  }) => {
    const canvas = within(canvasElement);

    await step("페이지 탐색 테스트", async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    await step("마지막 페이지로 이동", async () => {
      const lastButton = canvas.getByRole("button", { name: "마지막 페이지" });
      await userEvent.click(lastButton);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    await step("첫 페이지로 이동", async () => {
      const firstButton = canvas.getByRole("button", { name: "첫 페이지" });
      await userEvent.click(firstButton);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `const [currentPage, setCurrentPage] = useState(15);

<Pagination
  currentPage={currentPage}
  totalPages={50}
  onPageChange={(page) => setCurrentPage(page)}
  siblingCount={2}
/>`,
      },
    },
  },
};

export const Interactive = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 20;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div
          style={{
            padding: "16px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            textAlign: "center",
          }}>
          <p style={{ margin: 0, fontSize: "14px", fontWeight: 500 }}>
            현재 페이지: {currentPage} / {totalPages}
          </p>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page);
            action("page-changed")(page);
          }}
          size="md"
        />
      </div>
    );
  },
  play: async ({
    canvasElement,
    step,
  }: {
    canvasElement: HTMLElement;
    step: Step;
  }) => {
    const canvas = within(canvasElement);

    await step("페이지 5로 이동", async () => {
      const page5Button = canvas.getByRole("button", { name: "페이지 5" });
      await userEvent.click(page5Button);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    await step("다음 페이지로 이동", async () => {
      const nextButton = canvas.getByRole("button", { name: "다음 페이지" });
      await userEvent.click(nextButton);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    await step("마지막 페이지로 이동", async () => {
      const lastButton = canvas.getByRole("button", { name: "마지막 페이지" });
      await userEvent.click(lastButton);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
  },
  parameters: {
    docs: {
      source: {
        code: `const [currentPage, setCurrentPage] = useState(1);

<Pagination
  currentPage={currentPage}
  totalPages={20}
  onPageChange={(page) => setCurrentPage(page)}
/>`,
      },
    },
  },
};
