import hero from "@/assets/hero-dantranh.jpg";
import imgTranh from "@/assets/inst-dantranh.jpg";
import imgBau from "@/assets/inst-danbau.jpg";
import imgTyba from "@/assets/inst-dantyba.jpg";
import imgNguyet from "@/assets/inst-dannguyet.jpg";
import imgTranhCamLai from "@/assets/inst-dantranh-camlai.jpg.asset.json";
import imgKim from "@/assets/inst-dankim.jpg.asset.json";
import imgSen from "@/assets/inst-dansen.jpg.asset.json";

export type Instrument = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  price: number; // in đ
  rating: number;
  reviews: number;
  image: string;
  hero: string;
  materials: string[];
  specs: Record<string, string>;
  process: string[];
};

const format = (n: number) => n;

export const instruments: Instrument[] = [
  {
    slug: "dan-tranh",
    name: "Đàn Tranh",
    category: "Zither",
    tagline: "Đàn tranh 19 dây cẩm lai khảm hoa lan.",
    description:
      "Đàn tranh 19 dây làm từ gỗ cẩm lai quý, mặt đàn khảm trai hoa lan tinh xảo. Âm thanh trong trẻo, ngân vang, là lựa chọn hàng đầu cho nghệ sĩ chuyên nghiệp.",
    price: format(24_500_000),
    rating: 4.9,
    reviews: 36,
    image: imgTranhCamLai.url,
    hero: imgTranhCamLai.url,
    materials: ["Gỗ cẩm lai", "Khảm trai hoa lan", "Dây kim loại bọc lụa"],
    specs: {
      Strings: "19",
      Length: "110 cm",
      Wood: "Cẩm lai",
      Origin: "Hà Nội workshop",
      Finish: "Natural shellac",
    },
    process: [
      "Aged wood is selected from a 40-year-old jackfruit tree.",
      "Body is hollowed by hand over three weeks.",
      "Mother-of-pearl motifs are carved and inlaid.",
      "Instrument is strung and voiced by a master tuner.",
    ],
  },
  {
    slug: "dan-bau",
    name: "Đàn Bầu",
    category: "Monochord",
    tagline: "Một dây. Ngàn cung bậc.",
    description:
      "Đàn độc huyền của Việt Nam. Một dây duy nhất, bầu cộng hưởng sơn mài và cần trúc uốn tạo nên tiếng đàn ngân nga như tiếng lòng người Việt.",
    price: format(9_800_000),
    rating: 4.8,
    reviews: 18,
    image: imgBau,
    hero: imgBau,
    materials: ["Gỗ trắc sơn mài", "Cần trúc uốn", "Bầu gáo dừa"],
    specs: {
      Strings: "1",
      Length: "115 cm",
      Wood: "Rosewood body",
      Origin: "Huế workshop",
      Finish: "Traditional lacquer",
    },
    process: [
      "The body is joined from six pieces of rosewood.",
      "Layers of traditional lacquer are applied over ten days.",
      "The gourd resonator is hand-fitted and tuned.",
      "Master artisan adjusts the bamboo rod tension by ear.",
    ],
  },
  {
    slug: "dan-ty-ba",
    name: "Đàn Tỳ Bà",
    category: "Lute",
    tagline: "Đàn hình quả lê, mang phong cách cung đình.",
    description:
      "Bắt nguồn từ nhã nhạc cung đình, Đàn Tỳ Bà có thân hình quả lê với bốn dây bọc lụa. Tiếng đàn trầm ấm, mang dấu ấn nhiều thế kỷ.",
    price: format(22_000_000),
    rating: 4.7,
    reviews: 31,
    image: imgTyba,
    hero: imgTyba,
    materials: ["Mặt gỗ ngô đồng", "Cần gỗ óc chó", "Dây bọc lụa"],
    specs: {
      Strings: "4",
      Length: "94 cm",
      Wood: "Paulownia & walnut",
      Origin: "Huế workshop",
      Finish: "Hand-oiled",
    },
    process: [
      "Paulownia soundboard is aged for two winters.",
      "Neck is carved in a single piece of walnut.",
      "Frets are placed by ear against a reference tone.",
      "Silk strings are wound and voiced.",
    ],
  },
  {
    slug: "dan-nguyet",
    name: "Đàn Nguyệt",
    category: "Moon Lute",
    tagline: "Đàn hình trăng tròn, âm trầm sâu lắng.",
    description:
      "Hai dây, thân tròn đầy đặn, cần đàn dài thanh thoát. Đàn Nguyệt giữ nhịp trầm trong các dàn nhạc lễ và ca trù truyền thống.",
    price: format(18_900_000),
    rating: 4.8,
    reviews: 24,
    image: imgNguyet,
    hero: imgNguyet,
    materials: ["Gỗ mít lâu năm", "Cần gỗ óc chó", "Dây nylon"],
    specs: {
      Strings: "2",
      Length: "108 cm",
      Wood: "Mít & walnut",
      Origin: "Hà Nội workshop",
      Finish: "Natural wax",
    },
    process: [
      "Round body carved from a single block of aged mít wood.",
      "Long neck fitted with hand-shaped frets.",
      "Skin membrane tightened over the sound hole.",
      "Final voicing tuned to the pentatonic scale.",
    ],
  },
  {
    slug: "dan-kim",
    name: "Đàn Kìm",
    category: "Lute",
    tagline: "Đàn kìm gỗ tim, thân tròn mộc mạc.",
    description:
      "Đàn kìm thân gỗ tim, mặt đàn phẳng tự nhiên, cần dài thanh thoát. Tiếng đàn ấm, rõ nét — phù hợp với cải lương và đờn ca tài tử Nam Bộ.",
    price: format(16_400_000),
    rating: 4.7,
    reviews: 12,
    image: imgKim.url,
    hero: imgKim.url,
    materials: ["Gỗ tim", "Cần gỗ trắc", "Dây nylon"],
    specs: {
      Strings: "2",
      Length: "104 cm",
      Wood: "Mít & rosewood",
      Origin: "Sài Gòn workshop",
      Finish: "Natural wax",
    },
    process: [
      "Body hollowed by hand over ten days.",
      "Neck aligned and glued using rice-flour paste.",
      "Strings voiced against a reference recording.",
    ],
  },
  {
    slug: "dan-sen",
    name: "Đàn Sến",
    category: "Lute",
    tagline: "Đàn sến mặt hoa sen, hoa trúc thủ công.",
    description:
      "Đàn sến hai dây với mặt đàn vẽ hoa sen và hoa trúc thủ công. Tiếng đàn sáng, nhanh, đanh gọn — điểm nhấn trong dàn nhạc dân ca Nam Bộ.",
    price: format(12_600_000),
    rating: 4.6,
    reviews: 9,
    image: imgSen.url,
    hero: imgSen.url,
    materials: ["Mặt gỗ ngô đồng vẽ tay", "Cần gỗ trắc", "Dây kim loại"],
    specs: {
      Strings: "2",
      Length: "88 cm",
      Wood: "Paulownia & rosewood",
      Origin: "Mekong workshop",
      Finish: "Hand-oiled",
    },
    process: [
      "Soundboard shaped and tap-tuned.",
      "Neck fitted by hand.",
      "Voiced by a master player.",
    ],
  },
];

export const featured = ["dan-nguyet", "dan-tranh", "dan-bau", "dan-ty-ba"]
  .map((s) => instruments.find((i) => i.slug === s)!)
  .filter(Boolean);

export const categories = ["dan-tranh", "dan-bau", "dan-ty-ba", "dan-nguyet"]
  .map((s) => instruments.find((i) => i.slug === s)!)
  .filter(Boolean);

export function formatPrice(v: number) {
  return v.toLocaleString("vi-VN") + "đ";
}

export function getInstrument(slug: string) {
  return instruments.find((i) => i.slug === slug);
}