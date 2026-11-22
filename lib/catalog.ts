export const products = [
  {
    slug: 'modern-led-ring-chandelier',
    name: 'Modern LED Ring Chandelier',
    category: 'Chandeliers & Lighting',
    kind: 'lighting',
    description:
      'Elegant circular lighting for contemporary interiors. Ask the showroom for verified dimensions, finishes and availability.',
  },
  {
    slug: 'contemporary-sofa-set',
    name: 'Contemporary Sofa Set',
    category: 'Furniture & Chairs',
    kind: 'furniture',
    description:
      'Explore comfortable sofa styles for living rooms and lounges. Contact RUFES for current models and upholstery choices.',
  },
  {
    slug: 'decorative-tabletop-sphere',
    name: 'Decorative Tabletop Sphere',
    category: 'Home Décor & Artifacts',
    kind: 'decor',
    description:
      'A sculptural accent for shelves, consoles and living room displays. Confirm finishes and sizes with the showroom.',
  },
  {
    slug: 'artificial-flower-arrangement',
    name: 'Artificial Flower Arrangement',
    category: 'Flowers & Plants',
    kind: 'flowers',
    description:
      'Decorative floral arrangements for homes, offices and events. Enquire about available styles.',
  },
  {
    slug: 'children-playground-set',
    name: 'Children’s Playground Set',
    category: 'Playground Equipment',
    kind: 'playground',
    description:
      'Explore play structures for recreational spaces. Ask for age suitability, dimensions and installation details.',
  },
  {
    slug: 'home-treadmill',
    name: 'Home Treadmill',
    category: 'Gym Equipment',
    kind: 'gym',
    description:
      'Discover exercise equipment for home fitness spaces. Request current specifications and availability.',
  },
  {
    slug: 'decorative-christmas-wreath',
    name: 'Decorative Christmas Wreath',
    category: 'Christmas Decorations',
    kind: 'christmas',
    description:
      'Seasonal wreaths and festive décor. Contact RUFES for current seasonal selections.',
  },
  {
    slug: 'bicycle-collection',
    name: 'Bicycle Collection',
    category: 'Bicycles & Sports',
    kind: 'sports',
    description:
      'Explore recreational bicycles and sports items. Confirm available models and sizes.',
  },
];
export const categories = [
  {
    slug: 'furniture',
    name: 'Furniture & Chairs',
    description: 'Sofas, seating and furnishing',
  },
  {
    slug: 'lighting',
    name: 'Chandeliers & Lighting',
    description: 'Statement lighting for every space',
  },
  {
    slug: 'decor',
    name: 'Home Décor & Artifacts',
    description: 'Finishing touches for interiors',
  },
  {
    slug: 'flowers',
    name: 'Flowers & Plants',
    description: 'Decorative greenery and arrangements',
  },
  {
    slug: 'gym',
    name: 'Gym Equipment',
    description: 'Fitness and exercise equipment',
  },
  {
    slug: 'playground',
    name: 'Playground Equipment',
    description: 'Play structures and accessories',
  },
  {
    slug: 'sports',
    name: 'Bicycles & Sports',
    description: 'Recreation and sporting goods',
  },
  {
    slug: 'christmas',
    name: 'Christmas Decorations',
    description: 'Festive and seasonal collections',
  },
  {
    slug: 'textiles',
    name: 'Home Textiles',
    description: 'Rugs, cushions and soft furnishings',
  },
  {
    slug: 'toys',
    name: 'Baby & Children’s Toys',
    description: 'Toys and play essentials',
  },
];
export const photos = Object.fromEntries(
  Object.entries({
    furniture: 'photo-1555041469-a586c61ea9bc',
    lighting: 'photo-1507473885765-e6ed057f782c',
    decor: 'photo-1490312278390-ab64016e0aa9',
    flowers: 'photo-1487530811176-3780de880c2d',
    gym: 'photo-1534438327276-14e5300c3a48',
    playground: 'photo-1596464716127-f2a82984de30',
    sports: 'photo-1485965120184-e220f721d03e',
    christmas: 'photo-1512389142860-9c449e58a543',
    textiles: 'photo-1600210492486-724fe5c67fb0',
    toys: 'photo-1558060370-d644479cb6f7',
  }).map(([k, v]) => [k, 'https://images.unsplash.com/' + v + '?w=900&q=80'])
);
