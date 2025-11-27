import React from 'react';
import { HeaderProps } from '../organisms/Header';
import { Header } from '../organisms/Header';
import { SideBarProps } from '../organisms/SideBar';
import { SideBar } from '../organisms/SideBar';
import { colors, spacing } from '../../theme';

/**
 * 대시보드 레이아웃 Props
 */
export interface DashboardLayoutProps {
  /** 헤더 컴포넌트 설정 */
  header: HeaderProps;
  /** 사이드바 컴포넌트 설정 */
  sideBar: SideBarProps;
  /** 메인 콘텐츠 */
  children: React.ReactNode;
  /** 레이아웃 스타일 변형 */
  variant?: 'default' | 'fixed' | 'scrollable-content';
  /** 콘텐츠 패딩 */
  contentPadding?: string;
  /** 콘텐츠 배경색 */
  contentBackgroundColor?: string;
  /** 헤더와 콘텐츠 사이 간격 */
  headerGap?: string;
  /** CSS 클래스명 */
  className?: string;
  /** 인라인 스타일 */
  style?: React.CSSProperties;
}

/**
 * Header, SideBar, Content로 구성된 완전한 대시보드 레이아웃
 *
 * 관리자 대시보드, 애플리케이션 메인 화면 등에 적합한 전체 페이지 레이아웃을 제공합니다.
 * 상단 네비게이션, 사이드 메뉴, 메인 콘텐츠 영역을 모두 포함합니다.
 *
 * @example
 * ```tsx
 * const headerProps = {
 *   logo: <Logo />,
 *   navigation: [
 *     { id: 'home', label: '홈', href: '/', active: true },
 *     { id: 'about', label: '소개', href: '/about' },
 *   ],
 *   actions: <UserProfile />
 * };
 *
 * const sideBarProps = {
 *   title: "메뉴",
 *   items: [
 *     { id: "dashboard", label: "대시보드", icon: "home", active: true },
 *     { id: "settings", label: "설정", icon: "settings" },
 *   ]
 * };
 *
 * <DashboardLayout
 *   header={headerProps}
 *   sideBar={sideBarProps}
 * >
 *   <h1>메인 콘텐츠</h1>
 *   <p>여기에 실제 페이지 내용이 들어갑니다.</p>
 * </DashboardLayout>
 * ```
 */
export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  header,
  sideBar,
  children,
  variant = 'default',
  contentPadding = spacing.xl,
  contentBackgroundColor = colors.background.white,
  headerGap = '0',
  className = '',
  style = {},
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'fixed':
        return {
          container: {
            position: 'fixed' as const,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column' as const,
          },
          header: {
            flexShrink: 0,
          },
          body: {
            display: 'flex',
            flex: 1,
            overflow: 'hidden',
          },
          sideBar: {
            flexShrink: 0,
          },
          content: {
            flex: 1,
            overflow: 'auto',
            padding: contentPadding,
            backgroundColor: contentBackgroundColor,
            marginTop: headerGap,
          },
        };
      case 'scrollable-content':
        return {
          container: {
            position: 'fixed' as const,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column' as const,
          },
          header: {
            position: 'sticky' as const,
            top: 0,
            zIndex: 10,
            flexShrink: 0,
            backgroundColor: colors.background.white,
            borderBottom: `1px solid ${colors.border.default}`,
          },
          body: {
            display: 'flex',
            flex: 1,
            overflow: 'hidden',
          },
          sideBar: {
            flexShrink: 0,
            position: 'sticky' as const,
            top: 0,
            height: '100vh',
            overflowY: 'auto' as const,
          },
          content: {
            flex: 1,
            overflow: 'auto',
            padding: contentPadding,
            backgroundColor: contentBackgroundColor,
            marginTop: headerGap,
          },
        };
      case 'default':
      default:
        return {
          container: {
            display: 'flex',
            flexDirection: 'column' as const,
            height: '100vh',
            overflow: 'hidden',
          },
          header: {
            flexShrink: 0,
          },
          body: {
            display: 'flex',
            flex: 1,
            overflow: 'hidden',
          },
          sideBar: {
            flexShrink: 0,
          },
          content: {
            flex: 1,
            overflow: 'auto',
            padding: contentPadding,
            backgroundColor: contentBackgroundColor,
            marginTop: headerGap,
          },
        };
    }
  };

  const variantStyles = getVariantStyles();

  const containerStyles: React.CSSProperties = {
    ...variantStyles.container,
    ...style,
  };

  return (
    <div className={className} style={containerStyles}>
      {/* Header */}
      <header style={variantStyles.header}>
        <Header {...header} />
      </header>

      {/* Body: SideBar + Content */}
      <div style={variantStyles.body}>
        {/* SideBar */}
        <div style={variantStyles.sideBar}>
          <SideBar {...sideBar} />
        </div>

        {/* Main Content */}
        <main style={variantStyles.content}>
          {children}
        </main>
      </div>
    </div>
  );
};
