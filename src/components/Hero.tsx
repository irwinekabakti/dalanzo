import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ImgSlider1 from "../assets/slider-img-1.png";
import ImgSlider2 from "../assets/slider-img-3.png";

interface SlideProps {
  id: number;
  image: string;
  title: string;
}

const slides: SlideProps[] = [
  { id: 1, image: ImgSlider1, title: "Slide 1" },
  { id: 2, image: ImgSlider2, title: "Slide 2" },
  { id: 3, image: ImgSlider1, title: "Slide 2" },
  { id: 4, image: ImgSlider2, title: "Slide 2" },
];

const Hero: FC = () => {
  return (
    <div className="relative group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="w-full"
      >
        {slides.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="slide-content">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-64 object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
