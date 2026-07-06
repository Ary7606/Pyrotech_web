import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ─── Types ───────────────────────────────────────────────────────────────────

export type ProductCategory =
  | 'Mobile Stands'
  | 'Door Handles'
  | 'Storage Racks'
  | 'Door Stoppers'
  | 'Window Grips'
  | 'Window Handles'
  | 'Modular Furniture'
  | 'Pen Stands'
  | 'Laptop Stands'
  | 'Dustbins'
  | 'Lighting Panels'
  | 'Distribution Panel'
  | 'Standard Junction Box'
  | 'Wired Junction Box'
  | 'Populated Junction Box'
  | 'Switchgear Components';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice: number;
  description: string;
  features: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isFeatured: boolean;
  image: string;
  images?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'enquiry' | 'shipped' | 'cancelled';
  address: string;
  message?: string;
  createdAt: string;
}

// ─── Seed Products ────────────────────────────────────────────────────────────

export const SEED_PRODUCTS: Product[] = [
  // Mobile Stands
  {
    id: 'ms-001', name: 'FlexGrip Mobile Stand', category: 'Mobile Stands',
    price: 299, originalPrice: 399, stock: 85, rating: 4.5, reviewCount: 128, isNew: false, isFeatured: true,
    image: '/airo-assets/images/products/mobile-stand-hero',
    description: 'Adjustable aluminum mobile stand with 360° rotation. Perfect for desk use, video calls, and hands-free viewing.',
    features: ['360° rotation', 'Adjustable height', 'Anti-slip base', 'Compatible with all phones', 'Foldable design'],
  },
  {
    id: 'ms-002', name: 'ProDesk Phone Holder', category: 'Mobile Stands',
    price: 549, originalPrice: 699, stock: 60, rating: 4.3, reviewCount: 87, isNew: true, isFeatured: false,
    image: '/airo-assets/images/products/mobile-stand-hero',
    description: 'Heavy-duty desktop phone holder with cable management. Ideal for office and home use.',
    features: ['Cable management slot', 'Weighted base', 'Universal fit', 'Scratch-resistant pad'],
  },
  {
    id: 'ms-003', name: 'Compact Bedside Stand', category: 'Mobile Stands',
    price: 399, originalPrice: 499, stock: 45, rating: 4.6, reviewCount: 203, isNew: false, isFeatured: false,
    image: '/airo-assets/images/products/mobile-stand-hero',
    description: 'Slim bedside phone stand with charging slot. Keeps your phone accessible while you sleep.',
    features: ['Charging slot', 'Slim profile', 'Non-slip rubber feet', 'Easy assembly'],
  },
  {
    id: 'ms-004', name: 'Premium Swivel Stand', category: 'Mobile Stands',
    price: 899, originalPrice: 1099, stock: 30, rating: 4.8, reviewCount: 56, isNew: true, isFeatured: true,
    image: '/airo-assets/images/products/mobile-stand-hero',
    description: 'Premium aluminum swivel stand with smooth 360° rotation and height adjustment for professional setups.',
    features: ['Aluminum construction', '360° swivel', 'Height adjustable', 'Magnetic cable clip'],
  },

  // Door Handles
  {
    id: 'dh-001', name: 'Stainless Steel Lever Handle', category: 'Door Handles',
    price: 850, originalPrice: 1100, stock: 120, rating: 4.7, reviewCount: 342, isNew: false, isFeatured: true,
    image: '/airo-assets/images/products/door-handles-hero',
    description: 'Premium grade 304 stainless steel lever handle. Corrosion-resistant with a brushed satin finish.',
    features: ['Grade 304 SS', 'Brushed satin finish', 'Corrosion resistant', 'Easy installation', '5-year warranty'],
  },
  {
    id: 'dh-002', name: 'Mortise Door Handle Set', category: 'Door Handles',
    price: 1450, originalPrice: 1800, stock: 75, rating: 4.5, reviewCount: 189, isNew: false, isFeatured: false,
    image: '/airo-assets/images/products/door-handles-hero',
    description: 'Complete mortise handle set with lock mechanism. Suitable for main doors and bedroom doors.',
    features: ['Complete set with lock', 'Solid brass core', 'Anti-pick mechanism', 'Includes all hardware'],
  },
  {
    id: 'dh-003', name: 'Designer Pull Handle', category: 'Door Handles',
    price: 2200, originalPrice: 2800, stock: 40, rating: 4.9, reviewCount: 67, isNew: true, isFeatured: true,
    image: '/airo-assets/images/products/door-handles-hero',
    description: 'Architectural designer pull handle for main entrance doors. Bold geometric design with premium finish.',
    features: ['Architectural grade', 'Geometric design', 'Multiple finishes', 'Heavy-duty construction'],
  },
  {
    id: 'dh-004', name: 'Cabinet Handle Pack (10)', category: 'Door Handles',
    price: 450, originalPrice: 599, stock: 200, rating: 4.4, reviewCount: 415, isNew: false, isFeatured: false,
    image: '/airo-assets/images/products/door-handles-hero',
    description: 'Pack of 10 cabinet handles. Perfect for kitchen cabinets, wardrobes, and furniture.',
    features: ['Pack of 10', 'Zinc alloy', 'Chrome finish', 'Universal fit', 'Includes screws'],
  },

  // Storage Racks
  {
    id: 'sr-001', name: '5-Tier Metal Shelf Rack', category: 'Storage Racks',
    price: 2499, originalPrice: 3200, stock: 35, rating: 4.6, reviewCount: 278, isNew: false, isFeatured: true,
    image: '/airo-assets/images/products/storage-racks-hero',
    description: 'Heavy-duty 5-tier metal storage rack. Load capacity 150kg per shelf. Ideal for garage, kitchen, or office.',
    features: ['5 tiers', '150kg capacity/shelf', 'Powder-coated steel', 'Adjustable shelves', 'Easy assembly'],
  },
  {
    id: 'sr-002', name: 'Kitchen Wall Rack', category: 'Storage Racks',
    price: 1299, originalPrice: 1699, stock: 55, rating: 4.4, reviewCount: 156, isNew: false, isFeatured: false,
    image: '/airo-assets/images/products/storage-racks-hero',
    description: 'Stainless steel wall-mounted kitchen rack with hooks. Perfect for utensils, pots, and spice jars.',
    features: ['Wall mounted', 'SS 304 grade', '6 hooks included', 'Spice jar holders', 'Easy to clean'],
  },
  {
    id: 'sr-003', name: 'Bathroom Corner Rack', category: 'Storage Racks',
    price: 1599, originalPrice: 1999, stock: 48, rating: 4.5, reviewCount: 203, isNew: true, isFeatured: false,
    image: '/airo-assets/images/products/storage-racks-hero',
    description: '3-tier corner rack for bathroom. Rust-proof aluminum with tempered glass shelves.',
    features: ['3 tiers', 'Rust-proof', 'Tempered glass', 'Corner design', 'Adjustable feet'],
  },
  {
    id: 'sr-004', name: 'Heavy Duty Garage Rack', category: 'Storage Racks',
    price: 4500, originalPrice: 5500, stock: 20, rating: 4.8, reviewCount: 89, isNew: false, isFeatured: true,
    image: '/airo-assets/images/products/storage-racks-hero',
    description: 'Industrial-grade garage storage rack. 500kg total load capacity. Perfect for heavy tools and equipment.',
    features: ['500kg total capacity', 'Industrial grade steel', 'Bolt-free assembly', 'Adjustable height', '10-year warranty'],
  },

  // Door Stoppers
  {
    id: 'ds-001', name: 'Heavy Duty Floor Stopper', category: 'Door Stoppers',
    price: 299, originalPrice: 399, stock: 150, rating: 4.3, reviewCount: 512, isNew: false, isFeatured: false,
    image: '/airo-assets/images/products/door-handles-hero',
    description: 'Stainless steel floor-mounted door stopper. Prevents door damage and wall impact.',
    features: ['SS 304', 'Floor mounted', 'Rubber tip', 'Easy install', 'Rust-proof'],
  },
  {
    id: 'ds-002', name: 'Magnetic Door Holder', category: 'Door Stoppers',
    price: 499, originalPrice: 649, stock: 90, rating: 4.6, reviewCount: 234, isNew: true, isFeatured: false,
    image: '/airo-assets/images/products/door-handles-hero',
    description: 'Magnetic door holder that keeps doors open at any angle. Strong 5kg holding force.',
    features: ['5kg magnetic force', 'Wall or floor mount', 'Adjustable height', 'Satin finish'],
  },
  {
    id: 'ds-003', name: 'Rubber Wedge Stopper Pack', category: 'Door Stoppers',
    price: 199, originalPrice: 299, stock: 300, rating: 4.2, reviewCount: 678, isNew: false, isFeatured: false,
    image: '/airo-assets/images/products/door-handles-hero',
    description: 'Pack of 4 heavy-duty rubber wedge door stoppers. Works on all floor types.',
    features: ['Pack of 4', 'Heavy-duty rubber', 'All floor types', 'Non-slip grip', 'Bright color'],
  },
  {
    id: 'ds-004', name: 'Wall Mount Door Stop', category: 'Door Stoppers',
    price: 599, originalPrice: 749, stock: 70, rating: 4.5, reviewCount: 145, isNew: false, isFeatured: false,
    image: '/airo-assets/images/products/door-handles-hero',
    description: 'Premium wall-mounted door stop with rubber bumper. Protects walls from door knob damage.',
    features: ['Wall mounted', 'Rubber bumper', 'Stainless steel', 'Adjustable angle', 'Easy install'],
  },

  // Window Grips
  {
    id: 'wg-001', name: 'Aluminum Window Grip Handle', category: 'Window Grips',
    price: 450, originalPrice: 599, stock: 110, rating: 4.4, reviewCount: 198, isNew: false, isFeatured: false,
    image: '/airo-assets/images/products/door-handles-hero',
    description: 'Ergonomic aluminum window grip handle. Easy to open and close windows with a firm grip.',
    features: ['Aluminum alloy', 'Ergonomic design', 'Anodized finish', 'Universal fit', 'Easy install'],
  },
  {
    id: 'wg-002', name: 'Safety Window Grip Lock', category: 'Window Grips',
    price: 750, originalPrice: 950, stock: 65, rating: 4.7, reviewCount: 134, isNew: true, isFeatured: false,
    image: '/airo-assets/images/products/door-handles-hero',
    description: 'Window grip with integrated safety lock. Prevents accidental opening — ideal for homes with children.',
    features: ['Safety lock', 'Child-proof', 'Aluminum body', 'Key operated', 'Rust-proof'],
  },
  {
    id: 'wg-003', name: 'Casement Window Grip', category: 'Window Grips',
    price: 350, originalPrice: 450, stock: 130, rating: 4.3, reviewCount: 267, isNew: false, isFeatured: false,
    image: '/airo-assets/images/products/door-handles-hero',
    description: 'Standard casement window grip for uPVC and aluminum windows. Pack of 2.',
    features: ['Pack of 2', 'uPVC compatible', 'Aluminum compatible', 'Satin finish', 'Includes screws'],
  },

  // Window Handles
  {
    id: 'wh-001', name: 'Espagnolette Window Handle', category: 'Window Handles',
    price: 680, originalPrice: 850, stock: 80, rating: 4.5, reviewCount: 167, isNew: false, isFeatured: false,
    image: '/airo-assets/images/products/door-handles-hero',
    description: 'Classic espagnolette window handle for casement windows. Smooth operation with durable zinc alloy.',
    features: ['Zinc alloy', 'Smooth operation', 'Multiple colors', 'Universal fit', 'Easy install'],
  },
  {
    id: 'wh-002', name: 'Tilt & Turn Window Handle', category: 'Window Handles',
    price: 1100, originalPrice: 1399, stock: 45, rating: 4.6, reviewCount: 89, isNew: true, isFeatured: false,
    image: '/airo-assets/images/products/door-handles-hero',
    description: 'Premium tilt and turn window handle for modern windows. Allows both tilt and full opening.',
    features: ['Tilt & turn', 'Premium zinc', 'Keyed option', 'Modern design', 'Smooth action'],
  },
  {
    id: 'wh-003', name: 'Sliding Window Handle', category: 'Window Handles',
    price: 380, originalPrice: 499, stock: 120, rating: 4.2, reviewCount: 312, isNew: false, isFeatured: false,
    image: '/airo-assets/images/products/door-handles-hero',
    description: 'Recessed sliding window handle for aluminum sliding windows. Flush design for clean aesthetics.',
    features: ['Recessed design', 'Flush mount', 'Aluminum', 'Smooth slide', 'Pack of 2'],
  },

  // Modular Furniture
  {
    id: 'mf-001', name: 'Modular Wardrobe System', category: 'Modular Furniture',
    price: 8999, originalPrice: 11999, stock: 15, rating: 4.8, reviewCount: 78, isNew: false, isFeatured: true,
    image: '/airo-assets/images/products/storage-racks-hero',
    description: 'Complete modular wardrobe system with 6 compartments, 2 drawers, and hanging space. Customize to your needs.',
    features: ['6 compartments', '2 drawers', 'Hanging rail', 'Customizable', 'Soft-close hinges'],
  },
  {
    id: 'mf-002', name: 'Study Table with Shelves', category: 'Modular Furniture',
    price: 5499, originalPrice: 6999, stock: 22, rating: 4.6, reviewCount: 134, isNew: true, isFeatured: true,
    image: '/airo-assets/images/products/storage-racks-hero',
    description: 'Ergonomic study table with built-in shelves and cable management. Perfect for home office or student room.',
    features: ['Built-in shelves', 'Cable management', 'Ergonomic design', 'MDF + steel frame', 'Easy assembly'],
  },
  {
    id: 'mf-003', name: 'TV Unit with Storage', category: 'Modular Furniture',
    price: 7500, originalPrice: 9500, stock: 18, rating: 4.7, reviewCount: 92, isNew: false, isFeatured: false,
    image: '/airo-assets/images/products/storage-racks-hero',
    description: 'Modern TV unit with ample storage. Fits TVs up to 65 inches with side cabinets and open shelves.',
    features: ['Fits 65" TV', 'Side cabinets', 'Open shelves', 'Wire management', 'Walnut finish'],
  },
  {
    id: 'mf-004', name: 'Kitchen Cabinet Module', category: 'Modular Furniture',
    price: 12000, originalPrice: 15000, stock: 10, rating: 4.9, reviewCount: 45, isNew: true, isFeatured: false,
    image: '/airo-assets/images/products/storage-racks-hero',
    description: 'Premium kitchen cabinet module with soft-close drawers and adjustable shelves. Marine-grade plywood.',
    features: ['Marine-grade plywood', 'Soft-close drawers', 'Adjustable shelves', 'Waterproof finish', 'Custom sizes'],
  },

  // Pen Stands
  {
    id: 'ps-001', name: 'Mesh Desk Organizer', category: 'Pen Stands',
    price: 399, originalPrice: 499, stock: 180, rating: 4.4, reviewCount: 456, isNew: false, isFeatured: false,
    image: '/airo-assets/images/products/mobile-stand-hero',
    description: 'Multi-compartment mesh desk organizer. Holds pens, scissors, rulers, and more. Keeps your desk tidy.',
    features: ['5 compartments', 'Mesh design', 'Stable base', 'Easy to clean', 'Modern look'],
  },
  {
    id: 'ps-002', name: 'Rotating Pen Holder', category: 'Pen Stands',
    price: 549, originalPrice: 699, stock: 95, rating: 4.6, reviewCount: 234, isNew: true, isFeatured: false,
    image: '/airo-assets/images/products/mobile-stand-hero',
    description: '360° rotating pen holder with 6 compartments. Access all your stationery with a simple spin.',
    features: ['360° rotation', '6 compartments', 'Acrylic body', 'Non-slip base', 'Transparent design'],
  },
  {
    id: 'ps-003', name: 'Premium Leather Pen Stand', category: 'Pen Stands',
    price: 699, originalPrice: 899, stock: 60, rating: 4.7, reviewCount: 123, isNew: false, isFeatured: false,
    image: '/airo-assets/images/products/mobile-stand-hero',
    description: 'Executive leather pen stand with card holder. Adds a professional touch to any desk.',
    features: ['PU leather', 'Card holder', 'Executive look', 'Weighted base', 'Gift-ready'],
  },
  {
    id: 'ps-004', name: 'Bamboo Pen Organizer', category: 'Pen Stands',
    price: 249, originalPrice: 349, stock: 140, rating: 4.3, reviewCount: 389, isNew: false, isFeatured: false,
    image: '/airo-assets/images/products/mobile-stand-hero',
    description: 'Eco-friendly bamboo pen organizer. Natural, sustainable, and stylish for any desk.',
    features: ['Eco-friendly bamboo', 'Natural finish', '3 sections', 'Lightweight', 'Sustainable'],
  },

  // Laptop Stands
  {
    id: 'ls-001', name: 'Aluminum Laptop Riser', category: 'Laptop Stands',
    price: 1999, originalPrice: 2499, stock: 55, rating: 4.7, reviewCount: 312, isNew: false, isFeatured: true,
    image: '/airo-assets/images/products/laptop-stand-hero',
    description: 'Premium aluminum laptop stand with 6 height levels. Improves posture and reduces neck strain.',
    features: ['6 height levels', 'Aluminum alloy', 'Foldable', 'Heat dissipation', 'Fits 10-17" laptops'],
  },
  {
    id: 'ls-002', name: 'Adjustable Laptop Arm Stand', category: 'Laptop Stands',
    price: 3999, originalPrice: 4999, stock: 25, rating: 4.8, reviewCount: 145, isNew: true, isFeatured: true,
    image: '/airo-assets/images/products/laptop-stand-hero',
    description: 'Fully adjustable laptop arm stand with 360° rotation. Clamps to desk for maximum flexibility.',
    features: ['360° rotation', 'Desk clamp', 'Height adjustable', 'Cable management', 'Heavy-duty'],
  },
  {
    id: 'ls-003', name: 'Portable Foldable Stand', category: 'Laptop Stands',
    price: 1499, originalPrice: 1999, stock: 80, rating: 4.5, reviewCount: 267, isNew: false, isFeatured: false,
    image: '/airo-assets/images/products/laptop-stand-hero',
    description: 'Ultra-portable foldable laptop stand. Weighs just 280g. Perfect for travel and remote work.',
    features: ['280g weight', 'Ultra-portable', 'Foldable flat', 'Anti-slip pads', 'Aluminum'],
  },
  {
    id: 'ls-004', name: 'Dual Monitor + Laptop Stand', category: 'Laptop Stands',
    price: 2999, originalPrice: 3799, stock: 30, rating: 4.6, reviewCount: 89, isNew: false, isFeatured: false,
    image: '/airo-assets/images/products/laptop-stand-hero',
    description: 'Combined stand for laptop and external monitor. Creates a clean, ergonomic dual-screen setup.',
    features: ['Dual screen support', 'Cable management', 'Adjustable height', 'Steel + aluminum', 'Desk clamp'],
  },

  // Dustbins
  {
    id: 'db-001', name: 'Stainless Steel Pedal Bin', category: 'Dustbins',
    price: 1299, originalPrice: 1699, stock: 65, rating: 4.6, reviewCount: 234, isNew: false, isFeatured: false,
    image: '/airo-assets/images/products/dustbin-hero',
    description: '10-litre stainless steel pedal bin with soft-close lid. Hygienic hands-free operation.',
    features: ['10 litre', 'Soft-close lid', 'Pedal operated', 'SS 304', 'Removable inner bucket'],
  },
  {
    id: 'db-002', name: 'Sensor Dustbin', category: 'Dustbins',
    price: 1899, originalPrice: 2499, stock: 40, rating: 4.8, reviewCount: 156, isNew: true, isFeatured: true,
    image: '/airo-assets/images/products/dustbin-hero',
    description: 'Smart sensor dustbin with automatic lid opening. Touchless operation for maximum hygiene.',
    features: ['Auto sensor lid', 'Touchless', '12 litre', 'Battery operated', 'Odor seal'],
  },
  {
    id: 'db-003', name: 'Recycling Bin Set (3)', category: 'Dustbins',
    price: 1499, originalPrice: 1899, stock: 50, rating: 4.5, reviewCount: 178, isNew: false, isFeatured: false,
    image: '/airo-assets/images/products/dustbin-hero',
    description: 'Set of 3 color-coded recycling bins. Separate wet, dry, and hazardous waste easily.',
    features: ['Set of 3', 'Color-coded', '8L each', 'Stackable', 'Eco-friendly'],
  },
  {
    id: 'db-004', name: 'Slim Office Waste Bin', category: 'Dustbins',
    price: 399, originalPrice: 549, stock: 120, rating: 4.3, reviewCount: 345, isNew: false, isFeatured: false,
    image: '/airo-assets/images/products/dustbin-hero',
    description: 'Slim profile office waste bin. Fits neatly under desks. 5-litre capacity.',
    features: ['5 litre', 'Slim profile', 'Under-desk fit', 'Plastic body', 'Easy to empty'],
  },

  // Standard Junction Box — gateway entry (links to configurator page)
  {
    id: 'standard-junction-box',
    name: 'Standard Junction Box',
    category: 'Standard Junction Box',
    price: 0,
    originalPrice: 0,
    stock: 999,
    rating: 4.7,
    reviewCount: 0,
    isNew: false,
    isFeatured: false,
    image: '/airo-assets/images/products/sjb-crca-photo',
    images: [
      '/airo-assets/images/products/sjb-crca-photo',
      '/airo-assets/images/products/sjb-crca-drawing',
    ],
    description: 'Pyrotech Standard Junction Boxes available in CRCA, SS 304, FRP, and Aluminium Die Cast with IP55–IP65 ratings. Select your material and dimension to configure.',
    features: [
      'Available in CRCA, SS 304, FRP, Aluminium Die Cast',
      'IP ratings from IP55 to IP65',
      'Multiple dimensions from 80×60 to 1200×1000 mm',
      'Powder coated / brushed / moulded finishes',
      'Hinged door with quarter-turn latch',
      'Earthing provision included',
    ],
  },

  // Switchgear Components — MCB gateway entry (links to configurator page)
  {
    id: 'switchgear-components-mcb',
    name: 'Miniature Circuit Breaker (MCB)',
    category: 'Switchgear Components',
    price: 0,
    originalPrice: 0,
    stock: 999,
    rating: 4.8,
    reviewCount: 0,
    isNew: true,
    isFeatured: false,
    image: '/airo-assets/images/products/sjb-crca-photo',
    images: ['/airo-assets/images/products/sjb-crca-photo'],
    description: 'Pyrotech QDB3-63 and QDB3-125H series Miniature Circuit Breakers. Available in multiple current ratings and pole configurations. Select series, current rating, and poles to configure.',
    features: [
      'QDB3-63 series: up to 63A, 6000A breaking capacity',
      'QDB3-125H series: up to 125A, 10000A breaking capacity',
      'Poles: 1P, 1P+N, 2P, 3P, 3P+N, 4P',
      'DIN rail EN60715 (35mm) mounting',
      'IP20 protection rating',
      'B, C, D tripping characteristics',
    ],
  },

  // Lighting Panels
  {
    id: 'lp-001',
    name: '4 Way TPN Floor Distribution Panel (12 Way)',
    category: 'Lighting Panels',
    price: 10288,
    originalPrice: 10288,
    stock: 15,
    rating: 4.8,
    reviewCount: 12,
    isNew: true,
    isFeatured: true,
    image: '/airo-assets/images/products/lp-001-main',
    images: [
      '/airo-assets/images/products/lp-001-main',
      '/airo-assets/images/products/lp-001-diagram',
      '/airo-assets/images/products/lp-001-bom',
    ],
    description: 'Heavy-duty 4 Way TPN Floor Distribution Panel (12 Way) manufactured by Pyrotech Electronics. Built to industrial standards with IP54 protection rating. Dimensions: 500mm (L) × 500mm (H) × 210mm (D). Paint shade RAL 7032 Siemens Grey. Non-compartmentalised, single front, fixed type construction with bottom cable entry and removable CG plate. Earth busbar 1×25×6 Al. Includes wall mounting brackets and IP lock.',
    features: [
      'Single Front, Fixed, Non-Compartmentalised',
      'Floor Mounting Type — Cable Entry: Bottom',
      'IP: IP54 Protection Rating',
      'Paint Shade: RAL 7032 Siemens Grey',
      'Dimensions: 500mm (L) × 500mm (H) × 210mm (D)',
      'Main Busbar: 0 Al | Neutral Busbar: 0 Al',
      'Earth Busbar: 1×25×6 Al',
      'IP Lock on Front Door | Wall Mounting Brackets',
      'Earth Bolt M8×40 Passivated | Cable Tray 45×45',
      'I/C MCCB 63A 3P 10kA (Pyrotech) — Qty: 1',
      '25A 1P 10kA C Curve MCB (Pyrotech) — Qty: 6',
      '32A 1P 10kA C Curve MCB (Pyrotech) — Qty: 6',
      'Indicating Lamp (Pyrotech) — Qty: 6',
      'Stud Type Terminal 10 sq.mm (Elmex) — Qty: 12',
      'Stud Type Terminal 16 sq.mm (Elmex) — Qty: 4',
      'Neutral Strip',
    ],
  },
  {
    id: 'lp-002',
    name: '6 Way TPN Floor Distribution Panel (18 Way)',
    category: 'Lighting Panels',
    price: 13500,
    originalPrice: 13500,
    stock: 12,
    rating: 4.8,
    reviewCount: 8,
    isNew: true,
    isFeatured: false,
    image: '/airo-assets/images/products/lp-002-main',
    images: [
      '/airo-assets/images/products/lp-002-main',
      '/airo-assets/images/products/lp-002-diagram',
      '/airo-assets/images/products/lp-002-bom',
    ],
    description: '6 Way TPN Floor Distribution Panel (18 Way) manufactured by Pyrotech Electronics. IP54 rated industrial panel with 600×600×210mm dimensions. Paint shade RAL 7032 Siemens Grey. Non-compartmentalised, single front, fixed type with bottom cable entry and removable CG plate. Earth busbar 1×50×6 Al. Includes wall mounting brackets and IP lock.',
    features: [
      'Single Front, Fixed, Non-Compartmentalised',
      'Floor Mounting Type — Cable Entry: Bottom',
      'IP: IP54 Protection Rating',
      'Paint Shade: RAL 7032 Siemens Grey',
      'Dimensions: 600mm (L) × 600mm (H) × 210mm (D)',
      'Main Busbar: NA Al | Neutral Busbar: NA Al',
      'Earth Busbar: 1×50×6 Al',
      'IP Lock on Front Door | Wall Mounting Brackets',
      'Earth Bolt M8×40 Passivated | Cable Tray 45×45',
      'I/C MCCB 63A 3P 10kA (Pyrotech) — Qty: 1',
      '25A 1P 10kA C Curve MCB (Pyrotech) — Qty: 9',
      '32A 1P 10kA C Curve MCB (Pyrotech) — Qty: 9',
      'Indicating Lamp (Pyrotech) — Qty: 6',
      'Stud Type Terminal 10 sq.mm (Elmex) — Qty: 18',
    ],
  },
  {
    id: 'lp-003',
    name: '8 Way TPN Floor Distribution Panel (24 Way)',
    category: 'Lighting Panels',
    price: 17500,
    originalPrice: 17500,
    stock: 10,
    rating: 4.7,
    reviewCount: 6,
    isNew: true,
    isFeatured: false,
    image: '/airo-assets/images/products/lp-003-main',
    images: [
      '/airo-assets/images/products/lp-003-main',
      '/airo-assets/images/products/lp-003-diagram',
      '/airo-assets/images/products/lp-003-bom',
    ],
    description: '8 Way TPN Floor Distribution Panel (24 Way) manufactured by Pyrotech Electronics. IP54 rated industrial panel with 760×760×210mm dimensions. Paint shade RAL 7032 Siemens Grey. Non-compartmentalised, single front, fixed type with bottom cable entry and removable CG plate. Earth busbar 1×25×6 Al. Includes wall mounting brackets and IP lock.',
    features: [
      'Single Front, Fixed, Non-Compartmentalised',
      'Floor Mounting Type — Cable Entry: Bottom',
      'IP: IP54 Protection Rating',
      'Paint Shade: RAL 7032 Siemens Grey',
      'Dimensions: 760mm (L) × 760mm (H) × 210mm (D)',
      'Main Busbar: 0 Al | Neutral Busbar: 0 Al',
      'Earth Busbar: 1×25×6 Al',
      'IP Lock on Front Door | Wall Mounting Brackets',
      'Earth Bolt M8×40 Passivated | Cable Tray 45×45',
      'I/C MCCB 63A 3P 10kA (Pyrotech) — Qty: 1',
      '25A 1P 10kA C Curve MCB (Pyrotech) — Qty: 15',
      '32A 1P 10kA C Curve MCB (Pyrotech) — Qty: 15',
      'Indicating Lamp (Pyrotech) — Qty: 6',
      'Stud Type Terminal 10 sq.mm (Elmex) — Qty: 30',
      'Stud Type Terminal 16 sq.mm (Elmex) — Qty: 4',
      'Neutral Strip',
    ],
  },
  {
    id: 'lp-004',
    name: '12 Way TPN Floor Distribution Panel (36 Way)',
    category: 'Lighting Panels',
    price: 21000,
    originalPrice: 21000,
    stock: 8,
    rating: 4.9,
    reviewCount: 5,
    isNew: true,
    isFeatured: true,
    image: '/airo-assets/images/products/lp-004-main',
    images: [
      '/airo-assets/images/products/lp-004-main',
      '/airo-assets/images/products/lp-004-diagram',
      '/airo-assets/images/products/lp-004-bom',
    ],
    description: '12 Way TPN Floor Distribution Panel (36 Way) manufactured by Pyrotech Electronics. IP54 rated heavy-duty industrial panel with 800×800×210mm dimensions. Paint shade RAL 7032 Siemens Grey. Non-compartmentalised, single front, fixed type with bottom cable entry and removable CG plate. Earth busbar 1×25×6 Al. Includes wall mounting brackets and IP lock.',
    features: [
      'Single Front, Fixed, Non-Compartmentalised',
      'Floor Mounting Type — Cable Entry: Bottom',
      'IP: IP54 Protection Rating',
      'Paint Shade: RAL 7032 Siemens Grey',
      'Dimensions: 800mm (L) × 800mm (H) × 210mm (D)',
      'Main Busbar: 0 Al | Neutral Busbar: 0 Al',
      'Earth Busbar: 1×25×6 Al',
      'IP Lock on Front Door | Wall Mounting Brackets',
      'Earth Bolt M8×40 Passivated | Cable Tray 45×45',
      'I/C MCCB 63A 3P 10kA (Pyrotech) — Qty: 1',
      '25A 1P 10kA C Curve MCB (Pyrotech) — Qty: 18',
      '32A 1P 10kA C Curve MCB (Pyrotech) — Qty: 18',
      'Indicating Lamp (Pyrotech) — Qty: 6',
      'Stud Type Terminal 10 sq.mm (Elmex) — Qty: 36',
      'Stud Type Terminal 16 sq.mm (Elmex) — Qty: 4',
      'Neutral Strip',
    ],
  },
  {
    id: 'lp-005',
    name: 'Hall Distribution Panel SLDB-A (12 Way TPN 36 Way)',
    category: 'Lighting Panels',
    price: 28500,
    originalPrice: 28500,
    stock: 5,
    rating: 4.9,
    reviewCount: 4,
    isNew: true,
    isFeatured: true,
    image: '/airo-assets/images/products/lp-005-main',
    images: [
      '/airo-assets/images/products/lp-005-main',
      '/airo-assets/images/products/lp-005-diagram',
      '/airo-assets/images/products/lp-005-bom',
    ],
    description: 'Hall Distribution Panel SLDB-A (12 Way TPN 36 Way) manufactured by Pyrotech Electronics. Large floor-standing IP54 rated industrial panel with 800×1000×300mm dimensions and canopy. Paint shade RAL 7032 Siemens Grey. Non-compartmentalised, single front, fixed type with bottom cable entry. Features glass window, pad lock arrangement, danger tag, and A/M selector. Earth busbar 1×25×6 Al.',
    features: [
      'Single Front, Fixed, Non-Compartmentalised',
      'Floor Mounting Type — Cable Entry: Bottom',
      'IP: IP54 Protection Rating',
      'Paint Shade: RAL 7032 Siemens Grey',
      'Dimensions: 800mm (L) × 1000mm (H) × 300mm (D)',
      'Main Busbar: 0 Al | Neutral Busbar: 0 Al',
      'Earth Busbar: 1×25×6 Al',
      'Canopy on Top | Glass Window Panel',
      'Pad Lock Arrangement | Danger Tag',
      'A/M Selector Switch | IP Lock',
      'Earth Bolt M8×40 Passivated | Cable Tray 45×45',
      'I/C MCCB 63A 3P 10kA (Pyrotech) — Qty: 1',
      '25A 1P 10kA C Curve MCB (Pyrotech) — Qty: 24',
      '32A 1P 10kA C Curve MCB (Pyrotech) — Qty: 24',
      'Indicating Lamp (Pyrotech) — Qty: 6',
      'Stud Type Terminal 10 sq.mm (Elmex) — Qty: 48',
      'Stud Type Terminal 16 sq.mm (Elmex) — Qty: 4',
      'Neutral Strip',
    ],
  },
];

// ─── Product Store ────────────────────────────────────────────────────────────

interface ProductStore {
  products: Product[];
  updateStock: (productId: string, newStock: number) => void;
  getProduct: (id: string) => Product | undefined;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: SEED_PRODUCTS,
      updateStock: (productId, newStock) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId ? { ...p, stock: newStock } : p
          ),
        })),
      getProduct: (id) => get().products.find((p) => p.id === id),
    }),
    {
      name: 'pyrotech-products',
      version: 6,
      migrate: () => ({ products: SEED_PRODUCTS }),
    }
  )
);

// ─── Cart Store ───────────────────────────────────────────────────────────────

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      addToCart: (product, quantity = 1) => {
        const existing = get().items.find((i) => i.product.id === product.id);
        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          }));
        } else {
          set((state) => ({ items: [...state.items, { product, quantity }] }));
        }
      },
      removeFromCart: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        })),
      updateQty: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      total: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'pyrotech-cart' }
  )
);

// ─── Auth Store ───────────────────────────────────────────────────────────────

interface AuthStore {
  currentUser: User | null;
  isAdmin: boolean;
  users: User[];
  login: (email: string, password: string) => { success: boolean; error?: string };
  adminLogin: (email: string, password: string) => { success: boolean; error?: string };
  register: (name: string, email: string, phone: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const ADMIN_CREDENTIALS = [
  { email: 'admin@pyrotechelectronics.com', password: 'Admin@2024' },
  { email: 'manager@pyrotechelectronics.com', password: 'Manager@2024' },
];

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      currentUser: null,
      isAdmin: false,
      users: [],
      login: (email, password) => {
        const user = get().users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        if (!user) return { success: false, error: 'Invalid email or password' };
        set({ currentUser: user, isAdmin: false });
        return { success: true };
      },
      adminLogin: (email, password) => {
        const match = ADMIN_CREDENTIALS.find((c) => c.email === email && c.password === password);
        if (match) {
          set({ isAdmin: true, currentUser: null });
          return { success: true };
        }
        return { success: false, error: 'Invalid admin credentials' };
      },
      register: (name, email, phone, password) => {
        const exists = get().users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );
        if (exists) return { success: false, error: 'Email already registered' };
        const newUser: User = {
          id: `user-${Date.now()}`,
          name, email, phone, password,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          users: [...state.users, newUser],
          currentUser: newUser,
          isAdmin: false,
        }));
        return { success: true };
      },
      logout: () => set({ currentUser: null, isAdmin: false }),
    }),
    { name: 'pyrotech-auth' }
  )
);

// ─── Orders Store ─────────────────────────────────────────────────────────────

interface OrderStore {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getUserOrders: (userId: string) => Order[];
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (orderData) => {
        const order: Order = {
          ...orderData,
          id: `ORD-${Date.now()}`,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ orders: [order, ...state.orders] }));

        // Automatically deduct stock for every item in the order
        const productStore = useProductStore.getState();
        for (const item of orderData.items) {
          const product = productStore.getProduct(item.product.id);
          if (product) {
            const newStock = Math.max(0, product.stock - item.quantity);
            productStore.updateStock(item.product.id, newStock);
          }
        }

        return order;
      },
      updateOrderStatus: (orderId, status) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId ? { ...o, status } : o
          ),
        })),
      getUserOrders: (userId) =>
        get().orders.filter((o) => o.userId === userId),
    }),
    { name: 'pyrotech-orders' }
  )
);
