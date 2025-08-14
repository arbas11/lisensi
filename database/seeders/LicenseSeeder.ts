import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import License from "App/Models/License";
import SupportResponseTime from "App/Models/SupportResponseTime";

export default class extends BaseSeeder {
  public async run() {
    // Create the main license
    const license = await License.create({
      licenseKey: "SRC25-W4Q9K-M1T8J-L5X2B-C3V7N",
      startDate: "2020-03-05",
      endDate: "2028-03-31",
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

    console.log("✅ License data seeded successfully!");
  }
}
