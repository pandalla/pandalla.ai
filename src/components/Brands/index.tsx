"use client";
import { Brand } from "@/types/brand";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import brandsData from "./brandsData";
import { useEffect, useRef } from "react";

const Brands = () => {
  const t = useTranslations('Brands');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const scrollContent = scrollContainer.firstElementChild;
      if (scrollContent) {
        scrollContainer.appendChild(scrollContent.cloneNode(true));
      }
    }

    const scroll = () => {
      if (scrollContainer) {
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += 1;
        }
      }
    };

    const scrollInterval = setInterval(scroll, 30);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <section className="pt-8 pb-8 overflow-hidden">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('title')}
          </h2>
        </div>
        <div 
          ref={scrollRef}
          className="flex overflow-hidden"
          style={{
            width: '100%',
            whiteSpace: 'nowrap',
          }}
        >
          <div 
            className="flex"
            style={{
              animation: 'scroll 30s linear infinite',
              animationPlayState: 'running',
            }}
          >
            {brandsData.map((brand) => (
              <SingleBrand key={brand.id} brand={brand} />
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default Brands;

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { href, image, imageLight, name } = brand;

  return (
    <div className="inline-flex items-center justify-center p-2 sm:p-3" style={{ width: '150px' }}>
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="relative w-full h-10 sm:h-12 opacity-70 transition hover:opacity-100 dark:opacity-60 dark:hover:opacity-100"
      >
        <Image 
          src={imageLight} 
          alt={name} 
          fill 
          style={{ objectFit: 'contain', objectPosition: 'center' }} 
          className="hidden dark:block"
        />
        <Image 
          src={image} 
          alt={name} 
          fill 
          style={{ objectFit: 'contain', objectPosition: 'center' }} 
          className="block dark:hidden"
        />
      </a>
    </div>
  );
};