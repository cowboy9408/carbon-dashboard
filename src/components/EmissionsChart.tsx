import React, { useState } from "react";
import { Emission } from "@/lib/types";

type Props = {
  data: Emission[];
  width?: number;
  height?: number;
};

export default function EmissionsChart({ data, width = 600, height = 200 }: Props) {
  if (!data || data.length === 0) return <div className="text-sm">데이터 없음</div>;

  const values = data.map((d) => d.emissions);
  const max = Math.max(...values) * 1.1;
  const min = 0;
  const xStep = width / Math.max(1, data.length - 1);

  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height}>
      {/* 그리드 */}
      {[0, 0.25, 0.5, 0.75, 1].map((t, idx) => (
        <line key={idx} x1={0} x2={width} y1={height * t} y2={height * t} stroke="#e5e7eb" strokeWidth={1} />
      ))}

      {/* 라인 */}
      <polyline
        points={data
          .map((d, i) => {
            const x = i * xStep;
            const y = height - ((d.emissions - min) / (max - min)) * height;
            return `${x},${y}`;
          })
          .join(" ")}
        fill="none"
        stroke="#16a34a"
        strokeWidth={2}
      />

      {/* 포인트 */}
      {data.map((d, i) => {
        const x = i * xStep;
        const y = height - ((d.emissions - min) / (max - min)) * height;
        return (
          <g key={i}>
            <circle
              cx={x}
              cy={y}
              r={4}
              fill={hoverIdx === i ? "#15803d" : "#16a34a"}
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(null)}
            />
            {hoverIdx === i && (
              <text x={x + 6} y={y - 6} className="text-xs fill-gray-700">
                {d.yearMonth}: {d.emissions}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
