import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import SupportItem from 'App/Models/SupportItem'

export default class extends BaseSeeder {
  public async run() {
    const supportItems = [
      {
        title: 'Technical Assistance',
        description: 'Remote technical support for troubleshooting, configuration, and minor fixes related to system usage.',
        category: 'support',
        isActive: true,
      },
      {
        title: 'On-Site Support (if necessary)',
        description: 'Technical visits to the user\'s location for issues that cannot be resolved through remote support.',
        category: 'support',
        isActive: true,
      },
      {
        title: 'Update & Patch Management',
        description: 'Providing system updates, security patches, and bug fixes throughout the support period.',
        category: 'maintenance',
        isActive: true,
      },
      {
        title: 'Support Service Hours',
        description: 'Monday - Friday, from 08:00 to 17:00 WIB (Western Indonesian Time), excluding national holidays. For critical cases, 24/7 support can be provided based on agreement.',
        category: 'support',
        isActive: true,
      },
      {
        title: 'System Performance',
        description: 'Ensuring that the SuperApp system operates in accordance with the specifications and requirements set out in the agreement.',
        category: 'performance',
        isActive: true,
      },
      {
        title: 'System Security',
        description: 'The system is guaranteed to be protected against common vulnerabilities and will receive necessary security patches during the warranty period.',
        category: 'security',
        isActive: true,
      },
      {
        title: 'Free from Major Bugs',
        description: 'If a major bug is found that disrupts the system\'s core functionality, the Development Team is obligated to fix it at no additional cost during the warranty period.',
        category: 'warranty',
        isActive: true,
      },
    ]

    for (const item of supportItems) {
      await SupportItem.create(item)
    }
  }
}
