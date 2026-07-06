// ─── MCB Data — from Pyrotech PDF catalogue ──────────────────────────────────
// QDB3-63 Series  : rated current 1,2,3,4,5,6,8,10,13,16,20,25,32,40,50,63A
//                   poles: 1P, 1P+N, 2P, 3P, 3P+N, 4P
// QDB3-125H Series: rated current 63,80,100,125A
//                   poles: 1P, 1P+N, 2P, 3P, 3P+N, 4P

export interface MCBVariant {
  code: string;
  currentRating: number;   // Amperes
  poles: string;           // e.g. '1P', '3P+N'
  price: number;
  stock: number;
}

export interface MCBSeries {
  id: string;
  name: string;             // e.g. 'QDB3-63'
  fullName: string;
  description: string;
  color: string;            // Tailwind bg class for accent stripe
  image: string;            // slot URL
  images: string[];

  // Technical specs from PDF
  ratedVoltage: string;
  insulationVoltage: string;
  ratedFrequency: string;
  breakingCapacity: string;
  energyLimitingClass: string;
  impulseWithstand: string;
  pollutionDegree: string;
  trippingCharacteristic: string;
  electricalLife: string;
  mechanicalLife: string;
  protectionDegree: string;
  referenceTemp: string;
  ambientTemp: string;
  storageTemp: string;
  terminalConnectionType: string;
  terminalSizeCable: string;
  terminalSizeBusbar: string;
  tighteningTorque: string;
  mounting: string;
  connection: string;

  currentRatings: number[];  // available current ratings in Amps
  poles: string[];           // available pole configurations
  variants: MCBVariant[];
}

// ─── Price overrides from Pyrotech MCB price list ────────────────────────────
// Keyed by `${amp}A|${pole}`. Only the variants that appear in the official
// price list are overridden; every other variant keeps its formula price.
//
// Rule applied: current < 63A → QDB3-63 frame, 63A–125A → QDB3-125H frame.
// The QDB3-125H (63A / 125A) figures come from the "big size" list rows.
const QDB3_63_PRICES: Record<string, number> = {
  '6A|1P': 164,   // 320804
  '6A|2P': 331,   // 320807
  '6A|3P': 499,   // 320809
  '16A|2P': 329,  // 320803
  '16A|3P': 495,  // 320811
  '16A|4P': 659,  // 320810
  '25A|2P': 329,  // 320805
  '32A|2P': 341,  // 320817
  '32A|3P': 514,  // 320806 / 320812
  '32A|3P+N': 686, // 320814
  '32A|4P': 686,  // 320815
  '63A|4P': 805,  // 320816
};

const QDB3_125_PRICES: Record<string, number> = {
  '63A|3P': 905,   // 320877 (big size)
  '63A|4P': 1206,  // 320888 (big size)
  '125A|3P': 905,  // 320878 (big size)
  '125A|4P': 1206, // 320876 (big size)
};

// ─── Helper to generate variants ─────────────────────────────────────────────
function buildVariants(
  seriesPrefix: string,
  currentRatings: number[],
  poles: string[],
  basePrice: (a: number, p: string) => number,
  priceOverrides: Record<string, number> = {},
): MCBVariant[] {
  const variants: MCBVariant[] = [];
  for (const amp of currentRatings) {
    for (const pole of poles) {
      const poleCode = pole.replace('+', '');
      const overrideKey = `${amp}A|${pole}`;
      variants.push({
        code: `${seriesPrefix}-${amp}A-${poleCode}`,
        currentRating: amp,
        poles: pole,
        price: priceOverrides[overrideKey] ?? basePrice(amp, pole),
        stock: Math.max(5, 50 - Math.floor(amp / 3)),
      });
    }
  }
  return variants;
}

// Price logic: higher amps & more poles = higher price
function qdb363Price(amp: number, pole: string): number {
  const poleMultiplier: Record<string, number> = {
    '1P': 1, '1P+N': 1.4, '2P': 1.6, '3P': 2.2, '3P+N': 2.6, '4P': 2.8,
  };
  const base = 180 + amp * 4;
  return Math.round(base * (poleMultiplier[pole] ?? 1));
}

function qdb3125Price(amp: number, pole: string): number {
  const poleMultiplier: Record<string, number> = {
    '1P': 1, '1P+N': 1.4, '2P': 1.6, '3P': 2.2, '3P+N': 2.6, '4P': 2.8,
  };
  const base = 900 + amp * 8;
  return Math.round(base * (poleMultiplier[pole] ?? 1));
}

const QDB3_63_RATINGS  = [1, 2, 3, 4, 5, 6, 8, 10, 13, 16, 20, 25, 32, 40, 50, 63];
const QDB3_125_RATINGS = [63, 80, 100, 125];
const ALL_POLES        = ['1P', '1P+N', '2P', '3P', '3P+N', '4P'];

export const MCB_SERIES: MCBSeries[] = [
  // ─── QDB3-63 ─────────────────────────────────────────────────────────────────
  {
    id: 'qdb3-63',
    name: 'QDB3-63',
    fullName: 'QDB3-63 Miniature Circuit Breaker',
    description:
      'The Pyrotech QDB3-63 series MCB is designed for protection of electrical circuits against overload and short-circuit currents. Available in B, C, and D tripping characteristics to suit lighting, distribution, and motor circuits. Rated up to 63A with a breaking capacity of 6000A.',
    color: 'bg-blue-600',
    image: '/airo-assets/images/products/sjb-crca-photo', // placeholder — update when MCB image available
    images: ['/airo-assets/images/products/sjb-crca-photo'],

    // Electrical Features (from PDF)
    ratedVoltage: '240/415V',
    insulationVoltage: '500V',
    ratedFrequency: '50/60 Hz',
    breakingCapacity: '6,000A',
    energyLimitingClass: '3',
    impulseWithstand: '4,000V',
    pollutionDegree: '2',
    trippingCharacteristic: 'B, C, D',

    // Mechanical Features
    electricalLife: '4,000 Cycles',
    mechanicalLife: '10,000 Cycles',
    protectionDegree: 'IP20',
    referenceTemp: '30°C',
    ambientTemp: '-5°C ~ +40°C',
    storageTemp: '-25°C ~ +70°C',

    // Installation
    terminalConnectionType: 'Cable / Pin-type busbar',
    terminalSizeCable: '25mm² 18-3AWG',
    terminalSizeBusbar: '25mm² 18-3AWG',
    tighteningTorque: '2.5 Nm  22 In-lbs',
    mounting: 'DIN rail EN60715 (35mm) — fast clip device',
    connection: 'From top and bottom',

    currentRatings: QDB3_63_RATINGS,
    poles: ALL_POLES,
    variants: buildVariants('QDB3-63', QDB3_63_RATINGS, ALL_POLES, qdb363Price, QDB3_63_PRICES),
  },

  // ─── QDB3-125H ───────────────────────────────────────────────────────────────
  {
    id: 'qdb3-125h',
    name: 'QDB3-125H',
    fullName: 'QDB3-125H Miniature Circuit Breaker',
    description:
      'The Pyrotech QDB3-125H series MCB handles higher current applications up to 125A with a breaking capacity of 10,000A. Suitable for main distribution boards and heavy-duty industrial circuits. Thermo-magnetic release characteristic 8–12In.',
    color: 'bg-emerald-600',
    image: '/airo-assets/images/products/sjb-crca-photo', // placeholder
    images: ['/airo-assets/images/products/sjb-crca-photo'],

    // Electrical Features (from PDF)
    ratedVoltage: '240/415V',
    insulationVoltage: '500V',
    ratedFrequency: '50/60 Hz',
    breakingCapacity: '10,000A',
    energyLimitingClass: '3',
    impulseWithstand: '4,000V',
    pollutionDegree: '2',
    trippingCharacteristic: '8–12 In',

    // Mechanical Features
    electricalLife: '4,000 Cycles',
    mechanicalLife: '10,000 Cycles',
    protectionDegree: 'IP20',
    referenceTemp: '30°C',
    ambientTemp: '-5°C ~ +40°C',
    storageTemp: '-25°C ~ +70°C',

    // Installation
    terminalConnectionType: 'Cable / Pin-type busbar',
    terminalSizeCable: '50mm² 18-2AWG',
    terminalSizeBusbar: '50mm² 18-2AWG',
    tighteningTorque: '3.5 Nm  30 In-lbs',
    mounting: 'DIN rail EN60715 (35mm) — fast clip device',
    connection: 'From top and bottom',

    currentRatings: QDB3_125_RATINGS,
    poles: ALL_POLES,
    variants: buildVariants('QDB3-125H', QDB3_125_RATINGS, ALL_POLES, qdb3125Price, QDB3_125_PRICES),
  },
];
