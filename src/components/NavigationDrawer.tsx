"use client";
import React from "react";
import { Company } from "@/lib/types";

type Props = {
  companies: Company[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export default function NavigationDrawer({ companies, selectedId, onSelect }: Props) {
  return (
    <div>
      <div className="mb-3 text-sm text-gray-500">Companies</div>
      <ul className="space-y-2">
        {companies.map((c) => (
          <li key={c.id}>
            <button
              onClick={() => onSelect(c.id)}
              className={`w-full text-left p-2 rounded ${
                selectedId === c.id
                  ? "bg-green-50 border-l-4 border-green-500"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="font-medium">{c.name}</div>
              <div className="text-xs text-gray-500">{c.country}</div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
