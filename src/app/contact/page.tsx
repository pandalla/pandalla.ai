import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page | Free Next.js Template for Startup and SaaS",
  description: "This is Contact Page for Startup Nextjs Template",
  // other metadata
};

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
