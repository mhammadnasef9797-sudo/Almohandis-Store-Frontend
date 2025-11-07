import { useState, useEffect } from 'react';
import axios from 'axios';
import HeroSlider from '../components/HeroSlider';
import OfferBanners from '../components/OfferBanners';
import ProductSlider from '../components/ProductSlider';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // ملاحظة: هذا الطلب سيعمل فقط إذا كان المستخدم مسجلاً دخوله.
        // لاحقاً، يمكننا إنشاء endpoint مخصص في الـ API للمنتجات المعروضة
        // لا يتطلب تسجيل دخول.
        const response = await axios.get('http://localhost:5297/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Could not fetch products for homepage. This might be because you are not logged in.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // فلترة المنتجات حسب الفئة (مثال)
  // يمكنك تغيير هذه الفئات لتتطابق مع الفئات الموجودة في قاعدة بياناتك
  const turbinProducts = products.filter(p => p.category === 'توربين');
  const steelProducts = products.filter(p => p.category === 'منتجات ستيل');

  if (loading) {
    return <p>جاري تحميل الصفحة الرئيسية...</p>;
  }

  return (
    <div>
      <HeroSlider />
      <OfferBanners />
      
      {/* 
        نستخدم المكون القابل لإعادة الاستخدام هنا.
        نعطيه عنواناً ومجموعة من المنتجات لعرضها.
      */}
      <ProductSlider title="أحدث التوربينات" products={turbinProducts} />
      
      <ProductSlider title="منتجات ستيل مميزة" products={steelProducts} />

      {/* يمكنك إضافة المزيد من أقسام المنتجات بنفس الطريقة */}
      {/* <ProductSlider title="قسم آخر" products={anotherCategoryProducts} /> */}
    </div>
  );
}

export default HomePage;