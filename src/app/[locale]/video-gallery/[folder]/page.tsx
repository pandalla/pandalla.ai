import { Metadata } from "next";
import VideoDetail from "@/components/VideoGallery/VideoDetail";

interface Props {
  params: {
    folder: string;
    locale: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Video ${params.folder} | Pandalla AI`,
    description: `Detailed analysis and metadata for video ${params.folder}`,
  };
}

const VideoDetailPage = ({ params }: Props) => {
  return (
    <>
      <VideoDetail folder={params.folder} />
    </>
  );
};

export default VideoDetailPage;