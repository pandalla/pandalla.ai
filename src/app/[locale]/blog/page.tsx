'use client';

import dynamic from 'next/dynamic'
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useTranslations } from 'next-intl';

// 动态导入 BlogList 组件
const BlogList = dynamic(() => import("@/components/Blog/BlogList"), {
  ssr: false,
  loading: () => <p>loading...</p>
});


const BlogPage = () => {
  const t = useTranslations('PageTitles');
  
  return (
    <>
      <Breadcrumb
        pageName={t('blog')}
        description={t('blogSubtitle')}
      />
      <BlogList />
    </>
  );
};

export default BlogPage;