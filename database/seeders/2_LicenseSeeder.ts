import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import License from "App/Models/License";
import SupportResponseTime from "App/Models/SupportResponseTime";
import SupportItem from "App/Models/SupportItem";
import { DateTime } from "luxon";

export default class extends BaseSeeder {
  public async run() {
    // Create the main license
    const license = await License.create({
      licenseKey: "SRC25-W4Q9K-M1T8J-L5X2B-C3V7N",
      startDate: DateTime.fromISO("2020-03-05"),
      endDate: DateTime.fromISO("2028-03-31"),
      status: "active",
      companyName: "Forosta Jaya Makmur",
      companyAddress:
        "Jl. Taman Palem Lestari Komplek Ruko Pelangi Blok E No. 32 Cengkareng Barat, Cengkareng Jakarta Barat",
      companyEmail: "admin@forostajayamakmur.com",
      picName: "Rachman Mullyadi",
      picPhone: "081319193551",
    });

    // Create support response times
    const supportTimes = [
      {
        category: "Critical",
        description: "Service down",
        responseTime: "4 hours",
        resolution: "24 hours",
      },
      {
        category: "Moderate",
        description: "Feature disrupted",
        responseTime: "1 business day",
        resolution: "3 business days",
      },
      {
        category: "Minor",
        description: "Customization/UI",
        responseTime: "2 business days",
        resolution: "5 business days",
      },
    ];

    for (const supportTime of supportTimes) {
      await SupportResponseTime.create({
        licenseId: license.id,
        category: supportTime.category,
        description: supportTime.description,
        responseTime: supportTime.responseTime,
        resolution: supportTime.resolution,
      });
    }

    // Attach support items to the license (assuming they exist from SupportItemSeeder)
    try {
      const supportItems = await SupportItem.all();
      console.log(`Found ${supportItems.length} support items in database`);
      
      if (supportItems.length > 0) {
        console.log('Support items found:', supportItems.map(item => item.title));
        
        // Clear existing relationships first
        await license.related('supportItems').detach();
        
        // Attach all support items
        const attachedItems = await license.related('supportItems').attach(supportItems.map(item => item.id));
        console.log(`✅ Attached ${supportItems.length} support items to license:`, attachedItems);
      }
    } catch (error) {
      console.error("❌ Error attaching support items:", error.message);
      console.error("Error details:", error);
    }

    console.log("✅ License data seeded successfully!");
  }
}
