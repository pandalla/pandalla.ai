'use client';

import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import AboutSectionThree from "@/components/About/AboutSectionThree";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Video from "@/components/Video";
import { useTranslations } from 'next-intl';


const AboutPage = () => {
  const t = useTranslations('PageTitles');
  
  return (
    <>
      <Breadcrumb
        pageName={t('about')}
        description={t('aboutSubtitle')}
      />
      <Video />
      <AboutSectionOne />
      {/* <AboutSectionTwo /> */}
      <AboutSectionThree />
    </>
  );
};

export default AboutPage;
