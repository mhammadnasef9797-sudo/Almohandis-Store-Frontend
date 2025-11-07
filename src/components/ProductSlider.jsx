import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ProductCard from './ProductCard'; // نستدعي بطاقة المنتج التي أنشأناها
import './ProductSlider.css';

function ProductSlider({ title, products }) {
  if (!products || products.length === 0) {
    return null; // لا تعرض أي شيء إذا لم تكن هناك منتجات
  }

  return (
    <div className="product-slider-section">
      <h2 className="section-title">{title}</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={2} // For mobile
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        className="product-swiper"
      >
        {products.map(product => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductSlider;