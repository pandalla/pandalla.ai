"use client";

import React, { useEffect, useState } from 'react';
import { FaTwitter, FaFacebook, FaLinkedin, FaCopy } from 'react-icons/fa';
import { AiOutlineInstagram } from 'react-icons/ai';
import TagButton from './TagButton';

interface ArticleMetaProps {
  keywords: string[];
  url: string;
  title: string;
  content: string;
}

const ArticleMeta: React.FC<ArticleMetaProps> = ({ keywords, url, title, content }) => {
  const [toc, setToc] = useState<{ id: string; text: string; level: number }[]>([]);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    // 目录生成逻辑保持不变
    const headings = content.match(/^#{1,6}\s+.+$/gm) || [];
    const parsedToc = headings.map(heading => {
      const level = heading.match(/^#+/)[0].length;
      const text = heading.replace(/^#+\s+/, '');
      const id = text.toLowerCase().replace(/\s+/g, '-');
      return { id, text, level };
    });
    setToc(parsedToc);

    // 计算字数
    const words = content.trim().split(/\s+/).length;
    setWordCount(words);
  }, [content]);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle} - 探索AI的未来，就在Pandalla.AI！`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle} - 与Pandalla.AI一起深入AI世界！`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=探索AI的无限可能，Pandalla.AI为您解读前沿科技。`,
    instagram: `https://www.instagram.com/`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${title} - ${url}\n来自Pandalla.AI的精彩文章，不容错过！`);
    setTimeout(() => alert('copy！'), 1500);
  };

  const ShareButton = ({ href, icon, title }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" 
       className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 hover:text-gray-800 hover:border-gray-500 transition-colors" 
       title={title}>
      {icon}
    </a>
  );

  return (
    <div className="mb-8">
      <div className="mb-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">Word count: {wordCount}</span>
      </div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <TagButton key={index} text={keyword} />
          ))}
        </div>
        <div className="flex gap-2">
          <ShareButton href={shareLinks.twitter} icon={<FaTwitter size={16} />} title="分享到Twitter" />
          <ShareButton href={shareLinks.facebook} icon={<FaFacebook size={16} />} title="分享到Facebook" />
          <ShareButton href={shareLinks.linkedin} icon={<FaLinkedin size={16} />} title="分享到LinkedIn" />
          <ShareButton href={shareLinks.instagram} icon={<AiOutlineInstagram size={16} />} title="分享到Instagram" />
          <button onClick={copyToClipboard} 
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 hover:text-gray-800 hover:border-gray-500 transition-colors" 
                  title="复制链接">
            <FaCopy size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArticleMeta;