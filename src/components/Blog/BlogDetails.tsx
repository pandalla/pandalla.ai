'use client';

import React, { useState } from 'react';
import TagButton from '@/components/Blog/TagButton';
import { FaTwitter, FaFacebook, FaLinkedin, FaWeixin, FaWeibo, FaCopy } from 'react-icons/fa';
import { AiOutlineInstagram } from 'react-icons/ai';
import html2canvas from 'html2canvas';

interface ArticleMetaProps {
  keywords: string[];
  url: string;
  title: string;
  image: string;
  content: string;
}

const BlogDetails: React.FC<ArticleMetaProps> = ({ keywords, url, title, image, content }) => {
  const [showQRCode, setShowQRCode] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedImage = encodeURIComponent(image);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle} - 探索AI的未来，就在Pandalla.AI！`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle} - 与Pandalla.AI一起深入AI世界！`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=探索AI的无限可能，Pandalla.AI为您解读前沿科技。`,
    instagram: `https://www.instagram.com/`,
    weibo: `http://service.weibo.com/share/share.php?url=${encodedUrl}&title=${encodedTitle} - Pandalla.AI带你了解AI最新动态！`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${title} - ${url}\n来自Pandalla.AI的精彩文章，不容错过！`);
    alert('copy!');
  };

  const generateShareImage = async () => {
    const element = document.createElement('div');
    element.innerHTML = `
      <div style="width: 1200px; height: 630px; padding: 20px; background-color: #f0f0f0;">
        <h1 style="font-size: 36px; color: #333;">${title}</h1>
        <img src="${image}" alt="文章封面" style="max-width: 100%; max-height: 300px; object-fit: cover;"/>
        <p style="font-size: 18px; color: #666;">${content.substring(0, 200)}...</p>
        <p style="font-size: 14px; color: #999;">From Pandalla.AI</p>
      </div>
    `;
    document.body.appendChild(element);
    
    const canvas = await html2canvas(element);
    const dataUrl = canvas.toDataURL('image/png');
    
    const link = document.createElement('a');
    link.download = 'share-image.png';
    link.href = dataUrl;
    link.click();
    
    document.body.removeChild(element);
  };

  return (
    <div className="mb-8">
      <div className="mb-4">
        {keywords.map((keyword, index) => (
          <TagButton key={index} text={keyword} />
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600" title="分享到Twitter">
          <FaTwitter size={24} />
        </a>
        <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800" title="分享到Facebook">
          <FaFacebook size={24} />
        </a>
        <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900" title="分享到LinkedIn">
          <FaLinkedin size={24} />
        </a>
        <a href={shareLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800" title="分享到Instagram">
          <AiOutlineInstagram size={24} />
        </a>
        <button onClick={() => setShowQRCode(!showQRCode)} className="text-green-500 hover:text-green-700" title="分享到微信">
          <FaWeixin size={24} />
        </button>
        <a href={shareLinks.weibo} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-700" title="分享到微博">
          <FaWeibo size={24} />
        </a>
        <button onClick={copyToClipboard} className="text-gray-600 hover:text-gray-800" title="复制链接">
          <FaCopy size={24} />
        </button>
      </div>

    </div>
  );
};

export default BlogDetails;