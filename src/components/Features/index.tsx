'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import createFeaturesData from "./featuresData";
import { animations } from '@/lib/animations';

const Features = () => {
  const t = useTranslations('Features');
  const featuresData = createFeaturesData(t);
  
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28 font-inter">
        <div className="container">
          <SectionTitle
            title={t('title')}
            paragraph={t('subtitle')}
            center
          />

          <motion.div 
            className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3"
            variants={animations.variants.staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, threshold: 0.1 }}
          >
            {featuresData.map((feature, index) => (
              <motion.div
                key={feature.id}
                variants={animations.variants.staggerItem}
                custom={index}
              >
                <SingleFeature feature={feature} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Features;