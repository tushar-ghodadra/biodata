/**
 * Gallery photos. Drop files into /public/photos and list them here.
 * Items without `src` render as elegant "coming soon" tiles so the
 * layout stays intact until real photos are added.
 */
export type Photo = {
  src?: string;
  alt: string;
  caption?: string;
  /** Aspect ratio as width / height. Used for layout before the image loads. */
  ratio: number;
};

const portrait = 3 / 4;

export const photos: Photo[] = [
  { src: "/photos/portrait.png", alt: "Tushar in a light blue shirt", caption: "Portrait", ratio: 1 },
  { src: "/photos/seaside-rocks.jpg", alt: "Tushar standing on dark rocks by the sea with the beach behind", caption: "Seaside", ratio: portrait },
  { src: "/photos/hill-road.jpg", alt: "Tushar sitting on a roadside wall along a misty hill road", caption: "Hill Road", ratio: portrait },
  { src: "/photos/golden-hour.jpg", alt: "Tushar leaning against a white car at golden hour", caption: "Golden Hour", ratio: portrait },
  { src: "/photos/open-arms-beach.jpg", alt: "Tushar with arms open wide on a sandy beach by the sea", caption: "Open Arms", ratio: portrait },
  { src: "/photos/rooftop-balloons.jpg", alt: "Tushar on a rooftop holding a bunch of red heart balloons", caption: "Rooftop", ratio: portrait },
  { src: "/photos/road-trip.jpg", alt: "Tushar in a black shirt leaning on a white SUV under palm trees", caption: "Road Trip", ratio: portrait },
  { src: "/photos/lakeside.jpg", alt: "Tushar standing by a lake with green hills behind", caption: "Lakeside", ratio: portrait },
  { src: "/photos/evening-light.jpg", alt: "Tushar in a navy polo leaning on a car against the evening sky", caption: "Evening Light", ratio: portrait },
  { src: "/photos/sunday-drive.jpg", alt: "Tushar in a cap standing beside a white SUV on a tree-lined street", caption: "Sunday Drive", ratio: portrait },
  { src: "/photos/city-drive.jpg", alt: "Tushar in a striped shirt leaning on the bonnet of a white SUV", caption: "City Drive", ratio: portrait },
];
