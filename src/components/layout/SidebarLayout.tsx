import React from 'react';
import { SideBar, SideBarProps } from '../organisms/SideBar';
import { colors, spacing } from '../../tokens';

/**
 * 사이드바 레이아웃 Props
 */
export interface SidebarLayoutProps {
  /** 사이드바 컴포넌트 설정 */
  sideBar: SideBarProps;
  /** 메인 콘텐츠 */
  children: React.ReactNode;
  /** 레이아웃 스타일 변형 */
  variant?: 'default' | 'fixed' | 'overlay';
  /** 콘텐츠 패딩 */
  contentPadding?: string;
  /** 콘텐츠 배경색 */
  contentBackgroundColor?: string;
  /** 사이드바와 콘텐츠 사이 간격 */
  gap?: string;
  /** CSS 클래스명 */
  className?: string;
  /** 인라인 스타일 */
  style?: React.CSSProperties;
}

/**
 * SideBar와 Content로 구성된 레이아웃
 *
 * 대시보드, 문서 사이트, 관리자 패널 등에 적합한 사이드 네비게이션 구조를 제공합니다.
 *
 * @example
 * ```tsx
 * const sideBarProps = {
 *   title: "Navigation",
 *   items: [
 *     { id: "dashboard", label: "대시보드", icon: "home", active: true },
 *     { id: "users", label: "사용자", icon: "user" },
 *   ]
 * };
 *
 * <SidebarLayout sideBar={sideBarProps}>
 *   <h1>Dashboard Content</h1>
 *   <p>This is the main content area.</p>
 * </SidebarLayout>
 * ```
 */
export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  sideBar,
  children,
  variant = 'default',
  contentPadding = spacing.xl,
  contentBackgroundColor = colors.background.white,
  gap = '0',
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
          },
          content: {
            flex: 1,
            overflow: 'auto',
            padding: contentPadding,
            backgroundColor: contentBackgroundColor,
          },
        };
      case 'overlay':
        return {
          container: {
            position: 'relative' as const,
            height: '100vh',
          },
          content: {
            flex: 1,
            overflow: 'auto',
            padding: contentPadding,
            backgroundColor: contentBackgroundColor,
            marginLeft: sideBar.collapsed ? '64px' : '0',
            transition: 'margin-left 0.3s ease-in-out',
          },
        };
      case 'default':
      default:
        return {
          container: {
            display: 'flex',
            height: '100vh',
            overflow: 'hidden',
          },
          content: {
            flex: 1,
            overflow: 'auto',
            padding: contentPadding,
            backgroundColor: contentBackgroundColor,
            marginLeft: gap,
          },
        };
    }
  };

  const variantStyles = getVariantStyles();

  const containerStyles: React.CSSProperties = {
    ...variantStyles.container,
    ...style,
  };

  const contentStyles: React.CSSProperties = {
    ...variantStyles.content,
  };

  return (
    <div className={className} style={containerStyles}>
      {/* SideBar */}
      <SideBar {...sideBar} />

      {/* Main Content */}
      <main style={contentStyles}>
        {children}
      </main>
    </div>
  );
};
