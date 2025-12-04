import React, { useState } from 'react';
import { MainLayout } from '../../components/layout/MainLayout';
import { Button } from '../../components/atomic/Button';
import { Text } from '../../components/atomic/Text';
import { within, userEvent } from '@storybook/testing-library';
import { action } from '../actions';

const meta = {
  title: 'Layout/MainLayout',
  component: MainLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Header + SideBar + Content로 구성된 완전한 레이아웃. 대부분의 웹 애플리케이션에 적합한 표준적인 레이아웃 구조를 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: '레이아웃 스타일 변형',
      control: 'select',
      options: ['default', 'fixed-header', 'floating-sidebar'],
    },
    headerOverlap: {
      description: '헤더와 사이드바 겹침 방식',
      control: 'select',
      options: ['none', 'sidebar', 'content'],
    },
    contentPadding: {
      description: '콘텐츠 패딩',
      control: 'text',
    },
    contentBackgroundColor: {
      description: '콘텐츠 배경색',
      control: 'color',
    },
    children: {
      description: '메인 콘텐츠 영역',
      control: false,
      table: {
        type: {
          summary: 'React.ReactNode'
        },
        defaultValue: {
          summary: '대시보드 콘텐츠'
        },
      },
    },
    header: {
      description: 'Header 컴포넌트 설정',
      control: false,
    },
    sideBar: {
      description: 'SideBar 컴포넌트 설정',
      control: false,
    },
  },
};

export default meta;

const defaultHeaderProps = {
  title: 'Schedule AI',
  navigation: [
    { label: '대시보드', href: '/dashboard', active: true, onClick: action('header-nav-dashboard') },
    { label: '일정 관리', href: '/schedule', onClick: action('header-nav-schedule') },
    { label: '분석', href: '/analytics', onClick: action('header-nav-analytics') },
    { label: '설정', href: '/settings', onClick: action('header-nav-settings') },
  ],
  actions: (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button variant="outline" size="small" onClick={action('header-action-notification')}>알림</Button>
      <Button variant="primary" size="small" onClick={action('header-action-profile')}>프로필</Button>
    </div>
  ),
};

const defaultSideBarProps = {
  title: '네비게이션',
  items: [
    {
      id: 'dashboard',
      label: '대시보드',
      icon: 'home' as const,
      active: true,
      onClick: action('sidebar-dashboard'),
    },
    {
      id: 'schedule',
      label: '일정 관리',
      icon: 'calendar' as const,
      badge: '3',
      onClick: action('sidebar-schedule'),
      children: [
        {
          id: 'my-schedule',
          label: '내 일정',
          onClick: action('sidebar-my-schedule'),
        },
        {
          id: 'team-schedule',
          label: '팀 일정',
          onClick: action('sidebar-team-schedule'),
        },
      ],
    },
    {
      id: 'analytics',
      label: '분석',
      icon: 'bar-chart' as const,
      onClick: action('sidebar-analytics'),
    },
    {
      id: 'settings',
      label: '설정',
      icon: 'settings' as const,
      onClick: action('sidebar-settings'),
    },
  ],
  collapsible: true,
  onCollapseToggle: action('sidebar-collapse-toggle'),
};

// 페이지별 콘텐츠 컴포넌트들
const DashboardContent = () => (
  <div style={{ padding: '20px' }}>
    <Text variant="h1" style={{ marginBottom: '16px' }}>대시보드</Text>
    <Text variant="body1" style={{ marginBottom: '24px', lineHeight: 1.6 }}>
      환영합니다! 전체 일정과 통계를 한 눈에 확인하세요.
    </Text>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px' }}>
      <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
        <Text variant="h3" style={{ marginBottom: '8px' }}>총 일정</Text>
        <Text variant="h2" style={{ color: '#3b82f6' }}>24</Text>
      </div>
      <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
        <Text variant="h3" style={{ marginBottom: '8px' }}>이번 주</Text>
        <Text variant="h2" style={{ color: '#10b981' }}>8</Text>
      </div>
      <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
        <Text variant="h3" style={{ marginBottom: '8px' }}>완료율</Text>
        <Text variant="h2" style={{ color: '#f59e0b' }}>87%</Text>
      </div>
    </div>

    <div style={{ display: 'flex', gap: '12px' }}>
      <Button variant="primary" onClick={action('dashboard-add-schedule')}>새 일정 추가</Button>
      <Button variant="outline" onClick={action('dashboard-view-all')}>전체 보기</Button>
    </div>
  </div>
);

const ScheduleContent = () => (
  <div style={{ padding: '20px' }}>
    <Text variant="h1" style={{ marginBottom: '16px' }}>일정 관리</Text>
    <Text variant="body1" style={{ marginBottom: '24px', lineHeight: 1.6 }}>
      개인 및 팀 일정을 효율적으로 관리하세요.
    </Text>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '24px' }}>
      <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'white' }}>
        <Text variant="h3" style={{ marginBottom: '16px' }}>오늘의 일정</Text>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} style={{ padding: '12px 0', borderBottom: i < 2 ? '1px solid #f0f0f0' : 'none' }}>
            <Text variant="body1" style={{ fontWeight: '500' }}>회의 {i + 1}</Text>
            <Text variant="caption" style={{ color: '#64748b' }}>오전 {9 + i}:00 - 오전 {10 + i}:00</Text>
          </div>
        ))}
      </div>
      <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'white' }}>
        <Text variant="h3" style={{ marginBottom: '16px' }}>이번 주 일정</Text>
        <Text variant="body1" style={{ marginBottom: '8px' }}>총 15개의 일정</Text>
        <Text variant="body2" style={{ color: '#64748b' }}>회의: 8개, 업무: 5개, 개인: 2개</Text>
      </div>
    </div>

    <div style={{ display: 'flex', gap: '12px' }}>
      <Button variant="primary" onClick={action('schedule-add-new')}>새 일정 추가</Button>
      <Button variant="outline" onClick={action('schedule-calendar-view')}>캘린더 보기</Button>
    </div>
  </div>
);

const AnalyticsContent = () => (
  <div style={{ padding: '20px' }}>
    <Text variant="h1" style={{ marginBottom: '16px' }}>분석</Text>
    <Text variant="body1" style={{ marginBottom: '24px', lineHeight: 1.6 }}>
      일정 패턴과 생산성을 분석합니다.
    </Text>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px' }}>
      <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#fff5f5' }}>
        <Text variant="h3" style={{ marginBottom: '8px' }}>일일 평균 회의 시간</Text>
        <Text variant="h2" style={{ color: '#dc2626' }}>3.2시간</Text>
      </div>
      <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#f0fff4' }}>
        <Text variant="h3" style={{ marginBottom: '8px' }}>이번 달 목표 달성률</Text>
        <Text variant="h2" style={{ color: '#059669' }}>92%</Text>
      </div>
      <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#fffbeb' }}>
        <Text variant="h3" style={{ marginBottom: '8px' }}>효율성 점수</Text>
        <Text variant="h2" style={{ color: '#d97706' }}>85점</Text>
      </div>
    </div>

    <div style={{ display: 'flex', gap: '12px' }}>
      <Button variant="primary" onClick={action('analytics-detailed-report')}>상세 보고서</Button>
      <Button variant="outline" onClick={action('analytics-export')}>데이터 내보내기</Button>
    </div>
  </div>
);

const SettingsContent = () => (
  <div style={{ padding: '20px' }}>
    <Text variant="h1" style={{ marginBottom: '16px' }}>설정</Text>
    <Text variant="body1" style={{ marginBottom: '24px', lineHeight: 1.6 }}>
      개인 환경설정과 시스템 설정을 관리합니다.
    </Text>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'white' }}>
        <Text variant="h3" style={{ marginBottom: '8px' }}>알림 설정</Text>
        <Text variant="body2" style={{ color: '#64748b' }}>일정 알림, 이메일 알림 등을 관리합니다.</Text>
      </div>
      <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'white' }}>
        <Text variant="h3" style={{ marginBottom: '8px' }}>테마 설정</Text>
        <Text variant="body2" style={{ color: '#64748b' }}>다크모드, 색상 테마 등을 설정합니다.</Text>
      </div>
      <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'white' }}>
        <Text variant="h3" style={{ marginBottom: '8px' }}>계정 관리</Text>
        <Text variant="body2" style={{ color: '#64748b' }}>프로필, 비밀번호, 연동 계정을 관리합니다.</Text>
      </div>
    </div>

    <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
      <Button variant="primary" onClick={action('settings-save')}>설정 저장</Button>
      <Button variant="outline" onClick={action('settings-reset')}>초기화</Button>
    </div>
  </div>
);

// 인터랙티브 MainLayout 컴포넌트
const InteractiveMainLayout = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [activeSubPage, setActiveSubPage] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const getContentComponent = () => {
    // 서브페이지 콘텐츠 처리
    if (activeSubPage) {
      switch (activeSubPage) {
        // 대시보드 서브페이지
        case 'overview':
          return (
            <div style={{ padding: '20px' }}>
              <Text variant="h1" style={{ marginBottom: '16px' }}>대시보드 개요</Text>
              <Text variant="body1" style={{ marginBottom: '24px', lineHeight: 1.6 }}>
                전체 시스템의 현황과 주요 지표를 확인합니다.
              </Text>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
                  <Text variant="h3" style={{ marginBottom: '8px' }}>시스템 상태</Text>
                  <Text variant="h2" style={{ color: '#10b981' }}>정상</Text>
                </div>
                <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
                  <Text variant="h3" style={{ marginBottom: '8px' }}>활성 사용자</Text>
                  <Text variant="h2" style={{ color: '#3b82f6' }}>147</Text>
                </div>
              </div>
            </div>
          );
        case 'recent-activities':
          return (
            <div style={{ padding: '20px' }}>
              <Text variant="h1" style={{ marginBottom: '16px' }}>최근 활동</Text>
              <Text variant="body1" style={{ marginBottom: '24px', lineHeight: 1.6 }}>
                최근 시스템 활동과 사용자 행동을 추적합니다.
              </Text>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'white' }}>
                    <Text variant="body1" style={{ fontWeight: '500' }}>활동 {i + 1}</Text>
                    <Text variant="body2" style={{ color: '#64748b' }}>{new Date().toLocaleDateString()} - 사용자 작업 수행</Text>
                  </div>
                ))}
              </div>
            </div>
          );
        case 'quick-actions':
          return (
            <div style={{ padding: '20px' }}>
              <Text variant="h1" style={{ marginBottom: '16px' }}>빠른 작업</Text>
              <Text variant="body1" style={{ marginBottom: '24px', lineHeight: 1.6 }}>
                자주 사용하는 작업들을 빠르게 실행할 수 있습니다.
              </Text>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <Button variant="primary" onClick={action('quick-new-schedule')}>새 일정 생성</Button>
                <Button variant="outline" onClick={action('quick-export-data')}>데이터 내보내기</Button>
                <Button variant="outline" onClick={action('quick-invite-user')}>사용자 초대</Button>
                <Button variant="outline" onClick={action('quick-backup')}>백업 실행</Button>
              </div>
            </div>
          );

        // 일정 관리 서브페이지
        case 'schedule-overview':
          return <ScheduleContent />;
        case 'my-schedule':
          return (
            <div style={{ padding: '20px' }}>
              <Text variant="h1" style={{ marginBottom: '16px' }}>내 일정</Text>
              <Text variant="body1" style={{ marginBottom: '24px', lineHeight: 1.6 }}>
                개인 일정을 관리하고 확인합니다.
              </Text>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#f0f9ff' }}>
                  <Text variant="h3" style={{ marginBottom: '8px' }}>오늘 일정</Text>
                  <Text variant="body2">5개의 일정이 예정되어 있습니다.</Text>
                </div>
                <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#f0fdf4' }}>
                  <Text variant="h3" style={{ marginBottom: '8px' }}>완료한 일정</Text>
                  <Text variant="body2">이번 주 12개 일정 완료</Text>
                </div>
              </div>
            </div>
          );
        case 'team-schedule':
          return (
            <div style={{ padding: '20px' }}>
              <Text variant="h1" style={{ marginBottom: '16px' }}>팀 일정</Text>
              <Text variant="body1" style={{ marginBottom: '24px', lineHeight: 1.6 }}>
                팀 구성원들의 일정을 확인하고 조율합니다.
              </Text>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#fef3c7' }}>
                  <Text variant="h3" style={{ marginBottom: '8px' }}>팀 회의</Text>
                  <Text variant="body2">내일 오전 10시 주간 회의</Text>
                </div>
                <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#fce7f3' }}>
                  <Text variant="h3" style={{ marginBottom: '8px' }}>프로젝트 일정</Text>
                  <Text variant="body2">이번 주 3개 마일스톤 예정</Text>
                </div>
              </div>
            </div>
          );
        case 'calendar-view':
          return (
            <div style={{ padding: '20px' }}>
              <Text variant="h1" style={{ marginBottom: '16px' }}>캘린더 뷰</Text>
              <Text variant="body1" style={{ marginBottom: '24px', lineHeight: 1.6 }}>
                일정을 캘린더 형태로 시각적으로 확인합니다.
              </Text>
              <div style={{ padding: '40px', border: '2px dashed #e2e8f0', borderRadius: '12px', textAlign: 'center', backgroundColor: '#f8fafc' }}>
                <Text variant="h3" style={{ marginBottom: '8px', color: '#64748b' }}>캘린더 컴포넌트</Text>
                <Text variant="body2" style={{ color: '#64748b' }}>여기에 캘린더 컴포넌트가 표시됩니다</Text>
              </div>
            </div>
          );

        // 분석 서브페이지
        case 'performance':
          return <AnalyticsContent />;
        case 'time-tracking':
          return (
            <div style={{ padding: '20px' }}>
              <Text variant="h1" style={{ marginBottom: '16px' }}>시간 추적</Text>
              <Text variant="body1" style={{ marginBottom: '24px', lineHeight: 1.6 }}>
                작업 시간을 추적하고 생산성을 분석합니다.
              </Text>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#f0f9ff' }}>
                  <Text variant="h3" style={{ marginBottom: '8px' }}>오늘 작업시간</Text>
                  <Text variant="h2" style={{ color: '#3b82f6' }}>6.5시간</Text>
                </div>
                <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#f0fdf4' }}>
                  <Text variant="h3" style={{ marginBottom: '8px' }}>이번 주 평균</Text>
                  <Text variant="h2" style={{ color: '#10b981' }}>7.2시간</Text>
                </div>
                <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#fffbeb' }}>
                  <Text variant="h3" style={{ marginBottom: '8px' }}>생산성 점수</Text>
                  <Text variant="h2" style={{ color: '#f59e0b' }}>92점</Text>
                </div>
              </div>
            </div>
          );
        case 'reports':
          return (
            <div style={{ padding: '20px' }}>
              <Text variant="h1" style={{ marginBottom: '16px' }}>보고서</Text>
              <Text variant="body1" style={{ marginBottom: '24px', lineHeight: 1.6 }}>
                다양한 분석 보고서를 생성하고 확인합니다.
              </Text>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'white' }}>
                  <Text variant="h3" style={{ marginBottom: '8px' }}>월간 활동 보고서</Text>
                  <Text variant="body2" style={{ color: '#64748b', marginBottom: '12px' }}>이번 달 전체 활동 요약</Text>
                  <Button variant="outline" size="small" onClick={action('download-monthly-report')}>다운로드</Button>
                </div>
                <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'white' }}>
                  <Text variant="h3" style={{ marginBottom: '8px' }}>팀 성과 보고서</Text>
                  <Text variant="body2" style={{ color: '#64748b', marginBottom: '12px' }}>팀별 성과 분석 리포트</Text>
                  <Button variant="outline" size="small" onClick={action('download-team-report')}>다운로드</Button>
                </div>
              </div>
            </div>
          );

        // 설정 서브페이지
        case 'profile':
          return <SettingsContent />;
        case 'notifications':
          return (
            <div style={{ padding: '20px' }}>
              <Text variant="h1" style={{ marginBottom: '16px' }}>알림 설정</Text>
              <Text variant="body1" style={{ marginBottom: '24px', lineHeight: 1.6 }}>
                시스템 알림과 개인 알림을 관리합니다.
              </Text>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
                <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text variant="body1" style={{ fontWeight: '500' }}>이메일 알림</Text>
                    <Text variant="body2" style={{ color: '#64748b' }}>새로운 일정과 변경사항을 이메일로 받기</Text>
                  </div>
                  <Button variant="outline" size="small" onClick={action('toggle-email-notifications')}>켜기</Button>
                </div>
                <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text variant="body1" style={{ fontWeight: '500' }}>푸시 알림</Text>
                    <Text variant="body2" style={{ color: '#64748b' }}>브라우저 푸시 알림 받기</Text>
                  </div>
                  <Button variant="primary" size="small" onClick={action('toggle-push-notifications')}>끄기</Button>
                </div>
              </div>
            </div>
          );
        case 'privacy':
          return (
            <div style={{ padding: '20px' }}>
              <Text variant="h1" style={{ marginBottom: '16px' }}>개인정보 설정</Text>
              <Text variant="body1" style={{ marginBottom: '24px', lineHeight: 1.6 }}>
                개인정보 보호와 데이터 관리 설정을 변경합니다.
              </Text>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
                <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'white' }}>
                  <Text variant="h3" style={{ marginBottom: '8px' }}>데이터 내보내기</Text>
                  <Text variant="body2" style={{ color: '#64748b', marginBottom: '12px' }}>내 모든 데이터를 다운로드</Text>
                  <Button variant="outline" onClick={action('export-user-data')}>데이터 내보내기</Button>
                </div>
                <div style={{ padding: '16px', border: '1px solid #fef2f2', borderRadius: '8px', backgroundColor: '#fef2f2' }}>
                  <Text variant="h3" style={{ marginBottom: '8px', color: '#dc2626' }}>계정 삭제</Text>
                  <Text variant="body2" style={{ color: '#991b1b', marginBottom: '12px' }}>계정과 모든 데이터를 영구적으로 삭제</Text>
                  <Button variant="outline" onClick={action('delete-account')}>계정 삭제</Button>
                </div>
              </div>
            </div>
          );
        case 'integration':
          return (
            <div style={{ padding: '20px' }}>
              <Text variant="h1" style={{ marginBottom: '16px' }}>연동 설정</Text>
              <Text variant="body1" style={{ marginBottom: '24px', lineHeight: 1.6 }}>
                외부 서비스와의 연동을 관리합니다.
              </Text>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'white' }}>
                  <Text variant="h3" style={{ marginBottom: '8px' }}>Google Calendar</Text>
                  <Text variant="body2" style={{ color: '#64748b', marginBottom: '12px' }}>구글 캘린더와 일정 동기화</Text>
                  <Button variant="primary" size="small" onClick={action('connect-google-calendar')}>연동</Button>
                </div>
                <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'white' }}>
                  <Text variant="h3" style={{ marginBottom: '8px' }}>Slack</Text>
                  <Text variant="body2" style={{ color: '#64748b', marginBottom: '12px' }}>슬랙으로 알림 받기</Text>
                  <Button variant="outline" size="small" onClick={action('connect-slack')}>연동</Button>
                </div>
              </div>
            </div>
          );
      }
    }

    // 메인 페이지 콘텐츠 (서브페이지가 없을 때)
    switch (activePage) {
      case 'schedule':
        return <ScheduleContent />;
      case 'analytics':
        return <AnalyticsContent />;
      case 'settings':
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  const getSideBarItems = () => {
    switch (activePage) {
      case 'dashboard':
        return [
          {
            id: 'overview',
            label: '개요',
            icon: 'home' as const,
            active: activeSubPage === 'overview' || activeSubPage === null,
            onClick: () => setActiveSubPage('overview'),
          },
          {
            id: 'recent-activities',
            label: '최근 활동',
            icon: 'clock' as const,
            active: activeSubPage === 'recent-activities',
            onClick: () => setActiveSubPage('recent-activities'),
          },
          {
            id: 'quick-actions',
            label: '빠른 작업',
            icon: 'star' as const,
            active: activeSubPage === 'quick-actions',
            onClick: () => setActiveSubPage('quick-actions'),
          },
        ];
      case 'schedule':
        return [
          {
            id: 'schedule-overview',
            label: '일정 개요',
            icon: 'calendar' as const,
            active: activeSubPage === 'schedule-overview' || activeSubPage === null,
            onClick: () => setActiveSubPage('schedule-overview'),
          },
          {
            id: 'my-schedule',
            label: '내 일정',
            icon: 'user' as const,
            badge: '5',
            active: activeSubPage === 'my-schedule',
            onClick: () => setActiveSubPage('my-schedule'),
          },
          {
            id: 'team-schedule',
            label: '팀 일정',
            icon: 'user' as const,
            badge: '12',
            active: activeSubPage === 'team-schedule',
            onClick: () => setActiveSubPage('team-schedule'),
          },
          {
            id: 'calendar-view',
            label: '캘린더 뷰',
            icon: 'calendar' as const,
            active: activeSubPage === 'calendar-view',
            onClick: () => setActiveSubPage('calendar-view'),
          },
        ];
      case 'analytics':
        return [
          {
            id: 'performance',
            label: '성과 분석',
            icon: 'bar-chart' as const,
            active: activeSubPage === 'performance' || activeSubPage === null,
            onClick: () => setActiveSubPage('performance'),
          },
          {
            id: 'time-tracking',
            label: '시간 추적',
            icon: 'clock' as const,
            active: activeSubPage === 'time-tracking',
            onClick: () => setActiveSubPage('time-tracking'),
          },
          {
            id: 'reports',
            label: '보고서',
            icon: 'briefcase' as const,
            active: activeSubPage === 'reports',
            onClick: () => setActiveSubPage('reports'),
          },
        ];
      case 'settings':
        return [
          {
            id: 'profile',
            label: '프로필',
            icon: 'user' as const,
            active: activeSubPage === 'profile' || activeSubPage === null,
            onClick: () => setActiveSubPage('profile'),
          },
          {
            id: 'notifications',
            label: '알림 설정',
            icon: 'info' as const,
            active: activeSubPage === 'notifications',
            onClick: () => setActiveSubPage('notifications'),
          },
          {
            id: 'privacy',
            label: '개인정보',
            icon: 'lock' as const,
            active: activeSubPage === 'privacy',
            onClick: () => setActiveSubPage('privacy'),
          },
          {
            id: 'integration',
            label: '연동 설정',
            icon: 'settings' as const,
            active: activeSubPage === 'integration',
            onClick: () => setActiveSubPage('integration'),
          },
        ];
      default:
        return [];
    }
  };

  const handlePageChange = (page: string) => {
    setActivePage(page);
    setActiveSubPage(null); // 페이지 변경 시 서브페이지 초기화
  };

  const interactiveHeaderProps = {
    title: 'Schedule AI',
    navigation: [
      {
        label: '대시보드',
        href: '/dashboard',
        active: activePage === 'dashboard',
        onClick: () => handlePageChange('dashboard')
      },
      {
        label: '일정 관리',
        href: '/schedule',
        active: activePage === 'schedule',
        onClick: () => handlePageChange('schedule')
      },
      {
        label: '분석',
        href: '/analytics',
        active: activePage === 'analytics',
        onClick: () => handlePageChange('analytics')
      },
      {
        label: '설정',
        href: '/settings',
        active: activePage === 'settings',
        onClick: () => handlePageChange('settings')
      },
    ],
    actions: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="outline" size="small" onClick={action('header-action-notification')}>알림</Button>
        <Button variant="primary" size="small" onClick={action('header-action-profile')}>프로필</Button>
      </div>
    ),
  };

  const interactiveSideBarProps = {
    title: activePage === 'dashboard' ? '대시보드' :
           activePage === 'schedule' ? '일정 관리' :
           activePage === 'analytics' ? '분석' :
           activePage === 'settings' ? '설정' : '네비게이션',
    items: getSideBarItems(),
    collapsible: true,
    collapsed: sidebarCollapsed,
    onCollapseToggle: (collapsed: boolean) => {
      setSidebarCollapsed(collapsed);
      action('sidebar-collapse-toggle')(collapsed);
    },
  };

  return (
    <MainLayout header={interactiveHeaderProps} sideBar={interactiveSideBarProps}>
      {getContentComponent()}
    </MainLayout>
  );
};

export const Default = {
  render: () => <InteractiveMainLayout />,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const [headerNav] = canvas.getAllByRole('navigation');
    const dashboardItem = within(headerNav).getByText('대시보드');
    if (dashboardItem) {
      await userEvent.hover(dashboardItem);
    }
  },
  parameters: {
    docs: {
      source: {
        code: `<MainLayout header={headerProps} sideBar={sideBarProps}>
  <DashboardContent />
</MainLayout>`,
      },
    },
  },
};

export const FixedHeader = {
  args: {
    header: {
      ...defaultHeaderProps,
      sticky: true,
    },
    sideBar: defaultSideBarProps,
    variant: 'fixed-header',
    children: <DashboardContent />,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const content = canvas.getByRole('heading', { name: '대시보드', level: 1 });
    if (content) {
      content.scrollIntoView({ behavior: 'smooth' });
    }
  },
  parameters: {
    docs: {
      source: {
        code: `<MainLayout
  header={headerProps}
  sideBar={sideBarProps}
  variant="fixed-header"
>
  <DashboardContent />
</MainLayout>`,
      },
    },
  },
};

export const FloatingSidebar = {
  args: {
    header: defaultHeaderProps,
    sideBar: {
      ...defaultSideBarProps,
      variant: 'floating',
    },
    variant: 'floating-sidebar',
    children: <ScheduleContent />,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const [headerNav] = canvas.getAllByRole('navigation');
    const scheduleItem = within(headerNav).getByText('일정 관리');
    if (scheduleItem) {
      await userEvent.click(scheduleItem);
    }
  },
  parameters: {
    docs: {
      source: {
        code: `<MainLayout
  header={headerProps}
  sideBar={{ ...sideBarProps, variant: "floating" }}
  variant="floating-sidebar"
>
  <ScheduleContent />
</MainLayout>`,
      },
    },
  },
};

export const CollapsibleSidebar = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
      <MainLayout
        header={defaultHeaderProps}
        sideBar={{
          ...defaultSideBarProps,
          collapsible: true,
          collapsed: collapsed,
          onCollapseToggle: (newCollapsed: boolean) => {
            setCollapsed(newCollapsed);
            action('sidebar-collapse-toggle')(newCollapsed);
          },
        }}
      >
        <AnalyticsContent />
      </MainLayout>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    try {
      const collapseButton = canvas.getByLabelText('사이드바 접기');
      if (collapseButton) {
        await userEvent.click(collapseButton);

        await new Promise(resolve => setTimeout(resolve, 500));

        const expandButton = canvas.getByLabelText('사이드바 펼치기');
        if (expandButton) {
          await userEvent.click(expandButton);
        }
      }
    } catch (error) {
      console.log('Collapse/expand test completed');
    }
  },
  parameters: {
    docs: {
      source: {
        code: `<MainLayout
  header={headerProps}
  sideBar={{ ...sideBarProps, collapsible: true }}
>
  <AnalyticsContent />
</MainLayout>`,
      },
    },
  },
};

export const HeaderOverlapSidebar = {
  args: {
    header: {
      ...defaultHeaderProps,
      variant: 'elevated',
    },
    sideBar: defaultSideBarProps,
    headerOverlap: 'sidebar',
    children: <SettingsContent />,
  },
  parameters: {
    docs: {
      source: {
        code: `<MainLayout
  header={{ ...headerProps, variant: "elevated" }}
  sideBar={sideBarProps}
  headerOverlap="sidebar"
>
  <SettingsContent />
</MainLayout>`,
      },
    },
  },
};

export const HeaderOverlapContent = {
  args: {
    header: {
      ...defaultHeaderProps,
      variant: 'transparent',
    },
    sideBar: defaultSideBarProps,
    headerOverlap: 'content',
    children: <DashboardContent />,
  },
  parameters: {
    docs: {
      source: {
        code: `<MainLayout
  header={{ ...headerProps, variant: "transparent" }}
  sideBar={sideBarProps}
  headerOverlap="content"
>
  <DashboardContent />
</MainLayout>`,
      },
    },
  },
};

export const Variants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '20px' }}>
      <div>
        <Text variant="h2" style={{ marginBottom: '8px' }}>MainLayout Variants</Text>
        <Text variant="body1">여러 변형을 한 번에 비교해보세요</Text>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Default Variant */}
        <div>
          <Text variant="h3" style={{ marginBottom: '12px' }}>Default</Text>
          <div style={{ height: '300px', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
            <MainLayout
              header={defaultHeaderProps}
              sideBar={{
                ...defaultSideBarProps,
                items: defaultSideBarProps.items.slice(0, 3), // 축약된 메뉴
              }}
              variant="default"
            >
              <div style={{ padding: '20px' }}>
                <Text variant="h4">기본 레이아웃</Text>
                <Text variant="body2">Header + Sidebar + Content 기본 구조</Text>
              </div>
            </MainLayout>
          </div>
        </div>

        {/* Collapsible Sidebar Variant */}
        <div>
          <Text variant="h3" style={{ marginBottom: '12px' }}>Collapsible Sidebar</Text>
          <div style={{ height: '300px', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
            <MainLayout
              header={defaultHeaderProps}
              sideBar={{
                ...defaultSideBarProps,
                items: defaultSideBarProps.items.slice(0, 3),
                collapsible: true,
                collapsed: true,
              }}
              variant="default"
            >
              <div style={{ padding: '20px' }}>
                <Text variant="h4">접힌 사이드바 레이아웃</Text>
                <Text variant="body2">사이드바가 접힌 상태로 더 넓은 콘텐츠 영역 확보</Text>
              </div>
            </MainLayout>
          </div>
        </div>

        {/* Floating Sidebar Variant */}
        <div>
          <Text variant="h3" style={{ marginBottom: '12px' }}>Floating Sidebar</Text>
          <div style={{ height: '300px', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
            <MainLayout
              header={defaultHeaderProps}
              sideBar={{
                ...defaultSideBarProps,
                items: defaultSideBarProps.items.slice(0, 3),
                variant: 'floating',
              }}
              variant="floating-sidebar"
            >
              <div style={{ padding: '20px' }}>
                <Text variant="h4">플로팅 사이드바 레이아웃</Text>
                <Text variant="body2">사이드바가 콘텐츠 위에 오버레이됩니다</Text>
                <div style={{ marginTop: '20px', height: '150px', backgroundColor: '#f8fafc', borderRadius: '8px', padding: '16px' }}>
                  <Text variant="body2">콘텐츠 영역이 사이드바 뒤에 있습니다</Text>
                </div>
              </div>
            </MainLayout>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `// Default
<MainLayout header={headerProps} sideBar={sideBarProps}>
  <Content />
</MainLayout>

// Collapsible Sidebar
<MainLayout
  header={headerProps}
  sideBar={{ ...sideBarProps, collapsible: true, collapsed: true }}
>
  <Content />
</MainLayout>

// Floating Sidebar
<MainLayout
  header={headerProps}
  sideBar={sideBarProps}
  variant="floating-sidebar"
>
  <Content />
</MainLayout>`,
      },
    },
  },
};
