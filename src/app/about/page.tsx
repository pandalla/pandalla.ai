import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import AboutSectionThree from "@/components/About/AboutSectionThree";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Video from "@/components/Video";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pandalla.ai | Leading Synthetic Data and AI Solutions",
  description: "Pandalla.ai offers cutting-edge synthetic data generation and AI technologies to help businesses enhance data quality, protect privacy, and accelerate innovation. Explore our solutions and unlock the power of AI.",
  keywords: "synthetic data, artificial intelligence, AI solutions, data privacy, machine learning, Pandalla.ai",
  openGraph: {
    title: "Pandalla.ai - Pioneering Synthetic Data and AI Innovation",
    description: "Elevate your data strategy, safeguard privacy, and accelerate innovation with Pandalla.ai's state-of-the-art synthetic data and AI technologies.",
    images: [
      {
        url: "https://pandalla.ai/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pandalla.ai - Synthetic Data and AI Solutions",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PandallaAI',
    creator: '@PandallaAI',
    title: 'Pandalla.AI - Cutting-edge AI Research and Applications',
    description: 'Discover how Pandalla.AI is shaping the future of artificial intelligence with innovative solutions and expert insights.',
  },
}

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About Us"
        description="We are pioneers in the field of data synthesis, offering innovative solutions grounded in deep industry insights. Through advanced algorithms and extensive experience, we generate high-quality synthetic data that meets the needs of diverse industries. We believe that as data privacy regulations become stricter and AI rapidly evolves, synthetic data will be crucial for future data-driven decision-making. Our technology not only protects privacy but also enhances data usability and diversity, creating limitless possibilities for our clients."
      />
      <Video />
      <AboutSectionOne />
      {/* <AboutSectionTwo /> */}
      <AboutSectionThree />
    </>
  );
};

export default AboutPage;
