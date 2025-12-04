import React from 'react';
import { Header, HeaderProps } from '../organisms/Header';
import { SideBar, SideBarProps } from '../organisms/SideBar';
import { useTheme } from 'styled-components';

/**
 * 메인 레이아웃 Props
 */
export interface MainLayoutProps {
  /** 헤더 컴포넌트 설정 */
  header: HeaderProps;
  /** 사이드바 컴포넌트 설정 */
  sideBar: SideBarProps;
  /** 메인 콘텐츠 */
  children: React.ReactNode;
  /** 레이아웃 스타일 변형 */
  variant?: 'default' | 'fixed-header' | 'floating-sidebar';
  /** 콘텐츠 패딩 */
  contentPadding?: string;
  /** 콘텐츠 배경색 */
  contentBackgroundColor?: string;
  /** 헤더와 사이드바 겹침 방식 */
  headerOverlap?: 'none' | 'sidebar' | 'content';
  /** CSS 클래스명 */
  className?: string;
  /** 인라인 스타일 */
  style?: React.CSSProperties;
}

/**
 * Header + SideBar + Content로 구성된 완전한 레이아웃
 *
 * 대부분의 웹 애플리케이션에 적합한 표준적인 레이아웃 구조를 제공합니다.
 *
 * @example
 * ```tsx
 * const headerProps = {
 *   title: "My App",
 *   navigation: [
 *     { label: "Home", href: "/", active: true },
 *     { label: "About", href: "/about" },
 *   ],
 *   actions: <Button>Login</Button>
 * };
 *
 * const sideBarProps = {
 *   title: "Navigation",
 *   items: [
 *     { id: "dashboard", label: "대시보드", icon: "home", active: true },
 *     { id: "users", label: "사용자", icon: "user" },
 *   ],
 *   collapsible: true
 * };
 *
 * <MainLayout header={headerProps} sideBar={sideBarProps}>
 *   <h1>Welcome to Dashboard</h1>
 *   <p>This is the main content area.</p>
 * </MainLayout>
 * ```
 */
export const MainLayout: React.FC<MainLayoutProps> = ({
  header,
  sideBar,
  children,
  variant = 'default',
  contentPadding,
  contentBackgroundColor,
  headerOverlap = 'none',
  className = '',
  style = {},
}) => {
  const theme = useTheme();
  const resolvedPadding = contentPadding || theme.spacing.xl;
  const resolvedBackground = contentBackgroundColor || theme.colors.background.white;

  const getVariantStyles = () => {
    switch (variant) {
      case 'fixed-header':
        return {
          container: {
            display: 'flex',
            flexDirection: 'column' as const,
            height: '100vh',
            overflow: 'hidden',
          },
          header: {
            position: 'fixed' as const,
            top: 0,
            left: 0,
            right: 0,
            zIndex: theme.zIndex.sticky,
          },
          body: {
            display: 'flex',
            flex: 1,
            marginTop: theme.layout.headerHeight,
            overflow: 'hidden',
          },
          sidebar: {},
          content: {
            flex: 1,
            overflow: 'auto',
            padding: resolvedPadding,
            backgroundColor: resolvedBackground,
          },
        };
      case 'floating-sidebar':
        return {
          container: {
            display: 'flex',
            flexDirection: 'column' as const,
            height: '100vh',
            overflow: 'hidden',
          },
          header: {},
          body: {
            display: 'flex',
            flex: 1,
            position: 'relative' as const,
            overflow: 'hidden',
          },
          sidebar: {
            position: 'absolute' as const,
            top: 0,
            left: 0,
            height: '100%',
            zIndex: theme.zIndex.dropdown,
          },
          content: {
            flex: 1,
            overflow: 'auto',
            padding: resolvedPadding,
            backgroundColor: resolvedBackground,
            marginLeft: 0,
            paddingLeft: sideBar.collapsed ? `calc(${theme.layout.sidebarCollapsedWidth} + ${resolvedPadding})` :
                        sideBar.width === 'narrow' ? `calc(${theme.layout.sidebarNarrowWidth} + ${resolvedPadding})` :
                        sideBar.width === 'wide' ? `calc(${theme.layout.sidebarWideWidth} + ${resolvedPadding})` :
                        `calc(${theme.layout.sidebarWidth} + ${resolvedPadding})`,
            transition: `padding-left ${theme.transitions.slow}`,
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
          header: {},
          body: {
            display: 'flex',
            flex: 1,
            overflow: 'hidden',
          },
          sidebar: {},
          content: {
            flex: 1,
            overflow: 'auto',
            padding: resolvedPadding,
            backgroundColor: resolvedBackground,
          },
        };
    }
  };

  const getHeaderOverlapStyles = () => {
    switch (headerOverlap) {
      case 'sidebar':
        return {
          header: {
            zIndex: theme.zIndex.sticky,
          },
          sidebar: {
            paddingTop: theme.layout.headerHeight,
          },
        };
      case 'content':
        return {
          header: {
            position: 'absolute' as const,
            top: 0,
            left: sideBar.collapsed
              ? theme.layout.sidebarCollapsedWidth
              : sideBar.width === 'narrow'
              ? theme.layout.sidebarNarrowWidth
              : sideBar.width === 'wide'
              ? theme.layout.sidebarWideWidth
              : theme.layout.sidebarWidth,
            right: 0,
            zIndex: theme.zIndex.sticky,
            transition: `left ${theme.transitions.slow}`,
          },
          content: {
            paddingTop: `calc(${theme.layout.headerHeight} + ${resolvedPadding})`,
          },
        };
      case 'none':
      default:
        return {
          header: {},
          sidebar: {},
          content: {},
        };
    }
  };

  const variantStyles = getVariantStyles();
  const overlapStyles = getHeaderOverlapStyles();

  const containerStyles: React.CSSProperties = {
    ...variantStyles.container,
    ...style,
  };

  const headerStyles: React.CSSProperties = {
    ...variantStyles.header,
    ...overlapStyles.header,
  };

  const bodyStyles: React.CSSProperties = {
    ...variantStyles.body,
  };

  const sidebarStyles: React.CSSProperties = {
    ...variantStyles.sidebar,
    ...overlapStyles.sidebar,
  };

  const contentStyles: React.CSSProperties = {
    ...variantStyles.content,
    ...overlapStyles.content,
  };

  return (
    <div className={className} style={containerStyles}>
      {/* Header */}
      <div style={headerStyles}>
        <Header {...header} />
      </div>

      {/* Body (Sidebar + Content) */}
      <div style={bodyStyles}>
        {/* SideBar */}
        <div style={sidebarStyles}>
          <SideBar {...sideBar} />
        </div>

        {/* Main Content */}
        <main style={contentStyles}>
          {children}
        </main>
      </div>
    </div>
  );
};
