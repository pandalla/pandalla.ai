'use client';
import { useTranslations } from 'next-intl';
import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  const t = useTranslations('Features');
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28 font-inter">
        <div className="container">
          <SectionTitle
            title={t('title')}
            paragraph={t('subtitle')}
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;