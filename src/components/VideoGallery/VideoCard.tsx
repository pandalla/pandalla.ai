import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

interface VideoCardProps {
  video: {
    folder: string;
    videoFile: string;
    gridImage: string;
    thumbImage: string;
    metadata: any;
    annotations: any;
  };
}

const VideoCard = ({ video }: VideoCardProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    // Extract locale from current pathname
    const locale = pathname.split('/')[1] || 'en';
    router.push(`/${locale}/video-gallery/${video.folder}`);
  };

  return (
    <div 
      className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-dark"
      onClick={handleClick}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={`/videos/${video.folder}/${video.thumbImage}`}
          alt={`Video thumbnail for ${video.folder}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-20" />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="rounded-full bg-white bg-opacity-90 p-3 shadow-lg">
            <svg className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute bottom-2 right-2 rounded bg-black bg-opacity-70 px-2 py-1 text-xs text-white">
          {video.metadata?.duration ? `${video.metadata.duration.toFixed(1)}s` : "N/A"}
        </div>
        
        {/* Resolution badge */}
        <div className="absolute top-2 left-2 rounded bg-black bg-opacity-70 px-2 py-1 text-xs text-white">
          {video.metadata?.width}×{video.metadata?.height}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
          Video {video.folder}
        </h3>
        
        {video.metadata?.content && (
          <p className="mb-3 line-clamp-2 text-sm text-body-color dark:text-body-color-dark">
            {video.metadata.content.substring(0, 120)}...
          </p>
        )}

        <div className="flex flex-wrap gap-2 mb-3">
          {video.metadata?.tags?.slice(0, 3).map((tag: string, index: number) => (
            <span
              key={index}
              className="rounded-full bg-primary bg-opacity-10 px-2 py-1 text-xs text-primary"
            >
              {tag.replace(/_/g, ' ')}
            </span>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-body-color dark:text-body-color-dark">
            <span>Size: {video.metadata?.size}MB</span>
            <span>{video.metadata?.codec}</span>
          </div>
          
          {video.metadata?.category && (
            <div className="text-xs text-body-color dark:text-body-color-dark">
              <span className="font-medium">Category: </span>
              {video.metadata.category.level_1?.replace(/_/g, ' ')} → {video.metadata.category.level_2?.replace(/_/g, ' ')}
            </div>
          )}

          {video.metadata?.motion_status && (
            <div className="flex items-center gap-2 text-xs">
              <span className={`rounded-full px-2 py-1 ${
                video.metadata.slow_motion_status 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              }`}>
                {video.metadata.slow_motion_status ? 'Slow Motion' : 'Normal Speed'}
              </span>
              <span className="text-body-color dark:text-body-color-dark">
                Motion: {video.metadata.motion_status.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;