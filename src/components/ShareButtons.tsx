'use client';

import React, { useState } from 'react';
import { FaTwitter, FaFacebook, FaLinkedin, FaCopy } from 'react-icons/fa';
import { AiOutlineInstagram } from 'react-icons/ai';

interface ShareButtonsProps {
  url: string;
  title: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title }) => {
  const [showAlert, setShowAlert] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle} - Explore the future of AI with Pandalla.AI!`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle} - Dive into the AI world with Pandalla.AI!`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=Discover the endless possibilities of AI with Pandalla.AI.`,
    instagram: `https://www.instagram.com/`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${title} - ${url}\nDon't miss this fascinating article from Pandalla.AI!`);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 1500);
  };

  const ShareButton = ({ href, icon, title }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" 
       className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 hover:text-gray-800 hover:border-gray-500 transition-colors" 
       title={title}>
      {icon}
    </a>
  );

  return (
    <div className="relative">
      <div className="flex gap-2">
        <ShareButton href={shareLinks.twitter} icon={<FaTwitter size={16} />} title="Share on Twitter" />
        <ShareButton href={shareLinks.facebook} icon={<FaFacebook size={16} />} title="Share on Facebook" />
        <ShareButton href={shareLinks.linkedin} icon={<FaLinkedin size={16} />} title="Share on LinkedIn" />
        <ShareButton href={shareLinks.instagram} icon={<AiOutlineInstagram size={16} />} title="Share on Instagram" />
        <button onClick={copyToClipboard} 
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 hover:text-gray-800 hover:border-gray-500 transition-colors" 
                title="Copy link">
          <FaCopy size={16} />
        </button>
      </div>
      {showAlert && (
        <div className="absolute top-full left-0 mt-2 p-2 bg-green-100 text-green-700 rounded shadow">
          Link copied!
        </div>
      )}
    </div>
  );
};

export default ShareButtons;