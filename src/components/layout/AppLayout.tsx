import React from 'react';
import { Header, HeaderProps } from '../organisms/Header';
import { colors } from '../../theme';

/**
 * 앱 레이아웃 Props
 */
export interface AppLayoutProps {
  /** 헤더 컴포넌트 설정 */
  header: HeaderProps;
  /** 메인 콘텐츠 */
  children: React.ReactNode;
  /** 레이아웃 스타일 변형 */
  variant?: 'default' | 'fullwidth' | 'centered';
  /** 콘텐츠 최대 너비 */
  maxWidth?: string | number;
  /** 콘텐츠 패딩 */
  contentPadding?: string;
  /** 배경색 */
  backgroundColor?: string;
  /** CSS 클래스명 */
  className?: string;
  /** 인라인 스타일 */
  style?: React.CSSProperties;
}

/**
 * Header와 Content만으로 구성된 간단한 레이아웃
 *
 * 마케팅 사이트, 블로그, 포트폴리오 등에 적합한 깔끔한 구조를 제공합니다.
 *
 * @example
 * ```tsx
 * const headerProps = {
 *   logo: <Logo />,
 *   title: "My Website",
 *   navigation: [
 *     { label: "Home", href: "/", active: true },
 *     { label: "About", href: "/about" },
 *   ],
 *   actions: <Button>Login</Button>
 * };
 *
 * <AppLayout header={headerProps}>
 *   <h1>Welcome to our website</h1>
 *   <p>This is the main content area.</p>
 * </AppLayout>
 * ```
 */
export const AppLayout: React.FC<AppLayoutProps> = ({
  header,
  children,
  variant = 'default',
  maxWidth = '1200px',
  contentPadding = '2rem',
  backgroundColor = colors.background.white,
  className = '',
  style = {},
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'fullwidth':
        return {
          content: {
            maxWidth: '100%',
            padding: contentPadding,
          },
        };
      case 'centered':
        return {
          content: {
            maxWidth: maxWidth,
            margin: '0 auto',
            padding: contentPadding,
            textAlign: 'center' as const,
          },
        };
      case 'default':
      default:
        return {
          content: {
            maxWidth: maxWidth,
            margin: '0 auto',
            padding: contentPadding,
          },
        };
    }
  };

  const variantStyles = getVariantStyles();

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: backgroundColor,
    ...style,
  };

  const contentStyles: React.CSSProperties = {
    flex: 1,
    ...variantStyles.content,
  };

  return (
    <div className={className} style={containerStyles}>
      {/* Header */}
      <Header {...header} />

      {/* Main Content */}
      <main style={contentStyles}>
        {children}
      </main>
    </div>
  );
};