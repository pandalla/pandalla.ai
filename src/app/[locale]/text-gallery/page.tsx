import { Metadata } from "next";
import TextGallery from "@/components/TextGallery";

export const metadata: Metadata = {
  title: "Text Gallery | Pandalla AI",
  description: "Explore text gallery with math and code samples, solutions and detailed analysis",
};

const TextGalleryPage = () => {
  return (
    <>
      <TextGallery />
    </>
  );
};

export default TextGalleryPage;