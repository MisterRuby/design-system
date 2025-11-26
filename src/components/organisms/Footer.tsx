import React from 'react';
import { Text } from '../atomic/Text';
import { Button } from '../atomic/Button';
import { Icon, IconName } from '../atomic/Icon';
import { colors, componentBorders, fontWeight, spacing, borderRadius } from '../../theme';

/**
 * 푸터 링크 아이템 인터페이스
 */
export interface FooterLink {
  /** 고유 식별자 */
  id: string;
  /** 표시될 라벨 텍스트 */
  label: string;
  /** 링크 URL (선택사항) */
  href?: string;
  /** 클릭 이벤트 핸들러 (선택사항) */
  onClick?: () => void;
  /** 비활성 상태 여부 */
  disabled?: boolean;
  /** 외부 링크 여부 */
  external?: boolean;
}

/**
 * 푸터 섹션 인터페이스
 */
export interface FooterSection {
  /** 고유 식별자 */
  id: string;
  /** 섹션 제목 */
  title: string;
  /** 섹션의 링크 목록 */
  links: FooterLink[];
}

/**
 * 소셜 미디어 링크 인터페이스
 */
export interface SocialLink {
  /** 고유 식별자 */
  id: string;
  /** 소셜 미디어 이름 */
  name: string;
  /** 아이콘 이름 */
  icon: IconName;
  /** 링크 URL */
  href: string;
  /** 클릭 이벤트 핸들러 (선택사항) */
  onClick?: () => void;
}

/**
 * 푸터 컴포넌트 Props
 */
export interface FooterProps {
  /** 푸터 상단에 표시될 로고 컴포넌트 */
  logo?: React.ReactNode;
  /** 회사명 또는 사이트명 */
  brandName?: string;
  /** 브랜드 설명 텍스트 */
  description?: string;
  /** 푸터 섹션 목록 */
  sections?: FooterSection[];
  /** 소셜 미디어 링크 목록 */
  socialLinks?: SocialLink[];
  /** 저작권 텍스트 */
  copyrightText?: string;
  /** 푸터 하단에 표시될 추가 링크 */
  bottomLinks?: FooterLink[];
  /** 뉴스레터 구독 기능 활성화 여부 */
  showNewsletter?: boolean;
  /** 뉴스레터 구독 콜백 */
  onNewsletterSubmit?: (email: string) => void;
  /** 푸터 스타일 변형 */
  variant?: 'default' | 'minimal' | 'dark';
  /** CSS 클래스명 */
  className?: string;
  /** 인라인 스타일 */
  style?: React.CSSProperties;
}

/**
 * 웹사이트 하단에 표시되는 푸터 컴포넌트
 *
 * 회사 정보, 네비게이션 링크, 소셜 미디어, 저작권 정보 등을 제공합니다.
 *
 * @example
 * ```tsx
 * const footerSections = [
 *   {
 *     id: 'company',
 *     title: '회사 정보',
 *     links: [
 *       { id: 'about', label: '회사 소개', href: '/about' },
 *       { id: 'careers', label: '채용', href: '/careers' },
 *     ]
 *   }
 * ];
 *
 * const socialLinks = [
 *   { id: 'twitter', name: 'Twitter', icon: 'share', href: 'https://twitter.com' }
 * ];
 *
 * <Footer
 *   brandName="My Company"
 *   description="혁신적인 솔루션을 제공하는 기업입니다."
 *   sections={footerSections}
 *   socialLinks={socialLinks}
 *   copyrightText="© 2024 My Company. All rights reserved."
 * />
 * ```
 */
export const Footer: React.FC<FooterProps> = ({
  logo,
  brandName,
  description,
  sections = [],
  socialLinks = [],
  copyrightText,
  bottomLinks = [],
  showNewsletter = false,
  onNewsletterSubmit,
  variant = 'default',
  className = '',
  style = {},
}) => {
  const [newsletterEmail, setNewsletterEmail] = React.useState('');

  const getVariantStyles = () => {
    switch (variant) {
      case 'minimal':
        return {
          backgroundColor: colors.background.white,
          borderTop: `1px solid ${colors.border.default}`,
          color: colors.semantic.text,
        };
      case 'dark':
        return {
          backgroundColor: colors.gray[900],
          borderTop: `1px solid ${colors.gray[800]}`,
          color: colors.background.white,
        };
      case 'default':
      default:
        return {
          backgroundColor: colors.gray[50],
          borderTop: `1px solid ${colors.border.default}`,
          color: colors.semantic.text,
        };
    }
  };

  const variantStyles = getVariantStyles();

  const containerStyles: React.CSSProperties = {
    width: '100%',
    ...variantStyles,
    ...style,
  };

  const mainContentStyles: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `${spacing.lg} ${spacing.lg}`,
  };

  const topSectionStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: showNewsletter
      ? 'repeat(auto-fit, minmax(250px, 1fr))'
      : 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: spacing.lg,
    marginBottom: spacing.lg,
  };

  const brandSectionStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  };

  const logoContainerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
  };

  const sectionStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xs,
  };

  const linkStyles: React.CSSProperties = {
    color: 'inherit',
    textDecoration: 'none',
    transition: 'color 0.2s ease-in-out',
    cursor: 'pointer',
    padding: `${spacing.xxs} 0`,
  };

  const socialLinksStyles: React.CSSProperties = {
    display: 'flex',
    gap: spacing.sm,
    marginTop: spacing.sm,
  };

  const socialLinkStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: borderRadius.sm,
    backgroundColor: variant === 'dark' ? colors.gray[800] : colors.background.white,
    border: `1px solid ${variant === 'dark' ? colors.gray[700] : colors.border.default}`,
    color: 'inherit',
    textDecoration: 'none',
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
  };

  const bottomSectionStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTop: `1px solid ${variant === 'dark' ? colors.gray[800] : colors.border.default}`,
    flexWrap: 'wrap',
    gap: spacing.sm,
  };

  const bottomLinksStyles: React.CSSProperties = {
    display: 'flex',
    gap: spacing.md,
    flexWrap: 'wrap',
  };

  const newsletterStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  };

  const newsletterInputStyles: React.CSSProperties = {
    display: 'flex',
    gap: spacing.sm,
  };

  const inputStyles: React.CSSProperties = {
    flex: 1,
    padding: `${spacing.xs} ${spacing.sm}`,
    border: `1px solid ${variant === 'dark' ? colors.gray[700] : colors.border.default}`,
    borderRadius: borderRadius.sm,
    backgroundColor: variant === 'dark' ? colors.gray[800] : colors.background.white,
    color: 'inherit',
    fontSize: '14px',
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && onNewsletterSubmit) {
      onNewsletterSubmit(newsletterEmail);
      setNewsletterEmail('');
    }
  };

  const handleLinkClick = (link: FooterLink) => {
    if (link.disabled) return;
    if (link.onClick) {
      link.onClick();
    }
  };

  const handleSocialClick = (social: SocialLink) => {
    if (social.onClick) {
      social.onClick();
    }
  };

  return (
    <footer className={className} style={containerStyles}>
      <div style={mainContentStyles}>
        {/* 메인 콘텐츠 영역 */}
        <div style={topSectionStyles}>
          {/* 브랜드 섹션 */}
          <div style={brandSectionStyles}>
            <div style={logoContainerStyles}>
              {logo && <div>{logo}</div>}
              {brandName && (
                <Text
                  variant="h4"
                  style={{
                    margin: 0,
                    color: 'inherit',
                    fontWeight: fontWeight.bold
                  }}
                >
                  {brandName}
                </Text>
              )}
            </div>
            {description && (
              <Text
                variant="body2"
                style={{
                  margin: 0,
                  color: variant === 'dark' ? colors.gray[300] : colors.semantic.muted,
                  lineHeight: 1.6
                }}
              >
                {description}
              </Text>
            )}
            {socialLinks.length > 0 && (
              <div style={socialLinksStyles}>
                {socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    style={socialLinkStyles}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSocialClick(social);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = variant === 'dark'
                        ? colors.gray[700]
                        : colors.background.gray;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = variant === 'dark'
                        ? colors.gray[800]
                        : colors.background.white;
                    }}
                    aria-label={social.name}
                  >
                    <Icon name={social.icon} size={18} color="currentColor" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* 링크 섹션들 */}
          {sections.map((section) => (
            <div key={section.id} style={sectionStyles}>
              <Text
                variant="body1"
                style={{
                  margin: 0,
                  marginBottom: spacing.xs,
                  color: 'inherit',
                  fontWeight: fontWeight.semibold,
                  fontSize: '14px'
                }}
              >
                {section.title}
              </Text>
              {section.links.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  style={{
                    ...linkStyles,
                    opacity: link.disabled ? 0.5 : 1,
                    cursor: link.disabled ? 'not-allowed' : 'pointer',
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link);
                  }}
                  onMouseEnter={(e) => {
                    if (!link.disabled) {
                      e.currentTarget.style.color = colors.semantic.primary;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'inherit';
                  }}
                >
                  <Text
                    variant="caption"
                    style={{
                      margin: 0,
                      color: 'inherit',
                      fontSize: '13px'
                    }}
                  >
                    {link.label}
                    {link.external && (
                      <Icon
                        name="arrow-up"
                        size={12}
                        style={{
                          marginLeft: spacing.xxs,
                          transform: 'rotate(45deg)'
                        }}
                      />
                    )}
                  </Text>
                </a>
              ))}
            </div>
          ))}

          {/* 뉴스레터 섹션 */}
          {showNewsletter && (
            <div style={newsletterStyles}>
              <Text
                variant="body1"
                style={{
                  margin: 0,
                  marginBottom: spacing.xs,
                  color: 'inherit',
                  fontWeight: fontWeight.semibold,
                  fontSize: '14px'
                }}
              >
                뉴스레터 구독
              </Text>
              <Text
                variant="body2"
                style={{
                  margin: 0,
                  color: variant === 'dark' ? colors.gray[300] : colors.semantic.muted
                }}
              >
                최신 소식과 업데이트를 받아보세요.
              </Text>
              <form onSubmit={handleNewsletterSubmit} style={newsletterInputStyles}>
                <input
                  type="email"
                  placeholder="이메일 주소"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  style={inputStyles}
                  required
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="small"
                  disabled={!newsletterEmail.trim()}
                >
                  구독
                </Button>
              </form>
            </div>
          )}
        </div>

        {/* 하단 섹션 */}
        <div style={bottomSectionStyles}>
          <div>
            {copyrightText && (
              <Text
                variant="caption"
                style={{
                  margin: 0,
                  color: variant === 'dark' ? colors.gray[400] : colors.semantic.muted
                }}
              >
                {copyrightText}
              </Text>
            )}
          </div>
          {bottomLinks.length > 0 && (
            <div style={bottomLinksStyles}>
              {bottomLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  style={{
                    ...linkStyles,
                    fontSize: '12px',
                    opacity: link.disabled ? 0.5 : 1,
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link);
                  }}
                  onMouseEnter={(e) => {
                    if (!link.disabled) {
                      e.currentTarget.style.color = colors.semantic.primary;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'inherit';
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};