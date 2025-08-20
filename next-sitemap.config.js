/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.gkeliteinfo.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  outDir: "./public",     // where sitemap is written
  sourceDir: ".next",     // tell it where Next.js build output is
};
