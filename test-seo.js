#!/usr/bin/env node

/**
 * Tech Giant SEO Testing Script
 * Quick validation of SEO implementation
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Testing Tech Giant SEO Implementation...\n');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

let passed = 0;
let failed = 0;

const test = (description, condition) => {
  if (condition) {
    log(`✅ ${description}`, 'green');
    passed++;
  } else {
    log(`❌ ${description}`, 'red');
    failed++;
  }
};

// Test 1: Check if SEO files exist
log('📁 Testing SEO File Structure:', 'blue');

test('robots.txt exists', fs.existsSync('public/robots.txt'));
test('sitemap.xml exists', fs.existsSync('public/sitemap.xml'));
test('.htaccess exists', fs.existsSync('public/.htaccess'));
test('SEOHead component exists', fs.existsSync('src/components/SEO/SEOHead.tsx'));
test('seoConfig exists', fs.existsSync('src/data/seoConfig.ts'));

console.log('');

// Test 2: Check robots.txt content
log('🤖 Testing robots.txt Content:', 'blue');

if (fs.existsSync('public/robots.txt')) {
  const robotsContent = fs.readFileSync('public/robots.txt', 'utf8');
  test('robots.txt contains User-agent', robotsContent.includes('User-agent: *'));
  test('robots.txt contains Sitemap', robotsContent.includes('Sitemap:'));
  test('robots.txt allows main directories', robotsContent.includes('Allow: /about'));
} else {
  failed += 3;
}

console.log('');

// Test 3: Check sitemap.xml content
log('🗺️  Testing sitemap.xml Content:', 'blue');

if (fs.existsSync('public/sitemap.xml')) {
  const sitemapContent = fs.readFileSync('public/sitemap.xml', 'utf8');
  test('sitemap.xml is valid XML', sitemapContent.includes('<?xml version="1.0"'));
  test('sitemap.xml contains homepage', sitemapContent.includes('https://techgiant.com/'));
  test('sitemap.xml contains about page', sitemapContent.includes('/about'));
  test('sitemap.xml contains services', sitemapContent.includes('/Development'));
} else {
  failed += 4;
}

console.log('');

// Test 4: Check index.html meta tags
log('📄 Testing HTML Meta Tags:', 'blue');

if (fs.existsSync('index.html')) {
  const htmlContent = fs.readFileSync('index.html', 'utf8');
  test('HTML contains optimized title', htmlContent.includes('Tech Giant - Leading IT Services'));
  test('HTML contains meta description', htmlContent.includes('meta name="description"'));
  test('HTML contains Open Graph tags', htmlContent.includes('property="og:title"'));
  test('HTML contains structured data', htmlContent.includes('"@type": "Organization"'));
  test('HTML contains keywords meta', htmlContent.includes('meta name="keywords"'));
} else {
  failed += 5;
}

console.log('');

// Test 5: Check package.json SEO scripts
log('📦 Testing Package.json Scripts:', 'blue');

if (fs.existsSync('package.json')) {
  const packageContent = fs.readFileSync('package.json', 'utf8');
  const packageJson = JSON.parse(packageContent);
  test('SEO copy script exists', packageJson.scripts && packageJson.scripts['seo:copy']);
  test('Production build includes SEO', packageJson.scripts && packageJson.scripts['build:prod']);
} else {
  failed += 2;
}

console.log('');

// Test 6: Check React components
log('⚛️  Testing React SEO Components:', 'blue');

if (fs.existsSync('src/App.tsx')) {
  const appContent = fs.readFileSync('src/App.tsx', 'utf8');
  test('App.tsx imports SEOHead', appContent.includes('SEOHead'));
  test('App.tsx imports seoConfig', appContent.includes('seoConfig'));
} else {
  failed += 2;
}

if (fs.existsSync('src/components/Home/homePage.tsx')) {
  const homeContent = fs.readFileSync('src/components/Home/homePage.tsx', 'utf8');
  test('Homepage includes SEO content', homeContent.includes('SEOHomePageContent'));
} else {
  failed += 1;
}

console.log('');

// Summary
log('📊 SEO Testing Summary:', 'yellow');
log(`✅ Passed: ${passed}`, 'green');
log(`❌ Failed: ${failed}`, 'red');

const score = Math.round((passed / (passed + failed)) * 100);
log(`📈 SEO Score: ${score}%`, score >= 90 ? 'green' : score >= 70 ? 'yellow' : 'red');

console.log('');

if (score >= 90) {
  log('🎉 Excellent! Your SEO implementation is ready for production!', 'green');
} else if (score >= 70) {
  log('⚠️  Good progress! Fix the failed tests before deploying.', 'yellow');
} else {
  log('🚨 Issues detected! Please review and fix the failed tests.', 'red');
}

console.log('');
log('📚 For detailed testing instructions, see: SEO_TESTING_GUIDE.md', 'blue');
log('🚀 Deploy and test with online tools for complete validation!', 'blue');

process.exit(failed > 0 ? 1 : 0);
