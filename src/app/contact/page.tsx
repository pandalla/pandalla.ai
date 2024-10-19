import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

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
        url: "https://pandalla.ai/images/og-image.png",
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

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Us"
        description="Connect with us to explore how our innovative data synthesis solutions can transform your business. Whether you're looking to enhance data privacy, improve AI model training, or gain deeper insights without compromising sensitive information, our team is here to help. Let's discuss how we can tailor our cutting-edge technology to meet your unique needs and drive your data-driven initiatives forward."
      />

      <Contact />
    </>
  );
};

export default ContactPage;
