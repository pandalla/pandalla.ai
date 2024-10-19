import React from 'react';

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
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="relative mb-12 pb-6 border-t border-gray-200">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 px-4 py-2">
            <div className="text-purple-600 font-semibold text-base">Why Pandalla.AI?</div>
          </div>
        </div>
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2 mb-10 lg:mb-0">
            <div className="relative">
              <h2 className="mb-6 text-3xl font-bold text-black dark:text-white sm:text-4xl lg:text-3xl xl:text-4xl">
                We boost your project's efficiency and savings.
              </h2>
              <div className="w-20 h-1 bg-purple-600 mb-6"></div>
              <p className="mb-8 text-lg font-medium leading-relaxed text-body-color">
                Pandalla.ai helps you achieve remarkable improvements in project efficiency, time management, and cost savings.
              </p>
              {/* <a href="#" className="text-purple-600 hover:underline text-base font-semibold">
                Discover how we can help →
              </a> */}
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="grid grid-cols-2 gap-6">
              <MetricCard value="84%" description="Efficiency Increase" />
              <MetricCard value="1300+" description="Hours Saved Per Project" />
              <MetricCard value="$52K" description="Average Cost Savings" />
              <MetricCard value="1.4B+" description="Total Data Records Generated" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

<<<<<<< HEAD
export default AboutSectionTwo;
=======
export default AboutSectionThree;
>>>>>>> origin/video_init
