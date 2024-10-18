import Breadcrumb from "@/components/Common/Breadcrumb";
import Features from "@/components/Features";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features Page | Free Next.js Template for Startup and SaaS",
  description: "This is Features Page for Startup Nextjs Template",
  // other metadata
};

const FeaturesPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Features Page"
        description="探索我们产品的所有强大功能。我们为您的业务需求提供创新解决方案。"
      />
      <Features />
    </>
  );
};

export default FeaturesPage;