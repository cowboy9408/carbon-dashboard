"use client";
import React, { useState } from "react";
import { createOrUpdatePost } from "@/lib/fakeApi";

export default function PostEditor({ companyId }: { companyId: string }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSave = async () => {
    if (!title || !content) return setMessage({ type: "error", text: "제목과 내용을 입력하세요." });
    setLoading(true);
    setMessage(null);
    try {
      await createOrUpdatePost({ title, content, resourceUid: companyId });
      setMessage({ type: "success", text: "✅ 저장되었습니다." });
      setTitle("");
      setContent("");
    } catch (e: any) {
      setMessage({ type: "error", text: e.message || "❌ 저장 실패" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <h4 className="font-medium mb-3">📝 메모 추가</h4>
      <input
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 mb-3 rounded focus:ring focus:ring-green-200"
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-2 mb-3 rounded focus:ring focus:ring-green-200"
        rows={4}
      />
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "저장중..." : "저장"}
        </button>
        <button
          onClick={() => {
            setTitle("");
            setContent("");
          }}
          className="px-4 py-2 border rounded hover:bg-gray-50"
        >
          취소
        </button>
      </div>
      {message && (
        <div className={`mt-3 text-sm ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}
