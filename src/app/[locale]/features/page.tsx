'use client';

import Breadcrumb from "@/components/Common/Breadcrumb";
import Features from "@/components/Features";
import { useTranslations } from 'next-intl';

const FeaturesPage = () => {
  const t = useTranslations('PageTitles');
  
  return (
    <>
      <Breadcrumb
        pageName={t('features')}
        description={t('featuresSubtitle')}
      />
      <Features />
    </>
  );
};

export default FeaturesPage;