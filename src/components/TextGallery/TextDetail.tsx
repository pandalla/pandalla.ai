"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Common/Breadcrumb";

interface TextDetailProps {
  type: 'math' | 'code';
  idx: string;
}

interface TextMessage {
  content: string;
  role: 'user' | 'assistant';
}

interface TextData {
  idx: number;
  type: 'math' | 'code';
  text: TextMessage[];
  metadata?: any;
}

const TextDetail = ({ type, idx }: TextDetailProps) => {
  const router = useRouter();
  const [data, setData] = useState<TextData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTextData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/text-files/${type}/${idx}`);
      if (!response.ok) {
        throw new Error("Failed to load text data");
      }
      const textData = await response.json();
      setData({
        idx: parseInt(idx),
        type,
        text: textData.text || [],
        metadata: textData
      });
    } catch (error) {
      console.error("Failed to load text data:", error);
      setError("Failed to load text data");
    } finally {
      setLoading(false);
    }
  }, [type, idx]);

  useEffect(() => {
    loadTextData();
  }, [loadTextData]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-red-600">Error</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {error || "Text data not found"}
          </p>
          <button
            onClick={() => router.back()}
            className="mt-4 rounded-lg bg-primary px-4 py-2 text-white transition-colors hover:bg-primary-dark"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const getTypeColor = (type: 'math' | 'code') => {
    return type === 'math' ? 'blue' : 'green';
  };

  const color = getTypeColor(type);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <Breadcrumb
        pageName={`${type.toUpperCase()} #${idx}`}
        description={`Detailed analysis and solution for ${type} problem #${idx}`}
      />

      {/* Header Section */}
      <section className="pb-8 pt-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-black dark:text-white">
                {type.toUpperCase()} Problem #{idx}
              </h1>
              <p className="text-body-color dark:text-body-color-dark">
                Comprehensive solution and analysis
              </p>
            </div>
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-gray-600 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              ← Back to Gallery
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column - Conversation */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-dark">
                <div className="mb-6 flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${color}-500 bg-opacity-10`}>
                    <span className={`text-${color}-600 dark:text-${color}-400`}>
                      {type === 'math' ? '∑' : '</>'}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-black dark:text-white">
                    Problem & Solution
                  </h2>
                </div>

                <div className="space-y-6">
                  {data.text.map((message, index) => (
                    message.content && (
                      <div
                        key={index}
                        className={`rounded-xl p-6 ${
                          message.role === 'user'
                            ? `bg-${color}-50 border-l-4 border-${color}-500 dark:bg-${color}-900/20`
                            : 'bg-gray-50 border-l-4 border-gray-300 dark:bg-gray-800/50'
                        }`}
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <span className={`text-sm font-semibold ${
                            message.role === 'user' 
                              ? `text-${color}-600 dark:text-${color}-400`
                              : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            {message.role === 'user' ? 'Question' : 'Solution'}
                          </span>
                        </div>
                        <div className="prose max-w-none dark:prose-invert">
                          {message.content.includes('```') ? (
                            // Code block formatting
                            <div 
                              className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700 dark:text-gray-300"
                              dangerouslySetInnerHTML={{
                                __html: message.content
                                  .replace(/```(\w+)?\n?([\s\S]*?)```/g, '<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto"><code class="language-$1">$2</code></pre>')
                                  .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">$1</code>')
                                  .replace(/\n/g, '<br>')
                              }}
                            />
                          ) : (
                            // Regular text formatting
                            <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                              {message.content}
                            </pre>
                          )}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Metadata */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div className={`rounded-2xl bg-gradient-to-br from-${color}-50 to-${color}-100 p-6 shadow-lg dark:from-${color}-900/20 dark:to-${color}-800/20`}>
                <div className="mb-4 flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-${color}-500 bg-opacity-10`}>
                    <span className={`text-${color}-600 dark:text-${color}-400`}>ℹ</span>
                  </div>
                  <h3 className={`text-lg font-semibold text-${color}-800 dark:text-${color}-200`}>
                    Basic Information
                  </h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Type</span>
                    <span className={`rounded bg-${color}-100 px-2 py-1 text-xs font-medium text-${color}-800 dark:bg-${color}-800 dark:text-${color}-200`}>
                      {type.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Index</span>
                    <span className="font-semibold text-black dark:text-white">#{data.idx}</span>
                  </div>
                </div>
              </div>

              {/* Math-specific metadata */}
              {type === 'math' && data.metadata && (
                <>
                  {/* Difficulty & Category */}
                  {(data.metadata.problem_type || data.metadata.difficulty) && (
                    <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 shadow-lg dark:from-purple-900/20 dark:to-pink-900/20">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500 bg-opacity-10">
                          <span className="text-purple-600 dark:text-purple-400">📊</span>
                        </div>
                        <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200">
                          Classification
                        </h3>
                      </div>
                      
                      <div className="space-y-3">
                        {data.metadata.problem_type && (
                          <div>
                            <div className="text-xs font-medium text-purple-600 dark:text-purple-400">Category</div>
                            <div className="text-sm font-semibold text-black dark:text-white">
                              {data.metadata.problem_type}
                              {data.metadata.sub_type && ` • ${data.metadata.sub_type}`}
                            </div>
                          </div>
                        )}
                        
                        {data.metadata.difficulty && (
                          <div>
                            <div className="text-xs font-medium text-purple-600 dark:text-purple-400">Difficulty</div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-black dark:text-white">
                                {data.metadata.difficulty.level}
                              </span>
                              <div className="flex items-center gap-1">
                                {[...Array(10)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`h-1.5 w-1.5 rounded-full ${
                                      i < data.metadata.difficulty.complexity
                                        ? 'bg-purple-400'
                                        : 'bg-gray-200 dark:bg-gray-700'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">
                                ({data.metadata.difficulty.complexity}/10)
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Techniques & Knowledge Points */}
                  {(data.metadata.techniques || data.metadata.knowledge_points) && (
                    <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 p-6 shadow-lg dark:from-orange-900/20 dark:to-red-900/20">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 bg-opacity-10">
                          <span className="text-orange-600 dark:text-orange-400">🔧</span>
                        </div>
                        <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200">
                          Techniques & Knowledge
                        </h3>
                      </div>
                      
                      <div className="space-y-3">
                        {data.metadata.techniques && (
                          <div>
                            <div className="mb-2 text-xs font-medium text-orange-600 dark:text-orange-400">Techniques</div>
                            <div className="flex flex-wrap gap-1">
                              {data.metadata.techniques.map((technique: string, index: number) => (
                                <span
                                  key={index}
                                  className="rounded bg-orange-100 px-2 py-1 text-xs text-orange-800 dark:bg-orange-800 dark:text-orange-200"
                                >
                                  {technique}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {data.metadata.knowledge_points && (
                          <div>
                            <div className="mb-2 text-xs font-medium text-orange-600 dark:text-orange-400">Knowledge Points</div>
                            <div className="flex flex-wrap gap-1">
                              {data.metadata.knowledge_points.map((point: string, index: number) => (
                                <span
                                  key={index}
                                  className="rounded bg-red-100 px-2 py-1 text-xs text-red-800 dark:bg-red-800 dark:text-red-200"
                                >
                                  {point}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Code-specific metadata */}
              {type === 'code' && data.metadata && (
                <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-lg dark:from-green-900/20 dark:to-emerald-900/20">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500 bg-opacity-10">
                      <span className="text-green-600 dark:text-green-400">💻</span>
                    </div>
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                      Code Information
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    {data.metadata.category && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Category</span>
                        <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-800 dark:text-green-200">
                          {data.metadata.category}
                        </span>
                      </div>
                    )}
                    {data.metadata.template && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Template</span>
                        <span className="rounded bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-800 dark:text-emerald-200">
                          {data.metadata.template}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TextDetail;