"use client";

import Image from "next/image";
import TagButton from "@/components/Blog/TagButton";
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const ShareButtons = dynamic(() => import('@/components/ShareButtons'), { ssr: false });

interface BreadcrumbProps {
  pageName: string;
  description: string;
  author?: {
    name: string;
    avatar: string;
  };
  date?: string;
  keywords?: string[];
  url?: string;
  hasChineseVersion?: boolean;
}

const Breadcrumb = ({
  pageName,
  description,
  author,
  date,
  keywords,
  url,
  hasChineseVersion,
}: BreadcrumbProps) => {
  const pathname = usePathname();
  const [isChineseVersion, setIsChineseVersion] = useState(false);

  useEffect(() => {
    setIsChineseVersion(pathname.includes('_zh'));
  }, [pathname]);

  const toggleLanguage = () => {
    const newPath = isChineseVersion
      ? pathname.replace('_zh', '')
      : pathname + '_zh';
    window.location.href = newPath;
  };

  return (
    <section className="relative z-10 overflow-hidden pt-28 lg:pt-[150px]">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="mb-5 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[48px]">
            {pageName}
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-body-color max-w-[800px] mx-auto">
            {description}
          </p>
        </div>

        {(author || date || keywords || url || hasChineseVersion) && (
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            {author && date && (
              <div className="flex items-center">
                <Image
                  src={`/images/blog/${author.avatar}`}
                  alt={author.name}
                  width={40}
                  height={40}
                  className="rounded-full mr-2"
                />
                <div>
                  <p className="text-sm font-medium text-body-color">{author.name}</p>
                  <p className="text-xs text-body-color">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
            )}
            {hasChineseVersion && (
              <button
                onClick={toggleLanguage}
                className="text-xs text-blue-500 hover:text-blue-700"
              >
                {isChineseVersion ? 'English' : '简体中文'}
              </button>
            )}
          </div>
        )}

        {keywords && (
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {keywords.map((keyword, index) => (
              <TagButton key={index} text={keyword} />
            ))}
          </div>
        )}

        {url && (
          <div className="flex justify-center mb-4">
            <ShareButtons url={url} title={pageName} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Breadcrumb;