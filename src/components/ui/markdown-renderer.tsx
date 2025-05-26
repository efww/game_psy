'use client';

import React from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const renderMarkdown = (text: string) => {
    // 줄바꿈 처리
    const lines = text.split('\n');
    
    return lines.map((line, lineIndex) => {
      // 제목 처리
      if (line.startsWith('### ')) {
        return (
          <h3 key={lineIndex} className="text-lg font-bold mt-4 mb-2 text-primary">
            {renderInlineMarkdown(line.substring(4))}
          </h3>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={lineIndex} className="text-xl font-bold mt-4 mb-2 text-primary">
            {renderInlineMarkdown(line.substring(3))}
          </h2>
        );
      }
      if (line.startsWith('# ')) {
        return (
          <h1 key={lineIndex} className="text-2xl font-bold mt-4 mb-2 text-primary">
            {renderInlineMarkdown(line.substring(2))}
          </h1>
        );
      }
      
      // 리스트 처리
      if (line.trim().startsWith('- ')) {
        return (
          <li key={lineIndex} className="ml-4 mb-1 list-disc">
            {renderInlineMarkdown(line.trim().substring(2))}
          </li>
        );
      }
      
      if (line.trim().startsWith('* ')) {
        return (
          <li key={lineIndex} className="ml-4 mb-1 list-disc">
            {renderInlineMarkdown(line.trim().substring(2))}
          </li>
        );
      }
      
      // 숫자 리스트 처리
      const numberedListMatch = line.trim().match(/^(\d+)\.\s(.+)$/);
      if (numberedListMatch) {
        return (
          <li key={lineIndex} className="ml-4 mb-1 list-decimal">
            {renderInlineMarkdown(numberedListMatch[2])}
          </li>
        );
      }
      
      // 빈 줄 처리
      if (line.trim() === '') {
        return <br key={lineIndex} />;
      }
      
      // 일반 텍스트
      return (
        <p key={lineIndex} className="mb-2">
          {renderInlineMarkdown(line)}
        </p>
      );
    });
  };
  
  const renderInlineMarkdown = (text: string): React.ReactNode => {
    // Bold와 italic 동시 처리 (***text***)
    text = text.replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="font-bold text-primary italic">$1</strong>');
    
    // Bold 처리 (**text**)
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-primary/90">$1</strong>');
    
    // Italic 처리 (*text* 또는 _text_)
    text = text.replace(/\*(.*?)\*/g, '<em class="italic text-accent-foreground">$1</em>');
    text = text.replace(/_(.*?)_/g, '<em class="italic text-accent-foreground">$1</em>');
    
    // 인라인 코드 처리 (`code`)
    text = text.replace(/`(.*?)`/g, '<code class="px-1 py-0.5 rounded bg-muted text-muted-foreground font-mono text-sm">$1</code>');
    
    // 이모지 강조 (이모지 주변에 약간의 간격 추가)
    text = text.replace(/([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])/gu, 
      '<span class="mx-1">$1</span>');
    
    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };
  
  return (
    <div className={`markdown-content ${className}`}>
      {renderMarkdown(content)}
    </div>
  );
}

// 스타일 추가를 위한 글로벌 CSS (globals.css에 추가 필요)
export const markdownStyles = `
  .markdown-content strong {
    @apply bg-gradient-to-r from-primary/10 to-primary/5 px-1 rounded;
  }
  
  .dark .markdown-content strong {
    @apply from-primary/20 to-primary/10;
  }
  
  .markdown-content h1,
  .markdown-content h2,
  .markdown-content h3 {
    @apply bg-gradient-to-r from-transparent to-transparent bg-clip-text;
  }
`;