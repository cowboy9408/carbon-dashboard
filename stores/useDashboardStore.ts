// stores/useDashboardStore.ts
import { create } from "zustand";
import { Company, Post } from "@/lib/types";

type State = {
  companies: Company[] | null;
  posts: Post[] | null;
  selectedCompanyId: string | null;
  setCompanies: (c: Company[]) => void;
  setPosts: (p: Post[]) => void;
  selectCompany: (id: string | null) => void;
};

export const useDashboardStore = create<State>((set) => ({
  companies: null,
  posts: null,
  selectedCompanyId: null,
  setCompanies: (c) => set({ companies: c }),
  setPosts: (p) => set({ posts: p }),
  selectCompany: (id) => set({ selectedCompanyId: id }),
}));
