import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

export async function GET() {
  const postsDirectory = path.join(process.cwd(), 'public', 'blog');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames
    .filter(filename => filename.endsWith('.md') && !filename.endsWith('_zh.md'))
    .map(filename => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      const slug = filename.replace('.md', '');
      const hasChineseVersion = fs.existsSync(path.join(postsDirectory, `${slug}_zh.md`));

      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt || content.slice(0, 150) + '...',
        coverImage: data.coverImage || null,
        author: data.author || { name: 'Anonymous', avatar: 'author-default.jpg' },
        hasChineseVersion,
      };
    });

  return NextResponse.json(posts);
}