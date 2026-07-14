export interface Product {
  slug: string;
  title: string;
  overview: string;
  img: string;
  features: string[];
  benefits: string[];
  applications: string[];
  technicalHighlights: string[];
}

export const products: Product[] = [
  {
    slug: "access-raised-floor-systems",
    title: "Access / Raised Floor Systems",
    overview: "State-of-the-art modular flooring solutions designed specifically for data centers, command rooms, and modern offices. Our access floors provide a concealed plenum for routing critical infrastructure, enhancing flexibility without compromising structural integrity.",
    img: "https://images.unsplash.com/photo-1558442074-3c19857bc1dc?auto=format&fit=crop&q=80",
    features: [
      "High-load bearing modular steel or calcium sulphate panels.",
      "Anti-static and conductive surface options.",
      "Adjustable galvanized steel pedestals and stringers.",
      "Interchangeable panels for rapid reconfiguration."
    ],
    benefits: [
      "Facilitates easy maintenance of sub-floor HVAC, electrical, and data cabling.",
      "Significantly improves air circulation in high-density thermal environments.",
      "Reduces structural load compared to traditional concrete trenching.",
      "Aesthetically versatile with various top finishes (HPL, vinyl, bare)."
    ],
    applications: [
      "Data Centers & Server Rooms",
      "Telecommunication Hubs",
      "Control Rooms",
      "Modern Corporate Offices"
    ],
    technicalHighlights: [
      "Load Capacity: Up to 15kN point load / 35kN/m² uniform load.",
      "Fire Resistance: Class A1 non-combustible core options.",
      "Height Range: 50mm to 1200mm adjustable void depth.",
      "Acoustic Insulation: High sound attenuation (up to 55dB)."
    ]
  },
  {
    slug: "athletic-sports-flooring",
    title: "Athletic & Sports Flooring",
    overview: "High-performance resilient surfaces engineered for professional and recreational sports facilities. Designed to maximize athlete safety, biomechanical response, and long-term durability under extreme foot traffic and impact.",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80",
    features: [
      "Multi-layered polyurethane (PU), EPDM, and vulcanized rubber compositions.",
      "Seamless and non-porous surface construction.",
      "UV-resistant coatings for outdoor applications.",
      "Optimal friction coefficient calibrated for athletic footwear."
    ],
    benefits: [
      "Exceptional shock absorption to minimize joint stress and athletic injuries.",
      "High slip resistance in both dry and wet conditions.",
      "Resilient to heavy impact, spike marks, and temperature fluctuations.",
      "Low maintenance requirements with anti-bacterial properties."
    ],
    applications: [
      "Professional Running Tracks",
      "Indoor Basketball & Volleyball Gymnasiums",
      "Outdoor Tennis Courts",
      "Commercial Fitness Centers & Playgrounds"
    ],
    technicalHighlights: [
      "Force Reduction: Meets EN 14904 standards (up to 45% shock absorption).",
      "Thickness: Ranges from 8mm to 15mm depending on sport profile.",
      "Tensile Strength: > 1.5 MPa.",
      "Lifespan: 10-15 years under intensive use conditions."
    ]
  },
  {
    slug: "soundproofing-toilet-partitions",
    title: "Soundproofing & Toilet Partition Systems",
    overview: "Premium acoustic insulation and robust sanitary partitioning designed for high-traffic public and commercial environments. Our systems combine architectural aesthetics with superior moisture resistance and privacy control.",
    img: "https://images.unsplash.com/photo-1587842231267-2795ecb548b2?auto=format&fit=crop&q=80",
    features: [
      "High-Pressure Laminate (HPL) and powder-coated metal partition boards.",
      "Acoustic core composites for sound dampening between cubicles.",
      "Heavy-duty stainless steel or nylon hardware.",
      "Anti-graffiti and anti-microbial surface treatments."
    ],
    benefits: [
      "Total resistance to water, steam, and high-humidity environments.",
      "Enhances privacy through engineered sound reduction.",
      "Extremely durable against vandalism, scratches, and impact.",
      "Hygienic and easy to clean, reducing janitorial overhead."
    ],
    applications: [
      "Shopping Malls & Airports",
      "Hospitals & Healthcare Facilities",
      "Educational Institutions",
      "Corporate Office Washrooms"
    ],
    technicalHighlights: [
      "Material Thickness: 12mm - 18mm Solid Phenolic Core.",
      "Hardware Grade: 304/316 Stainless Steel.",
      "Acoustic Rating: STC 35+ for specialized soundproof models.",
      "Fire Rating: B-s1,d0 (European Standard)."
    ]
  },
  {
    slug: "ceiling-flooring-systems",
    title: "Ceiling & Flooring Systems",
    overview: "Comprehensive finishing systems integrating functional ceiling grids with complementary floor finishes. Tailored to meet the complex architectural, lighting, and HVAC requirements of modern commercial spaces.",
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80",
    features: [
      "Suspended grid systems with gypsum, mineral fiber, or metal tiles.",
      "Integrated lighting and air diffusion modules.",
      "Luxury Vinyl Tile (LVT) and commercial broadloom flooring options.",
      "Moisture-resistant and sag-resistant ceiling panels."
    ],
    benefits: [
      "Conceals overhead ductwork, wiring, and plumbing while maintaining accessibility.",
      "Improves ambient acoustics through high Noise Reduction Coefficient (NRC) materials.",
      "Enhances interior lighting efficiency via high light reflectance.",
      "Aesthetically cohesive designs bridging ceiling and floor."
    ],
    applications: [
      "Corporate Headquarters",
      "Retail Showrooms",
      "Auditoriums & Conference Halls",
      "Hospitality & Hotel Lobbies"
    ],
    technicalHighlights: [
      "Acoustics: NRC up to 0.95 / CAC up to 40.",
      "Light Reflectance: > 85% for white ceiling tiles.",
      "Grid Load Capacity: Intermediate and heavy-duty suspension systems.",
      "Flooring Wear Layer: 0.5mm - 0.7mm commercial grade PU."
    ]
  },
  {
    slug: "sandwich-panels",
    title: "Sandwich Panels",
    overview: "Advanced structural cladding consisting of high-performance rigid insulation sandwiched between metal facings. Engineered for rapid construction of highly energy-efficient walls and roofing systems.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80",
    features: [
      "Polyurethane (PUR), Polyisocyanurate (PIR), or Rockwool insulating cores.",
      "Pre-painted galvanized steel or aluminum exterior facings.",
      "Interlocking tongue-and-groove joint systems.",
      "Customizable profiles (ribbed, flat, micro-ribbed)."
    ],
    benefits: [
      "Exceptional thermal resistance, drastically reducing HVAC energy costs.",
      "Lightweight construction minimizes structural foundation requirements.",
      "Rapid, dry installation process speeds up project timelines.",
      "Weatherproof and highly resistant to corrosion and biological growth."
    ],
    applications: [
      "Industrial Warehouses & Logistics Centers",
      "Cold Storage Facilities",
      "Manufacturing Plants",
      "Commercial Supermarkets"
    ],
    technicalHighlights: [
      "Thermal Conductivity (Lambda): As low as 0.022 W/mK (PIR).",
      "Panel Thickness: 40mm to 200mm.",
      "Fire Performance: Up to 120 minutes fire resistance (Rockwool core).",
      "Spanning Capability: Can span up to 6 meters between supports."
    ]
  },
  {
    slug: "insulation-foams",
    title: "Insulation Foams",
    overview: "State-of-the-art foam insulation solutions providing superior thermal and acoustic barriers. Applied as rigid boards or spray foam to seamlessly seal building envelopes and eliminate thermal bridging.",
    img: "https://images.unsplash.com/photo-1621293954908-907159247fc8?auto=format&fit=crop&q=80",
    features: [
      "Extruded Polystyrene (XPS) and Expanded Polystyrene (EPS) boards.",
      "Closed-cell polyurethane spray foam systems.",
      "High compressive strength material structures.",
      "Zero Ozone Depletion Potential (ODP) blowing agents."
    ],
    benefits: [
      "Prevents heat loss in winter and heat gain in summer.",
      "Acts as a continuous air and moisture barrier (closed-cell foam).",
      "Reduces airborne noise transmission between structural cavities.",
      "Long-term dimensional stability without sagging or settling over time."
    ],
    applications: [
      "Roofing Insulation (Flat and Pitched)",
      "Cavity Wall and Perimeter Insulation",
      "Under-slab Concrete Floor Insulation",
      "HVAC Ductwork Sealing"
    ],
    technicalHighlights: [
      "R-Value: Approx R-5 to R-7 per inch of thickness.",
      "Compressive Strength: 300 kPa to 700 kPa (XPS).",
      "Water Absorption: < 1% by volume.",
      "Operating Temp Range: -50°C to +75°C."
    ]
  },
  {
    slug: "epoxy-waterproofing-solutions",
    title: "Epoxy & Waterproofing Solutions",
    overview: "Heavy-duty, seamless floor coatings and liquid-applied waterproofing membranes. Formulated to protect concrete and structural substrates from chemical spills, vehicular traffic, and water ingress.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80",
    features: [
      "Two-part, 100% solid epoxy and polyurethane resin systems.",
      "Elastomeric liquid waterproofing membranes.",
      "Self-leveling compounds with customizable color flakes or quartz.",
      "Chemical-resistant topcoats (novolac epoxies)."
    ],
    benefits: [
      "Creates an impenetrable, seamless surface that prevents concrete dusting.",
      "High resistance to automotive fluids, industrial chemicals, and impact.",
      "Waterproofing systems prevent rebar corrosion and structural water damage.",
      "Easy to sanitize, making it ideal for sterile environments."
    ],
    applications: [
      "Industrial Manufacturing Floors",
      "Commercial Parking Garages",
      "Pharmaceutical & Food Processing Plants",
      "Basements, Roofs & Sub-grade Structures"
    ],
    technicalHighlights: [
      "Compressive Strength: > 50 MPa (stronger than standard concrete).",
      "Adhesion to Concrete: > 1.5 MPa (concrete failure).",
      "Waterproofing Elongation: > 400% at break.",
      "Curing Time: Foot traffic in 24h, fully chemically resistant in 7 days."
    ]
  },
  {
    slug: "smart-access-safety-doors",
    title: "Smart Access & Safety Doors",
    overview: "High-performance architectural door systems integrating advanced access control with rigorous fire and life safety compliance. Engineered for security without compromising the building's aesthetic integrity.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
    features: [
      "Galvanized steel and heavy-duty aluminum frame construction.",
      "Integrated biometric, RFID, and smart-lock access systems.",
      "Intumescent seals that expand upon heat exposure.",
      "Panic hardware and automated breakout functions."
    ],
    benefits: [
      "Ensures compartmentalization of fire and smoke to protect occupants.",
      "Provides seamless, automated entry for high-traffic environments.",
      "Integrates with central Building Management Systems (BMS) for security tracking.",
      "Highly durable mechanisms rated for millions of cycles."
    ],
    applications: [
      "Hospital & Laboratory Secure Zones",
      "Commercial Office Entrances",
      "Emergency Exits & Stairwells",
      "Data Center Security Perimeters"
    ],
    technicalHighlights: [
      "Fire Rating: Up to 180 minutes (UL/EN Certified).",
      "Acoustic Rating: Up to STC 45.",
      "Cycle Testing: Tested to 2,000,000+ continuous operations.",
      "Power Failure Mode: Fail-safe or Fail-secure configurable."
    ]
  }
];
