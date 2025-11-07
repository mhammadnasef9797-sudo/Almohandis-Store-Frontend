import './OfferBanners.css'; // سننشئه بعد قليل

function OfferBanners() {
    // بيانات مؤقتة. لاحقاً يمكن جلبها من الـ API
  const offers = [
    { title: 'Break Disc', img: '/img/banner3_5.png', sale: '70%' },
    { title: 'Industrial Fan', img: '/img/banner3_6.png', sale: '50%' },
    { title: 'Steel Part', img: '/img/banner3_7.png', sale: '60%' },
    { title: 'Power Tool', img: '/img/banner3_5.png', sale: '40%' },
  ];

  return (
    <div className="offer-banners-container">
      {offers.map((offer, index) => (
        <div className="offer-box" key={index}>
          <img src={offer.img} alt={offer.title} />
          <div className="text">
            <h5>{offer.title}</h5>
            <div className="sale">
              <p>UP<br/>TO</p>
              <span>{offer.sale}</span>
            </div>
            <h6>Shop Now</h6>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OfferBanners;