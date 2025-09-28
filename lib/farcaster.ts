const WARPCAST_API_BASE = 'https://api.farcaster.xyz/v2';

export interface FarcasterCast {
  hash: string;
  threadHash: string;
  parentHash: string | null;
  parentUrl: string | null;
  author: {
    fid: number;
    username: string;
    displayName: string;
    pfp: {
      url: string;
    };
    profile: {
      bio: {
        text: string;
      };
    };
    followerCount: number;
    followingCount: number;
  };
  text: string;
  timestamp: number;
  reactions: {
    count: number;
  };
  replies: {
    count: number;
  };
  recasts: {
    count: number;
  };
  watches: {
    count: number;
  };
}

export interface FarcasterResponse {
  result: {
    casts: FarcasterCast[];
  };
  next?: {
    cursor: string;
  };
}

export async function getFarcasterCasts(fid: string): Promise<FarcasterResponse> {
  const response = await fetch(`${WARPCAST_API_BASE}/casts?query=from:${fid}`, {
    headers: {
      'Accept': 'application/json',
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`Warpcast API error: ${response.statusText}`);
  }

  return response.json();
}

export async function getFarcasterProfile(fid: string) {
  const response = await fetch(`${WARPCAST_API_BASE}/user-by-fid?fid=${fid}`, {
    headers: {
      'Accept': 'application/json',
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`Warpcast API error: ${response.statusText}`);
  }

  return response.json();
}