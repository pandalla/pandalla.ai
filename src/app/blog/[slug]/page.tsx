import dynamic from 'next/dynamic';
import TableOfContents from "@/components/Blog/TableOfContents";
import fs from 'fs';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from 'next/image';
import path from 'path';
import matter from 'gray-matter';
import Breadcrumb from "@/components/Common/Breadcrumb";
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

const ArticleMeta = dynamic(() => import('@/components/Blog/ArticleMeta'), {
  ssr: false,
});

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'public', 'blog');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames
    .filter(filename => !filename.endsWith('_zh.md'))
    .map(filename => ({
      slug: filename.replace('.md', '')
    }));
}

async function getPostData(slug: string) {
  const isChineseVersion = slug.endsWith('_zh');
  const actualSlug = isChineseVersion ? slug.slice(0, -3) : slug;
  const fullPath = path.join(process.cwd(), 'public', 'blog', `${actualSlug}${isChineseVersion ? '_zh' : ''}.md`);

  let fileContents;
  try {
    fileContents = fs.readFileSync(fullPath, 'utf8');
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }

  const { data, content } = matter(fileContents);

  const hasChineseVersion = fs.existsSync(path.join(process.cwd(), 'public', 'blog', `${actualSlug}_zh.md`));

  return {
    slug: actualSlug,
    content,
    title: data.title || 'No title',
    excerpt: data.excerpt || '',
    author: data.author || { name: 'Anonymous', avatar: 'author-default.jpg' },
    date: data.date,
    keywords: data.keywords || [],
    hasChineseVersion,
    isChineseVersion,
    ...data
  };
}

interface PostData {
  slug: string;
  content: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  keywords: string[];
  [key: string]: any;
}

interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
  [key: string]: any; // 添加这一行以允许其他属性
}


export default async function BlogPost({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug);
  const url = `https://pandalla.ai/blog/${params.slug}`;
  

  return (
    <>
      <Breadcrumb
        pageName={postData.title}
        description={postData.excerpt}
        author={postData.author}
        date={postData.date}
        keywords={postData.keywords}
        url={url}
        hasChineseVersion={postData.hasChineseVersion}
      />
      <section className="py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-3/4">
              <div className="ursine-theme prose prose-lg max-w-none dark:prose-invert blog-details mb-12 text-base font-medium leading-relaxed text-body-color">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, [remarkRehype, { allowDangerousHtml: true }]]}
                  rehypePlugins={[rehypeRaw, rehypeStringify]}
                  components={{
                    code({ node, inline, className, children, ...props }: CodeProps) {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={tomorrow}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    },
                    table({ children }) {
                      return (
                        <div className="overflow-x-auto my-8">
                          <table className="min-w-full border-collapse">
                            {children}
                          </table>
                        </div>
                      )
                    },
                    th({ children }) {
                      return <th className="border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{children}</th>
                    },
                    td({ children }) {
                      return <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-500 dark:text-gray-400">{children}</td>
                    },
                    h1({ children }) {
                      const id = children?.toString().toLowerCase().replace(/\s+/g, '-');
                      return <h1 id={id} className="mt-8 mb-4 text-4xl font-bold">{children}</h1>; {/* Reduced top margin */ }
                    },
                    h2({ children }) {
                      const id = children?.toString().toLowerCase().replace(/\s+/g, '-');
                      return <h2 id={id} className="mt-6 mb-3 text-3xl font-semibold">{children}</h2>; {/* Reduced top margin */ }
                    },
                    h3({ children }) {
                      const id = children?.toString().toLowerCase().replace(/\s+/g, '-');
                      return <h3 id={id} className="mt-4 mb-2 text-2xl font-medium">{children}</h3>; {/* Reduced top margin */ }
                    }
                  }}
                  >
                    {postData.content}
                  </ReactMarkdown>
                </div>
                <ArticleMeta
                  keywords={postData.keywords}
                  url={url}
                  title={postData.title}
                  content={postData.content}
                />
              </div>
              <div className="w-full lg:w-1/4">
                <TableOfContents />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }