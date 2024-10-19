import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import AboutSectionThree from "@/components/About/AboutSectionThree";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page | Free Next.js Template for Startup and SaaS",
  description: "This is About Page for Startup Nextjs Template",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About Us"
        description="We are pioneers in the field of data synthesis, offering innovative solutions grounded in deep industry insights. Through advanced algorithms and extensive experience, we generate high-quality synthetic data that meets the needs of diverse industries. We believe that as data privacy regulations become stricter and AI rapidly evolves, synthetic data will be crucial for future data-driven decision-making. Our technology not only protects privacy but also enhances data usability and diversity, creating limitless possibilities for our clients."
      />
      <AboutSectionOne />
      {/* <AboutSectionTwo /> */}
      <AboutSectionThree />
    </>
  );
};

export default AboutPage;
