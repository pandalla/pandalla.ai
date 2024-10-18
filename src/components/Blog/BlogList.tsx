"use client";

import { useEffect, useState } from 'react';
import SingleBlog from './SingleBlog';

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/BlogPosts')
       .then(response => response.json())
       .then(data => {
         console.log('Received blog posts:', data);
         setPosts(data);
       })
       .catch(error => console.error('Error fetching blog posts:', error));
   }, []);

  return (
    <section className="pt-[120px] pb-[120px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          {posts.map((post, index) => (
            <div key={index} className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
              <SingleBlog blog={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;