"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Upload, X } from "lucide-react";

export function BannerImagePicker({
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
  const ctaLabel = currentUrl || preview ? "Đổi ảnh" : "Chọn ảnh";

  return (
    <div className="field">
      <label>Ảnh banner (1920×800)</label>
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
        className="group block w-full rounded-lg relative overflow-hidden cursor-pointer"
        style={{
          aspectRatio: "1920/800",
          background: shownUrl
            ? `url(${shownUrl}) center/cover no-repeat`
            : "linear-gradient(135deg, #E11D2C, #931017)",
        }}
        aria-label={ctaLabel}
      >
        {!shownUrl && (
          <div
            className="absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 20px, transparent 20px 40px)",
            }}
          />
        )}

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors flex items-center justify-center pointer-events-none">
          {!shownUrl ? (
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-n-900 font-semibold text-sm shadow-lg">
              <Upload size={16} strokeWidth={2} />
              Tải ảnh lên
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-n-900 font-semibold text-sm shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera size={16} strokeWidth={2} />
              Đổi ảnh
            </span>
          )}
        </div>

        {shownUrl && (
          <div className="absolute top-3 right-3 flex gap-2">
            {preview && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClear();
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-white text-n-700 text-xs font-semibold shadow-md hover:bg-n-50 transition cursor-pointer"
              >
                <X size={14} /> Hủy
              </button>
            )}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white text-n-900 text-xs font-semibold shadow-md">
              <Camera size={14} strokeWidth={2} />
              {ctaLabel}
            </span>
          </div>
        )}

        {preview && (
          <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 text-white rounded text-[11px]">
            Sẽ tải lên: {fileName}
          </div>
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
      <div className="text-xs text-n-500 mt-1.5">
        {preview
          ? "Bấm \"Lưu thay đổi\" ở trên để tải lên ảnh mới."
          : currentUrl
            ? "Bấm vào ảnh để đổi ảnh khác."
            : "Bấm vào khung để chọn ảnh tải lên."}
      </div>
    </div>
  );
}
