import { NextRequest, NextResponse } from 'next/server';

const manifestJson = {
  "name": "WORK.FUN",
  "description": "Earn WORK tokens by doing simple social actions like liking, following, and reposting.",
  "version": "1",
  "icon_url": "https://work-fun.vercel.app/images/work-logo.png",
  "image": "https://work-fun.vercel.app/images/work-logo.png",
  "app_url": "https://work-fun.vercel.app",
  "success_url": "https://work-fun.vercel.app",
  "error_url": "https://work-fun.vercel.app/error",
  "domains": ["work-fun.vercel.app"],
  "supported_chains": ["eip155:1", "eip155:8453"],
  "token_gate": false,
  "account_association": {
    "header": "eyJmaWQiOjEzNTQyNDksInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhiOWJkZjNFNUE0RkNEQjA2N2Q3RDU1MjY0ZGM1NEE2MUJhMDc0RDIzIn0",
    "payload": "eyJkb21haW4iOiJ3b3JrLWZ1bi52ZXJjZWwuYXBwIn0",
    "signature": "MHhmOWIxMDQ4NTA0YmYwYzY1NjVhNGIxYmQ4MTQwN2VjYWU4N2RlYWZhYTEyMWY3MDA2ZDg4Y2Y1MjU5NGYzMDAwN2NmMDhhOWI4MGFhYTg1OTI3ODA5YWQxMjdkODE2ZGI0YzQ5MGMxMmU2ZGVlZTQ3YzU0MmVkNTg1MzBkNmFlYjFi"
  }
};

export async function GET(req: NextRequest) {
  return NextResponse.json(manifestJson);
}