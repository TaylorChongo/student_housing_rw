import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const listingsData = [
  {
    title: "Modern Studio near CMU",
    description: "Elegant studio apartment with high-speed internet, perfect for international students. Includes 24/7 security and a backup generator.",
    price: 350.0,
    location: "Kigali, Bumbogo",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800"]
  },
  {
    title: "Shared Apartment in Kacyiru",
    description: "Spacious room in a shared 3-bedroom house. Great community vibe, walking distance to ministries and shops.",
    price: 200.0,
    location: "Kigali, Kacyiru",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800"]
  },
  {
    title: "Ensuite Room near UR-CBE",
    description: "Self-contained room with private balcony. Very quiet environment, ideal for serious students.",
    price: 150.0,
    location: "Kigali, Gikondo",
    images: ["https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800"]
  },
  {
    title: "Cozy Annex in Kibagabaga",
    description: "Private annex with small kitchenette and garden access. Located in a high-end residential area.",
    price: 300.0,
    location: "Kigali, Kibagabaga",
    images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800"]
  },
  {
    title: "Student Villa - Kimironko",
    description: "Fully furnished villa specifically designed for student groups. Shared lounge, dining area, and laundry facilities.",
    price: 180.0,
    location: "Kigali, Kimironko",
    images: ["https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800"]
  },
  {
    title: "Standard Room - Nyarutarama",
    description: "Affordable housing in the city's most prestigious neighborhood. Close to tennis club and restaurants.",
    price: 250.0,
    location: "Kigali, Nyarutarama",
    images: ["https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&q=80&w=800"]
  },
  {
    title: "Downtown Studio Loft",
    description: "Modern loft in the heart of Kigali. Incredible city views and walking distance to the business district.",
    price: 450.0,
    location: "Kigali, Town Center",
    images: ["https://images.unsplash.com/photo-1536376074432-bc62fa92e4f2?auto=format&fit=crop&q=80&w=800"]
  },
  {
    title: "Garden Cottage - Remera",
    description: "Peaceful cottage surrounded by greenery. Very close to the Amahoro Stadium and airport.",
    price: 280.0,
    location: "Kigali, Remera",
    images: ["https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800"]
  },
  {
    title: "Shared Hostel Room",
    description: "Budget-friendly shared room with bunk beds. Shared kitchen and large study hall. All utilities included.",
    price: 80.0,
    location: "Kigali, Kanombe",
    images: ["https://images.unsplash.com/photo-1555854817-5b2337a8545c?auto=format&fit=crop&q=80&w=800"]
  },
  {
    title: "Luxury Apartment - Rebero",
    description: "High-end apartment with a pool and gym access. Best climate in Kigali with amazing panoramic views.",
    price: 600.0,
    location: "Kigali, Rebero",
    images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"]
  },
  {
    title: "Furnished Flat - Kiyovu",
    description: "Classic apartment in a safe, quiet street. Includes cleaning services and breakfast options.",
    price: 500.0,
    location: "Kigali, Kiyovu",
    images: ["https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800"]
  },
  {
    title: "Affordable Guesthouse Room",
    description: "Simple, clean room with a desk. Perfect for short-term student placements or research stays.",
    price: 120.0,
    location: "Kigali, Nyamirambo",
    images: ["https://images.unsplash.com/photo-1630699144339-420f59b4747b?auto=format&fit=crop&q=80&w=800"]
  },
  {
    title: "Modern Heights Apartment",
    description: "Living right next to Kigali Heights. Modern amenities, safe parking, and 24h concierge.",
    price: 700.0,
    location: "Kigali, Kimihurura",
    images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800"]
  },
  {
    title: "Quiet Room near AIMS",
    description: "Ideal for AIMS students. 5 minutes walk to campus. High-speed internet is the top priority here.",
    price: 220.0,
    location: "Kigali, Remera",
    images: ["https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800"]
  },
  {
    title: "Traditional House - Gisozi",
    description: "Experience local living in a modernised traditional house. Large courtyard and fruit trees.",
    price: 190.0,
    location: "Kigali, Gisozi",
    images: ["https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&q=80&w=800"]
  }
];

async function seed() {
  try {
    const landlordEmail = 'landlord@gmail.com';
    const landlord = await prisma.user.findUnique({
      where: { email: landlordEmail }
    });

    if (!landlord) {
      console.error(`❌ User ${landlordEmail} not found in database.`);
      return;
    }

    console.log(`✅ Found landlord: ${landlord.name} (ID: ${landlord.id})`);

    // Create 15 listings
    for (const listing of listingsData) {
      await prisma.listing.create({
        data: {
          ...listing,
          landlordId: landlord.id
        }
      });
      console.log(`🏠 Created listing: ${listing.title}`);
    }

    console.log(`\n🎉 Successfully generated 15 house listings for ${landlordEmail}!`);
  } catch (error) {
    console.error('❌ Error seeding listings:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
