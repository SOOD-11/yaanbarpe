
export interface RoutePoint {
  id: string;
  name: string;
  type: 'temple' | 'beach' | 'cultural' | 'culinary' | 'heritage';
  coordinates: [number, number];
  description: string;
  image: string;
  duration: string;
}

export interface PackageRoute {
  id: string;
  name: string;
  description: string;
  points: RoutePoint[];
  mapCenter: [number, number];
  totalDistance: string;
}

export interface Package {
  id: string;
  tier: 'basic' | 'business' | 'intermediate' | 'semi-emulsive' | 'fully-emulsive' | 'supreme';
  title: string;
  duration: string;
  price: {
    min: number;
    max: number;
  };
  description: string;
  highlights: string[];
  includes: string[];
  itinerary: {
    day: number;
    title: string;
    activities: string[];
    meals: string[];
  }[];
  routes: string[];
  image: string;
  difficulty: 'easy' | 'moderate' | 'challenging';
  groupSize: string;
  bestFor: string[];
  points: number;
  featured?: boolean;
  available?: boolean;
}

export const routes: PackageRoute[] = [
  {
    id: 'temple-circuit',
    name: 'Temple Heritage Circuit',
    description: 'Sacred temples showcasing Tulu Nadu\'s spiritual heritage',
    mapCenter: [13.3409, 74.7421],
    totalDistance: '85 km',
    points: [
      {
        id: 'sri-krishna-temple',
        name: 'Sri Krishna Matha, Udupi',
        type: 'temple',
        coordinates: [13.3409, 74.7421],
        description: 'Ancient temple founded by Saint Madhvacharya',
        image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400',
        duration: '2 hours'
      },
      {
        id: 'anantheshwara-temple',
        name: 'Anantheshwara Temple',
        type: 'temple',
        coordinates: [13.3500, 74.7450],
        description: 'Oldest temple in Udupi with unique architecture',
        image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400',
        duration: '1.5 hours'
      }
    ]
  },
  {
    id: 'coastal-explorer',
    name: 'Coastal Heritage Trail',
    description: 'Pristine beaches and maritime heritage of Tulu Nadu',
    mapCenter: [13.2127, 74.7421],
    totalDistance: '120 km',
    points: [
      {
        id: 'st-marys-islands',
        name: "St. Mary's Islands",
        type: 'beach',
        coordinates: [13.2127, 74.7421],
        description: 'Unique hexagonal basalt rock formations',
        image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400',
        duration: '4 hours'
      },
      {
        id: 'malpe-beach',
        name: 'Malpe Beach',
        type: 'beach',
        coordinates: [13.2100, 74.7400],
        description: 'Popular beach with fishing harbor',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        duration: '2 hours'
      }
    ]
  }
];

export const packages: Package[] = [
  // BASIC TIER
  {
    id: 'udupi-essentials-6h',
    tier: 'basic',
    title: 'Udupi Essentials',
    duration: '6 hours',
    price: { min: 2000, max: 2500 },
    description: 'Experience the spiritual heart of Tulu Nadu with temple visits and authentic cuisine',
    highlights: ['Sri Krishna Temple visit', 'Traditional Udupi cuisine', 'Local market exploration'],
    includes: ['Transportation', 'Temple guide', 'Lunch', 'Cultural briefing'],
    itinerary: [
      {
        day: 1,
        title: 'Udupi Spiritual & Culinary Journey',
        activities: ['Sri Krishna Temple visit', 'Traditional cooking demo', 'Local market tour'],
        meals: ['Traditional Udupi lunch']
      }
    ],
    routes: ['temple-circuit'],
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?w=600',
    difficulty: 'easy',
    groupSize: '2-15 people',
    bestFor: ['First-time visitors', 'Spiritual seekers', 'Food enthusiasts'],
    points: 10,
    featured: true,
    available: true
  },
  {
    id: 'mangalore-heritage-6h',
    tier: 'basic',
    title: 'Mangalore Heritage',
    duration: '6 hours',
    price: { min: 2200, max: 2800 },
    description: 'Discover Mangalore\'s rich heritage through temples and spice markets',
    highlights: ['Historic temples', 'Spice market tour', 'Traditional crafts'],
    includes: ['Transportation', 'Guide', 'Refreshments', 'Craft demonstration'],
    itinerary: [
      {
        day: 1,
        title: 'Mangalore Cultural Discovery',
        activities: ['Temple visits', 'Spice market exploration', 'Traditional craft workshop'],
        meals: ['Local snacks and refreshments']
      }
    ],
    routes: ['temple-circuit'],
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600',
    difficulty: 'easy',
    groupSize: '2-15 people',
    bestFor: ['History buffs', 'Culture enthusiasts', 'Shopping lovers'],
    points: 10,
    available: true
  },
  {
    id: 'coastal-explorer-1day',
    tier: 'basic',
    title: 'Coastal Explorer',
    duration: '1 day',
    price: { min: 4500, max: 5500 },
    description: 'Full day exploring the stunning coastline and geological wonders',
    highlights: ["St. Mary's Islands", 'Malpe Beach', 'Lighthouse visit', 'Sunset viewing'],
    includes: ['Transportation', 'Boat ride', 'Lunch', 'Guide', 'Entry fees'],
    itinerary: [
      {
        day: 1,
        title: 'Coastal Wonders',
        activities: ["St. Mary's Islands exploration", 'Beach activities', 'Lighthouse tour', 'Sunset photography'],
        meals: ['Coastal seafood lunch']
      }
    ],
    routes: ['coastal-explorer'],
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600',
    difficulty: 'easy',
    groupSize: '2-12 people',
    bestFor: ['Nature lovers', 'Photography enthusiasts', 'Adventure seekers'],
    points: 15,
    featured: true,
    available: true
  },

  // BUSINESS EXECUTIVE
  {
    id: 'mahe-executive',
    tier: 'business',
    title: 'Executive Cultural Brief - Mahe',
    duration: '4 hours',
    price: { min: 8000, max: 10000 },
    description: 'Curated cultural experience designed for busy executives',
    highlights: ['VIP temple access', 'Executive networking', 'Cultural briefing', 'Premium dining'],
    includes: ['Private transportation', 'Personal guide', 'Premium lunch', 'Cultural portfolio'],
    itinerary: [
      {
        day: 1,
        title: 'Executive Cultural Immersion',
        activities: ['Private temple tour', 'Cultural briefing session', 'Traditional arts preview'],
        meals: ['Premium traditional lunch']
      }
    ],
    routes: ['temple-circuit'],
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600',
    difficulty: 'easy',
    groupSize: '1-6 people',
    bestFor: ['Business executives', 'Time-conscious travelers', 'Premium experience seekers'],
    points: 25,
    available: true
  },

  // INTERMEDIATE TIER
  {
    id: 'udupi-mangalore-2day',
    tier: 'intermediate',
    title: 'Udupi-Mangalore Discovery',
    duration: '2 days',
    price: { min: 12000, max: 15000 },
    description: 'Comprehensive exploration of two major cultural centers',
    highlights: ['Both cities covered', 'Cultural workshops', 'Local family visit', 'Traditional performances'],
    includes: ['Accommodation', 'All meals', 'Transportation', 'Workshops', 'Cultural shows'],
    itinerary: [
      {
        day: 1,
        title: 'Udupi Deep Dive',
        activities: ['Temple complex tour', 'Cooking workshop', 'Cultural center visit'],
        meals: ['Traditional breakfast', 'Udupi lunch', 'Local dinner']
      },
      {
        day: 2,
        title: 'Mangalore Exploration',
        activities: ['Heritage walk', 'Spice plantation visit', 'Traditional craft workshop'],
        meals: ['Coastal breakfast', 'Seafood lunch', 'Cultural dinner']
      }
    ],
    routes: ['temple-circuit', 'coastal-explorer'],
    image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=600',
    difficulty: 'moderate',
    groupSize: '2-10 people',
    bestFor: ['Cultural enthusiasts', 'Weekend travelers', 'Learning seekers'],
    points: 30,
    available: true
  },

  // SEMI-EMULSIVE
  {
    id: 'tulu-immersion-4day',
    tier: 'semi-emulsive',
    title: 'Tulu Cultural Immersion',
    duration: '4 days',
    price: { min: 25000, max: 32000 },
    description: 'Deep dive into Tulu culture with hands-on workshops and community integration',
    highlights: ['Yakshagana workshop', 'Village homestay', 'Traditional crafts', 'Cultural mentorship'],
    includes: ['Premium accommodation', 'All meals', 'Workshops', 'Cultural performances', 'Craft materials'],
    itinerary: [
      {
        day: 1,
        title: 'Cultural Foundation',
        activities: ['Welcome ceremony', 'Tulu language basics', 'Traditional dress fitting'],
        meals: ['Welcome feast', 'Traditional lunch', 'Village dinner']
      },
      {
        day: 2,
        title: 'Art Forms Introduction',
        activities: ['Yakshagana workshop', 'Traditional music lesson', 'Costume making'],
        meals: ['Traditional breakfast', 'Community lunch', 'Performance dinner']
      },
      {
        day: 3,
        title: 'Village Life Experience',
        activities: ['Village homestay', 'Agricultural activities', 'Folk art workshop'],
        meals: ['Village breakfast', 'Farm lunch', 'Community dinner']
      },
      {
        day: 4,
        title: 'Cultural Synthesis',
        activities: ['Personal performance', 'Cultural project presentation', 'Farewell ceremony'],
        meals: ['Traditional breakfast', 'Celebration lunch']
      }
    ],
    routes: ['temple-circuit', 'coastal-explorer'],
    image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600',
    difficulty: 'moderate',
    groupSize: '4-8 people',
    bestFor: ['Cultural immersion seekers', 'Art enthusiasts', 'Adventure travelers'],
    points: 50,
    featured: true,
    available: true
  },

  // FULLY EMULSIVE
  {
    id: 'complete-tulu-7day',
    tier: 'fully-emulsive',
    title: 'Complete Tulu Nadu Experience',
    duration: '7-9 days',
    price: { min: 45000, max: 60000 },
    description: 'Comprehensive cultural immersion with master workshops and festival participation',
    highlights: ['Master craftsman workshops', 'Festival participation', 'Documentation project', 'Cultural certification'],
    includes: ['Premium accommodation', 'All meals', 'Master workshops', 'Festival access', 'Documentation kit'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Orientation',
        activities: ['Cultural orientation', 'Tulu history session', 'Traditional welcome'],
        meals: ['Welcome dinner with cultural family']
      },
      {
        day: 2,
        title: 'Temple Architecture Deep Dive',
        activities: ['Architecture workshop', 'Stone carving lesson', 'Sacred geometry'],
        meals: ['Temple breakfast', 'Traditional lunch', 'Scholar dinner']
      }
      // Additional days would be added here
    ],
    routes: ['temple-circuit', 'coastal-explorer'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
    difficulty: 'challenging',
    groupSize: '2-6 people',
    bestFor: ['Serious cultural learners', 'Documentation enthusiasts', 'Transformation seekers'],
    points: 100,
    available: true
  },

  // SUPREME TIER
  {
    id: 'supreme-tailored',
    tier: 'supreme',
    title: 'Supreme Tailored Experience',
    duration: 'Custom',
    price: { min: 50000, max: 150000 },
    description: 'Completely personalized cultural journey tailored to your specific interests and schedule',
    highlights: ['Personal cultural mentor', 'Exclusive access', 'Custom workshops', 'Private collections'],
    includes: ['Luxury accommodation', 'Private transportation', 'Personal mentor', 'Exclusive experiences'],
    itinerary: [
      {
        day: 1,
        title: 'Personalized Journey Begins',
        activities: ['Custom activities based on preferences'],
        meals: ['Tailored dining experiences']
      }
    ],
    routes: ['temple-circuit', 'coastal-explorer'],
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600',
    difficulty: 'easy',
    groupSize: '1-4 people',
    bestFor: ['Luxury travelers', 'Specific interests', 'Ultimate experience seekers'],
    points: 200,
    available: true
  }
];

export const packageTiers = {
  basic: {
    name: 'Basic',
    color: 'bg-green-100 text-green-800',
    description: 'Perfect introduction to Tulu Nadu',
    icon: '🌱'
  },
  business: {
    name: 'Business Executive',
    color: 'bg-blue-100 text-blue-800',
    description: 'Curated for professionals',
    icon: '💼'
  },
  intermediate: {
    name: 'Intermediate',
    color: 'bg-yellow-100 text-yellow-800',
    description: 'Deeper cultural exploration',
    icon: '🎭'
  },
  'semi-emulsive': {
    name: 'Semi-Emulsive',
    color: 'bg-orange-100 text-orange-800',
    description: 'Immersive cultural experience',
    icon: '🎨'
  },
  'fully-emulsive': {
    name: 'Fully Emulsive',
    color: 'bg-purple-100 text-purple-800',
    description: 'Complete cultural transformation',
    icon: '🏛️'
  },
  supreme: {
    name: 'Supreme',
    color: 'bg-red-100 text-red-800',
    description: 'Ultimate personalized journey',
    icon: '👑'
  }
};
