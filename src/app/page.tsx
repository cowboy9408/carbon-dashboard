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

  if (loading) return <div className="p-4">로딩중...</div>;
  if (err) return <div className="p-4 text-red-600">에러: {err}</div>;

  const company = companies?.find((c) => c.id === selectedCompanyId);

  return (
  <div className="flex gap-6">
    <div className="w-[280px]">
      <NavigationDrawer
        companies={companies || []}
        selectedId={selectedCompanyId}
        onSelect={(id) => selectCompany(id)}
      />
    </div>
    <div className="flex-1">
      {company ? (
        <>
          <h1 className="text-xl font-bold mb-2">{company.name}</h1>
          <div className="bg-white p-4 rounded shadow">
            <h4 className="text-sm text-gray-600 mb-2">Monthly Emissions</h4>
            <EmissionsChart data={company.monthlyEmissions} />
          </div>

          {/* 메모 작성기 */}
          <PostEditor companyId={company.id} />
        </>
      ) : (
        <p>회사를 선택하세요</p>
      )}
    </div>
  </div>
);
}
