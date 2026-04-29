"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Upload, X } from "lucide-react";

export function ProductMainImagePicker({
  name,
  currentUrl,
}: {
  name: string;
  currentUrl: string | null;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (preview) URL.revokeObjectURL(preview);
    if (!file) {
      setPreview(null);
      setFileName(null);
      return;
    }
    setPreview(URL.createObjectURL(file));
    setFileName(file.name);
  };

  const onClear = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFileName(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const openPicker = () => inputRef.current?.click();
  const shownUrl = preview ?? currentUrl;
  const ctaLabel = currentUrl || preview ? "Đổi ảnh" : "Chọn ảnh chính";

  return (
    <div className="field">
      <label>Ảnh chính (1:1)</label>
      <div
        role="button"
        tabIndex={0}
        onClick={openPicker}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openPicker();
          }
        }}
        className="group block w-full rounded-lg relative overflow-hidden cursor-pointer border border-n-200"
        style={{
          aspectRatio: "1",
          background: shownUrl
            ? `url(${shownUrl}) center/cover no-repeat`
            : "repeating-linear-gradient(45deg, #FFE4E6 0 8px, #fff 8px 16px)",
        }}
        aria-label={ctaLabel}
      >
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors flex items-center justify-center pointer-events-none">
          {!shownUrl ? (
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-n-900 font-semibold text-xs shadow-lg">
              <Upload size={14} strokeWidth={2} />
              Tải ảnh lên
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-n-900 font-semibold text-xs shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera size={14} strokeWidth={2} />
              Đổi ảnh
            </span>
          )}
        </div>
        {preview && (
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 text-white rounded text-[10px] truncate max-w-[90%]">
            {fileName}
          </div>
        )}
        {preview && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
            className="absolute top-2 right-2 p-1 rounded-full bg-white text-n-700 shadow-md hover:bg-n-50"
            aria-label="Hủy"
          >
            <X size={12} />
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        name={name}
        accept="image/*"
        onChange={onFileChange}
        className="hidden"
      />
    </div>
  );
}
