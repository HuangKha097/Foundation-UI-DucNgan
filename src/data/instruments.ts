import hero from "@/assets/hero-dantranh.jpg";
import imgTranh from "@/assets/inst-dantranh.jpg";
import imgBau from "@/assets/inst-danbau.jpg";
import imgTyba from "@/assets/inst-dantyba.jpg";
import imgNguyet from "@/assets/inst-dannguyet.jpg";

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
    tagline: "The Queen of Vietnamese traditional instruments.",
    description:
      "A sixteen-string zither with a voice as clear as spring water. Handcarved from aged jackfruit wood and inlaid with mother-of-pearl, each Đàn Tranh sings the songs of the Red River delta.",
    price: format(24_500_000),
    rating: 4.9,
    reviews: 36,
    image: imgTranh,
    hero,
    materials: ["Aged jackfruit wood", "Mother-of-pearl inlay", "Silk-wound strings"],
    specs: {
      Strings: "16",
      Length: "110 cm",
      Wood: "Aged jackfruit",
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
    tagline: "One string. A thousand voices.",
    description:
      "The monochord of Vietnam. A single string, a lacquered gourd, and a bamboo bending rod produce a voice so human it has been called the sound of the Vietnamese soul.",
    price: format(9_800_000),
    rating: 4.8,
    reviews: 18,
    image: imgBau,
    hero: imgBau,
    materials: ["Lacquered rosewood", "Bamboo bending rod", "Coconut gourd resonator"],
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
    tagline: "A pear-shaped lute with royal heritage.",
    description:
      "Descended from the imperial court, the Đàn Tỳ Bà pairs a warm pear-shaped body with four silk-wound strings. It carries the poise of centuries.",
    price: format(22_000_000),
    rating: 4.7,
    reviews: 31,
    image: imgTyba,
    hero: imgTyba,
    materials: ["Paulownia soundboard", "Walnut neck", "Silk strings"],
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
    tagline: "The moon lute with deep resonant tones.",
    description:
      "Two strings, a full round body, a long elegant neck. The Đàn Nguyệt anchors ceremonial ensembles with a low, meditative pulse.",
    price: format(18_900_000),
    rating: 4.8,
    reviews: 24,
    image: imgNguyet,
    hero: imgNguyet,
    materials: ["Aged mít wood", "Walnut neck", "Nylon strings"],
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
    tagline: "A twin of the moon, tuned for storytelling.",
    description:
      "A close relative of the Đàn Nguyệt, favored by southern water-puppet and cải lương ensembles for its narrative voice.",
    price: format(16_400_000),
    rating: 4.7,
    reviews: 12,
    image: imgNguyet,
    hero: imgNguyet,
    materials: ["Aged mít wood", "Rosewood neck"],
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
    tagline: "A crisp voice for southern folk.",
    description:
      "A bright two-stringed lute used across southern folk repertoire. Bright, articulate, and quick.",
    price: format(12_600_000),
    rating: 4.6,
    reviews: 9,
    image: imgTyba,
    hero: imgTyba,
    materials: ["Paulownia soundboard", "Rosewood neck"],
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