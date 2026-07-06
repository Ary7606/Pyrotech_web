// Per-material image slots — photo + technical drawing
export const SJB_IMAGES: Record<string, { photo: string; drawing: string }> = {
  crca: {
    photo:   '/airo-assets/images/products/sjb-crca-photo',
    drawing: '/airo-assets/images/products/sjb-crca-drawing',
  },
  ss: {
    photo:   '/airo-assets/images/products/sjb-ss-photo',
    drawing: '/airo-assets/images/products/sjb-ss-drawing',
  },
  frp: {
    photo:   '/airo-assets/images/products/sjb-frp-photo',
    drawing: '/airo-assets/images/products/sjb-frp-drawing',
  },
  adc: {
    photo:   '/airo-assets/images/products/sjb-adc-photo',
    drawing: '/airo-assets/images/products/sjb-adc-photo',
  },
};

// Legacy aliases
export const SJB_CATALOGUE_IMAGE = SJB_IMAGES.crca.photo;
export const SJB_CATALOGUE_ALT   = SJB_IMAGES.crca.drawing;

export interface JBDimension {
  code: string;
  label: string;
  l: number;   // Height mm
  w: number;   // Width mm
  d: number;   // Depth mm
  mountingPlate?: string;
  cgPlateCount?: number;
  price: number;
  stock: number;
}

export interface JBMaterial {
  id: string;
  name: string;
  fullName: string;
  description: string;
  ip: string;
  finish: string;
  color: string;
  image: string;
  images: string[];
  features: string[];
  dimensions: JBDimension[];
}

export const JUNCTION_BOX_MATERIALS: JBMaterial[] = [
  // ─── CRCA ────────────────────────────────────────────────────────────────────
  // 26 entries from PDF table (080CR01–080CR26)
  {
    id: 'crca',
    name: 'CRCA',
    fullName: 'Cold Rolled Close Annealed Steel',
    description:
      'Manufactured from high-quality CRCA sheet steel, these junction boxes offer excellent mechanical strength and are powder-coated in RAL 7032 Siemens Grey for corrosion resistance. Ideal for indoor industrial installations.',
    ip: 'IP55',
    finish: 'Powder Coated RAL 7032',
    color: 'bg-slate-600',
    image: SJB_IMAGES.crca.photo,
    images: [SJB_IMAGES.crca.photo, SJB_IMAGES.crca.drawing],
    features: [
      'CRCA sheet steel construction',
      'Powder coated RAL 7032 Siemens Grey',
      'IP55 protection rating',
      'Hinged front door with quarter-turn latch',
      'Removable back mounting plate',
      'Earthing provision (M6 earth stud)',
      'Suitable for indoor industrial use',
      'Cable entry via knockouts (top / bottom / sides)',
    ],
    dimensions: [
      { code: '080CR01', label: '300 × 200 × 120 mm', l: 300, w: 200, d: 120, mountingPlate: '240×145', cgPlateCount: 1, price: 2065, stock: 30 },
      { code: '080CR02', label: '300 × 200 × 155 mm', l: 300, w: 200, d: 155, mountingPlate: '240×145', cgPlateCount: 1, price: 2228, stock: 28 },
      { code: '080CR03', label: '300 × 300 × 210 mm', l: 300, w: 300, d: 210, mountingPlate: '240×245', cgPlateCount: 1, price: 2928, stock: 28 },
      { code: '080CR04', label: '300 × 380 × 155 mm', l: 300, w: 380, d: 155, mountingPlate: '240×325', cgPlateCount: 1, price: 3091, stock: 26 },
      { code: '080CR05', label: '300 × 380 × 210 mm', l: 300, w: 380, d: 210, mountingPlate: '240×325', cgPlateCount: 1, price: 3348, stock: 25 },
      { code: '080CR06', label: '380 × 380 × 210 mm', l: 380, w: 380, d: 210, mountingPlate: '320×325', cgPlateCount: 1, price: 3791, stock: 25 },
      { code: '080CR07', label: '380 × 300 × 210 mm', l: 380, w: 300, d: 210, mountingPlate: '320×245', cgPlateCount: 1, price: 3313, stock: 25 },
      { code: '080CR08', label: '380 × 600 × 210 mm', l: 380, w: 600, d: 210, mountingPlate: '320×545', cgPlateCount: 2, price: 5249, stock: 22 },
      { code: '080CR09', label: '380 × 600 × 350 mm', l: 380, w: 600, d: 350, mountingPlate: '320×545', cgPlateCount: 2, price: 6229, stock: 20 },
      { code: '080CR10', label: '400 × 300 × 210 mm', l: 400, w: 300, d: 210, mountingPlate: '340×245', cgPlateCount: 1, price: 3371, stock: 22 },
      { code: '080CR11', label: '500 × 400 × 210 mm', l: 500, w: 400, d: 210, mountingPlate: '440×345', cgPlateCount: 1, price: 4794, stock: 20 },
      { code: '080CR12', label: '500 × 500 × 210 mm', l: 500, w: 500, d: 210, mountingPlate: '440×445', cgPlateCount: 2, price: 5482, stock: 18 },
      { code: '080CR13', label: '500 × 500 × 300 mm', l: 500, w: 500, d: 300, mountingPlate: '440×445', cgPlateCount: 2, price: 6124, stock: 18 },
      { code: '080CR14', label: '600 × 380 × 210 mm', l: 600, w: 380, d: 210, mountingPlate: '540×325', cgPlateCount: 1, price: 5167, stock: 16 },
      { code: '080CR15', label: '600 × 380 × 350 mm', l: 600, w: 380, d: 350, mountingPlate: '540×325', cgPlateCount: 2, price: 6205, stock: 15 },
      { code: '080CR16', label: '600 × 600 × 210 mm', l: 600, w: 600, d: 210, mountingPlate: '540×545', cgPlateCount: 2, price: 7745, stock: 15 },
      { code: '080CR17', label: '600 × 600 × 350 mm', l: 600, w: 600, d: 350, mountingPlate: '540×545', cgPlateCount: 2, price: 8316, stock: 12 },
      { code: '080CR18', label: '760 × 600 × 210 mm', l: 760, w: 600, d: 210, mountingPlate: '700×545', cgPlateCount: 2, price: 8468, stock: 12 },
      { code: '080CR19', label: '760 × 600 × 350 mm', l: 760, w: 600, d: 350, mountingPlate: '700×545', cgPlateCount: 2, price: 9821, stock: 10 },
      { code: '080CR20', label: '760 × 760 × 210 mm', l: 760, w: 760, d: 210, mountingPlate: '700×945', cgPlateCount: 2, price: 10043, stock: 10 },
      { code: '080CR21', label: '760 × 760 × 300 mm', l: 760, w: 760, d: 300, mountingPlate: '700×945', cgPlateCount: 2, price: 11046, stock: 8  },
      { code: '080CR22', label: '760 × 1000 × 210 mm', l: 760, w: 1000, d: 210, mountingPlate: '700×945', cgPlateCount: 2, price: 12550, stock: 8  },
      { code: '080CR23', label: '760 × 1000 × 300 mm', l: 760, w: 1000, d: 300, mountingPlate: '700×945', cgPlateCount: 2, price: 13647, stock: 6  },
      { code: '080CR24', label: '1000 × 800 × 300 mm', l: 1000, w: 800, d: 300, mountingPlate: '840×745', cgPlateCount: 2, price: 14032, stock: 6  },
      { code: '080CR25', label: '1200 × 800 × 300 mm', l: 1200, w: 800, d: 300, mountingPlate: '1140×745', cgPlateCount: 2, price: 17788, stock: 4  },
      { code: '080CR26', label: '1200 × 1000 × 300 mm', l: 1200, w: 1000, d: 300, mountingPlate: '1140×945', cgPlateCount: 2, price: 18662, stock: 3  },
    ],
  },

  // ─── SS 304 ──────────────────────────────────────────────────────────────────
  // 24 entries — 1.5 mm SS304 price list (080SS01–080SS24)
  // 1200×800×300 and 1200×1000×300 removed (not offered in SS304)
  {
    id: 'ss',
    name: 'SS 304',
    fullName: 'Stainless Steel Grade 304',
    description:
      'Fabricated from SS 304 stainless steel with a brushed finish, these junction boxes provide superior corrosion resistance and hygienic properties. Ideal for food processing, pharmaceutical, and coastal environments.',
    ip: 'IP65',
    finish: 'Brushed Stainless / Electro-polished',
    color: 'bg-zinc-500',
    image: SJB_IMAGES.ss.photo,
    images: [SJB_IMAGES.ss.photo, SJB_IMAGES.ss.drawing],
    features: [
      'SS 304 stainless steel construction',
      'Brushed / electro-polished finish',
      'IP65 protection rating',
      'Hinged front door with stainless quarter-turn latch',
      'Removable back mounting plate (SS)',
      'Earthing provision (M6 SS earth stud)',
      'Suitable for food, pharma & coastal environments',
      'Neoprene gasket for dust & water ingress protection',
    ],
    dimensions: [
      { code: '080SS01', label: '300 × 200 × 120 mm',  l: 300,  w: 200,  d: 120, mountingPlate: '240×145', cgPlateCount: 1, price: 4598,  stock: 20 },
      { code: '080SS02', label: '300 × 200 × 155 mm',  l: 300,  w: 200,  d: 155, mountingPlate: '240×145', cgPlateCount: 1, price: 4942,  stock: 18 },
      { code: '080SS03', label: '300 × 300 × 210 mm',  l: 300,  w: 300,  d: 210, mountingPlate: '240×245', cgPlateCount: 1, price: 6974,  stock: 18 },
      { code: '080SS04', label: '300 × 380 × 155 mm',  l: 300,  w: 380,  d: 155, mountingPlate: '240×325', cgPlateCount: 1, price: 7449,  stock: 16 },
      { code: '080SS05', label: '300 × 380 × 210 mm',  l: 300,  w: 380,  d: 210, mountingPlate: '240×325', cgPlateCount: 1, price: 8162,  stock: 16 },
      { code: '080SS06', label: '380 × 380 × 210 mm',  l: 380,  w: 380,  d: 210, mountingPlate: '320×325', cgPlateCount: 1, price: 9421,  stock: 14 },
      { code: '080SS07', label: '380 × 300 × 210 mm',  l: 380,  w: 300,  d: 210, mountingPlate: '320×245', cgPlateCount: 1, price: 8043,  stock: 14 },
      { code: '080SS08', label: '380 × 600 × 210 mm',  l: 380,  w: 600,  d: 210, mountingPlate: '320×545', cgPlateCount: 2, price: 13531, stock: 12 },
      { code: '080SS09', label: '380 × 600 × 350 mm',  l: 380,  w: 600,  d: 350, mountingPlate: '320×545', cgPlateCount: 2, price: 16169, stock: 10 },
      { code: '080SS10', label: '400 × 300 × 210 mm',  l: 400,  w: 300,  d: 210, mountingPlate: '340×245', cgPlateCount: 1, price: 8233,  stock: 12 },
      { code: '080SS11', label: '500 × 400 × 210 mm',  l: 500,  w: 400,  d: 210, mountingPlate: '440×345', cgPlateCount: 1, price: 12094, stock: 10 },
      { code: '080SS12', label: '500 × 500 × 210 mm',  l: 500,  w: 500,  d: 210, mountingPlate: '440×445', cgPlateCount: 2, price: 14007, stock: 10 },
      { code: '080SS13', label: '500 × 500 × 300 mm',  l: 500,  w: 500,  d: 300, mountingPlate: '440×445', cgPlateCount: 2, price: 15729, stock: 8  },
      { code: '080SS14', label: '600 × 380 × 210 mm',  l: 600,  w: 380,  d: 210, mountingPlate: '540×325', cgPlateCount: 1, price: 13080, stock: 8  },
      { code: '080SS15', label: '600 × 380 × 350 mm',  l: 600,  w: 380,  d: 350, mountingPlate: '540×325', cgPlateCount: 2, price: 15919, stock: 6  },
      { code: '080SS16', label: '600 × 600 × 210 mm',  l: 600,  w: 600,  d: 210, mountingPlate: '540×545', cgPlateCount: 2, price: 20339, stock: 6  },
      { code: '080SS17', label: '600 × 600 × 350 mm',  l: 600,  w: 600,  d: 350, mountingPlate: '540×545', cgPlateCount: 2, price: 21835, stock: 5  },
      { code: '080SS18', label: '760 × 600 × 210 mm',  l: 760,  w: 600,  d: 210, mountingPlate: '700×545', cgPlateCount: 2, price: 22239, stock: 5  },
      { code: '080SS19', label: '760 × 600 × 350 mm',  l: 760,  w: 600,  d: 350, mountingPlate: '700×545', cgPlateCount: 2, price: 26041, stock: 4  },
      { code: '080SS20', label: '760 × 760 × 210 mm',  l: 760,  w: 760,  d: 210, mountingPlate: '700×945', cgPlateCount: 2, price: 26837, stock: 4  },
      { code: '080SS21', label: '760 × 760 × 300 mm',  l: 760,  w: 760,  d: 300, mountingPlate: '700×945', cgPlateCount: 2, price: 29605, stock: 3  },
      { code: '080SS22', label: '760 × 1000 × 210 mm', l: 760,  w: 1000, d: 210, mountingPlate: '700×945', cgPlateCount: 2, price: 33822, stock: 3  },
      { code: '080SS23', label: '760 × 1000 × 300 mm', l: 760,  w: 1000, d: 300, mountingPlate: '700×945', cgPlateCount: 2, price: 36816, stock: 2  },
      { code: '080SS24', label: '1000 × 800 × 300 mm', l: 1000, w: 800,  d: 300, mountingPlate: '940×745', cgPlateCount: 2, price: 38123, stock: 2  },
    ],
  },

  // ─── FRP ─────────────────────────────────────────────────────────────────────
  // 9 entries from PDF table (080FR01–080FR09)
  {
    id: 'frp',
    name: 'FRP',
    fullName: 'Fibre Reinforced Plastic',
    description:
      'Moulded from high-quality FRP (SMC/DMC), these junction boxes are lightweight, non-corrosive, and self-extinguishing. Excellent for chemical plants, outdoor installations, and areas with aggressive atmospheres.',
    ip: 'IP65',
    finish: 'Light Grey RAL 7035 (moulded)',
    color: 'bg-lime-600',
    image: SJB_IMAGES.frp.photo,
    images: [SJB_IMAGES.frp.photo, SJB_IMAGES.frp.drawing],
    features: [
      'FRP (SMC/DMC) moulded construction',
      'Light grey RAL 7035 finish',
      'IP65 protection rating',
      'Self-extinguishing (UL94 V-0)',
      'Non-corrosive & UV stabilised',
      'Hinged door with stainless steel latch',
      'Suitable for chemical & outdoor environments',
      'Halogen-free & RoHS compliant',
    ],
    dimensions: [
      { code: '080FR01', label: '120 × 100 × 80 mm',  l: 120, w: 100, d: 80,  price: 650,  stock: 50 },
      { code: '080FR02', label: '120 × 120 × 90 mm',  l: 120, w: 120, d: 90,  price: 720,  stock: 48 },
      { code: '080FR03', label: '160 × 120 × 85 mm',  l: 160, w: 120, d: 85,  price: 820,  stock: 45 },
      { code: '080FR04', label: '160 × 160 × 90 mm',  l: 160, w: 160, d: 90,  price: 950,  stock: 42 },
      { code: '080FR05', label: '250 × 200 × 125 mm', l: 250, w: 200, d: 125, price: 1350, stock: 38 },
      { code: '080FR06', label: '330 × 230 × 150 mm', l: 330, w: 230, d: 150, price: 1800, stock: 32 },
      { code: '080FR07', label: '410 × 310 × 175 mm', l: 410, w: 310, d: 175, price: 2400, stock: 25 },
      { code: '080FR08', label: '510 × 360 × 190 mm', l: 510, w: 360, d: 190, price: 3100, stock: 18 },
      { code: '080FR09', label: '620 × 435 × 210 mm', l: 620, w: 435, d: 210, price: 4200, stock: 12 },
    ],
  },

  // ─── Aluminium Die Cast ───────────────────────────────────────────────────────
  // 6 entries from PDF table (080AL01–080AL06)
  {
    id: 'adc',
    name: 'Aluminium Die Cast',
    fullName: 'Aluminium Die Cast (ADC)',
    description:
      'Die-cast from high-grade aluminium alloy, these junction boxes offer exceptional rigidity, heat dissipation, and corrosion resistance. Ideal for outdoor, hazardous, and high-vibration industrial environments.',
    ip: 'IP65',
    finish: 'Powder Coated / Natural Aluminium',
    color: 'bg-gray-400',
    image: SJB_IMAGES.adc.photo,
    images: [SJB_IMAGES.adc.photo],
    features: [
      'High-grade aluminium die cast construction',
      'IP65 protection rating',
      'Excellent heat dissipation',
      'High impact & vibration resistance',
      'Powder coated or natural aluminium finish',
      'M6 earth bolt (M6×12 MS)',
      '4 or 6 mounting holes × 6.5 mm',
      'Suitable for outdoor & hazardous environments',
    ],
    dimensions: [
      { code: '080AL01', label: '155 × 115 × 90 mm',  l: 155, w: 115, d: 90,  price: 1200, stock: 40 },
      { code: '080AL02', label: '195 × 140 × 95 mm',  l: 195, w: 140, d: 95,  price: 1500, stock: 36 },
      { code: '080AL03', label: '195 × 195 × 100 mm', l: 195, w: 195, d: 100, price: 1800, stock: 32 },
      { code: '080AL04', label: '298 × 226 × 95 mm',  l: 298, w: 226, d: 95,  price: 2400, stock: 25 },
      { code: '080AL05', label: '305 × 305 × 105 mm', l: 305, w: 305, d: 105, price: 2900, stock: 20 },
      { code: '080AL06', label: '500 × 500 × 200 mm', l: 500, w: 500, d: 200, price: 4800, stock: 12 },
    ],
  },
];
