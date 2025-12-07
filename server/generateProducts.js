// Helper function to generate 100 products with unique images

// Unique images for each product category
const productImages = {
  'Pain Relief': [
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
  ],
  'Antibiotics': [
    'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=400&fit=crop',
  ],
  'Vitamins': [
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
  ],
  'Cardiovascular': [
    'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
  ],
  'Digestive Health': [
    'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
  ],
  'Allergy': [
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=400&fit=crop',
  ],
  'Diabetes': [
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
  ],
  'Supplements': [
    'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
  ],
  'Mental Health': [
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
  ],
  'Hormones': [
    'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop',
  ],
};

export const generateProducts = () => {
  const products = [
    // Pain Relief (15 products)
    { name: 'Paracetamol 500mg', price: 15.99, stock: 100, category: 'Pain Relief', requiresPrescription: false, manufacturer: 'PharmaCorp' },
    { name: 'Ibuprofen 400mg', price: 18.50, stock: 80, category: 'Pain Relief', requiresPrescription: false, manufacturer: 'MediPharm' },
    { name: 'Aspirin 100mg', price: 12.99, stock: 120, category: 'Pain Relief', requiresPrescription: false, manufacturer: 'HealthPharm' },
    { name: 'Tramadol 50mg', price: 48.00, stock: 35, category: 'Pain Relief', requiresPrescription: true, manufacturer: 'PainPharm' },
    { name: 'Naproxen 250mg', price: 22.00, stock: 70, category: 'Pain Relief', requiresPrescription: false, manufacturer: 'MediPharm' },
    { name: 'Diclofenac 50mg', price: 20.50, stock: 65, category: 'Pain Relief', requiresPrescription: false, manufacturer: 'PharmaCorp' },
    { name: 'Codeine 30mg', price: 55.00, stock: 25, category: 'Pain Relief', requiresPrescription: true, manufacturer: 'PainPharm' },
    { name: 'Morphine 10mg', price: 85.00, stock: 15, category: 'Pain Relief', requiresPrescription: true, manufacturer: 'PainPharm' },
    { name: 'Acetaminophen 650mg', price: 16.50, stock: 95, category: 'Pain Relief', requiresPrescription: false, manufacturer: 'PharmaCorp' },
    { name: 'Ketorolac 10mg', price: 28.00, stock: 50, category: 'Pain Relief', requiresPrescription: true, manufacturer: 'MediPharm' },
    { name: 'Piroxicam 20mg', price: 24.00, stock: 60, category: 'Pain Relief', requiresPrescription: false, manufacturer: 'HealthPharm' },
    { name: 'Celecoxib 200mg', price: 42.00, stock: 45, category: 'Pain Relief', requiresPrescription: true, manufacturer: 'MediPharm' },
    { name: 'Meloxicam 15mg', price: 35.00, stock: 55, category: 'Pain Relief', requiresPrescription: false, manufacturer: 'PharmaCorp' },
    { name: 'Indomethacin 25mg', price: 30.00, stock: 40, category: 'Pain Relief', requiresPrescription: true, manufacturer: 'HealthPharm' },
    { name: 'Etoricoxib 60mg', price: 38.00, stock: 50, category: 'Pain Relief', requiresPrescription: true, manufacturer: 'MediPharm' },

    // Antibiotics (15 products)
    { name: 'Amoxicillin 500mg', price: 45.00, stock: 50, category: 'Antibiotics', requiresPrescription: true, manufacturer: 'BioMed' },
    { name: 'Azithromycin 250mg', price: 55.00, stock: 45, category: 'Antibiotics', requiresPrescription: true, manufacturer: 'BioMed' },
    { name: 'Ciprofloxacin 500mg', price: 44.00, stock: 42, category: 'Antibiotics', requiresPrescription: true, manufacturer: 'BioMed' },
    { name: 'Doxycycline 100mg', price: 36.00, stock: 48, category: 'Antibiotics', requiresPrescription: true, manufacturer: 'BioMed' },
    { name: 'Metronidazole 500mg', price: 29.00, stock: 52, category: 'Antibiotics', requiresPrescription: true, manufacturer: 'BioMed' },
    { name: 'Cephalexin 500mg', price: 40.00, stock: 46, category: 'Antibiotics', requiresPrescription: true, manufacturer: 'BioMed' },
    { name: 'Clindamycin 300mg', price: 52.00, stock: 38, category: 'Antibiotics', requiresPrescription: true, manufacturer: 'BioMed' },
    { name: 'Levofloxacin 500mg', price: 58.00, stock: 35, category: 'Antibiotics', requiresPrescription: true, manufacturer: 'BioMed' },
    { name: 'Erythromycin 250mg', price: 34.00, stock: 50, category: 'Antibiotics', requiresPrescription: true, manufacturer: 'BioMed' },
    { name: 'Tetracycline 250mg', price: 32.00, stock: 44, category: 'Antibiotics', requiresPrescription: true, manufacturer: 'BioMed' },
    { name: 'Penicillin V 250mg', price: 28.00, stock: 56, category: 'Antibiotics', requiresPrescription: true, manufacturer: 'BioMed' },
    { name: 'Vancomycin 125mg', price: 120.00, stock: 20, category: 'Antibiotics', requiresPrescription: true, manufacturer: 'BioMed' },
    { name: 'Gentamicin 80mg', price: 65.00, stock: 30, category: 'Antibiotics', requiresPrescription: true, manufacturer: 'BioMed' },
    { name: 'Clarithromycin 500mg', price: 48.00, stock: 40, category: 'Antibiotics', requiresPrescription: true, manufacturer: 'BioMed' },
    { name: 'Rifampin 300mg', price: 72.00, stock: 28, category: 'Antibiotics', requiresPrescription: true, manufacturer: 'BioMed' },

    // Vitamins (10 products)
    { name: 'Vitamin D3 1000IU', price: 25.00, stock: 90, category: 'Vitamins', requiresPrescription: false, manufacturer: 'VitCorp' },
    { name: 'Vitamin C 1000mg', price: 18.00, stock: 100, category: 'Vitamins', requiresPrescription: false, manufacturer: 'VitCorp' },
    { name: 'Vitamin B12 1000mcg', price: 22.00, stock: 85, category: 'Vitamins', requiresPrescription: false, manufacturer: 'VitCorp' },
    { name: 'Multivitamin Complex', price: 35.00, stock: 75, category: 'Vitamins', requiresPrescription: false, manufacturer: 'VitCorp' },
    { name: 'Vitamin E 400IU', price: 28.00, stock: 80, category: 'Vitamins', requiresPrescription: false, manufacturer: 'VitCorp' },
    { name: 'Folic Acid 5mg', price: 15.00, stock: 95, category: 'Vitamins', requiresPrescription: false, manufacturer: 'VitCorp' },
    { name: 'Vitamin A 10000IU', price: 20.00, stock: 88, category: 'Vitamins', requiresPrescription: false, manufacturer: 'VitCorp' },
    { name: 'Vitamin K 10mg', price: 24.00, stock: 82, category: 'Vitamins', requiresPrescription: false, manufacturer: 'VitCorp' },
    { name: 'Biotin 5000mcg', price: 30.00, stock: 70, category: 'Vitamins', requiresPrescription: false, manufacturer: 'VitCorp' },
    { name: 'Zinc 50mg', price: 16.00, stock: 92, category: 'Vitamins', requiresPrescription: false, manufacturer: 'VitCorp' },

    // Cardiovascular (15 products)
    { name: 'Atorvastatin 20mg', price: 42.50, stock: 55, category: 'Cardiovascular', requiresPrescription: true, manufacturer: 'CardioPharm' },
    { name: 'Lisinopril 10mg', price: 32.00, stock: 60, category: 'Cardiovascular', requiresPrescription: true, manufacturer: 'CardioPharm' },
    { name: 'Amlodipine 5mg', price: 26.50, stock: 70, category: 'Cardiovascular', requiresPrescription: true, manufacturer: 'CardioPharm' },
    { name: 'Metoprolol 50mg', price: 28.00, stock: 65, category: 'Cardiovascular', requiresPrescription: true, manufacturer: 'CardioPharm' },
    { name: 'Warfarin 5mg', price: 40.00, stock: 40, category: 'Cardiovascular', requiresPrescription: true, manufacturer: 'CardioPharm' },
    { name: 'Furosemide 40mg', price: 24.00, stock: 65, category: 'Cardiovascular', requiresPrescription: true, manufacturer: 'CardioPharm' },
    { name: 'Clopidogrel 75mg', price: 47.50, stock: 38, category: 'Cardiovascular', requiresPrescription: true, manufacturer: 'CardioPharm' },
    { name: 'Losartan 50mg', price: 36.00, stock: 58, category: 'Cardiovascular', requiresPrescription: true, manufacturer: 'CardioPharm' },
    { name: 'Carvedilol 25mg', price: 38.00, stock: 52, category: 'Cardiovascular', requiresPrescription: true, manufacturer: 'CardioPharm' },
    { name: 'Enalapril 10mg', price: 30.00, stock: 62, category: 'Cardiovascular', requiresPrescription: true, manufacturer: 'CardioPharm' },
    { name: 'Digoxin 0.25mg', price: 45.00, stock: 35, category: 'Cardiovascular', requiresPrescription: true, manufacturer: 'CardioPharm' },
    { name: 'Atenolol 50mg', price: 26.00, stock: 68, category: 'Cardiovascular', requiresPrescription: true, manufacturer: 'CardioPharm' },
    { name: 'Hydrochlorothiazide 25mg', price: 22.00, stock: 72, category: 'Cardiovascular', requiresPrescription: true, manufacturer: 'CardioPharm' },
    { name: 'Ramipril 5mg', price: 34.00, stock: 56, category: 'Cardiovascular', requiresPrescription: true, manufacturer: 'CardioPharm' },
    { name: 'Valsartan 80mg', price: 40.00, stock: 48, category: 'Cardiovascular', requiresPrescription: true, manufacturer: 'CardioPharm' },

    // Digestive Health (10 products)
    { name: 'Omeprazole 20mg', price: 35.50, stock: 60, category: 'Digestive Health', requiresPrescription: true, manufacturer: 'DigestPharm' },
    { name: 'Pantoprazole 40mg', price: 33.50, stock: 58, category: 'Digestive Health', requiresPrescription: true, manufacturer: 'DigestPharm' },
    { name: 'Ranitidine 150mg', price: 18.00, stock: 85, category: 'Digestive Health', requiresPrescription: false, manufacturer: 'DigestPharm' },
    { name: 'Famotidine 20mg', price: 20.00, stock: 80, category: 'Digestive Health', requiresPrescription: false, manufacturer: 'DigestPharm' },
    { name: 'Lansoprazole 30mg', price: 37.00, stock: 55, category: 'Digestive Health', requiresPrescription: true, manufacturer: 'DigestPharm' },
    { name: 'Esomeprazole 40mg', price: 39.00, stock: 52, category: 'Digestive Health', requiresPrescription: true, manufacturer: 'DigestPharm' },
    { name: 'Dicyclomine 10mg', price: 25.00, stock: 70, category: 'Digestive Health', requiresPrescription: false, manufacturer: 'DigestPharm' },
    { name: 'Metoclopramide 10mg', price: 22.00, stock: 75, category: 'Digestive Health', requiresPrescription: true, manufacturer: 'DigestPharm' },
    { name: 'Domperidone 10mg', price: 28.00, stock: 65, category: 'Digestive Health', requiresPrescription: true, manufacturer: 'DigestPharm' },
    { name: 'Loperamide 2mg', price: 16.00, stock: 90, category: 'Digestive Health', requiresPrescription: false, manufacturer: 'DigestPharm' },

    // Allergy (10 products)
    { name: 'Cetirizine 10mg', price: 20.00, stock: 75, category: 'Allergy', requiresPrescription: false, manufacturer: 'AllerPharm' },
    { name: 'Loratadine 10mg', price: 19.99, stock: 70, category: 'Allergy', requiresPrescription: false, manufacturer: 'AllerPharm' },
    { name: 'Fexofenadine 180mg', price: 32.00, stock: 60, category: 'Allergy', requiresPrescription: false, manufacturer: 'AllerPharm' },
    { name: 'Desloratadine 5mg', price: 26.00, stock: 68, category: 'Allergy', requiresPrescription: false, manufacturer: 'AllerPharm' },
    { name: 'Diphenhydramine 25mg', price: 15.00, stock: 88, category: 'Allergy', requiresPrescription: false, manufacturer: 'AllerPharm' },
    { name: 'Chlorpheniramine 4mg', price: 12.00, stock: 95, category: 'Allergy', requiresPrescription: false, manufacturer: 'AllerPharm' },
    { name: 'Promethazine 25mg', price: 18.00, stock: 80, category: 'Allergy', requiresPrescription: true, manufacturer: 'AllerPharm' },
    { name: 'Levocetirizine 5mg', price: 24.00, stock: 72, category: 'Allergy', requiresPrescription: false, manufacturer: 'AllerPharm' },
    { name: 'Bilastine 20mg', price: 30.00, stock: 65, category: 'Allergy', requiresPrescription: false, manufacturer: 'AllerPharm' },
    { name: 'Ebastine 10mg', price: 22.00, stock: 78, category: 'Allergy', requiresPrescription: false, manufacturer: 'AllerPharm' },

    // Diabetes (10 products)
    { name: 'Metformin 500mg', price: 30.00, stock: 40, category: 'Diabetes', requiresPrescription: true, manufacturer: 'DiabPharm' },
    { name: 'Glibenclamide 5mg', price: 28.00, stock: 45, category: 'Diabetes', requiresPrescription: true, manufacturer: 'DiabPharm' },
    { name: 'Gliclazide 80mg', price: 32.00, stock: 42, category: 'Diabetes', requiresPrescription: true, manufacturer: 'DiabPharm' },
    { name: 'Glipizide 5mg', price: 34.00, stock: 38, category: 'Diabetes', requiresPrescription: true, manufacturer: 'DiabPharm' },
    { name: 'Pioglitazone 15mg', price: 45.00, stock: 35, category: 'Diabetes', requiresPrescription: true, manufacturer: 'DiabPharm' },
    { name: 'Sitagliptin 100mg', price: 65.00, stock: 30, category: 'Diabetes', requiresPrescription: true, manufacturer: 'DiabPharm' },
    { name: 'Vildagliptin 50mg', price: 62.00, stock: 32, category: 'Diabetes', requiresPrescription: true, manufacturer: 'DiabPharm' },
    { name: 'Acarbose 50mg', price: 38.00, stock: 40, category: 'Diabetes', requiresPrescription: true, manufacturer: 'DiabPharm' },
    { name: 'Repaglinide 1mg', price: 42.00, stock: 36, category: 'Diabetes', requiresPrescription: true, manufacturer: 'DiabPharm' },
    { name: 'Linagliptin 5mg', price: 68.00, stock: 28, category: 'Diabetes', requiresPrescription: true, manufacturer: 'DiabPharm' },

    // Supplements (10 products)
    { name: 'Calcium Carbonate 500mg', price: 22.50, stock: 85, category: 'Supplements', requiresPrescription: false, manufacturer: 'SuppPharm' },
    { name: 'Iron 65mg', price: 18.00, stock: 90, category: 'Supplements', requiresPrescription: false, manufacturer: 'SuppPharm' },
    { name: 'Magnesium 400mg', price: 24.00, stock: 80, category: 'Supplements', requiresPrescription: false, manufacturer: 'SuppPharm' },
    { name: 'Omega-3 1000mg', price: 45.00, stock: 60, category: 'Supplements', requiresPrescription: false, manufacturer: 'SuppPharm' },
    { name: 'Coenzyme Q10 100mg', price: 55.00, stock: 50, category: 'Supplements', requiresPrescription: false, manufacturer: 'SuppPharm' },
    { name: 'Glucosamine 500mg', price: 38.00, stock: 65, category: 'Supplements', requiresPrescription: false, manufacturer: 'SuppPharm' },
    { name: 'Probiotics 10 Billion', price: 42.00, stock: 58, category: 'Supplements', requiresPrescription: false, manufacturer: 'SuppPharm' },
    { name: 'Collagen 1000mg', price: 48.00, stock: 55, category: 'Supplements', requiresPrescription: false, manufacturer: 'SuppPharm' },
    { name: 'Turmeric 500mg', price: 28.00, stock: 75, category: 'Supplements', requiresPrescription: false, manufacturer: 'SuppPharm' },
    { name: 'Ginseng 200mg', price: 35.00, stock: 68, category: 'Supplements', requiresPrescription: false, manufacturer: 'SuppPharm' },

    // Mental Health (5 products)
    { name: 'Sertraline 50mg', price: 38.00, stock: 50, category: 'Mental Health', requiresPrescription: true, manufacturer: 'NeuroPharm' },
    { name: 'Fluoxetine 20mg', price: 32.00, stock: 55, category: 'Mental Health', requiresPrescription: true, manufacturer: 'NeuroPharm' },
    { name: 'Escitalopram 10mg', price: 40.00, stock: 48, category: 'Mental Health', requiresPrescription: true, manufacturer: 'NeuroPharm' },
    { name: 'Paroxetine 20mg', price: 36.00, stock: 52, category: 'Mental Health', requiresPrescription: true, manufacturer: 'NeuroPharm' },
    { name: 'Citalopram 20mg', price: 34.00, stock: 54, category: 'Mental Health', requiresPrescription: true, manufacturer: 'NeuroPharm' },

    // Hormones (5 products)
    { name: 'Levothyroxine 50mcg', price: 28.00, stock: 65, category: 'Hormones', requiresPrescription: true, manufacturer: 'HormonePharm' },
    { name: 'Prednisone 5mg', price: 25.00, stock: 70, category: 'Hormones', requiresPrescription: true, manufacturer: 'HormonePharm' },
    { name: 'Hydrocortisone 20mg', price: 30.00, stock: 60, category: 'Hormones', requiresPrescription: true, manufacturer: 'HormonePharm' },
    { name: 'Dexamethasone 0.5mg', price: 22.00, stock: 75, category: 'Hormones', requiresPrescription: true, manufacturer: 'HormonePharm' },
    { name: 'Methylprednisolone 4mg', price: 26.00, stock: 68, category: 'Hormones', requiresPrescription: true, manufacturer: 'HormonePharm' },
  ];

  // Add unique images and descriptions for each product
  let imageIndex = {};
  
  return products.map((product, index) => {
    const category = product.category;
    const images = productImages[category] || ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop'];
    
    // Track image index per category to cycle through images
    if (!imageIndex[category]) {
      imageIndex[category] = 0;
    }
    
    const image = images[imageIndex[category] % images.length];
    imageIndex[category]++;
    
    return {
      ...product,
      description: `${product.name} - ${product.category} medication. Consult your doctor before use.`,
      image: image,
      isActive: true,
    };
  });
};
