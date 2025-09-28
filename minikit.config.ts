const ROOT_URL = "https://work-fun.vercel.app";

type MiniKitConfig = {
  accountAssociation: {
    header: string;
    payload: string;
    signature: string;
  };
  frame: {
    version: string;
    name: string;
    homeUrl: string;
    iconUrl: string;
    splashImageUrl: string;
    splashBackgroundColor: string;
    webhookUrl: string;
    subtitle: string;
    description: string;
    screenshotUrls: string[];
    primaryCategory: string;
    tags: string[];
    heroImageUrl: string;
    tagline: string;
    ogTitle: string;
    ogDescription: string;
    ogImageUrl: string;
    noindex: boolean;
  };
};

export const minikitConfig: MiniKitConfig = {
  accountAssociation: {
    header: "eyJmaWQiOjEzNTQyNDksInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhiOWJkZjNFNUE0RkNEQjA2N2Q3RDU1MjY0ZGM1NEE2MUJhMDc0RDIzIn0",
    payload: "eyJkb21haW4iOiJ3b3JrLWZ1bi52ZXJjZWwuYXBwIn0",
    signature: "MHhmOWIxMDQ4NTA0YmYwYzY1NjVhNGIxYmQ4MTQwN2VjYWU4N2RlYWZhYTEyMWY3MDA2ZDg4Y2Y1MjU5NGYzMDAwN2NmMDhhOWI4MGFhYTg1OTI3ODA5YWQxMjdkODE2ZGI0YzQ5MGMxMmU2ZGVlZTQ3YzU0MmVkNTg1MzBkNmFlYjFi"
  },
  frame: {
    version: "1",
    name: "WORK.FUN",
    homeUrl: ROOT_URL,
    iconUrl: `${ROOT_URL}/images/work-logo.png`,
    splashImageUrl: `${ROOT_URL}/images/work-logo.png`,
    splashBackgroundColor: "#000000",
    webhookUrl: `${ROOT_URL}/api/webhook`,
    subtitle: "Earn WORK by doing social actions",
    description: "Earn WORK tokens by doing simple social actions like liking, following, and reposting.",
    screenshotUrls: [`${ROOT_URL}/images/work-logo.png`],
    primaryCategory: "social",
    tags: ["social", "earn", "work", "tokens"],
    heroImageUrl: `${ROOT_URL}/images/work-logo.png`,
    tagline: "Earn tokens for social interactions",
    ogTitle: "WORK.FUN - Earn tokens for social interactions",
    ogDescription: "Earn WORK tokens by doing simple social actions",
    ogImageUrl: `${ROOT_URL}/images/work-logo.png`,
    noindex: false
  }
};
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