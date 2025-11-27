import React from 'react';

export default {
  title: 'Introduction',
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
    },
  },
};

export const Overview = () => (
  <div style={{
    padding: '3rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: 1.6,
  }}>
    <h1 style={{
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#1a1a1a'
    }}>
      Ruby's Design System
    </h1>

    <p style={{
      fontSize: '1.2rem',
      marginBottom: '2rem',
      color: '#666'
    }}>
      재사용 가능한 UI 컴포넌트들로 구성된 디자인 시스템입니다.
    </p>

    <div style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1a1a1a' }}>
        📚 컴포넌트 카테고리
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          padding: '1.5rem',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#1a1a1a' }}>
            Atomic Components
          </h3>
          <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
            Button, Input, Icon 등 기본 UI 요소들
          </p>
        </div>

        <div style={{
          padding: '1.5rem',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#1a1a1a' }}>
            Molecules
          </h3>
          <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
            Atomic 컴포넌트들을 조합한 복합 요소들
          </p>
        </div>

        <div style={{
          padding: '1.5rem',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#1a1a1a' }}>
            Organisms
          </h3>
          <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
            Header, SideBar 등 완성된 UI 섹션들
          </p>
        </div>

        <div style={{
          padding: '1.5rem',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#1a1a1a' }}>
            Layout
          </h3>
          <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
            AppLayout, DashboardLayout 등 페이지 구조
          </p>
        </div>
      </div>
    </div>

    <div style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1a1a1a' }}>
        🎨 디자인 토큰
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          padding: '1rem',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          backgroundColor: '#ffffff'
        }}>
          <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#1a1a1a', margin: '0 0 0.5rem 0' }}>
            Colors
          </h4>
          <div style={{ fontSize: '0.8rem', color: '#666' }}>
            <div style={{ marginBottom: '0.25rem' }}>• Primary: #007bff</div>
            <div style={{ marginBottom: '0.25rem' }}>• Secondary: #6c757d</div>
            <div style={{ marginBottom: '0.25rem' }}>• Success: #28a745</div>
            <div>• Danger: #dc3545</div>
          </div>
        </div>

        <div style={{
          padding: '1rem',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          backgroundColor: '#ffffff'
        }}>
          <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#1a1a1a', margin: '0 0 0.5rem 0' }}>
            Spacing
          </h4>
          <div style={{ fontSize: '0.8rem', color: '#666' }}>
            <div style={{ marginBottom: '0.25rem' }}>• xs: 4px</div>
            <div style={{ marginBottom: '0.25rem' }}>• sm: 8px</div>
            <div style={{ marginBottom: '0.25rem' }}>• md: 16px</div>
            <div style={{ marginBottom: '0.25rem' }}>• lg: 24px</div>
            <div>• xl: 32px</div>
          </div>
        </div>

        <div style={{
          padding: '1rem',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          backgroundColor: '#ffffff'
        }}>
          <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#1a1a1a', margin: '0 0 0.5rem 0' }}>
            Typography
          </h4>
          <div style={{ fontSize: '0.8rem', color: '#666' }}>
            <div style={{ marginBottom: '0.25rem' }}>• Font Family: Pretendard</div>
            <div style={{ marginBottom: '0.25rem' }}>• Heading: 400-700</div>
            <div>• Body: 400-500</div>
          </div>
        </div>
      </div>
    </div>

    <div style={{
      padding: '1.5rem',
      backgroundColor: '#f0f7ff',
      borderRadius: '8px',
      border: '1px solid #b3d8ff'
    }}>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#1a1a1a' }}>
        🚀 시작하기
      </h3>
      <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
        좌측 네비게이션에서 원하는 컴포넌트를 선택하여 문서와 예제를 확인해보세요.
      </p>
    </div>
  </div>
);