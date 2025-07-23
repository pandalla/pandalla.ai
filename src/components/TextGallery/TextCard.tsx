import { useRouter, usePathname } from "next/navigation";

interface TextCardProps {
  data: {
    idx: number;
    category: string;
    type: 'math' | 'code';
    title: string;
    content: string;
    metadata?: any;
  };
}

const TextCard = ({ data }: TextCardProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    // Extract locale from current pathname
    const locale = pathname.split('/')[1] || 'en';
    router.push(`/${locale}/text-gallery/${data.type}/${data.idx}`);
  };

  const getTypeColor = (type: 'math' | 'code') => {
    return type === 'math' 
      ? 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20'
      : 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20';
  };

  const getTypeBadgeColor = (type: 'math' | 'code') => {
    return type === 'math'
      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
  };

  const getDifficultyInfo = () => {
    if (data.type === 'math' && data.metadata?.difficulty) {
      const diff = data.metadata.difficulty;
      return {
        level: diff.level || 'Unknown',
        complexity: diff.complexity || 0
      };
    }
    return null;
  };

  const getCodeLanguage = () => {
    if (data.type === 'code' && data.content) {
      // Try to detect language from code blocks
      const codeBlockMatch = data.content.match(/```(\w+)/);
      if (codeBlockMatch) {
        return codeBlockMatch[1];
      }
      // Fallback to template or category
      return data.metadata?.template || 'code';
    }
    return null;
  };

  const difficulty = getDifficultyInfo();
  const codeLanguage = getCodeLanguage();

  return (
    <div 
      className={`group cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br ${getTypeColor(data.type)} p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105`}
      onClick={handleClick}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${getTypeBadgeColor(data.type)}`}>
            {data.type.toUpperCase()}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            #{data.idx}
          </span>
        </div>
        
        {difficulty && (
          <div className="text-right">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {difficulty.level}
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full ${
                    i < difficulty.complexity / 2
                      ? 'bg-blue-400'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
        
        {codeLanguage && (
          <div className="text-right">
            <span className="rounded bg-green-500 px-2 py-1 text-xs font-medium text-white">
              {codeLanguage.toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Category */}
      <div className="mb-3">
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
          {data.category}
        </span>
      </div>

      {/* Content Preview */}
      <div className="mb-4">
        <h3 className="mb-2 text-lg font-semibold text-black dark:text-white line-clamp-2">
          {data.content.length > 120 ? data.content.substring(0, 120) + '...' : data.content}
        </h3>
      </div>

      {/* Metadata Tags */}
      <div className="space-y-2">
        {data.type === 'math' && data.metadata?.techniques && (
          <div className="flex flex-wrap gap-1">
            {data.metadata.techniques.slice(0, 3).map((technique: string, index: number) => (
              <span
                key={index}
                className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-800 dark:text-blue-200"
              >
                {technique}
              </span>
            ))}
            {data.metadata.techniques.length > 3 && (
              <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                +{data.metadata.techniques.length - 3} more
              </span>
            )}
          </div>
        )}

        {data.type === 'code' && data.metadata?.category && (
          <div className="flex flex-wrap gap-1">
            <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-700 dark:bg-green-800 dark:text-green-200">
              {data.metadata.category}
            </span>
            {data.metadata.template && (
              <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                {data.metadata.template}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Hover Effect */}
      <div className="mt-4 flex items-center justify-end opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Click to view details →
        </span>
      </div>
    </div>
  );
};

export default TextCard;