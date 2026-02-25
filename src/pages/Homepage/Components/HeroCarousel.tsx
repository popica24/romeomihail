import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { type FC } from "react";
//@ts-ignore
import ArrowLeftIcon from "../../../assets/svgs/ArrowLeft.svg?react";
//@ts-ignore
import ArrowRightIcon from "../../../assets/svgs/ArrowRight.svg?react";

//@ts-ignore
import "swiper/css";
//@ts-ignore
import "swiper/css/navigation";
//@ts-ignore
import "swiper/css/pagination";

interface HeroCarouselProps {
  images: string[];
}

const HeroCarousel: FC<HeroCarouselProps> = ({ images }) => {
  return (
    <div className="relative w-full h-[80vh] md:h-screen">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".swiper-btn--next",
          prevEl: ".swiper-btn--prev",
        }}
        className="w-full h-[80vh] md:h-screen homepage-swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={image} className="w-full h-full">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover object-center"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
            />
          </SwiperSlide>
        ))}

        <div className="absolute bottom-7 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/45 transition-colors cursor-pointer swiper-btn--prev hover:bg-black/70">
          <ArrowLeftIcon className="w-5 h-5 text-white" />
        </div>
        <div className="absolute bottom-7 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-black/45 transition-colors cursor-pointer swiper-btn--next hover:bg-black/70">
          <ArrowRightIcon className="w-5 h-5 text-white" />
        </div>
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
