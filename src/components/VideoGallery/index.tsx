"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/Common/Breadcrumb";
import VideoCard from "./VideoCard";

interface VideoData {
  folder: string;
  videoFile: string;
  gridImage: string;
  thumbImage: string;
  metadata: any;
  annotations: any;
}

const VideoGallery = () => {
  const t = useTranslations();
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideoData();
  }, []);

  const loadVideoData = async () => {
    try {
      const videoFolders = [
        "10005907",
        "10006282", 
        "10006381",
        "10008763",
        "10012279",
        "10012741",
        "10034309",
        "10039769",
        "10039773",
        "10039776",
        "10039847"
      ];

      const videoData: VideoData[] = [];

      for (const folder of videoFolders) {
        try {
          const response = await fetch(`/api/video-files/${folder}`);
          if (response.ok) {
            const fileData = await response.json();
            videoData.push({
              folder,
              videoFile: fileData.videoFile,
              gridImage: fileData.gridImage,
              thumbImage: fileData.thumbImage,
              metadata: fileData.metadata,
              annotations: fileData.annotations
            });
          }
        } catch (error) {
          console.log(`Failed to load data for ${folder}:`, error);
        }
      }

      setVideos(videoData);
    } catch (error) {
      console.error("Failed to load video data:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Breadcrumb
        pageName="Video Gallery"
        description="Explore our collection of annotated video samples with detailed metadata and visual analysis"
      />

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="mx-auto mb-[60px] max-w-[510px] text-center">
            <span className="mb-2 block text-lg font-semibold text-primary">
              Video Collection
            </span>
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[40px]">
              Video Gallery
            </h2>
            <p className="text-base text-body-color dark:text-body-color-dark">
              Browse through our curated collection of video samples with rich annotations, 
              metadata, and visual analysis for AI training and research purposes.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {videos.map((video, index) => (
                <VideoCard
                  key={video.folder}
                  video={video}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default VideoGallery;