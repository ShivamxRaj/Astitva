const fs = require('fs');
const path = require('path');
const axios = require('axios');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

async function prerender() {
  console.log('🚀 Starting Avyakta Post-Build SEO & AEO Pre-renderer...');

  const buildDir = path.join(__dirname, 'build');
  const indexHtmlPath = path.join(buildDir, 'index.html');

  if (!fs.existsSync(indexHtmlPath)) {
    console.error('❌ build/index.html not found! Run npm run build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  // 1. Fetch cases from Supabase REST API
  let cases = [];
  try {
    const res = await axios.get(`${supabaseUrl}/rest/v1/orphan_cases?select=*`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });
    cases = res.data || [];
    console.log(`✅ Successfully fetched ${cases.length} cases from Supabase.`);
  } catch (err) {
    console.error('⚠️ Failed to fetch cases from Supabase. Falling back to empty array.', err.message);
  }

  // 2. Generate static HTML files with 100% unique title tags and meta descriptions for each case
  for (const item of cases) {
    const rawCaseId = item.case_id || 'UNKNOWN';
    const caseId = rawCaseId.replace('#', '');
    const location = item.location || 'Punjab, India';
    const dateStr = item.date_of_sighting ? new Date(item.date_of_sighting).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent Date';
    const desc = item.description || '';
    const photoUrl = item.photo_url || '';

    // Clean description snippet for unique meta description
    const cleanDesc = desc.replace(/[\r\n\t]+/g, ' ').trim();
    const shortDesc = cleanDesc.length > 140 ? cleanDesc.slice(0, 137) + '...' : (cleanDesc || 'View physical traits, location, and sighting notes on Avyakta missing portal.');

    const pageTitle = `Unidentified Case #${caseId} (${location}) - Avyakta Portal`;
    const pageMetaDesc = `Case report #${caseId} sighted on ${dateStr} at ${location}. Physical characteristics: ${shortDesc} Contact helpline +91 62994 46452 to assist identification.`;

    let prerenderedHtml = baseHtml;

    // Replace Title Tag
    prerenderedHtml = prerenderedHtml.replace(
      /<title>.*?<\/title>/i,
      `<title>${pageTitle}</title>`
    );

    // Inject unique Open Graph & Meta tags
    const ogTags = `
    <meta name="description" content="${pageMetaDesc}">
    <meta name="keywords" content="case #${caseId}, unclaimed body ${location}, missing person ${location}, avyakta case report">
    <meta property="og:title" content="${pageTitle}">
    <meta property="og:description" content="${pageMetaDesc}">
    <meta property="og:url" content="https://www.avaykta.app/case/${caseId}">
    ${photoUrl ? `<meta property="og:image" content="${photoUrl}">` : ''}
    <meta property="og:type" content="article">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${pageTitle}">
    <meta name="twitter:description" content="${pageMetaDesc}">
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "${pageTitle}",
      "description": "${pageMetaDesc}",
      "url": "https://www.avaykta.app/case/${caseId}",
      "publisher": { "@type": "Organization", "name": "Avyakta Foundation", "url": "https://www.avaykta.app" }
    }
    </script>
    `;

    prerenderedHtml = prerenderedHtml.replace('</head>', `${ogTags}\n</head>`);

    // Inject crawler-readable noscript body content before <div id="root">
    const noscriptContent = `
    <noscript>
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 40px auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #fcfbf9; color: #1a202c; line-height: 1.6;">
        <h1 style="color: #1b3a6b; font-size: 24px; border-bottom: 2px solid #edf2f7; padding-bottom: 12px; margin-bottom: 20px;">
          Unidentified Sighting Case Report #${caseId}
        </h1>
        <p><strong>Case Report ID:</strong> <code>${rawCaseId}</code></p>
        <p><strong>📍 Sighting Location:</strong> ${location}</p>
        <p><strong>📅 Sighting Date:</strong> ${dateStr}</p>
        
        <h2 style="color: #1b3a6b; font-size: 18px; margin-top: 24px; margin-bottom: 10px;">Physical Characteristics & Marks</h2>
        <div style="background: #ffffff; border: 1.5px solid #cbd5e0; border-radius: 8px; padding: 16px; white-space: pre-wrap; font-size: 15px;">
          ${desc}
        </div>
        
        ${item.additional_info ? `<p><strong>📄 Additional Notes:</strong> ${item.additional_info}</p>` : ''}
        ${photoUrl ? `<p><strong>📸 Case Photograph:</strong> <a href="${photoUrl}">${photoUrl}</a></p>` : ''}
        
        <div style="margin-top: 30px; padding: 16px; background-color: #f0f7ff; border: 1px solid #blue-100; border-radius: 8px; font-size: 14px;">
          <strong>Do you recognize this person?</strong> Call the Avyakta Helpline (+91 62994 46452) or contact local coordination officers immediately.
        </div>
      </div>
    </noscript>
    `;

    prerenderedHtml = prerenderedHtml.replace('<div id="root">', `${noscriptContent}\n<div id="root">`);

    // Write to folder: build/case/${caseId}/index.html
    const caseFolder = path.join(buildDir, 'case', caseId);
    fs.mkdirSync(caseFolder, { recursive: true });
    fs.writeFileSync(path.join(caseFolder, 'index.html'), prerenderedHtml, 'utf8');
  }

  console.log(`✅ Pre-rendered ${cases.length} case pages successfully with unique titles & meta descriptions.`);

  // 3. Generate dynamic sitemap.xml in build directory
  const sitemapInputPath = path.join(buildDir, 'sitemap.xml');
  let sitemapContent = '';
  if (fs.existsSync(sitemapInputPath)) {
    sitemapContent = fs.readFileSync(sitemapInputPath, 'utf8');
  } else {
    sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.avaykta.app/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
  }

  const today = new Date().toISOString().split('T')[0];
  const urlNodes = cases.map(c => `  <url>
    <loc>https://www.avaykta.app/case/${c.case_id.replace('#', '')}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n');

  const finalSitemap = sitemapContent.replace('</urlset>', `${urlNodes}\n</urlset>`);
  fs.writeFileSync(sitemapInputPath, finalSitemap, 'utf8');
  console.log(`✅ Dynamic sitemap.xml generated with ${cases.length} case links.`);
  console.log('🎉 SEO & AEO Pre-rendering complete!');
}

prerender();
