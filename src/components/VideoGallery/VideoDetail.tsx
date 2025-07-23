"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Breadcrumb from "@/components/Common/Breadcrumb";

interface VideoData {
  folder: string;
  videoFile: string;
  gridImage: string;
  thumbImage: string;
  metadata: any;
  annotations: any;
}

interface VideoDetailProps {
  folder: string;
}

const VideoDetail = ({ folder }: VideoDetailProps) => {
  const router = useRouter();
  const [video, setVideo] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadVideoData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/video-files/${folder}`);
      if (!response.ok) {
        throw new Error("Failed to load video data");
      }
      const fileData = await response.json();
      setVideo({
        folder,
        videoFile: fileData.videoFile,
        gridImage: fileData.gridImage,
        thumbImage: fileData.thumbImage,
        metadata: fileData.metadata,
        annotations: fileData.annotations
      });
    } catch (error) {
      console.error("Failed to load video data:", error);
      setError("Failed to load video data");
    } finally {
      setLoading(false);
    }
  }, [folder]);

  useEffect(() => {
    loadVideoData();
  }, [loadVideoData]);

  const getAnnotationValue = (key: string) => {
    if (!video?.annotations) return null;
    const videoKey = Object.keys(video.annotations)[0];
    return video.annotations[videoKey]?.annotation?.[key];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex h-96 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex h-96 items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-red-600">Error loading video data</p>
            <button
              onClick={() => router.back()}
              className="mt-4 rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary-dark"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <Breadcrumb
        pageName={`Video ${folder}`}
        description="Detailed video analysis with comprehensive metadata and annotations"
      />

      {/* Header Section */}
      <section className="pb-8 pt-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-black dark:text-white">
                Video {folder}
              </h1>
              <p className="text-body-color dark:text-body-color-dark">
                Comprehensive analysis and metadata
              </p>
            </div>
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-gray-600 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Gallery
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-5">
            {/* Left Column - Video and Visual Content */}
            <div className="space-y-8 lg:col-span-1 xl:col-span-3">
              {/* Video Player */}
              <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-dark">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary bg-opacity-10">
                    <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-black dark:text-white">
                    Video Preview
                  </h2>
                </div>
                <div className="relative">
                  <video
                    className="w-full rounded-xl shadow-lg"
                    controls
                    poster={`/videos/${video.folder}/${video.thumbImage}`}
                    preload="metadata"
                  >
                    <source src={`/videos/${video.folder}/${video.videoFile}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              {/* Frame Grid Analysis */}
              <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-dark">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 bg-opacity-10">
                    <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-black dark:text-white">
                    Frame Analysis Grid
                  </h2>
                </div>
                <div className="relative">
                  <Image
                    src={`/videos/${video.folder}/${video.gridImage}`}
                    alt="Frame grid analysis"
                    width={1200}
                    height={800}
                    className="w-full rounded-xl shadow-lg"
                    unoptimized
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Metadata and Analysis */}
            <div className="space-y-6 lg:col-span-1 xl:col-span-2">
              {/* Technical Specifications */}
              <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 shadow-lg dark:from-purple-900/20 dark:to-pink-900/20">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500 bg-opacity-10">
                    <svg className="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-black dark:text-white">
                    Technical Specifications
                  </h3>
                </div>
                
                {/* Key Metrics */}
                <div className="mb-6 grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-white/70 p-3 text-center dark:bg-gray-900/70">
                    <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                      {video.metadata?.duration?.toFixed(1)}s
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Duration</div>
                  </div>
                  <div className="rounded-xl bg-white/70 p-3 text-center dark:bg-gray-900/70">
                    <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                      {video.metadata?.size}MB
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">File Size</div>
                  </div>
                  <div className="rounded-xl bg-white/70 p-3 text-center dark:bg-gray-900/70">
                    <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                      {video.metadata?.bps}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Mbps</div>
                  </div>
                </div>

                {/* Detailed Specs */}
                <div className="grid grid-cols-1 gap-3">
                  <div className="rounded-lg bg-white/50 p-3 dark:bg-gray-900/50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Resolution</span>
                      <span className="font-semibold text-black dark:text-white">
                        {video.metadata?.width}×{video.metadata?.height}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                        {video.metadata?.aspect_ratio}
                      </span>
                      <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                        {video.metadata?.codec}
                      </span>
                    </div>
                  </div>
                  
                  <div className="rounded-lg bg-white/50 p-3 dark:bg-gray-900/50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Motion Analysis</span>
                      <span className="font-semibold text-black dark:text-white">
                        {video.metadata?.motion_status?.toFixed(1)}
                      </span>
                    </div>
                    <div className="mt-1">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                        video.metadata?.slow_motion_status 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                        {video.metadata?.slow_motion_status ? 'Slow Motion' : 'Normal Speed'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Content Analysis */}
              <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-lg dark:from-green-900/20 dark:to-emerald-900/20">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500 bg-opacity-10">
                    <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-black dark:text-white">
                    AI Content Analysis
                  </h3>
                </div>
                
                <div className="space-y-3">
                  <div className="rounded-xl bg-white/70 p-4 dark:bg-gray-900/70">
                    <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-green-600 dark:text-green-400">
                      Content Description
                    </h4>
                    <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                      {video.metadata?.content || "No description available"}
                    </p>
                  </div>
                  
                  {(video.metadata?.style || video.metadata?.suitable_content_types) && (
                    <div className="grid grid-cols-1 gap-3">
                      {video.metadata?.style && (
                        <div className="rounded-lg bg-white/60 p-3 dark:bg-gray-900/60">
                          <div className="mb-1 text-xs font-medium uppercase tracking-wide text-green-600 dark:text-green-400">Visual Style</div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{video.metadata.style}</p>
                        </div>
                      )}
                      {video.metadata?.suitable_content_types && (
                        <div className="rounded-lg bg-white/60 p-3 dark:bg-gray-900/60">
                          <div className="mb-1 text-xs font-medium uppercase tracking-wide text-green-600 dark:text-green-400">Use Cases</div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{video.metadata.suitable_content_types}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Classification & Context */}
              <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 p-6 shadow-lg dark:from-orange-900/20 dark:to-red-900/20">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500 bg-opacity-10">
                    <svg className="h-5 w-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-black dark:text-white">
                    Classification & Tags
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {/* Category Hierarchy */}
                  <div className="rounded-xl bg-white/70 p-3 dark:bg-gray-900/70">
                    <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400">
                      Category
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-orange-100 px-2 py-1 text-xs font-medium text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                        {video.metadata?.category?.level_1?.replace(/_/g, ' ') || "N/A"}
                      </span>
                      <span className="text-gray-400">→</span>
                      <span className="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
                        {video.metadata?.category?.level_2?.replace(/_/g, ' ') || "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Context Grid */}
                  <div className="grid grid-cols-1 gap-2">
                    <div className="rounded-lg bg-white/60 p-2 dark:bg-gray-900/60">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-orange-600 dark:text-orange-400">Temporal</span>
                        <span className="text-xs font-semibold text-black dark:text-white">
                          {video.metadata?.temporal_context || "Universal"}
                        </span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-white/60 p-2 dark:bg-gray-900/60">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-orange-600 dark:text-orange-400">Geographic</span>
                        <span className="text-xs font-semibold text-black dark:text-white">
                          {video.metadata?.geographical_relevance || "Universal"}
                        </span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-white/60 p-2 dark:bg-gray-900/60">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-orange-600 dark:text-orange-400">Cultural</span>
                        <span className="text-xs font-semibold text-black dark:text-white">
                          {video.metadata?.other_cultural_features || "Universal"}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Tags */}
                  {video.metadata?.tags && video.metadata.tags.length > 0 && (
                    <div className="rounded-xl bg-white/70 p-3 dark:bg-gray-900/70">
                      <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400">
                        Tags
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {video.metadata.tags.slice(0, 6).map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="rounded-full bg-gradient-to-r from-orange-100 to-red-100 px-2 py-1 text-xs font-medium text-orange-800 dark:from-orange-900 dark:to-red-900 dark:text-orange-200"
                          >
                            {tag.replace(/_/g, ' ')}
                          </span>
                        ))}
                        {video.metadata.tags.length > 6 && (
                          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                            +{video.metadata.tags.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Scene Analysis */}
              {getAnnotationValue('description') && (
                <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-6 shadow-lg dark:from-indigo-900/20 dark:to-purple-900/20">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500 bg-opacity-10">
                      <svg className="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-black dark:text-white">
                      Scene Analysis
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    {/* Scene Description */}
                    <div className="rounded-xl bg-white/70 p-3 dark:bg-gray-900/70">
                      <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                        Description
                      </h4>
                      <p className="mb-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                        {getAnnotationValue('description')?.content}
                      </p>
                      {getAnnotationValue('description')?.visual_characteristics && (
                        <div className="border-t border-gray-200 pt-2 dark:border-gray-700">
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {getAnnotationValue('description')?.visual_characteristics}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Scene Details */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-lg bg-white/60 p-2 dark:bg-gray-900/60">
                        <div className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Setting</div>
                        <div className="text-xs font-semibold text-black dark:text-white">{getAnnotationValue('scene')}</div>
                      </div>
                      <div className="rounded-lg bg-white/60 p-2 dark:bg-gray-900/60">
                        <div className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Characters</div>
                        <div className="text-xs font-semibold text-black dark:text-white">{getAnnotationValue('characters')}</div>
                      </div>
                    </div>

                    {/* Environment & Style */}
                    {getAnnotationValue('time_weather') && (
                      <div className="grid grid-cols-1 gap-2">
                        <div className="rounded-lg bg-white/60 p-2 dark:bg-gray-900/60">
                          <div className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Time & Weather</div>
                          <div className="text-xs font-semibold text-black dark:text-white">
                            {getAnnotationValue('time_weather')?.time_of_day} | {getAnnotationValue('time_weather')?.weather}
                          </div>
                        </div>
                        <div className="rounded-lg bg-white/60 p-2 dark:bg-gray-900/60">
                          <div className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Visual Style</div>
                          <div className="text-xs font-semibold text-black dark:text-white">
                            {getAnnotationValue('color_tone')} | {getAnnotationValue('visual_style')}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions & Objects */}
                    {(getAnnotationValue('actions') || getAnnotationValue('objects')) && (
                      <div className="space-y-2">
                        {getAnnotationValue('actions') && (
                          <div className="rounded-lg bg-white/60 p-3 dark:bg-gray-900/60">
                            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                              Actions
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {getAnnotationValue('actions')?.slice(0, 4).map((action: string, index: number) => (
                                <span key={index} className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                  {action}
                                </span>
                              ))}
                              {getAnnotationValue('actions')?.length > 4 && (
                                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                                  +{getAnnotationValue('actions').length - 4}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {getAnnotationValue('objects') && (
                          <div className="rounded-lg bg-white/60 p-3 dark:bg-gray-900/60">
                            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                              Objects
                            </h4>
                            <div className="flex flex-wrap gap-1">
                              {getAnnotationValue('objects')?.slice(0, 4).map((obj: string, index: number) => (
                                <span key={index} className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800 dark:bg-green-900 dark:text-green-200">
                                  {obj}
                                </span>
                              ))}
                              {getAnnotationValue('objects')?.length > 4 && (
                                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                                  +{getAnnotationValue('objects').length - 4}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Technical Details */}
                    {(getAnnotationValue('continent_groups') || getAnnotationValue('camera_technique')) && (
                      <div className="grid grid-cols-1 gap-2">
                        {getAnnotationValue('continent_groups') && (
                          <div className="rounded-lg bg-white/60 p-2 dark:bg-gray-900/60">
                            <div className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Demographics</div>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {getAnnotationValue('continent_groups')?.slice(0, 3).map((group: string, index: number) => (
                                <span key={index} className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                  {group}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {getAnnotationValue('camera_technique') && (
                          <div className="rounded-lg bg-white/60 p-2 dark:bg-gray-900/60">
                            <div className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Camera</div>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {getAnnotationValue('camera_technique')?.slice(0, 3).map((technique: string, index: number) => (
                                <span key={index} className="rounded bg-orange-100 px-2 py-1 text-xs text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                                  {technique}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Metadata & Source */}
              <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-slate-100 p-6 shadow-lg dark:from-gray-800 dark:to-slate-900">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-500 bg-opacity-10">
                    <svg className="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-black dark:text-white">
                    Metadata & Source
                  </h3>
                </div>

                <div className="space-y-3">
                  {/* File Information */}
                  <div className="rounded-xl bg-white/70 p-3 dark:bg-gray-900/70">
                    <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                      File Info
                    </h4>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600 dark:text-gray-400">ID</span>
                        <span className="text-xs font-medium text-black dark:text-white">{folder}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600 dark:text-gray-400">Face Detection</span>
                        <span className="text-xs font-medium text-black dark:text-white">
                          {video.metadata?.face_detection?.replace(/_/g, ' ') || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Original Source */}
                  {video.metadata?.pexels_url && (
                    <div className="rounded-xl bg-white/70 p-3 dark:bg-gray-900/70">
                      <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                        Source
                      </h4>
                      <a
                        href={video.metadata.pexels_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded bg-primary px-3 py-1 text-xs text-white transition-colors hover:bg-primary-dark"
                      >
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Pexels
                      </a>
                    </div>
                  )}

                  {/* AI Processing Statistics */}
                  {video.metadata?.usage && (
                    <div className="rounded-xl bg-white/70 p-3 dark:bg-gray-900/70">
                      <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                        AI Processing
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-center">
                          <div className="text-sm font-bold text-gray-700 dark:text-gray-300">
                            {video.metadata.usage.total_tokens?.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-bold text-gray-700 dark:text-gray-300">
                            {video.metadata.usage.completion_tokens?.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Completion</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VideoDetail;