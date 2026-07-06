import culture from "@/assets/culture.jpg";
import craft from "@/assets/craft.jpg";
import artisan from "@/assets/artisan.jpg";
import tranh from "@/assets/inst-dantranh.jpg";

export type Story = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  category: string;
  readingTime: string;
  image: string;
  date: string;
};

export const stories: Story[] = [
  {
    slug: "history-of-dan-tranh",
    title: "The Quiet History of the Đàn Tranh",
    excerpt:
      "How a sixteen-string zither became the voice of the Red River delta — and why every one of ours takes three months to build.",
    body: [
      "Long before recording, before radio, before the microphone made silence a rare thing, the Đàn Tranh was already old.",
      "It arrived in Vietnam from the north almost a thousand years ago, then quietly became something else — narrower waist, thinner soundboard, a voice pitched to the timbre of the spoken language.",
      "In our workshop the same shape has been drawn on paper for three generations. Wood is chosen in winter, when the grain is at its densest, and rested for a full year before a single cut is made.",
      "The mother-of-pearl inlay is the last step and takes a week. Every motif is a small promise: that the instrument will outlive the person who built it.",
    ],
    category: "History",
    readingTime: "6 min read",
    image: tranh,
    date: "June 2026",
  },
  {
    slug: "how-dan-bau-works",
    title: "How the Đàn Bầu Speaks With One String",
    excerpt:
      "A single string, a bamboo rod, a gourd resonator. The physics — and the feeling — of Vietnam's monochord.",
    body: [
      "There is no simpler string instrument in Vietnam. There may be none more difficult to play.",
      "The Đàn Bầu makes its melody entirely from harmonics — the player touches the string at exact fractions of its length while bending pitch with a bamboo rod.",
      "In the right hands it sounds unnervingly like a human voice singing in a small room. That likeness is not an accident; the shape of the resonator was tuned for it, patiently, over centuries.",
    ],
    category: "Craft",
    readingTime: "4 min read",
    image: culture,
    date: "May 2026",
  },
  {
    slug: "choosing-your-first-instrument",
    title: "Choosing Your First Traditional Instrument",
    excerpt:
      "A short, honest guide to picking an instrument you will still love five years from now.",
    body: [
      "The best first instrument is the one whose voice moves you when you hear it played well.",
      "Beyond that: consider your hands, the room where you will practice, and how patient you are with tuning. We are always happy to advise — write to us, or visit the showroom.",
    ],
    category: "Guides",
    readingTime: "3 min read",
    image: craft,
    date: "April 2026",
  },
  {
    slug: "caring-for-wooden-instruments",
    title: "Caring for a Handmade Wooden Instrument",
    excerpt:
      "Humidity, sunlight, string oil, and the small daily rituals that keep an instrument alive.",
    body: [
      "Wood is a slow material. Given a stable room and a soft cloth, an instrument from our workshop will outlast its first player.",
      "Keep it away from direct sun and radiators. Wipe the strings after each session. Loosen tension slightly if you will not play for a month.",
    ],
    category: "Guides",
    readingTime: "5 min read",
    image: artisan,
    date: "March 2026",
  },
];

export function getStory(slug: string) {
  return stories.find((s) => s.slug === slug);
}