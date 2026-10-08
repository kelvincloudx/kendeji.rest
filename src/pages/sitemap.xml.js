import { articles } from '../data/articles';
import { siteConfig } from '../data/siteConfig';

export async function GET() {
  const pages = [
    {
      url: `${siteConfig.siteUrl}/`,
      lastmod: '2026-03-30',
      changefreq: 'weekly',
      priority: '1.0'
    },
    ...articles.map((article) => ({
      url: `${siteConfig.siteUrl}/articles/${article.slug}/`,
      lastmod: article.updateDate,
      changefreq: 'monthly',
      priority: '0.8'
    }))
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
}
