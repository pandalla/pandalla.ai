'use client';
import React from 'react';
import { useTranslations } from 'next-intl';

const MetricCard = ({ value, description }) => (
  <div className="mb-10">
    <h3 className="mb-2 text-4xl font-bold text-black dark:text-white">
      {value}
    </h3>
    <p className="text-base font-medium leading-relaxed text-body-color">
      {description}
    </p>
  </div>
);

const AboutSectionThree = () => {
  const t = useTranslations('About.sectionThree');
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="relative mb-12 pb-6 border-t border-gray-200">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 px-4 py-2">
            <div className="text-purple-600 font-semibold text-base">{t('subtitle')}</div>
          </div>
        </div>
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2 mb-10 lg:mb-0">
            <div className="relative">
              <h2 className="mb-6 text-3xl font-bold text-black dark:text-white sm:text-4xl lg:text-3xl xl:text-4xl">
                {t('title')}
              </h2>
              <div className="w-20 h-1 bg-purple-600 mb-6"></div>
              <p className="mb-8 text-lg font-medium leading-relaxed text-body-color">
                {t('description')}
              </p>
              {/* <a href="#" className="text-purple-600 hover:underline text-base font-semibold">
                Discover how we can help →
              </a> */}
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="grid grid-cols-2 gap-6">
              <MetricCard value={t('metrics.0.value')} description={t('metrics.0.description')} />
              <MetricCard value={t('metrics.1.value')} description={t('metrics.1.description')} />
              <MetricCard value={t('metrics.2.value')} description={t('metrics.2.description')} />
              <MetricCard value={t('metrics.3.value')} description={t('metrics.3.description')} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionThree;
