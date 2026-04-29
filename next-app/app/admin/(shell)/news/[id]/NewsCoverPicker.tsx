"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Trash2, Upload, X } from "lucide-react";

export function NewsCoverPicker({
  name,
  currentUrl,
}: {
  name: string;
  currentUrl: string | null;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [removed, setRemoved] = useState(false);
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
    setRemoved(false);
  };

  const onCancelPreview = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFileName(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const onRemoveCurrent = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFileName(null);
    if (inputRef.current) inputRef.current.value = "";
    setRemoved(true);
  };

  const openPicker = () => inputRef.current?.click();
  const effectiveCurrent = removed ? null : currentUrl;
  const shownUrl = preview ?? effectiveCurrent;
  const ctaLabel = shownUrl ? "Đổi ảnh" : "Chọn ảnh bìa";

  return (
    <div className="field">
      <label>Ảnh bìa (16:9 khuyến nghị)</label>
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
          aspectRatio: "16/9",
          background: shownUrl
            ? `url(${shownUrl}) center/cover no-repeat`
            : "linear-gradient(135deg, #E11D2C, #931017)",
        }}
        aria-label={ctaLabel}
      >
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
            {preview ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onCancelPreview();
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-white text-n-700 text-xs font-semibold shadow-md hover:bg-n-50 transition cursor-pointer"
              >
                <X size={14} /> Hủy
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveCurrent();
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-white text-[#B00020] text-xs font-semibold shadow-md hover:bg-red-50 transition cursor-pointer"
              >
                <Trash2 size={14} /> Xóa ảnh
              </button>
            )}
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
      <input type="hidden" name="cover_remove" value={removed ? "1" : "0"} />

      <div className="flex flex-wrap items-center gap-2 mt-2">
        <button
          type="button"
          onClick={openPicker}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-n-300 bg-white text-n-800 text-xs font-semibold hover:bg-n-50 transition"
        >
          <Camera size={14} />
          {shownUrl ? "Đổi ảnh" : "Chọn ảnh"}
        </button>

        {preview && (
          <button
            type="button"
            onClick={onCancelPreview}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-n-300 bg-white text-n-700 text-xs font-semibold hover:bg-n-50 transition"
          >
            <X size={14} /> Hủy ảnh đã chọn
          </button>
        )}

        {!preview && (currentUrl && !removed) && (
          <button
            type="button"
            onClick={onRemoveCurrent}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#F3B5BD] bg-white text-[#B00020] text-xs font-semibold hover:bg-[#FFF1F1] transition"
          >
            <Trash2 size={14} /> Xóa ảnh bìa
          </button>
        )}

        {removed && (
          <button
            type="button"
            onClick={() => setRemoved(false)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-n-300 bg-white text-n-700 text-xs font-semibold hover:bg-n-50 transition"
          >
            Hoàn tác
          </button>
        )}
      </div>

      <div className="text-xs text-n-500 mt-1.5">
        {preview
          ? "Bấm \"Lưu thay đổi\" để tải lên ảnh mới."
          : removed
            ? "Ảnh bìa sẽ bị xóa sau khi bấm \"Lưu thay đổi\"."
            : currentUrl
              ? "Bấm \"Đổi ảnh\" để chọn ảnh khác, hoặc \"Xóa ảnh bìa\" để bỏ ảnh."
              : "Bấm \"Chọn ảnh\" để tải ảnh lên."}
      </div>
    </div>
  );
}
