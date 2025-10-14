import type { Partner, CarouselImage, CultureKnowledge, VideoRecommendation, CultureItem, BookData, Event, GalleryImage } from "@/types";

// 合作夥伴數據

export const partnersData: Partner[] = [
  {
    id: "cultural-museum",
    name: "「台語工藝詞庫」網站啟用 有助傳承台灣工藝與文化記憶",
    description: "國立臺灣工藝研究發展中心的臺語網站，提供臺語文創、工藝知識與教學資源，推廣本土語言與文化傳承。",
    image: "/images/partnerrecommendations/台灣工藝研究發展中心.jpg",
    category: "教育機構",
    established: "1985",
    website: "https://kanggesu.ntcri.org.tw/NTCRI_TaigiWebSite/"
  },
  {
    id: "heritage-foundation",
    name: "懷舊列車動起來 鐵道博開放搭藍皮火車賞古蹟 可預約",
    description: "國立鐵道博物館官方網站，呈現臺灣鐵道文化脈絡，典藏珍貴文物，提供豐富導覽與教育資源，傳承歷史記憶",
    image: "/images/partnerrecommendations/國家鐵道博物館.jpg",
    category: "博物館機構",
    established: "1992",
    website: "https://www.nrm.gov.tw/"
  },
  {
    id: "cultural-education",
    name: "百大文化基地計畫 新北黃金山城美學廊帶7月至11月推出「礦事聚作」遊程",
    description: "臺灣煤礦博物館官網，保存煤礦歷史記憶，展現礦業文化風華，結合教育與觀光，深入探索臺灣產業發展的軌跡。",
    image: "/images/partnerrecommendations/新平溪煤礦博物園區.jpg",
    category: "保護機構",
    established: "2001",
    website: "https://www.taiwancoal.com.tw/web/"
  },
];

// 影音推薦數據
export const videosData: VideoRecommendation[] = [
  {
    id: "cultural-heritage-documentary1",
    title: "阿里山得獎咖啡如何帶地方走出創生？",
    description: "阿里山得獎咖啡結合高山地景、職人技藝與青農返鄉行動，帶動地方產業轉型與文化重塑，成為地方創生的重要實踐案例。",
    thumbnail: "/images/videorecommendations/阿里山咖啡園.jpg",
    duration: "25:30",
    category: "紀錄片",
    type: 'youtube',
    src: 'https://www.youtube.com/embed/ugwmzYqgd_M?si=QBg5Rf16nvBtjLOM',
    detail: "阿里山得獎咖啡展現了地方創生的典範力量。結合阿里山壯麗的高山地景、堅持品質的職人精神，以及一群願意返鄉投入家鄉發展的青農，這片土地不僅種出世界級的精品咖啡，也孕育出地方產業的新生命力。透過導入現代化農業管理、品牌行銷與文化故事包裝，阿里山咖啡成功轉型為具國際競爭力的地方特色產業。同時，咖啡產業也帶動觀光、餐飲與手作體驗的發展，讓更多人深入了解當地文化與自然資源。阿里山咖啡不只是飲品，更是一場結合土地、人與文化的深度創生旅程。阿里山得獎咖啡展現了地方創生的典範力量。結合阿里山壯麗的高山地景、堅持品質的職人精神，以及一群願意返鄉投入家鄉發展的青農，這片土地不僅種出世界級的精品咖啡，也孕育出地方產業的新生命力。透過導入現代化農業管理、品牌行銷與文化故事包裝，阿里山咖啡成功轉型為具國際競爭力的地方特色產業。同時，咖啡產業也帶動觀光、餐飲與手作體驗的發展，讓更多人深入了解當地文化與自然資源。阿里山咖啡不只是飲品，更是一場結合土地、人與文化的深度創生旅程。阿里山得獎咖啡展現了地方創生的典範力量。結合阿里山壯麗的高山地景、堅持品質的職人精神，以及一群願意返鄉投入家鄉發展的青農，這片土地不僅種出世界級的精品咖啡，也孕育出地方產業的新生命力。透過導入現代化農業管理、品牌行銷與文化故事包裝，阿里山咖啡成功轉型為具國際競爭力的地方特色產業。同時，咖啡產業也帶動觀光、餐飲與手作體驗的發展，讓更多人深入了解當地文化與自然資源。阿里山咖啡不只是飲品，更是一場結合土地、人與文化的深度創生旅程。阿里山得獎咖啡展現了地方創生的典範力量。結合阿里山壯麗的高山地景、堅持品質的職人精神，以及一群願意返鄉投入家鄉發展的青農，這片土地不僅種出世界級的精品咖啡，也孕育出地方產業的新生命力。透過導入現代化農業管理、品牌行銷與文化故事包裝，阿里山咖啡成功轉型為具國際競爭力的地方特色產業。同時，咖啡產業也帶動觀光、餐飲與手作體驗的發展，讓更多人深入了解當地文化與自然資源。阿里山咖啡不只是飲品，更是一場結合土地、人與文化的深度創生旅程。阿里山得獎咖啡展現了地方創生的典範力量。結合阿里山壯麗的高山地景、堅持品質的職人精神，以及一群願意返鄉投入家鄉發展的青農，這片土地不僅種出世界級的精品咖啡，也孕育出地方產業的新生命力。透過導入現代化農業管理、品牌行銷與文化故事包裝，阿里山咖啡成功轉型為具國際競爭力的地方特色產業。同時，咖啡產業也帶動觀光、餐飲與手作體驗的發展，讓更多人深入了解當地文化與自然資源。阿里山咖啡不只是飲品，更是一場結合土地、人與文化的深度創生旅程。"
  },
  {
    id: "traditional-arts-workshop1",
    title: "竹鞘食器：在河床上的原民生態智慧體驗",
    description: "結合魯凱傳統與環境倫理，運用竹鞘製作餐具，在河床野食中實踐無痕生活，展現原民生活智慧與自然共存的永續理念。",
    thumbnail: "/images/videorecommendations/原民生態智慧.jpg",
    duration: "18:45",
    category: "教學",
    type: 'youtube',
    src: 'https://www.youtube.com/embed/Fjln6HlIpo8?si=82UxfNaeb92Sy4Wl',
    detail: ""
  },
  {
    id: "cultural-heritage-documentary2",
    title: "菲律賓漁船如何搖身一變成為深度旅遊利器？",
    description: "菲律賓傳統螃蟹船，以其獨特的船舷支架聞名，最初為漁業和交通工具。如今，它搖身一變成為深度旅遊的利器，載著旅客探索島嶼，提供獨特的文化與自然體驗。",
    thumbnail: "/images/videorecommendations/漁船.JPG",
    duration: "17:33",
    category: "紀錄片",
    type: 'youtube',
    src: 'https://www.youtube.com/embed/Fjln6HlIpo8?si=82UxfNaeb92Sy4Wl',
    detail: ""
  },
  {
    id: "cultural-heritage-documentary3",
    title: "當傳統文化遇上疫情？談文化彈性與應變",
    description: "當泰國傳統舞蹈遇疫情，舞者戴上防疫面具，展現文化彈性與應變。這不僅是視覺衝擊，更是藝術適應與傳承韌性的象徵。",
    thumbnail: "/images/videorecommendations/疫情泰國.jpg",
    duration: "38:45",
    category: "紀錄片",
    type: 'youtube',
    src: 'https://www.youtube.com/embed/Fjln6HlIpo8?si=82UxfNaeb92Sy4Wl',
    detail: ""
  },
  {
    id: "cultural-heritage-documentary4",
    title: "奈及利亞傳統活動展現傳統文化舞蹈",
    description: "奈及利亞傳統活動透過多元的文化舞蹈，不僅展現各族群獨特認同與生活智慧，更是傳承歷史、連結信仰的重要儀式與文化載體。",
    thumbnail: "/images/videorecommendations/奈及利亞.jpg",
    duration: "22:10",
    category: "紀錄片",
    type: 'youtube',
    src: 'https://www.youtube.com/embed/Fjln6HlIpo8?si=82UxfNaeb92Sy4Wl',
    detail: ""
  },
  {
    id: "traditional-arts-workshop2",
    title: "澎湖海港文化體現在傳統漁獲保存方法",
    description: "澎湖海港文化體現在傳統漁獲保存的智慧與實踐中，是承載豐富歷史記憶與文化韌性的重要場域。",
    thumbnail: "/images/videorecommendations/澎湖傳統漁獲.JPG",
    duration: "13:45",
    category: "教學",
    type: 'youtube',
    src: 'https://www.youtube.com/embed/Fjln6HlIpo8?si=82UxfNaeb92Sy4Wl',
    detail: ""
  }
];

// 文化知識數據
export const cultureItemsData: CultureKnowledge[] = [
  {
    id: "cultural-sustainability",
    title: "文化永續",
    image: "/images/culture/怎麼做.jpg",
    position: "top-left"
  },
  {
    id: "cultural-memory",
    title: "文化記憶",
    image: "/images/culture/文化記憶2.jpg",
    position: "top-right"
  },
  {
    id: "cultural-property_Event",
    title: "文化資產/文化活動",
    image: "/images/culture/文化活動.jpg",
    position: "bottom-left"
  },
  {
    id: "cultural-industry_branding",
    title: "文化產業/文化品牌",
    image: "/images/culture/文化品牌2.jpg",
    position: "bottom-right"
  }
];

//專欄文章
export const CultureArticleData: CultureItem[] = [
  {
    id: "1",
    title: "article1",
    description: "內文請用微軟正黑體，10pt，行距單行，內文請控制於 1500 字內。阿拉伯數字前後請空格，如此處示範：「西元 2000 年」，標點符號請用全形。內文請用微軟正黑體，10pt，行距單行，內文請控制於 1500 字內。阿拉伯數字前後請空格",
    image: "/images/gallery/1.jpg",
    category: "",
    date: "2025/09/10"
  },
  {
    id: "2",
    title: "文章2",
    description: "內文請用微軟正黑體，10pt，行距單行，內文請控制於 1500 字內。阿拉伯數字前後請空格，如此處示範：「西元 2000 年」，標點符號請用全形。內文請用微軟正黑體，10pt，行距單行，內文請控制於 1500 字內。阿拉伯數字前後請空格",
    image: "/images/gallery/2.jpg",
    category: "",
    date: "2025/09/01"
  },
  {
    id: "3",
    title: "article3",
    description: "內文請用微軟正黑體，10pt，行距單行，內文請控制於 1500 字內。阿拉伯數字前後請空格，如此處示範：「西元 2000 年」，標點符號請用全形。內文請用微軟正黑體，10pt，行距單行，內文請控制於 1500 字內。阿拉伯數字前後請空格",
    image: "/images/gallery/3.jpg",
    category: "",
    date: "2025/08/15"
  },
  {
    id: "4",
    title: "article4",
    description: "內文請用微軟正黑體，10pt，行距單行，內文請控制於 1500 字內。阿拉伯數字前後請空格，如此處示範：「西元 2000 年」，標點符號請用全形。內文請用微軟正黑體，10pt，行距單行，內文請控制於 1500 字內。阿拉伯數字前後請空格",
    image: "/images/gallery/4.jpg",
    category: "",
    date: "2025/07/10"
  },
  {
    id: "5",
    title: "article5",
    description: "內文請用微軟正黑體，10pt，行距單行，內文請控制於 1500 字內。阿拉伯數字前後請空格，如此處示範：「西元 2000 年」，標點符號請用全形。內文請用微軟正黑體，10pt，行距單行，內文請控制於 1500 字內。阿拉伯數字前後請空格",
    image: "/images/gallery/5.jpg",
    category: "",
    date: "2025/06/10"
  },
  {
    id: "6",
    title: "article6",
    description: "內文請用微軟正黑體，10pt，行距單行，內文請控制於 1500 字內。阿拉伯數字前後請空格，如此處示範：「西元 2000 年」，標點符號請用全形。內文請用微軟正黑體，10pt，行距單行，內文請控制於 1500 字內。阿拉伯數字前後請空格",
    image: "/images/gallery/6.jpg",
    category: "",
    date: "2025/09/10"
  },
  {
    id: "7",
    title: "article7",
    description: "內文請用微軟正黑體，10pt，行距單行，內文請控制於 1500 字內。阿拉伯數字前後請空格，如此處示範：「西元 2000 年」，標點符號請用全形。內文請用微軟正黑體，10pt，行距單行，內文請控制於 1500 字內。阿拉伯數字前後請空格",
    image: "/images/gallery/7.jpg",
    category: "",
    date: "2025/09/10"
  },
  {
    id: "8",
    title: "article8",
    description: "內文請用微軟正黑體，10pt，行距單行，內文請控制於 1500 字內。阿拉伯數字前後請空格，如此處示範：「西元 2000 年」，標點符號請用全形。內文請用微軟正黑體，10pt，行距單行，內文請控制於 1500 字內。阿拉伯數字前後請空格",
    image: "/images/gallery/8.jpg",
    category: "",
    date: "2025/09/10"
  }
  
  
];

//圖片庫
export const allImages: GalleryImage[] = Array.from({ length: 28 }, (_, index) => ({
  id: index + 1,
  title: `文化影像 ${index + 1}`,
  src: `/images/gallery/${index + 1}.jpg`
}));

//
export const CultureExplorerData: CultureItem[] = [
  {
    id: "1",
    title: "",
    description: "",
    image: "/images/videorecommendations/.jpg",
    category: "",
    date: ""
  },
  {
    id: "2",
    title: "",
    description: "",
    image: "/images/videorecommendations/.jpg",
    category: "",
    date: ""
  },
  {
    id: "3",
    title: "",
    description: "",
    image: "/images/culture/.jpg",
    category: "",
    date: ""
  }
];


 //TIPC選書
export const bookCardData: BookData[] = [
  {
    id: "1",
    bookName: "地方創生可以不一樣",
    author: ["李智仁", "陳德齡","嚴昱如"],
    image: "/images/book1.png",
    category: "文化資產",
    publicDate: "2025/06/30(1版1刷)",
    publisher: "五南",
    description: "地方創生近年來備受討論，也經歷了許多實踐歷程，成果令人敬佩。在各地的案例不斷累積之餘，如何透過系統化的整理，將政府與民間的角色清楚地說明與釐清，是本書的初衷；而如何從中找到關鍵的議題進行分析比較，進而找到臺灣可行的軌跡，是本書的內容。",
    tags: ["中文", "政策面"],
    pages: 224,
    isbn: "9978-626-423-539-6",
    eisbn: "9786264235365"
  },
  {
    id: "2",
    bookName: "地方創生可以不一樣",
    author: ["李智仁", "陳德齡","嚴昱如"],
    image: "/images/book1.png",
    category: "文化資產",
    publicDate: "2025/06/30(1版1刷)",
    publisher: "五南",
    description: "地方創生近年來備受討論，也經歷了許多實踐歷程，成果令人敬佩。在各地的案例不斷累積之餘，如何透過系統化的整理，將政府與民間的角色清楚地說明與釐清，是本書的初衷；而如何從中找到關鍵的議題進行分析比較，進而找到臺灣可行的軌跡，是本書的內容。",
    tags: ["中文", "政策面"],
    pages: 224,
    isbn: "9978-626-423-539-6",
    eisbn: "9786264235365"
  },
];

//活動
export const eventData: Event[] = [
  {
    id: "1",
    title: "地方創生可以不一樣新書發表會",
    date: "2025-08-16",
    mainImage: "/images/gallery/bookmain.jpg",
    description: "脫下鞋子 奔跑<br><br>我原本不知<br><br>最終目的在何方<br><br>直到我遇見心中燃起的光<br><br>才發現<br><br>目的地就在<br><br>往完美的方向",
    subTitle: "Impromptu142, 臺北市萬華區長沙街二段142號",
    relatedImages: [
    { id: 1, title: "book1", src: "/images/gallery/book1.jpg" },
    { id: 2, title: "book2", src: "/images/gallery/book2.jpg" },
    { id: 3, title: "book3", src: "/images/gallery/book3.jpg" },
    { id: 4, title: "book4", src: "/images/gallery/book4.jpg" },
    { id: 5, title: "book5", src: "/images/gallery/book5.jpg" },
  ],
    type: "past",
    alt: "地方創生可以不一樣新書發表會",
  },
  {
    id: "2",
    title: "故宮浮世之美",
    date: "2025-09-20",
    mainImage: "/images/museums/故宮_浮世之美.jpg",
    description: "故宮博物院經典展覽，展現東方藝術之美",
    subTitle: "故宮博物院經典展覽，展現東方藝術之美",
    relatedImages: [
    { id: 1, title: "故宮_浮世之美", src: "/images/museums/故宮_浮世之美.jpg" },
  ],
    type: "current",
    alt: "故宮浮世之美",
  },
  {
    id: "3",
    title: "奇美博物館展覽",
    date: "2025-09-21",
    mainImage: "/images/museums/奇美博物館.jpg",
    description: "台南奇美博物館的精彩展覽與文物收藏",
    subTitle: "台南奇美博物館的精彩展覽與文物收藏",
    relatedImages: [
    { id: 1, title: "奇美博物館", src: "/images/museums/奇美博物館.jpg" },
  ],
    type: "current",
    alt: "奇美博物館展覽",
  },
  {
    id: "4",
    title: "田中達也特展",
    date: "2025-03-15 ~ 2025-04-01",
    mainImage: "/images/museums/田中.jpg",
    description: "田中達也特展-大師眼中的微型組合",
    subTitle: "田中達也特展-大師眼中的微型組合",
    relatedImages: [
    { id: 1, title: "田中達也特展", src: "/images/gallery/6.jpg" },
    { id: 2, title: "田中達也特展", src: "/images/gallery/7.jpg" },
    { id: 3, title: "田中達也特展", src: "/images/gallery/8.jpg" },
  ],
    type: "past",
    alt: "田中達也特展",
  },
  {
    id: "5",
    title: "世界新聞攝影展",
    date: "2025-03-15 ~ 2025-04-01",
    mainImage: "/images/museums/世界攝影展.jpg",
    relatedImages: [
    { id: 1, title: "世界攝影展", src: "/images/gallery/9.jpg" },
    { id: 2, title: "世界攝影展", src: "/images/gallery/10.jpg" },
    { id: 3, title: "世界攝影展", src: "/images/gallery/11.jpg" },
  ],
    description: "世界新聞攝影展 -財團法人玉溪有容教育基金",
    subTitle: "世界新聞攝影展 -財團法人玉溪有容教育基金",
    type: "past",
    alt: "世界新聞攝影展",
  },
  
];

export const navItems = [
    { href: '/about', label: '關於我們' },
    { href: '/article/all', label: '觀點文章' },
    { href: '/story/all', label: '光影故事' },
    { href: '/gallery/all', label: 'TIPC影音' },
    { href: '/book', label: 'TIPC選書' },
    { href: '/archive', label: '典藏索引' },
    { href: '/exhibition', label: '線上展覽' },
    { href: '/event', label: '活動探索' },
    { href: '/partner', label: '合作夥伴' },
    { href: '/contact', label: '聯絡我們' },
  ];
