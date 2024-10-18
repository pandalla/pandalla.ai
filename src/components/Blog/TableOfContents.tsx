"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

const TableOfContents: React.FC = () => {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [activeId, setActiveId] = useState<string>('');
  const tocRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const article = document.querySelector('.blog-details');
    const headings = article?.querySelectorAll('h1, h2, h3');
    const tocItems: TOCItem[] = [];

    headings?.forEach((heading) => {
      const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '';
      heading.id = id;  // 确保标题有 ID
      const text = heading.textContent || '';
      const level = parseInt(heading.tagName[1]);
      tocItems.push({ id, text, level });
    });

    setToc(tocItems);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      for (const item of tocItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const { top } = element.getBoundingClientRect();
          if (top >= 0 && top <= windowHeight / 2) {
            setActiveId(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始化时调用一次
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (activeId && tocRef.current) {
      const encodedActiveId = encodeURIComponent(activeId);
      const activeElement = tocRef.current.querySelector(`[data-id="${encodedActiveId}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      router.push(`#${activeId}`, { scroll: false });
    }
  }, [activeId, router]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveId(id);
    }
  };

  return (
    <nav className="toc hidden lg:block sticky top-24 ml-8 p-4 bg-transparent">
      <h2 
        className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 cursor-pointer"
        onClick={toggleVisibility}
      >
        Table of contents {isVisible ? '▲' : '▼'}
      </h2>
      {isVisible && (
        <div ref={tocRef} className="max-h-[calc(100vh-200px)] overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <ul className="space-y-2 relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-700" />
            {toc.map((item) => (
              <li
                key={item.id}
                className={`
                  ${item.level === 1 ? 'ml-0' : item.level === 2 ? 'ml-4' : 'ml-8'}
                  relative
                `}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(item.id);
                  }}
                  data-id={encodeURIComponent(item.id)}
                  className={`
                    cursor-pointer text-sm transition-colors duration-200 flex items-center
                    ${activeId === item.id 
                      ? 'text-primary font-medium' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'}
                    ${activeId !== item.id ? 'opacity-50' : ''}
                  `}
                >
                  <span className={`
                    inline-block rounded-full mr-2
                    ${item.level === 1 ? 'w-3 h-3' : item.level === 2 ? 'w-2 h-2' : 'w-1.5 h-1.5'}
                    ${activeId === item.id ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}
                  `} style={{ marginLeft: '-7px' }} />
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default TableOfContents;