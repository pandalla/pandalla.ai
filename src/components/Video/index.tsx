"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from 'next-intl';
import SectionTitle from "../Common/SectionTitle";
import ScrollAnimation from "../Common/ScrollAnimation";

import ModalVideo from "react-modal-video";

const Video = () => {
  const [isOpen, setOpen] = useState(false);
  const t = useTranslations('Video');

  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28 font-inter">
      <div className="container">
        <SectionTitle
          title={t('title')}
          paragraph={t('subtitle')}
          center
          mb="80px"
        />

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <ScrollAnimation direction="scale" delay={0.2}>
              <div className="mx-auto max-w-[770px] overflow-hidden rounded-md group">
                <div className="relative aspect-[77/40] items-center justify-center">
                  <Image 
                    src="/images/video/video.jpg" 
                    alt="video image" 
                    fill 
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center">
                    <button
                      aria-label="video play button"
                      onClick={() => setOpen(true)}
                      className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white bg-opacity-75 text-primary transition-all duration-300 hover:bg-opacity-100 hover:scale-110 active:scale-95"
                    >
                      <svg
                        width="16"
                        height="18"
                        viewBox="0 0 16 18"
                        className="fill-current"
                      >
                        <path d="M15.5 8.13397C16.1667 8.51888 16.1667 9.48112 15.5 9.86602L2 17.6603C1.33333 18.0452 0.499999 17.564 0.499999 16.7942L0.5 1.20577C0.5 0.43597 1.33333 -0.0451549 2 0.339745L15.5 8.13397Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>

      <ModalVideo
        channel="youtube"
        autoplay={true}
        start={true}
        isOpen={isOpen}
        videoId="USOyDWMy8NM"
        onClose={() => setOpen(false)}
      />
      <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url(/images/video/shape.svg)] bg-cover bg-center bg-no-repeat"></div>
    </section>
  );
};

export default Video;