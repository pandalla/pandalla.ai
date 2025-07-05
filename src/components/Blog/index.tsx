"use client";

import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";

const Blog = () => {
  const t = useTranslations('Blog');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/BlogPosts')
      .then(response => response.json())
      .then(data => {
        // 过滤掉中文版本的文章
        const filteredPosts = data.filter(post => !post.slug.endsWith('_zh'));
        setPosts(filteredPosts);
      });
  }, []);

  return (
    <section
      id="blog"
      className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28"
    >
      <div className="container">
        <SectionTitle
          title={t('title')}
          paragraph={t('subtitle')}
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {posts.map((post, index) => (
            <SingleBlog key={index} blog={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;