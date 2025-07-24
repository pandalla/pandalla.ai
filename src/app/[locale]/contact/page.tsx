'use client';

import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import { useTranslations } from 'next-intl';

const ContactPage = () => {
  const t = useTranslations('PageTitles');
  
  return (
    <>
      <Breadcrumb
        pageName={t('contact')}
        description={t('contactSubtitle')}
      />

      <Contact />
    </>
  );
};

export default ContactPage;
