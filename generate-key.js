const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔑 Generating AdonisJS App Key...\n');

try {
  // Check if we're in the right directory
  if (!fs.existsSync('ace')) {
    console.log('❌ Error: ace file not found. Make sure you\'re in the project root directory.');
    console.log('Current directory:', process.cwd());
    process.exit(1);
  }

  // Generate the app key
  console.log('Running: node ace generate:key');
  const result = execSync('node ace generate:key', { 
    cwd: __dirname,
    encoding: 'utf8' 
  });

  console.log('✅ Success! Generated key:');
  console.log(result);
  
  // Try to read the .env file to show the updated key
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const appKeyMatch = envContent.match(/APP_KEY=(.+)/);
    if (appKeyMatch) {
      console.log('\n📝 Updated .env file with new APP_KEY:');
      console.log('APP_KEY=' + appKeyMatch[1]);
    }
  }

  console.log('\n🎉 App key generation completed successfully!');
  console.log('⚠️  Remember to delete this file after use for security.');

} catch (error) {
  console.error('❌ Error generating app key:');
  console.error(error.message);
  
  if (error.stdout) {
    console.log('\nCommand output:');
    console.log(error.stdout);
  }
  
  if (error.stderr) {
    console.log('\nError output:');
    console.log(error.stderr);
  }
  
  process.exit(1);
}
