import React from "react";
import { Emission } from "@/lib/types";

type Props = {
  data: Emission[];
  width?: number;
  height?: number;
};

export default function EmissionsChart({ data, width = 600, height = 160 }: Props) {
  if (!data || data.length === 0) return <div className="text-sm">데이터 없음</div>;

  const values = data.map((d) => d.emissions);
  const max = Math.max(...values) * 1.1;
  const min = 0;
  const xStep = width / Math.max(1, data.length - 1);

  const points = data
    .map((d, i) => {
      const x = i * xStep;
      const y = height - ((d.emissions - min) / (max - min)) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height}>
      {/* 그리드 라인 */}
      {[0, 0.25, 0.5, 0.75, 1].map((t, idx) => (
        <line
          key={idx}
          x1={0}
          x2={width}
          y1={height * t}
          y2={height * t}
          stroke="#e6e6e6"
          strokeWidth={1}
        />
      ))}
      {/* 선 */}
      <polyline
        points={points}
        fill="none"
        stroke="#16a34a"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 점 */}
      {data.map((d, i) => {
        const x = i * xStep;
        const y = height - ((d.emissions - min) / (max - min)) * height;
        return <circle key={i} cx={x} cy={y} r={3} fill="#16a34a" />;
      })}
    </svg>
  );
}
