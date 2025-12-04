import React from "react";
import { within, userEvent } from "@storybook/testing-library";
import { Table, TableColumn, Badge } from "../../components";
import { action } from "../actions";
import { Step } from "../types";

type Member = {
  id: string;
  name: string;
  role: string;
  status: "활성" | "대기" | "오프보딩";
  tasks: number;
  joined: string;
};

const memberColumns: TableColumn<Member>[] = [
  { key: "name", title: "이름", dataIndex: "name", sortable: true },
  { key: "role", title: "역할", dataIndex: "role" },
  {
    key: "status",
    title: "상태",
    dataIndex: "status",
    sortable: true,
    render: (value: unknown) => {
      const status = value as Member["status"];
      const color = status === "활성" ? "success" : status === "대기" ? "warning" : "secondary";
      return (
        <Badge variant="soft" color={color}>
          {status}
        </Badge>
      );
    },
  },
  {
    key: "tasks",
    title: "진행 중 업무",
    dataIndex: "tasks",
    align: "right",
    sortable: true,
    sorter: (a, b) => a.tasks - b.tasks,
  },
  {
    key: "joined",
    title: "등록일",
    dataIndex: "joined",
    align: "right",
    sortable: true,
    sorter: (a, b) => new Date(a.joined).getTime() - new Date(b.joined).getTime(),
    render: (value: unknown) => {
      if (!value) return "-";
      return new Date(String(value)).toLocaleDateString("ko-KR");
    },
  },
];

const memberData: Member[] = [
  { id: "m-02", name: "박서연", role: "디자이너", status: "대기", tasks: 5, joined: "2024-02-14" },
  { id: "m-04", name: "정하늘", role: "백엔드 개발자", status: "오프보딩", tasks: 3, joined: "2023-12-10" },
  { id: "m-01", name: "김지훈", role: "프로덕트 매니저", status: "활성", tasks: 12, joined: "2024-03-02" },
  { id: "m-03", name: "이도윤", role: "프론트엔드 개발자", status: "활성", tasks: 9, joined: "2024-01-28" },
];

export default {
  title: "Components/Atomic/Table",
  component: Table,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "데이터 목록을 정렬, 강조, 빈 상태로 보여줄 수 있는 테이블 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    columns: {
      control: "object",
      description: "테이블 헤더와 셀 구성을 정의하는 컬럼 목록",
    },
    data: {
      control: "object",
      description: "각 행에 표시될 데이터 배열",
    },
    density: {
      control: "select",
      options: ["comfortable", "compact"],
      description: "셀 패딩 간격 설정",
    },
    striped: {
      control: "boolean",
      description: "짝수 행 배경 강조 여부 (기본값: false)",
    },
    hoverable: {
      control: "boolean",
      description: "행 호버 시 배경 강조 여부",
    },
    bordered: {
      control: "boolean",
      description: "테두리 표시 여부",
    },
    emptyMessage: {
      description: "데이터가 없을 때 표시할 문구",
    },
    selectable: {
      control: "boolean",
      description: "행 클릭 시 선택 상태를 표시할지 여부",
    },
    selectedRowKey: {
      control: false,
      description: "제어형 선택 상태를 전달할 때 사용",
    },
    rowKey: {
      description: "각 행을 구분할 고유 키 필드명 혹은 함수",
    },
    onRowClick: {
      description: "행 클릭 시 호출되는 콜백",
    },
    onSelect: {
      description: "선택 가능한 테이블에서 행 선택 시 호출되는 콜백",
    },
  },
};

export const Default = {
  args: {
    columns: memberColumns,
    data: memberData,
    rowKey: "id",
    "aria-label": "팀원 목록 테이블",
    onRowClick: action("row-click"),
    onSelect: action("row-select"),
    selectable: true,
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: Step }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup({ delay: 300 });
    const getRows = () => canvas.getAllByRole("row");

    await step("이름 오름차순 정렬 실행", async () => {
      const nameSorter = canvas.getByRole("button", { name: "이름 정렬" });
      await user.click(nameSorter);
    });

    await step("정렬 결과 확인 (첫 행 호버)", async () => {
      const firstDataRow = getRows()[1];
      await user.hover(firstDataRow);
    });

    await step("첫 번째 행 클릭", async () => {
      const firstDataRow = getRows()[1];
      await user.click(firstDataRow);
    });
  },
  parameters: {
    docs: {
      source: {
        code: `<Table
  columns={memberColumns}
  data={memberData}
  aria-label="팀원 목록 테이블"
  rowKey="id"
  selectable
  onSelect={(row) => console.log('selected', row)}
  onRowClick={(row) => console.log(row)}
/>`,
      },
    },
  },
};

export const CompactDensity = {
  args: {
    columns: memberColumns,
    data: memberData,
    density: "compact",
    "aria-label": "팀원 목록 테이블 (compact)",
  },
  parameters: {
    docs: {
      description: {
        story: "작은 공간에서 정보 밀도를 높이고자 할 때 compact 모드로 표시합니다.",
      },
      source: {
        code: `<Table
  columns={memberColumns}
  data={memberData}
  density="compact"
  striped={false}
/>`,
      },
    },
  },
};

export const EmptyState = {
  args: {
    columns: memberColumns,
    data: [],
    emptyMessage: "조건에 맞는 데이터가 없습니다",
    "aria-label": "빈 상태 테이블",
  },
  parameters: {
    docs: {
      description: {
        story: "검색 결과나 필터가 비어 있을 때 커스텀 문구로 안내할 수 있습니다.",
      },
      source: {
        code: `<Table
  columns={memberColumns}
  data={[]}
  emptyMessage="조건에 맞는 데이터가 없습니다"
/>`,
      },
    },
  },
};

export const ControlledSelection = {
  render: () => {
    const [selectedKey, setSelectedKey] = React.useState<React.Key>("m-04");

    const handleSelect = (row: Member) => {
      setSelectedKey(row.id);
      action("row-select")(row);
    };

    return (
      <Table
        columns={memberColumns}
        data={memberData}
        rowKey="id"
        selectable
        selectedRowKey={selectedKey}
        onSelect={handleSelect}
        onRowClick={action("row-click")}
        aria-label="제어형 선택 테이블"
      />
    );
  },
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: Step }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup({ delay: 250 });
    const rows = () => canvas.getAllByRole("row");

    await step("김지훈 행 선택", async () => {
      const targetRow = rows()[3];
      await user.click(targetRow);
    });

    await step("이도윤 행으로 선택 변경", async () => {
      const targetRow = rows()[4];
      await user.click(targetRow);
    });
  },
  parameters: {
    docs: {
      description: {
        story: "selectedRowKey를 제어하며 외부 상태로 선택 행을 변경할 수 있는 예시입니다.",
      },
      source: {
        code: `const [selectedKey, setSelectedKey] = useState<React.Key>("m-04");

<Table
  columns={memberColumns}
  data={memberData}
  rowKey="id"
  selectable
  selectedRowKey={selectedKey}
  onSelect={(row) => setSelectedKey(row.id)}
/>`,
      },
    },
  },
};

export const WithStripedRows = {
  args: {
    columns: memberColumns,
    data: memberData,
    striped: true,
    rowKey: "id",
    "aria-label": "스트라이프 테이블",
  },
  parameters: {
    docs: {
      description: {
        story: "striped를 true로 설정하면 짝수 행 배경이 강조됩니다.",
      },
      source: {
        code: `<Table
  columns={memberColumns}
  data={memberData}
  rowKey="id"
  striped
/>`,
      },
    },
  },
};
