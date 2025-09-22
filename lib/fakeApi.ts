import { Company, Post } from "./types";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// seed 데이터
const SEED_COMPANIES: Company[] = [
  {
    id: "c1",
    name: "GreenFoods",
    country: "KR",
    monthlyEmissions: [
      { yearMonth: "2025-01", source: "electricity", emissions: 1200 },
      { yearMonth: "2025-02", source: "electricity", emissions: 1100 },
      { yearMonth: "2025-03", source: "electricity", emissions: 1300 },
    ],
  },
  {
    id: "c2",
    name: "EcoWare",
    country: "US",
    monthlyEmissions: [
      { yearMonth: "2025-01", source: "fuel", emissions: 3000 },
      { yearMonth: "2025-02", source: "fuel", emissions: 2800 },
      { yearMonth: "2025-03", source: "fuel", emissions: 2900 },
    ],
  },
];

let POSTS: Post[] = [
  { id: "p1", title: "Intro", resourceUid: "c1", dateTime: new Date().toISOString(), content: "첫 메모" },
];

export async function fetchCompanies(): Promise<Company[]> {
  await sleep(400 + Math.random() * 600);
  if (Math.random() < 0.05) throw new Error("Network error while fetching companies");
  return JSON.parse(JSON.stringify(SEED_COMPANIES));
}

export async function fetchCompanyById(id: string): Promise<Company> {
  await sleep(300 + Math.random() * 400);
  const found = SEED_COMPANIES.find((c) => c.id === id);
  if (!found) throw new Error("Company not found");
  return JSON.parse(JSON.stringify(found));
}

export async function fetchPosts(): Promise<Post[]> {
  await sleep(200 + Math.random() * 300);
  return JSON.parse(JSON.stringify(POSTS));
}

// 20% 확률로 저장 실패 → 에러 핸들링 UX 필요
export async function createOrUpdatePost(post: Partial<Post>) {
  await sleep(500 + Math.random() * 800);
  if (Math.random() < 0.2) {
    throw new Error("Failed to save post (simulated)");
  }
  if (!post.id) {
    const id = "p" + ((Math.random() * 100000) | 0);
    const newPost: Post = {
      id,
      title: post.title || "Untitled",
      resourceUid: post.resourceUid!,
      dateTime: new Date().toISOString(),
      content: post.content || "",
    };
    POSTS.push(newPost);
    return newPost;
  } else {
    POSTS = POSTS.map((p) =>
      p.id === post.id
        ? { ...p, title: post.title || p.title, content: post.content || p.content, dateTime: new Date().toISOString() }
        : p
    );
    return POSTS.find((p) => p.id === post.id);
  }
}
