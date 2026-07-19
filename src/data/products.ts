export interface Review {
  id: string
  reviewerName: string
  rating: number
  date: string
  comment: string
  avatar: string
  images?: string[]
}

export interface ProductVariant {
  name: string
  options: string[]
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: { default: string; [colorName: string]: string }
  category: string
  subcategory?: string
  variants: ProductVariant[]
  rating: number
  reviews: Review[]
}

const A = (seed: string) => `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`
const U = 'https://images.unsplash.com'
const W = '?w=600&h=700&fit=crop'

export const PRODUCTS: Product[] = [
  // ========================
  // CLOTHING
  // ========================
  {
    id: 'c1', name: 'Premium Cotton Kurta',
    description: 'Handcrafted pure cotton kurta with embroidered neckline. Breathable fabric perfect for casual and formal wear.',
    price: 2499,
    images: {
      default: `${U}/photo-1525507119028-ed4c629a60a3${W}`,
      White: `${U}/photo-1525507119028-ed4c629a60a3${W}`,
      Blue: `${U}/photo-1595777457583-95e059d581b8${W}`,
      Black: `${U}/photo-1556905055-8f358a7a47b2${W}`,
    },
    category: 'Clothing',
    variants: [{ name: 'Size', options: ['S', 'M', 'L', 'XL'] }, { name: 'Color', options: ['White', 'Blue', 'Black'] }],
    rating: 4.5, reviews: [
      { id: 'c1-r1', reviewerName: 'Ayesha Khan', rating: 5, date: '25-Oct-2025', comment: 'The fabric is incredibly soft and breathable — perfect for Karachi summers. The embroidered neckline looks exactly like the product photos. Ordered a size M in white and it fits like a dream.', avatar: A('Ayesha') },
      { id: 'c1-r2', reviewerName: 'Muhammad Ali', rating: 4, date: '25-Dec-2025', comment: 'Great quality cotton kurta with nice stitching. The fabric held up well after multiple washes. Only wish the blue was a bit deeper shade, otherwise excellent value for the price.', avatar: A('MuhammadAli') },
      { id: 'c1-r3', reviewerName: 'Zainab Ahmed', rating: 5, date: '10-Nov-2025', comment: 'Bought this for Eid and received so many compliments! The embroidery work is beautifully done and the cotton feels premium. Runs true to size. Will definitely order more colors.', avatar: A('Zainab') },
      { id: 'c1-r4', reviewerName: 'Sana Bilal', rating: 3, date: '25-Dec-2025', comment: 'Nice kurta overall but the sizing runs a bit large. I\'d suggest ordering one size down if you prefer a fitted look. The fabric quality is good though and the white is not see-through which is a plus.', avatar: A('Sana') },
    ],
  },
  {
    id: 'c2', name: 'Linen Shalwar Kameez',
    description: 'Lightweight linen fabric with modern straight-cut design. Includes dupatta for women.',
    price: 3299,
    images: {
      default: `${U}/photo-1583391733956-3750e0ff4e8b${W}`,
      Teal: `${U}/photo-1583391733956-3750e0ff4e8b${W}`,
      Mint: `${U}/photo-1539008835653-2e4f7c5c0c7c${W}`,
      'Dusty Rose': `${U}/photo-1544005313-94ddf0286df2${W}`,
    },
    category: 'Clothing',
    variants: [{ name: 'Size', options: ['M', 'L', 'XL'] }, { name: 'Color', options: ['Teal', 'Mint', 'Dusty Rose'] }],
    rating: 4.2, reviews: [
      { id: 'c2-r1', reviewerName: 'Fatima Noor', rating: 5, date: '12-Oct-2025', comment: 'Absolutely in love with the Dusty Rose color! The linen is so lightweight and breathable, ideal for Lahore\'s humidity. The dupatta fabric matches perfectly. Received so many compliments at the family gathering.', avatar: A('Fatima') },
      { id: 'c2-r2', reviewerName: 'Hassan Raza', rating: 4, date: '25-Oct-2025', comment: 'Quality linen material with neat stitching. The straight-cut design gives a modern look while still being traditional. Teal color is rich and vibrant. Shrunk slightly after first wash so size up if unsure.', avatar: A('Hassan') },
      { id: 'c2-r3', reviewerName: 'Bilal Hussain', rating: 3, date: '25-Dec-2025', comment: 'Decent linen suit but the fabric is a bit thinner than expected. It\'s fine for indoor events but I wouldn\'t wear it out in strong wind. The mint color is lovely though and the stitching is well done.', avatar: A('Bilal') },
      { id: 'c2-r4', reviewerName: 'Amna Tariq', rating: 5, date: '10-Nov-2025', comment: 'Perfect for office wear! The linen is professional-looking yet comfortable enough for long hours. Ordered medium in Teal and the fit is excellent. The included dupatta is a nice bonus with subtle border work.', avatar: A('Amna') },
    ],
  },
  {
    id: 'c3', name: 'Summer Lawn Suit',
    description: 'Premium lawn fabric with digital print. Lightweight and airy for hot summer days.',
    price: 1899,
    images: {
      default: `${U}/photo-1564257631407-4deb1f99d992${W}`,
      'Pastel Pink': `${U}/photo-1564257631407-4deb1f99d992${W}`,
      'Sky Blue': `${U}/photo-1556905055-8f358a7a47b2${W}`,
      Lavender: `${U}/photo-1539008835653-2e4f7c5c0c7c${W}`,
    },
    category: 'Clothing',
    variants: [{ name: 'Size', options: ['M', 'L', 'XL'] }, { name: 'Color', options: ['Pastel Pink', 'Sky Blue', 'Lavender'] }],
    rating: 4.7, reviews: [
      { id: 'c3-r1', reviewerName: 'Hira Shah', rating: 5, date: '04-Jan-2026', comment: 'Best lawn suit I have bought online! The digital print is crisp and the colors are so vibrant. Perfect for the hot weather — keeps me cool all day. The Pastel Pink looks even prettier in person.', avatar: A('Hira') },
      { id: 'c3-r2', reviewerName: 'Nadia Akhtar', rating: 5, date: '25-Oct-2025', comment: 'Bought the Sky Blue for my sister\'s mehndi and it was perfect! Lightweight fabric that didn\'t stick even in the heat. The embroidery details on the neckline are exquisite. True to size.', avatar: A('Nadia') },
      { id: 'c3-r3', reviewerName: 'Omar Sheikh', rating: 4, date: '10-Nov-2025', comment: 'Purchased for my wife and she absolutely loves it. The fabric quality is impressive for the price point. Lavender shade is subtle and elegant. Only feedback is the dupatta could be slightly longer.', avatar: A('Omar') },
      { id: 'c3-r4', reviewerName: 'Sana Bilal', rating: 4, date: '25-Dec-2025', comment: 'Very good quality lawn suit. The digital print hasn\'t faded after several washes which is great. Fits true to size. Would love to see more color options in this range.', avatar: A('Sana2') },
    ],
  },

  // ========================
  // ACCESSORIES
  // ========================
  {
    id: 'a1', name: 'Leather Wallet',
    description: 'Genuine leather bifold wallet with RFID blocking. 8 card slots and coin pocket.',
    price: 1599,
    images: {
      default: `${U}/photo-1627123424574-724758594e93${W}`,
      Brown: `${U}/photo-1627123424574-724758594e93${W}`,
      Black: `${U}/photo-1603487742130-4e4c2b7be5b8${W}`,
      Tan: `${U}/photo-1603487742130-4e4c2b7be5b8${W}`,
    },
    category: 'Accessories',
    variants: [{ name: 'Color', options: ['Brown', 'Black', 'Tan'] }],
    rating: 4.6, reviews: [
      { id: 'a1-r1', reviewerName: 'Usman Ghani', rating: 5, date: '12-Oct-2025', comment: 'Solid genuine leather wallet! The RFID blocking is a nice security feature. Fits comfortably in the pocket without being bulky. Brown color developed a nice patina after just a few weeks.', avatar: A('Usman') },
      { id: 'a1-r2', reviewerName: 'Kamran Abbas', rating: 4, date: '25-Oct-2025', comment: 'Good quality leather with excellent stitching. 8 card slots are plenty for daily use and the coin pocket is handy. Ordered Black and the color is rich. Great value for money.', avatar: A('Kamran') },
      { id: 'a1-r3', reviewerName: 'Rabia Malik', rating: 5, date: '25-Dec-2025', comment: 'Bought this as a gift for my father and he loved it! The leather feels premium and the RFID protection gives peace of mind. Tan color looks classic and elegant. Highly recommended.', avatar: A('Rabia') },
    ],
  },
  {
    id: 'a2', name: 'Silver Necklace Set',
    description: '925 sterling silver necklace with matching earrings. Intricate floral design.',
    price: 4499,
    images: { default: `${U}/photo-1605100804763-247f67b3557e${W}` },
    category: 'Accessories',
    variants: [{ name: 'Type', options: ['Classic', 'Vintage', 'Modern'] }],
    rating: 4.8, reviews: [
      { id: 'a2-r1', reviewerName: 'Zara Saleem', rating: 5, date: '15-Jan-2026', comment: 'Stunning necklace set! The silver is genuinely high-quality with a brilliant shine. The floral design is intricate and delicate. Wore it to a wedding and got endless compliments. Classic design is timeless.', avatar: A('Zara') },
      { id: 'a2-r2', reviewerName: 'Mahreen Qureshi', rating: 5, date: '25-Oct-2025', comment: 'Absolutely gorgeous set — looks far more expensive than it is. The earrings are lightweight and comfortable for all-day wear. Vintage style has beautiful filigree work. Perfect for formal events.', avatar: A('Mahreen') },
      { id: 'a2-r3', reviewerName: 'Nadia Akhtar', rating: 4, date: '10-Nov-2025', comment: 'Beautiful craftsmanship and the silver polish is excellent. Modern design is unique and contemporary. Only giving 4 stars because the chain could be slightly longer, but otherwise perfect.', avatar: A('Nadia2') },
    ],
  },
  {
    id: 'a3', name: 'Wrist Watch',
    description: 'Analog quartz watch with stainless steel band. Water resistant to 50m.',
    price: 5499,
    images: {
      default: `${U}/photo-1523170335258-f5ed11844a49${W}`,
      Silver: `${U}/photo-1523170335258-f5ed11844a49${W}`,
      Gold: `${U}/photo-1611597612194-93be41f21a8e${W}`,
      'Rose Gold': `${U}/photo-1523170335258-f5ed11844a49${W}`,
    },
    category: 'Accessories',
    variants: [{ name: 'Color', options: ['Silver', 'Gold', 'Rose Gold'] }, { name: 'Band', options: ['Metal', 'Leather'] }],
    rating: 4.4, reviews: [
      { id: 'a3-r1', reviewerName: 'Tariq Jameel', rating: 5, date: '12-Oct-2025', comment: 'Excellent watch that punches way above its price point. Silver with metal band looks professional and feels substantial on the wrist. Keeps accurate time and the 50m water resistance is a bonus for daily use.', avatar: A('Tariq') },
      { id: 'a3-r2', reviewerName: 'Faisal Iqbal', rating: 4, date: '25-Oct-2025', comment: 'Good quality quartz watch with a nice weight to it. Gold with leather band gives a classic look. The leather strap is soft and comfortable. Glass could be more scratch-resistant but overall great purchase.', avatar: A('Faisal') },
      { id: 'a3-r3', reviewerName: 'Kinza Rizvi', rating: 3, date: '25-Dec-2025', comment: 'Rose Gold color is beautiful and the watch looks stylish. However the metal band links were tricky to adjust. Had to get it done at a shop. Works well once fitted properly. Good value for the features offered.', avatar: A('Kinza') },
      { id: 'a3-r4', reviewerName: 'Imran Pasha', rating: 5, date: '10-Nov-2025', comment: 'Bought the Silver with leather band for office wear and it gets noticed every time. The minimalist dial design is very elegant. Comes in a nice presentation box too. Would make a great gift.', avatar: A('Imran') },
    ],
  },

  // ========================
  // ELECTRONICS
  // ========================
  {
    id: 'e1', name: 'Bluetooth Earbuds',
    description: 'True wireless earbuds with active noise cancellation. 30hr battery life with charging case.',
    price: 3999,
    images: {
      default: `${U}/photo-1590658268037-6bf12f032f55${W}`,
      White: `${U}/photo-1590658268037-6bf12f032f55${W}`,
      Black: `${U}/photo-1505740420928-5e560c06d30e${W}`,
      Blue: `${U}/photo-1606220588913-b3aacb4d2f46${W}`,
    },
    category: 'Electronics',
    variants: [{ name: 'Color', options: ['White', 'Black', 'Blue'] }],
    rating: 4.3, reviews: [
      { id: 'e1-r1', reviewerName: 'Nabeel Ahmed', rating: 5, date: '20-Jan-2026', comment: 'Impressive noise cancellation for the price! The battery life is accurate — I charge the case once a week with daily use. Pairing is instant and the sound quality is well-balanced. Black looks sleek.', avatar: A('Nabeel') },
      { id: 'e1-r2', reviewerName: 'Junaid Siddiqui', rating: 4, date: '25-Oct-2025', comment: 'Great earbuds for daily commute and gym. The ANC works well for blocking out traffic noise. Fit is secure even during exercise. White color is clean but shows dirt easily. Touch controls took a day to get used to.', avatar: A('Junaid') },
      { id: 'e1-r3', reviewerName: 'Saba Mahmood', rating: 3, date: '10-Nov-2025', comment: 'Sound quality is good but the noise cancellation is decent at best — works for low frequencies but not great for voices. Battery life is solid though. The case is compact and charges quickly. Good for the price overall.', avatar: A('Saba') },
    ],
  },
  {
    id: 'e2', name: 'Smart Speaker',
    description: 'WiFi-enabled smart speaker with voice assistant. Rich 360° sound.',
    price: 6999,
    images: {
      default: `${U}/photo-1608043152269-423dbba4e7e1${W}`,
      Charcoal: `${U}/photo-1608043152269-423dbba4e7e1${W}`,
      Cream: `${U}/photo-1558089687-f282ffcbc126${W}`,
    },
    category: 'Electronics',
    variants: [{ name: 'Color', options: ['Charcoal', 'Cream'] }],
    rating: 4.5, reviews: [
      { id: 'e2-r1', reviewerName: 'Rizwan Aslam', rating: 5, date: '12-Oct-2025', comment: 'This speaker fills the entire room with crystal clear sound! The 360° audio is impressive and the voice assistant responds accurately even from across the room. Charcoal color blends nicely with my decor.', avatar: A('Rizwan') },
      { id: 'e2-r2', reviewerName: 'Hira Shah', rating: 5, date: '25-Oct-2025', comment: 'Best purchase this year! The sound quality is exceptional for the size — deep bass and clear highs. Setup was easy through the app. Cream color looks premium and modern. Love using it for daily podcasts and music.', avatar: A('Hira1') },
      { id: 'e2-r3', reviewerName: 'Asad Rauf', rating: 4, date: '25-Dec-2025', comment: 'Solid smart speaker with great audio quality. WiFi connectivity has been reliable. The voice assistant understands Urdu-accented English quite well which was a pleasant surprise. Wish it had an AUX input too.', avatar: A('Asad') },
    ],
  },
  {
    id: 'e3', name: 'USB-C Hub 7-in-1',
    description: 'USB-C hub with HDMI 4K, SD card reader, 3x USB 3.0, and PD 100W charging.',
    price: 2499,
    images: { default: `${U}/photo-1621715362946-d3647f8f2e5f${W}` },
    category: 'Electronics',
    variants: [{ name: 'Type', options: ['Standard', 'With Ethernet'] }],
    rating: 4.1, reviews: [
      { id: 'e3-r1', reviewerName: 'Shehzad Ali', rating: 5, date: '04-Jan-2026', comment: 'Exactly what I needed for my laptop! The HDMI 4K output works perfectly with my external monitor. SD card reader is fast and the USB 3.0 ports are snappy. The Ethernet version gives me stable wired internet.', avatar: A('Shehzad') },
      { id: 'e3-r2', reviewerName: 'Kamran Abbas', rating: 4, date: '25-Oct-2025', comment: 'Good quality hub that covers all essential ports. The 100W PD charging passthrough works as advertised. Standard version is compact and portable. Gets slightly warm under heavy use but nothing alarming.', avatar: A('Kamran2') },
      { id: 'e3-r3', reviewerName: 'Bushra Anwar', rating: 3, date: '25-Dec-2025', comment: 'Works fine for basic needs but the HDMI only supports 4K at 30Hz which is a bit limiting for my workflow. The USB ports are USB 3.0 speed though. Fine for the price but check your requirements before buying.', avatar: A('Bushra') },
    ],
  },

  // ========================
  // FOOTWEAR
  // ========================
  {
    id: 'f1', name: 'Khusa Style Sandals',
    description: 'Hand-embroidered leather sandals with padded insole. Traditional design with modern comfort.',
    price: 2199,
    images: {
      default: `${U}/photo-1603808033192-082d6919d3e1${W}`,
      Gold: `${U}/photo-1603808033192-082d6919d3e1${W}`,
      Silver: `${U}/photo-1560343090-f0409e92791a${W}`,
      Red: `${U}/photo-1549298916-b41d501d3772${W}`,
    },
    category: 'Footwear',
    variants: [{ name: 'Size', options: ['36', '37', '38', '39', '40'] }, { name: 'Color', options: ['Gold', 'Silver', 'Red'] }],
    rating: 4.3, reviews: [
      { id: 'f1-r1', reviewerName: 'Sana Bilal', rating: 5, date: '12-Oct-2025', comment: 'These sandals are absolutely gorgeous! The embroidery is intricate and the gold color is stunning. Wore them to a family event and they were comfortable all evening. The padded insole makes a huge difference.', avatar: A('Sana3') },
      { id: 'f1-r2', reviewerName: 'Zainab Ahmed', rating: 4, date: '10-Nov-2025', comment: 'Beautiful traditional khusa design with modern comfort. The leather quality is good and the embroidery work is detailed. Silver matches everything. I\'d recommend ordering half size up as they run slightly snug.', avatar: A('Zainab2') },
      { id: 'f1-r3', reviewerName: 'Fatima Noor', rating: 3, date: '25-Dec-2025', comment: 'Lovely design and the red color is vibrant. The sole is decent quality but I wish the insole had more arch support. They look great but not ideal for long walks. Good for short events and gatherings.', avatar: A('Fatima2') },
      { id: 'f1-r4', reviewerName: 'Mahreen Qureshi', rating: 5, date: '25-Oct-2025', comment: 'Bought these for my wedding events and they were perfect! The gold embroidery with traditional motifs matched my lengha beautifully. Extremely comfortable — danced all night without any pain. Highly recommend!', avatar: A('Mahreen2') },
    ],
  },
  {
    id: 'f2', name: 'Sneakers',
    description: 'Mesh upper running shoes with memory foam sole. Lightweight and durable.',
    price: 4499,
    images: {
      default: `${U}/photo-1549298916-b41d501d3772${W}`,
      'White/Black': `${U}/photo-1549298916-b41d501d3772${W}`,
      'Navy/White': `${U}/photo-1560343090-f0409e92791a${W}`,
      'All Black': `${U}/photo-1491553895911-0055eca6402d${W}`,
    },
    category: 'Footwear',
    variants: [{ name: 'Size', options: ['39', '40', '41', '42', '43', '44'] }, { name: 'Color', options: ['White/Black', 'Navy/White', 'All Black'] }],
    rating: 4.6, reviews: [
      { id: 'f2-r1', reviewerName: 'Muhammad Ali', rating: 5, date: '15-Jan-2026', comment: 'Most comfortable sneakers I have owned! The memory foam sole provides excellent cushioning for my morning runs. Mesh upper keeps feet cool. White/Black combo looks stylish and goes with everything.', avatar: A('Muhammad') },
      { id: 'f2-r2', reviewerName: 'Usman Ghani', rating: 5, date: '25-Oct-2025', comment: 'Bought the All Black for gym workouts and they are perfect. Lightweight, breathable, and the grip is excellent. True to size with good arch support. Been using them daily for a month with no signs of wear.', avatar: A('Usman2') },
      { id: 'f2-r3', reviewerName: 'Ayesha Khan', rating: 4, date: '25-Dec-2025', comment: 'Great sneakers for casual wear and light jogging. The Navy/White color combo is clean and classic. Memory foam insoles are very comfortable. Only minor issue is they attract dust easily but easy to clean.', avatar: A('Ayesha2') },
    ],
  },

  // ========================
  // CAPS
  // ========================
  {
    id: 'h1', name: 'Classic Baseball Cap',
    description: 'Premium cotton twill cap with adjustable strap. Pre-curved visor.',
    price: 899,
    images: { default: `${U}/photo-1521369909029-2afed882baee${W}` },
    category: 'Caps',
    variants: [{ name: 'Color', options: ['Black', 'Navy', 'Khaki', 'White'] }],
    rating: 4.2, reviews: [
      { id: 'h1-r1', reviewerName: 'Hassan Raza', rating: 4, date: '12-Oct-2025', comment: 'Solid basic cap that does the job. The cotton twill is good quality and the adjustable strap fits well. Black goes with everything. Pre-curved visor holds its shape. Great value for everyday use.', avatar: A('Hassan2') },
      { id: 'h1-r2', reviewerName: 'Tariq Jameel', rating: 5, date: '25-Oct-2025', comment: 'Perfect cap for outdoor activities. Khaki color looks great and doesn\'t show sweat stains. The fabric is breathable so my head doesn\'t get too hot. Stitching is clean and durable. Would buy again in other colors.', avatar: A('Tariq2') },
      { id: 'h1-r3', reviewerName: 'Nabeel Ahmed', rating: 3, date: '10-Nov-2025', comment: 'Decent cap but the Navy color faded slightly after a few washes. The fit is good and the cotton is comfortable. For the price it\'s acceptable but don\'t expect premium quality.', avatar: A('Nabeel2') },
    ],
  },
  {
    id: 'h2', name: 'Embroidered Velvet Cap',
    description: 'Luxury velvet cap with golden embroidery. Perfect for festive occasions.',
    price: 1299,
    images: { default: `${U}/photo-1595435934249-5df7ed86e1c0${W}` },
    category: 'Caps',
    variants: [{ name: 'Color', options: ['Burgundy', 'Emerald', 'Royal Blue'] }],
    rating: 4.5, reviews: [
      { id: 'h2-r1', reviewerName: 'Zara Saleem', rating: 5, date: '04-Jan-2026', comment: 'Stunning velvet cap! The golden embroidery is so elegant and detailed. Burgundy color is rich and looks very premium. Wore it to a friend\'s walima and got so many compliments. Absolutely love it!', avatar: A('Zara2') },
      { id: 'h2-r2', reviewerName: 'Bilal Hussain', rating: 4, date: '25-Oct-2025', comment: 'Great quality velvet cap with beautiful embroidery work. Royal Blue is a striking color. The fit is comfortable and the inner lining is soft. Golden thread work is neat and doesn\'t feel cheap.', avatar: A('Bilal2') },
      { id: 'h2-r3', reviewerName: 'Farah Gul', rating: 5, date: '10-Nov-2025', comment: 'Bought the Emerald green for my brother\'s wedding and it looked magnificent! The velvet is soft and plush, not stiff at all. Embroidery is intricate and the gold really pops. Excellent craftsmanship.', avatar: A('Farah') },
    ],
  },

  // ========================
  // PURSES
  // ========================
  {
    id: 'p1', name: 'Tote Bag',
    description: 'Spacious canvas tote with leather handles. Fits laptop and daily essentials.',
    price: 2799,
    images: {
      default: `${U}/photo-1591561954555-607968c989ab${W}`,
      Beige: `${U}/photo-1591561954555-607968c989ab${W}`,
      Black: `${U}/photo-1548036328-c9fa89d128fa${W}`,
      Striped: `${U}/photo-1566150905458-1bf1fc113f0d${W}`,
    },
    category: 'Purses',
    variants: [{ name: 'Color', options: ['Beige', 'Black', 'Striped'] }],
    rating: 4.4, reviews: [
      { id: 'p1-r1', reviewerName: 'Amna Tariq', rating: 5, date: '12-Oct-2025', comment: 'Perfect work bag! Fits my 14-inch laptop with room for lunch, makeup pouch, and documents. The canvas is sturdy and the leather handles are comfortable. Beige color is chic and goes with everything.', avatar: A('Amna2') },
      { id: 'p1-r2', reviewerName: 'Saba Mahmood', rating: 4, date: '10-Nov-2025', comment: 'Spacious and well-made tote. The striped pattern is fun and unique. Stitching is solid and the inner pocket is handy for keys and phone. Wish it had a zipper closure instead of magnetic snap for extra security.', avatar: A('Saba2') },
      { id: 'p1-r3', reviewerName: 'Kinza Rizvi', rating: 4, date: '25-Dec-2025', comment: 'Great everyday bag for university. The canvas is thick and durable, handles all my books without tearing. Black is practical and doesn\'t show dirt. Leather handles have held up well over two months of daily use.', avatar: A('Kinza2') },
    ],
  },
  {
    id: 'p2', name: 'Crossbody Bag',
    description: 'Genuine leather crossbody bag with adjustable strap. Multiple compartments.',
    price: 3499,
    images: {
      default: `${U}/photo-1548036328-c9fa89d128fa${W}`,
      Brown: `${U}/photo-1548036328-c9fa89d128fa${W}`,
      Black: `${U}/photo-1591561954555-607968c989ab${W}`,
      Blush: `${U}/photo-1566150905458-1bf1fc113f0d${W}`,
    },
    category: 'Purses',
    variants: [{ name: 'Color', options: ['Brown', 'Black', 'Blush'] }],
    rating: 4.7, reviews: [
      { id: 'p2-r1', reviewerName: 'Rabia Malik', rating: 5, date: '20-Jan-2026', comment: 'This bag is gorgeous! The leather is soft and smells amazing. Brown color is rich and develops a beautiful patina. Multiple compartments help me stay organized. Adjustable strap is perfect for crossbody wear.', avatar: A('Rabia2') },
      { id: 'p2-r2', reviewerName: 'Sana Bilal', rating: 5, date: '25-Oct-2025', comment: 'Best crossbody bag I\'ve owned! Blush color is absolutely beautiful — exactly as pictured. The leather quality exceeded my expectations at this price point. Compact yet fits phone, wallet, keys, and lipstick comfortably.', avatar: A('Sana4') },
      { id: 'p2-r3', reviewerName: 'Ayesha Khan', rating: 4, date: '10-Nov-2025', comment: 'Elegant and practical bag. Black is a timeless choice. The compartments are well-designed with one zippered section for valuables. Leather quality is good but the strap hardware could feel more premium. Overall excellent value.', avatar: A('Ayesha3') },
    ],
  },
  {
    id: 'p3', name: 'Clutch Purse',
    description: 'Evening clutch with crystal embellishments. Chain strap included.',
    price: 1999,
    images: {
      default: `${U}/photo-1566150905458-1bf1fc113f0d${W}`,
      Gold: `${U}/photo-1566150905458-1bf1fc113f0d${W}`,
      Silver: `${U}/photo-1591561954555-607968c989ab${W}`,
      Black: `${U}/photo-1548036328-c9fa89d128fa${W}`,
    },
    category: 'Purses',
    variants: [{ name: 'Color', options: ['Gold', 'Silver', 'Black'] }],
    rating: 4.3, reviews: [
      { id: 'p3-r1', reviewerName: 'Mahreen Qureshi', rating: 5, date: '12-Oct-2025', comment: 'Stunning clutch that looks designer! The crystal embellishments catch the light beautifully. Gold color is perfect for weddings and formal events. The chain strap is detachable which adds versatility. Great purchase!', avatar: A('Mahreen3') },
      { id: 'p3-r2', reviewerName: 'Zainab Ahmed', rating: 4, date: '25-Oct-2025', comment: 'Beautiful evening clutch with sparkly crystals. Silver is elegant and goes with any outfit. The size is perfect for phone, lipstick, and a small wallet. Chain strap is comfortable on the shoulder. Good quality for the price.', avatar: A('Zainab3') },
      { id: 'p3-r3', reviewerName: 'Hira Shah', rating: 3, date: '25-Dec-2025', comment: 'The clutch looks beautiful but the crystals are glued on rather than embedded. One or two fell off after the first use. Black version hides this better. The overall design is lovely but durability is a concern for frequent use.', avatar: A('Hira3') },
    ],
  },

  // ========================
  // HEALTH CARE: OILS
  // ========================
  {
    id: 'o1', name: 'Cold-Pressed Coconut Oil',
    description: 'Virgin coconut oil extracted from fresh organic coconuts. Rich in antioxidants.',
    price: 699,
    images: { default: `${U}/photo-1598440947619-2c35fc9aa908${W}` },
    category: 'Health Care', subcategory: 'Oils',
    variants: [{ name: 'Size', options: ['250ml', '500ml', '1L'] }],
    rating: 4.6, reviews: [
      { id: 'o1-r1', reviewerName: 'Maryam Ashraf', rating: 5, date: '12-Oct-2025', comment: 'Pure, authentic coconut oil! The fresh coconut aroma is amazing. I use it for cooking and as a hair mask — works wonderfully for both. The 1L bottle is great value and lasts over a month with daily use.', avatar: A('Maryam') },
      { id: 'o1-r2', reviewerName: 'Sidra Batool', rating: 4, date: '25-Oct-2025', comment: 'Good quality cold-pressed coconut oil. Solid at room temperature as expected for pure coconut oil. Perfect for making traditional Pakistani dishes — adds authentic flavor. Packaging is secure with no leaks.', avatar: A('Sidra') },
      { id: 'o1-r3', reviewerName: 'Nadia Akhtar', rating: 5, date: '10-Nov-2025', comment: 'Been using this for two months now and my skin has never been better! Using it as a moisturizer after shower — absorbs well without being greasy. Also great for oil pulling. 500ml size is a good starter option.', avatar: A('Nadia3') },
    ],
  },
  {
    id: 'o2', name: 'Black Seed Oil',
    description: '100% pure black seed (Kalonji) oil. Cold-pressed for maximum potency.',
    price: 849,
    images: { default: `${U}/photo-1471864190281-a93a3070b6de${W}` },
    category: 'Health Care', subcategory: 'Oils',
    variants: [{ name: 'Size', options: ['100ml', '250ml'] }],
    rating: 4.8, reviews: [
      { id: 'o2-r1', reviewerName: 'Bushra Anwar', rating: 5, date: '04-Jan-2026', comment: 'High quality kalonji oil with a strong, authentic aroma. I take a teaspoon daily for immunity and have noticed improvement in my allergies within weeks. The 250ml bottle lasts about 2 months. Highly recommend!', avatar: A('Bushra1') },
      { id: 'o2-r2', reviewerName: 'Rizwan Aslam', rating: 5, date: '25-Oct-2025', comment: 'My mother recommended black seed oil and this brand is excellent. The cold-pressed extraction really preserves the potency. The oil is pure with no additives. Great for hair growth too — seeing new hair growth after 3 months.', avatar: A('Rizwan2') },
      { id: 'o2-r3', reviewerName: 'Farah Gul', rating: 4, date: '25-Dec-2025', comment: 'Genuine black seed oil with good quality. The taste is strong as expected but the health benefits are worth it. My digestion has improved since starting this. 100ml is good for a trial before committing to larger size.', avatar: A('Farah2') },
    ],
  },
  {
    id: 'o3', name: 'Amla & Bhringraj Hair Oil',
    description: 'Herbal hair oil enriched with amla, bhringraj, and coconut. Promotes hair growth.',
    price: 549,
    images: { default: `${U}/photo-1615391293055-2ee6a6b9b45e${W}` },
    category: 'Health Care', subcategory: 'Oils',
    variants: [{ name: 'Size', options: ['200ml', '400ml'] }],
    rating: 4.4, reviews: [
      { id: 'o3-r1', reviewerName: 'Ayesha Khan', rating: 5, date: '12-Oct-2025', comment: 'This hair oil is amazing! My hair fall has reduced significantly after 2 months of regular use. The herbal smell is pleasant — not overpowering. Mixed with coconut oil base, it spreads easily. 400ml is the best value.', avatar: A('Ayesha4') },
      { id: 'o3-r2', reviewerName: 'Fatima Noor', rating: 4, date: '10-Nov-2025', comment: 'Good traditional hair oil blend. The amla and bhringraj combination works well for strengthening hair. My hair feels thicker and has a nice shine. Would love to see a bigger bottle option. Price is reasonable.', avatar: A('Fatima3') },
      { id: 'o3-r3', reviewerName: 'Sidra Batool', rating: 3, date: '25-Dec-2025', comment: 'Decent hair oil but it\'s a bit heavy for my thin hair — leaves it looking oily even with small amounts. Works well as an overnight treatment before washing. The ingredients are high quality though.', avatar: A('Sidra2') },
    ],
  },

  // ========================
  // HEALTH CARE: SOAPS
  // ========================
  {
    id: 's1', name: 'Neem & Turmeric Soap',
    description: 'Handmade soap with neem extract and turmeric. Antibacterial and skin-brightening.',
    price: 249,
    images: { default: `${U}/photo-1600857544200-b2f666a9a2ec${W}` },
    category: 'Health Care', subcategory: 'Soaps',
    variants: [{ name: 'Pack', options: ['Single', 'Pack of 3', 'Pack of 6'] }],
    rating: 4.5, reviews: [
      { id: 's1-r1', reviewerName: 'Rabia Malik', rating: 5, date: '12-Oct-2025', comment: 'Best soap for acne-prone skin! My breakouts have reduced noticeably since switching to this. The neem and turmeric combination is gentle yet effective. The pack of 6 is economical and lasts about 2 months. Love this product!', avatar: A('Rabia3') },
      { id: 's1-r2', reviewerName: 'Hira Shah', rating: 4, date: '25-Oct-2025', comment: 'Natural soap with visible turmeric specks — you can tell it\'s handmade. Lathers well and leaves skin feeling clean without drying. The neem smell is mild and fades after washing. Good for daily use.', avatar: A('Hira4') },
      { id: 's1-r3', reviewerName: 'Amna Tariq', rating: 5, date: '10-Nov-2025', comment: 'My grandmother recommended neem soap and this is the best one I\'ve tried. My skin looks brighter and feels smoother. The pack of 3 is perfect to try first. Love that it\'s made with natural ingredients without harsh chemicals.', avatar: A('Amna3') },
    ],
  },
  {
    id: 's2', name: 'Rose & Glycerin Soap',
    description: 'Moisturizing glycerin soap infused with rose petals. Gentle on sensitive skin.',
    price: 299,
    images: { default: `${U}/photo-1607613009820-a29f7bb81c04${W}` },
    category: 'Health Care', subcategory: 'Soaps',
    variants: [{ name: 'Pack', options: ['Single', 'Pack of 3'] }],
    rating: 4.3, reviews: [
      { id: 's2-r1', reviewerName: 'Zara Saleem', rating: 5, date: '04-Jan-2026', comment: 'This soap is a delight! The rose fragrance is natural and not artificial-smelling. The glycerin makes my skin feel incredibly soft and hydrated. The dried rose petals inside look beautiful. Perfect for dry skin!', avatar: A('Zara3') },
      { id: 's2-r2', reviewerName: 'Maryam Ashraf', rating: 4, date: '25-Oct-2025', comment: 'Lovely moisturizing soap with real rose petals. It\'s gentle enough for my sensitive skin and doesn\'t cause any irritation. The glycerin base is very hydrating especially in winter. Pack of 3 is good value.', avatar: A('Maryam2') },
      { id: 's2-r3', reviewerName: 'Sana Bilal', rating: 3, date: '25-Dec-2025', comment: 'Beautiful soap with nice rose scent but it dissolves faster than regular soaps. Doesn\'t last as long as I hoped. The moisturizing effect is good though and my skin feels soft after use. Best kept in a dry soap dish.', avatar: A('Sana5') },
    ],
  },
  {
    id: 's3', name: 'Charcoal Detox Soap',
    description: 'Activated charcoal soap bar for deep cleansing. Removes impurities and excess oil.',
    price: 349,
    images: { default: `${U}/photo-1610557892470-55d9e80c0bce${W}` },
    category: 'Health Care', subcategory: 'Soaps',
    variants: [{ name: 'Pack', options: ['Single', 'Pack of 3'] }],
    rating: 4.6, reviews: [
      { id: 's3-r1', reviewerName: 'Imran Pasha', rating: 5, date: '12-Oct-2025', comment: 'Game-changer for oily skin! The activated charcoal really helps control oil throughout the day. My face feels clean and fresh without being stripped. The pack of 3 is excellent value. Been using for a month with great results.', avatar: A('Imran2') },
      { id: 's3-r2', reviewerName: 'Bilal Hussain', rating: 5, date: '25-Oct-2025', comment: 'I was skeptical about charcoal soap but this exceeded expectations. Deeply cleanses pores and my skin texture has improved. Great for back acne too. No artificial fragrance which I prefer. Highly recommend for oily skin types.', avatar: A('Bilal3') },
      { id: 's3-r3', reviewerName: 'Nadia Akhtar', rating: 4, date: '10-Nov-2025', comment: 'Good detox soap that does a thorough cleansing job. My face feels noticeably cleaner after use. Can be slightly drying so I follow up with moisturizer. Works well as a weekly deep-cleansing treatment. Decent quality for the price.', avatar: A('Nadia4') },
    ],
  },
]

export const CATEGORIES = [
  'Clothing', 'Accessories', 'Electronics', 'Footwear', 'Caps', 'Purses', 'Health Care',
] as const

export const HEALTH_SUBCATEGORIES = ['Oils', 'Soaps'] as const
