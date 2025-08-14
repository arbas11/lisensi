import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import SupportItem from 'App/Models/SupportItem'

export default class extends BaseSeeder {
  public async run() {
    const supportItems = [
      {
        title: 'Technical Assistance',
        description: 'Remote support for troubleshooting, configuration, and minor fixes with our expert IT team.',
        category: 'support',
        isActive: true,
      },
      {
        title: 'On-Site Support',
        description: 'Technical visits for issues not resolved remotely, ensuring your system runs smoothly.',
        category: 'support',
        isActive: true,
      },
      {
        title: 'Update & Patch Management',
        description: 'Providing system updates, security patches, and bug fixes to keep your software secure.',
        category: 'maintenance',
        isActive: true,
      },
      {
        title: 'Support Service Hours',
        description: 'Monday-Friday, 08:00 to 17:00 WIB (excluding national holidays), with 24/7 support for critical cases.',
        category: 'support',
        isActive: true,
      },
      {
        title: 'System Performance',
        description: 'Ensuring your system operates according to specifications with optimal performance.',
        category: 'performance',
        isActive: true,
      },
      {
        title: 'System Security',
        description: 'Guaranteed protection against vulnerabilities with regular security patches and updates.',
        category: 'security',
        isActive: true,
      },
      {
        title: 'Bug-Free Guarantee',
        description: 'Our development team commits to fixing major bugs at no additional cost during warranty.',
        category: 'warranty',
        isActive: true,
      },
    ]

    for (const item of supportItems) {
      await SupportItem.create(item)
    }
  }
}
