// 1. Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// 2. Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
// 3. Import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import './HeroSlider.css'; // سننشئه بعد قليل

function HeroSlider() {
  // افترض أن هذه هي صور البانرات الرئيسية. ضع مسارات صورك هنا.
  const slides = [
    '/img/img/img3/b7.png',
    '/img/img/img3/b7.png',
  ];

  return (
    <div className="hero-slider-container">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img src={slide} alt={`Slide ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HeroSlider;