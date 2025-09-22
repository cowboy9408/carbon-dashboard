"use client";
import React from "react";
import { Company } from "@/lib/types";
import { Building2 } from "lucide-react";

type Props = {
  companies: Company[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export default function NavigationDrawer({ companies, selectedId, onSelect }: Props) {
  return (
    <div className="p-4">
      <div className="mb-3 text-sm font-medium text-gray-700">Companies</div>
      <ul className="space-y-2">
        {companies.map((c) => (
          <li key={c.id}>
            <button
              onClick={() => onSelect(c.id)}
              className={`flex items-center gap-2 w-full text-left p-3 rounded-lg transition ${
                selectedId === c.id
                  ? "bg-green-50 border-l-4 border-green-500 shadow-sm"
                  : "hover:bg-gray-50"
              }`}
            >
              <Building2 size={16} className="text-green-600" />
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="text-xs text-gray-500">{c.country}</div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
