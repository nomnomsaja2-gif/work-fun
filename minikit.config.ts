const ROOT_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

export const minikitConfig = {
  miniapp: {
    version: "1",
    name: "WORK.FUN", 
    subtitle: "Earn WORK by doing social actions", 
    description: "Earn WORK tokens by doing simple social actions like liking, following, and reposting.",
    screenshotUrls: [`${ROOT_URL}/images/work-screenshot.png`],
    iconUrl: `${ROOT_URL}/images/work-logo.png`,
    splashImageUrl: `${ROOT_URL}/images/work-logo.png`,
    splashBackgroundColor: "#000000",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "social",
    tags: ["social", "earn", "work", "tokens"],
    heroImageUrl: `${ROOT_URL}/images/work-logo.png`, 
    tagline: "Earn tokens for social interactions",
    ogTitle: "WORK.FUN - Earn tokens for social interactions",
    ogDescription: "Earn WORK tokens by doing simple social actions like liking, following, and reposting.",
    ogImageUrl: `${ROOT_URL}/images/work-logo.png`,
  },
} as const;