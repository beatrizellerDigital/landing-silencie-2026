export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  features: string[];
  specs: Record<string, string>;
  category: 'core' | 'accessory' | 'bundle';
  colorOptions?: { name: string; hex: string }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface ShippingDetails {
  name: string;
  email: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
}

export interface PaymentDetails {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

export interface OrderState {
  id: string;
  items: CartItem[];
  shipping: ShippingDetails;
  subtotal: number;
  discount: number;
  shippingCost: number;
  tax: number;
  total: number;
  date: string;
  estimatedDelivery: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'auraglass-core',
    name: 'AuraGlass Core',
    tagline: 'Smart Holographic Ambient Projector & Clock',
    description: 'A masterpiece of Swiss minimalist design. AuraGlass features a semi-translucent borosilicate glass body containing a high-density holographic optical assembly that projects gorgeous time, solar cycles, or ambient soundwave visualizers in mid-air above the unit.',
    price: 189,
    originalPrice: 229,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop',
    features: [
      'Holographic Time & Cycle Projection',
      'Dynamic RGBIC Ambient Light Engine',
      'Solid Aluminum Unibody Base',
      'Bluetooth LE & WiFi Dual Syncing'
    ],
    specs: {
      'Materials': 'Borosilicate glass, Anodized aluminum Base',
      'Projection Range': 'Up to 35cm high',
      'Connectivity': 'WiFi 6, Bluetooth 5.2, Thread protocol',
      'Dimensions': '110mm x 110mm x 165mm',
      'Weight': '840g'
    },
    category: 'core',
    colorOptions: [
      { name: 'Quartz Silver', hex: '#E2E8F0' },
      { name: 'Obsidian Black', hex: '#1E293B' },
      { name: 'Champagne Gold', hex: '#F1F5F9' }
    ]
  },
  {
    id: 'aura-acoustic-sphere',
    name: 'AuraAcoustic Sphere',
    tagline: 'Magnetic High-Fidelity 360° Speaker Add-on',
    description: 'An acoustic marvel that attaches magnetically onto any AuraGlass core base. Crafted with precision micro-perforated brass grill and containing two class-D amplifiers for room-filling 3D soundscapes linked to live visuals.',
    price: 79,
    originalPrice: 99,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=600&auto=format&fit=crop',
    features: [
      'MagSafe Magnetic Snap Lock',
      '360-degree True Soundfield Radiator',
      'Dual 15W High-fidelity Class-D Amplifiers',
      'Instant Sync with Optical Projection'
    ],
    specs: {
      'Frequency Range': '45Hz - 22,000Hz',
      'Drivers': '1.5" Custom Full-Range, Dual Passive Radiators',
      'Power Source': 'Powered by Core Base via Gold Pogo Pins',
      'Acoustic Pressure': '88dB @ 1m'
    },
    category: 'accessory'
  },
  {
    id: 'aura-sensor-element',
    name: 'AuraSensor Element',
    tagline: 'Hyper-Precise Desk Environment Monitor Node',
    description: 'A wireless hexagonal sensor element made from matte slate and real oak timber. Measures ambient comfort, air pollutants, humidity, and temperature. Dynamically changes the AuraGlass light color temperature to align with your health.',
    price: 49,
    image: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=600&auto=format&fit=crop',
    features: [
      'Industrial AQI, CO2 & TVOC Sensor Array',
      'High-contrast E-Ink Stealth Status Display',
      'Ultra-low Power Zigbee Connection',
      'Micro-USB & Light Energy Harvesting Back'
    ],
    specs: {
      'Battery Life': 'Up to 24 Months (Zigbee Low-Energy)',
      'AQI Sensor': 'Laser Scattering PM2.5, NDIR CO2 Sensor',
      'Outer Ring': 'CNC milled Solid FSC Certified Oak Wood',
      'Dimensions': '64mm Hexagonal width'
    },
    category: 'accessory'
  },
  {
    id: 'auraglass-ultimate-bundle',
    name: 'Ultimate Sanctuary Bundle',
    tagline: 'Complete AuraGlass Workspace Ecosystem',
    description: 'Unlock the complete physical cyber-nature desktop environment. Includes the AuraGlass Core ambient projector, the AuraAcoustic Sphere magnetic active speaker, and the AuraSensor environmental node. Save big and elevate your room.',
    price: 269,
    originalPrice: 317,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
    features: [
      'AuraGlass Core Projector included',
      'AuraAcoustic Sphere Speaker included',
      'AuraSensor Element Node included',
      'Premium Custom Canvas Travel Sleeve',
      'Save $48 over separate components'
    ],
    specs: {
      'Total Package weight': '1.45kg',
      'Included cables': '1.8m Braided USB-C Cable & 30W Power Delivery Adapter',
      'Warranty': '3 Year Premium Replacement Protection',
      'Ecosystem Control': 'AuraGlass iOS, Android, macOS & Web companion App'
    },
    category: 'bundle'
  }
];
