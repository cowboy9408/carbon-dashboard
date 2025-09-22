"use client";

import { useEffect, useState } from "react";
import { fetchCompanies } from "@/lib/fakeApi";
import { useDashboardStore } from "@/stores/useDashboardStore";
import NavigationDrawer from "../components/NavigationDrawer";
import EmissionsChart from "../components/EmissionsChart";
import PostEditor from "../components/PostEditor";

export default function Page() {
  const companies = useDashboardStore((s) => s.companies);
  const setCompanies = useDashboardStore((s) => s.setCompanies);
  const selectedCompanyId = useDashboardStore((s) => s.selectedCompanyId);
  const selectCompany = useDashboardStore((s) => s.selectCompany);

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchCompanies();
        setCompanies(data);
        if (data.length > 0) selectCompany(data[0].id);
      } catch (e: any) {
        setErr(e.message || "에러 발생");
      } finally {
        setLoading(false);
      }
    })();
  }, [setCompanies, selectCompany]);

  if (loading) return <div className="p-4 animate-pulse">⏳ 데이터를 불러오는 중...</div>;
  if (err) return <div className="p-4 text-red-600">❌ 에러: {err}</div>;

  const company = companies?.find((c) => c.id === selectedCompanyId);

  return (
    <div className="flex gap-6">
      {/* Drawer */}
      <div className="w-[260px] hidden md:block">
        <NavigationDrawer
          companies={companies || []}
          selectedId={selectedCompanyId}
          onSelect={(id) => selectCompany(id)}
        />
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex-1">
        {company ? (
          <>
            <h1 className="text-2xl font-semibold mb-4">{company.name}</h1>
            <div className="bg-white p-5 rounded-xl shadow-sm mb-6">
              <h4 className="text-sm text-gray-600 mb-3">📊 Monthly Emissions</h4>
              <EmissionsChart data={company.monthlyEmissions} />
            </div>

            <PostEditor companyId={company.id} />
          </>
        ) : (
          <p>👈 회사를 선택하세요</p>
        )}
      </div>
    </div>
  );
}
