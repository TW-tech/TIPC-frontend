import type { Partner, CarouselImage, CultureKnowledge, VideoRecommendation, CultureItem } from "@/types";

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
    type: 'local',
    src: '/videos/demo.mp4',
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
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
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
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
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
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
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
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
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
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    detail: ""
  }
];

// 文化知識數據
export const cultureItemsData: CultureKnowledge[] = [
  {
    id: "traditional-arts",
    title: "文化永續",
    image: "/images/culture/怎麼做.jpg",
    position: "top-left"
  },
  {
    id: "cultural-heritage",
    title: "文化記憶",
    image: "/images/culture/文化記憶2.jpg",
    position: "top-right"
  },
  {
    id: "cultural-memory",
    title: "文化資產/文化活動",
    image: "/images/culture/文化活動.jpg",
    position: "bottom-left"
  },
  {
    id: "modern-culture",
    title: "文化產業/文化品牌",
    image: "/images/culture/文化品牌2.jpg",
    position: "bottom-right"
  }
];

// 輪播圖片數據
export const carouselImagesData: CarouselImage[] = [
  {
    id: "1",
    src: "/images/museums/故宮_浮世之美.jpg",
    alt: "故宮浮世之美",
    title: "故宮浮世之美",
    description: "故宮博物院經典展覽，展現東方藝術之美"
  },
  {
    id: "2",
    src: "/images/museums/奇美博物館.jpg",
    alt: "奇美博物館",
    title: "奇美博物館",
    description: "台南奇美博物館的精彩展覽與文物收藏"
  },
  {
    id: "3",
    src: "/images/museums/田中.jpg",
    alt: "田中",
    title: "中正紀念堂",
    description: "田中達也特展-大師眼中的微型組合"
  },
  {
    id: "4",
    src: "/images/museums/世界攝影展.jpg",
    alt: "世界新聞攝影展",
    title: "世界新聞攝影展",
    description: "世界新聞攝影展 -財團法人玉溪有容教育基金"
  }
];

//專欄文章
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