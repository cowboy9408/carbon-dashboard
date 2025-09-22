"use client";
import React, { useState } from "react";
import { createOrUpdatePost } from "@/lib/fakeApi";

export default function PostEditor({ companyId }: { companyId: string }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await createOrUpdatePost({ title, content, resourceUid: companyId });
      setSuccess("저장되었습니다.");
      setTitle("");
      setContent("");
    } catch (e: any) {
      setError(e.message || "저장 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h4 className="font-medium mb-2">메모 추가</h4>
      <input
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 mb-2 rounded"
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-2 mb-2 rounded"
        rows={4}
      />
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-3 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {loading ? "저장중..." : "저장"}
        </button>
        <button
          onClick={() => {
            setTitle("");
            setContent("");
          }}
          className="px-3 py-2 border rounded"
        >
          취소
        </button>
      </div>
      {error && (
        <div className="mt-2 text-red-600">
          {error}
          <button onClick={handleSave} className="underline ml-2">
            재시도
          </button>
        </div>
      )}
      {success && <div className="mt-2 text-green-600">{success}</div>}
    </div>
  );
}
