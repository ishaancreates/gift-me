export interface Product {
  id: string;
  number: string;
  name: string;
  category: 'TECH' | 'FASHION' | 'BOOKS' | 'GAMING' | 'ACCESSORIES' | 'OTHER';
  price: string;
  image: string;
  description: string;
  whyIWantIt: string;
  purchaseUrl: string;
  priority: 'MUST HAVE' | 'HIGH' | 'NICE TO HAVE';
  featured?: boolean;
  claimed?: boolean;
}

export interface BirthdayMessage {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  rotation?: number;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    number: '01',
    name: 'Kreo Hive 65 RGB Mechanical Gaming Keyboard',
    category: 'GAMING',
    price: '₹2,699',
    image: 'https://m.media-amazon.com/images/I/611B-nhyr1L.jpg',
    description: 'Pre-lubed custom mechanical switches, 5-pin hot-swappable PCB, anti-ghosting, 65% compact layout with dynamic RGB backlighting and detachable USB-C cable.',
    whyIWantIt: 'The hot-swappable pre-lubed switches and compact 65% layout make typing and late-night coding feel incredibly tactile and smooth.',
    purchaseUrl: 'https://www.amazon.in/gp/product/B0F4K8KZS8/ref=ox_sc_act_image_8?smid=AJ6SIZC8YQDZX&psc=1',
    priority: 'MUST HAVE',
    featured: true,
    claimed: false
  },
  {
    id: 'prod-02',
    number: '02',
    name: 'Velinor Pull-Back Action Toy P729 Pistol',
    category: 'OTHER',
    price: '₹799',
    image: 'https://m.media-amazon.com/images/I/51xUNpuQdXL.jpg',
    description: 'Pull-back action toy shooting pistol with 200 safe plastic BB pellets, long-range spring power mechanism, and removable magazine for target practice.',
    whyIWantIt: 'A fun desktop companion for quick stress relief and target shooting breaks during long development sessions.',
    purchaseUrl: 'https://www.amazon.in/gp/product/B0G9XTRK5L/ref=ox_sc_act_image_6?smid=A3LJ0PEW3Y6Z2J&psc=1',
    priority: 'HIGH',
    claimed: false
  },
  {
    id: 'prod-03',
    number: '03',
    name: 'Bburago Oracle Red Bull Racing RB21 2025 (1:64)',
    category: 'ACCESSORIES',
    price: '₹1,354',
    image: 'https://m.media-amazon.com/images/I/41bFW5EbtWL.jpg',
    description: 'Official Bburago 1:64 scale precision die-cast Formula 1 race car model of the Oracle Red Bull Racing RB21, Max Verstappen #1 edition.',
    whyIWantIt: 'As an avid Formula 1 and Red Bull Racing fan, this die-cast RB21 model is an absolute centerpiece for my setup desk display.',
    purchaseUrl: 'https://www.amazon.in/gp/product/B0G4F3QM8Z/ref=ox_sc_act_image_3?smid=A1QA8RN2UEATK9&psc=1',
    priority: 'MUST HAVE',
    claimed: false
  },
  {
    id: 'prod-04',
    number: '04',
    name: 'Luxury Sign India Batman Logo Acrylic Wall Art',
    category: 'ACCESSORIES',
    price: '₹349',
    image: 'https://m.media-amazon.com/images/I/41WSrOUnMnL.jpg',
    description: 'Matte black round 30x30 cm acrylic wall art display featuring the iconic Batman emblem in premium cut high-gloss acrylic finish.',
    whyIWantIt: 'Sets the ultimate dark knight ambient theme on the accent wall right behind my workspace setup.',
    purchaseUrl: 'https://www.amazon.in/gp/product/B0GSZ6XDTV/ref=ox_sc_act_title_1?smid=A21IQV7SEISX7G&psc=1',
    priority: 'HIGH',
    claimed: false
  },
  {
    id: 'prod-05',
    number: '05',
    name: 'LEGO Speed Champions Red Bull Racing RB20 (77243)',
    category: 'OTHER',
    price: '₹2,474',
    image: 'https://m.media-amazon.com/images/I/51xu674J-IL.jpg',
    description: 'LEGO Speed Champions 77243 official Oracle Red Bull Racing RB20 F1 Race Car collectible building set with detailed driver minifigure.',
    whyIWantIt: 'Building this LEGO F1 car will be the ultimate birthday weekend activity to relax and display afterwards.',
    purchaseUrl: 'https://www.amazon.in/dp/B0DHSFBRPB?_encoding=UTF8&psc=1&ref=cm_sw_r_cp_ud_dp_NAQQ62N6HZHP86ZHGB39',
    priority: 'HIGH',
    claimed: false
  },
  {
    id: 'prod-06',
    number: '06',
    name: 'Shopsero Pull Back Alloy Racing Car Set (48 Pcs)',
    category: 'OTHER',
    price: '₹999',
    image: 'https://m.media-amazon.com/images/I/51MCS6XDtVL.jpg',
    description: 'Mega 48-piece mini alloy pull-back die-cast racing vehicle set with included city play map mat and compact portable storage organizer.',
    whyIWantIt: 'Huge variety of mini collectible die-cast cars for playful desk racing and setup decoration.',
    purchaseUrl: 'https://www.amazon.in/dp/B0G4RKMCW4?_encoding=UTF8&psc=1&ref=cm_sw_r_cp_ud_dp_F525D9TF0DDTE54J36JG',
    priority: 'NICE TO HAVE',
    claimed: false
  },
  {
    id: 'prod-07',
    number: '07',
    name: 'Hot Wheels 2026 Formula 1 Pack of 5 Cars',
    category: 'ACCESSORIES',
    price: '₹999',
    image: 'https://m.media-amazon.com/images/I/61H-1l4OWOL.jpg',
    description: 'Official 5-pack Hot Wheels 1:64 scale Formula 1 set featuring Red Bull, Mercedes-AMG Petronas, Alpine, Haas, and Williams Racing livery.',
    whyIWantIt: 'Complete grid collection of top F1 team cars in classic 1:64 Hot Wheels casting format.',
    purchaseUrl: 'https://www.amazon.in/dp/B0GX5BTKWB?ref=cm_sw_r_cp_ud_dp_JE9KD1PA36EDXFF065EX',
    priority: 'MUST HAVE',
    claimed: false
  },
  {
    id: 'prod-08',
    number: '08',
    name: 'Hot Wheels Launch & Loop Figure-8 Track Set',
    category: 'OTHER',
    price: '₹2,540',
    image: 'https://m.media-amazon.com/images/I/6114qTKE8QL.jpg',
    description: 'Action-packed figure-8 track set with motor loop-kicker booster, rapid launcher, crash zone, and 1:64 die-cast car included.',
    whyIWantIt: 'Non-stop loop launching action for high-speed thrills right on the floor.',
    purchaseUrl: 'https://www.amazon.in/dp/B0D7PT1JJJ?_encoding=UTF8&psc=1&ref=cm_sw_r_cp_ud_dp_H9F7QEY7QBT5PJX5ETP9',
    priority: 'NICE TO HAVE',
    claimed: false
  },
  {
    id: 'prod-09',
    number: '09',
    name: 'Jaspo Street King 31" Canadian Maple Skateboard',
    category: 'FASHION',
    price: '₹2,849',
    image: 'https://m.media-amazon.com/images/I/8106VutJ--L.jpg',
    description: 'Professional 31" x 8" 7-layer Canadian maple wood deck skateboard with heavy-duty aluminum trucks, 120kg weight capacity and Bad Boy graphic.',
    whyIWantIt: 'Great for getting outside for a cruise and practicing kickflips during evening breaks.',
    purchaseUrl: 'https://www.amazon.in/dp/B0FBKC6KK9?ref=cm_sw_r_cp_ud_dp_XBB95WKZWJ02TPTEZXZH',
    priority: 'HIGH',
    claimed: false
  },
  {
    id: 'prod-10',
    number: '10',
    name: 'Tillu Tim Tim 90cm AK-47 Toy Replica Set',
    category: 'OTHER',
    price: '₹777',
    image: 'https://m.media-amazon.com/images/I/41leK3vSjSL.jpg',
    description: 'Full-size 90 cm AK-47 toy assault rifle replica featuring tactical goggles, camouflage cap, spring mechanism, and BB target pellets.',
    whyIWantIt: 'A fun tactical prop for photos, cosplay, and friendly office battle breaks.',
    purchaseUrl: 'https://www.amazon.in/dp/B0B1W3773J?ref=cm_sw_r_cp_ud_dp_MDX38CJMHTGMB79NJAYA',
    priority: 'NICE TO HAVE',
    claimed: false
  }
];

export const INITIAL_MESSAGES: BirthdayMessage[] = [
  {
    id: 'msg-1',
    name: 'Alex Rivera',
    message: 'Happy Birthday brother! Hope this year brings huge wins and non-stop momentum. Enjoy the headphones when you get them! 🚀',
    timestamp: '2 hours ago',
    rotation: -1.5
  },
  {
    id: 'msg-2',
    name: 'Sophia Chen',
    message: 'Happy 31 Oct! Easily the most insanely well-designed wishlist I have ever seen. Have a blast!',
    timestamp: 'Yesterday',
    rotation: 2.1
  },
  {
    id: 'msg-3',
    name: 'Marcus Vance',
    message: 'Claimed item #02 for you! Keep building incredible stuff. Cheers man! ☕',
    timestamp: '2 days ago',
    rotation: -0.8
  }
];
