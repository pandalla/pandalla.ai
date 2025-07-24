"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/Common/Breadcrumb";
import TextCard from "./TextCard";

interface TextData {
  idx: number;
  category: string;
  type: 'math' | 'code';
  title: string;
  content: string;
  metadata?: any;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

const TextGallery = () => {
  const t = useTranslations('TextGallery');
  const [textData, setTextData] = useState<TextData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'math' | 'code'>('all');
  const [loading, setLoading] = useState(true);
  const [mathPagination, setMathPagination] = useState<PaginationInfo | null>(null);
  const [codePagination, setCodePagination] = useState<PaginationInfo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const loadTextData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Load math data with pagination
      const mathResponse = await fetch(`/api/text-files/math?page=${currentPage}&limit=50`);
      const mathResult = mathResponse.ok ? await mathResponse.json() : { data: [], pagination: null };
      
      // Load code data with pagination
      const codeResponse = await fetch(`/api/text-files/code?page=${currentPage}&limit=50`);
      const codeResult = codeResponse.ok ? await codeResponse.json() : { data: [], pagination: null };
      
      // Store pagination info
      setMathPagination(mathResult.pagination);
      setCodePagination(codeResult.pagination);
      
      // Format and combine data
      const mathData: TextData[] = (mathResult.data || []).map((item: any) => ({
        idx: item.idx,
        category: item.problem_type || 'Math',
        type: 'math' as const,
        title: item.text[0]?.content?.substring(0, 100) + '...' || 'Math Problem',
        content: item.text[0]?.content || '',
        metadata: item
      }));
      
      const codeData: TextData[] = (codeResult.data || []).map((item: any) => ({
        idx: item.idx,
        category: item.category || 'Coding',
        type: 'code' as const,
        title: item.text[0]?.content?.substring(0, 100) + '...' || 'Code Problem',
        content: item.text[0]?.content || '',
        metadata: item
      }));
      
      const combinedData = [...mathData, ...codeData];
      setTextData(combinedData);
    } catch (error) {
      console.error("Failed to load text data:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    loadTextData();
  }, [loadTextData]);

  const filteredData = textData.filter(item => 
    selectedCategory === 'all' || item.type === selectedCategory
  );

  const getTotalCount = (category: 'all' | 'math' | 'code') => {
    if (category === 'all') {
      return (mathPagination?.total || 0) + (codePagination?.total || 0);
    } else if (category === 'math') {
      return mathPagination?.total || 0;
    } else {
      return codePagination?.total || 0;
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Breadcrumb
        pageName={t('title')}
        description={t('subtitle')}
      />

      <section className="pb-[120px] pt-[120px]">
        <div className="container">
          <div className="mx-auto mb-[60px] max-w-[510px] text-center">
            <span className="mb-2 block text-lg font-semibold text-primary">
              {t('pageTitle')}
            </span>
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[40px]">
              {t('title')}
            </h2>
            <p className="text-base text-body-color dark:text-body-color-dark">
              {t('pageSubtitle')}
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-8 flex justify-center">
            <div className="flex gap-4">
              {(['all', 'math', 'code'] as const).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-lg px-6 py-2 text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                  <span className="ml-2 text-xs opacity-75">
                    ({getTotalCount(category)})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredData.map((item) => (
                <TextCard
                  key={`${item.type}-${item.idx}`}
                  data={item}
                />
              ))}
            </div>
          )}

          {!loading && filteredData.length === 0 && (
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400">
                No text data found for the selected category.
              </p>
            </div>
          )}

          {/* Pagination */}
          {!loading && filteredData.length > 0 && (mathPagination?.totalPages > 1 || codePagination?.totalPages > 1) && (
            <div className="mt-12 flex justify-center">
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                  Previous
                </button>
                
                <span className="flex items-center px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                  Page {currentPage} of {Math.max(mathPagination?.totalPages || 1, codePagination?.totalPages || 1)}
                </span>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= Math.max(mathPagination?.totalPages || 1, codePagination?.totalPages || 1)}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default TextGallery;