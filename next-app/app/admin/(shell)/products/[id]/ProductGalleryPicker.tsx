"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, X } from "lucide-react";

interface ExistingItem {
  path: string;
  url: string;
}

interface NewItem {
  file: File;
  preview: string;
}

export function ProductGalleryPicker({
  newName,
  removeName,
  existing,
}: {
  newName: string;
  removeName: string;
  existing: ExistingItem[];
}) {
  const [keep, setKeep] = useState<ExistingItem[]>(existing);
  const [removed, setRemoved] = useState<string[]>([]);
  const [newItems, setNewItems] = useState<NewItem[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      newItems.forEach((it) => URL.revokeObjectURL(it.preview));
    };
  }, [newItems]);

  const onAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setNewItems((prev) => [
      ...prev,
      ...files.map((file) => ({ file, preview: URL.createObjectURL(file) })),
    ]);
  };

  const removeExisting = (path: string) => {
    setKeep((prev) => prev.filter((it) => it.path !== path));
    setRemoved((prev) => [...prev, path]);
  };

  const removeNew = (idx: number) => {
    setNewItems((prev) => {
      const it = prev[idx];
      if (it) URL.revokeObjectURL(it.preview);
      return prev.filter((_, i) => i !== idx);
    });
  };

  return (
    <div className="field">
      <label>Ảnh phụ (gallery)</label>
      {removed.map((path) => (
        <input key={path} type="hidden" name={removeName} value={path} />
      ))}
      <div className="grid grid-cols-3 gap-1.5">
        {keep.map((it) => (
          <div
            key={it.path}
            className="relative bg-n-50 rounded-md overflow-hidden border border-n-200"
            style={{ aspectRatio: "1", background: `url(${it.url}) center/cover no-repeat` }}
          >
            <button
              type="button"
              onClick={() => removeExisting(it.path)}
              className="absolute top-1 right-1 p-0.5 rounded-full bg-white text-n-700 shadow"
              aria-label="Xóa"
            >
              <X size={12} />
            </button>
          </div>
        ))}
        {newItems.map((it, i) => (
          <div
            key={`new-${i}`}
            className="relative bg-n-50 rounded-md overflow-hidden border border-brand-300"
            style={{ aspectRatio: "1", background: `url(${it.preview}) center/cover no-repeat` }}
          >
            <button
              type="button"
              onClick={() => removeNew(i)}
              className="absolute top-1 right-1 p-0.5 rounded-full bg-white text-n-700 shadow"
              aria-label="Hủy"
            >
              <X size={12} />
            </button>
            <div className="absolute bottom-0 inset-x-0 bg-black/55 text-white text-[10px] py-0.5 text-center">
              Mới
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="bg-n-50 rounded-md border border-dashed border-n-300 flex items-center justify-center text-n-500 text-xs hover:border-accent hover:text-accent"
          style={{ aspectRatio: "1" }}
          aria-label="Thêm ảnh"
        >
          <Plus size={18} />
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        name={newName}
        accept="image/*"
        multiple
        onChange={onAdd}
        className="hidden"
      />
      <div className="text-[11px] text-n-500 mt-1.5">
        Bấm + để thêm. Bấm × để xóa khỏi gallery.
      </div>
    </div>
  );
}
