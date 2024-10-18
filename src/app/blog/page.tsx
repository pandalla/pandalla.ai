import dynamic from 'next/dynamic'
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

// 动态导入 BlogList 组件
const BlogList = dynamic(() => import("@/components/Blog/BlogList"), {
  ssr: false,
  loading: () => <p>loading...</p>
});

export const metadata: Metadata = {
  title: "Blog | Pandalla.AI",
  description: "Blog from Pandalla.AI",
};

const BlogPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Pandalla Blog"
        description="Compiled notes from the team"
      />
      <BlogList />
    </>
  );
};

export default BlogPage;