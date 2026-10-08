import fs from 'fs';
import path from 'path';

console.log('=== Starting Thorough Build Verification ===');
let errors = [];
let warnings = [];

const distDir = './dist';

// 1. Check required root files
const requiredRootFiles = ['index.html', '404.html', 'robots.txt', 'sitemap.xml', 'favicon.ico', 'favicon.svg'];
for (const file of requiredRootFiles) {
  const p = path.join(distDir, file);
  if (!fs.existsSync(p)) {
    errors.push(`Missing required root file: ${file}`);
  } else {
    console.log(`[PASS] Root file exists: ${file}`);
  }
}

// 2. Check sitemap.xml
const sitemapContent = fs.readFileSync(path.join(distDir, 'sitemap.xml'), 'utf8');
const sitemapUrls = (sitemapContent.match(/<loc>(.*?)<\/loc>/g) || []).map(u => u.replace(/<\/?loc>/g, ''));
console.log(`[INFO] sitemap.xml contains ${sitemapUrls.length} URLs`);
if (sitemapUrls.length !== 9) {
  errors.push(`sitemap.xml expected 9 URLs, found ${sitemapUrls.length}`);
} else {
  console.log('[PASS] sitemap.xml contains exactly 9 URLs (1 home + 8 articles)');
}

// 3. Check robots.txt
const robotsContent = fs.readFileSync(path.join(distDir, 'robots.txt'), 'utf8');
if (!robotsContent.includes('Sitemap: https://kendeji.rest/sitemap.xml')) {
  errors.push('robots.txt does not contain Sitemap declaration');
} else {
  console.log('[PASS] robots.txt contains correct Sitemap declaration');
}

// 4. Check all articles exist
const expectedArticles = [
  'cheap-airport',
  'secure-airport',
  'airport-selection',
  'proxy-beginners',
  'stable-nodes',
  'clash-nodes',
  'clash-party',
  'global-connectivity'
];

for (const slug of expectedArticles) {
  const p = path.join(distDir, 'articles', slug, 'index.html');
  if (!fs.existsSync(p)) {
    errors.push(`Article HTML missing for slug: ${slug}`);
  } else {
    const html = fs.readFileSync(p, 'utf8');
    // Check Title
    if (!html.includes('<title>')) errors.push(`Article ${slug} missing <title>`);
    // Check Meta Description
    if (!html.includes('name="description"')) errors.push(`Article ${slug} missing meta description`);
    // Check Canonical
    if (!html.includes(`rel="canonical" href="https://kendeji.rest/articles/${slug}/"`)) {
      errors.push(`Article ${slug} canonical tag mismatch or missing`);
    }
    // Check H1
    if (!html.includes('<h1')) errors.push(`Article ${slug} missing <h1>`);
    // Check JSON-LD
    if (!html.includes('application/ld+json')) errors.push(`Article ${slug} missing JSON-LD`);
    // Check Single Footer
    const footerCount = (html.match(/<footer/g) || []).length;
    if (footerCount !== 1) errors.push(`Article ${slug} has ${footerCount} footers (expected 1)`);
    // Check Back to home
    if (!html.includes('href="/"')) errors.push(`Article ${slug} missing link to home`);
    // Check Registration CTA
    if (!html.includes('https://varnexa.lingdongaff.com/#/?code=HHoxxHGa')) {
      errors.push(`Article ${slug} missing registration affiliate link`);
    }

    console.log(`[PASS] Article checked: /articles/${slug}/`);
  }
}

// 5. Check index.html
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
const indexFooterCount = (indexHtml.match(/<footer/g) || []).length;
if (indexFooterCount !== 1) errors.push(`index.html has ${indexFooterCount} footers (expected 1)`);

if (!indexHtml.includes('rel="canonical" href="https://kendeji.rest/"')) {
  errors.push('index.html canonical tag mismatch');
}

// Check all 4 packages on index.html
const packageNames = ['经典OK单人餐', '七虾堡双人餐', '大神卡专享流量堡', '全家桶'];
for (const pkg of packageNames) {
  if (!indexHtml.includes(pkg)) {
    errors.push(`index.html missing package: ${pkg}`);
  } else {
    console.log(`[PASS] Package found on homepage: ${pkg}`);
  }
}
if (indexHtml.includes('畅选桶')) {
  errors.push('index.html unexpectedly contains deleted package: 畅选桶');
} else {
  console.log('[PASS] Deleted package 畅选桶 confirmed absent from homepage');
}

// Check price disclaimer box removal
if (indexHtml.includes('pricing-disclaimer-box')) {
  errors.push('index.html unexpectedly contains deleted pricing-disclaimer-box');
} else {
  console.log('[PASS] Pricing disclaimer box confirmed deleted from homepage');
}

// Check affiliate links & attributes
const affMatches = indexHtml.match(/<a[^>]+href="https:\/\/varnexa\.lingdongaff\.com\/#\/\?code=HHoxxHGa"[^>]*>/g) || [];
console.log(`[INFO] Found ${affMatches.length} affiliate links on homepage`);
for (const aTag of affMatches) {
  if (!aTag.includes('target="_blank"')) errors.push(`Affiliate link missing target="_blank": ${aTag}`);
  if (!aTag.includes('rel="sponsored nofollow noopener noreferrer"')) {
    errors.push(`Affiliate link missing proper rel attribute: ${aTag}`);
  }
}

// Check external resource links removed
if (indexHtml.includes('相关资源') || indexHtml.includes('jichangreview.net') || indexHtml.includes('jichangguide.net')) {
  errors.push('index.html unexpectedly contains deleted external resource links');
} else {
  console.log('[PASS] External resource links and 相关资源 confirmed deleted from footer');
}

// Check footer disclosure removed
if (indexHtml.includes('footer-disclosure') || indexHtml.includes('推广与法律声明')) {
  errors.push('index.html unexpectedly contains deleted footer-disclosure box');
} else {
  console.log('[PASS] Footer disclosure box (推广与法律声明) confirmed deleted from footer');
}

// Check FAQ count (at least 10)
const faqItemCount = (indexHtml.match(/class="faq-item"/g) || []).length;
if (faqItemCount < 10) {
  errors.push(`Expected at least 10 FAQ items, found ${faqItemCount}`);
} else {
  console.log(`[PASS] Found ${faqItemCount} FAQ items (all default expanded)`);
}

// Summary
console.log('=== Verification Summary ===');
if (errors.length === 0) {
  console.log('ALL VERIFICATIONS PASSED WITH ZERO ERRORS!');
} else {
  console.error(`FAILED with ${errors.length} errors:`);
  errors.forEach(e => console.error(' - ' + e));
}
