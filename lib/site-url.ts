// Vercel sets VERCEL_PROJECT_PRODUCTION_URL (a domain without the protocol)
// in every environment, so previews also point at the production domain.
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000'
