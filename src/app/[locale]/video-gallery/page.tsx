import { Metadata } from "next";
import VideoGallery from "@/components/VideoGallery";

export const metadata: Metadata = {
  title: "Video Gallery | Pandalla AI",
  description: "Explore video gallery with annotations and metadata",
};

const VideoGalleryPage = () => {
  return (
    <>
      <VideoGallery />
    </>
  );
};

export default VideoGalleryPage;