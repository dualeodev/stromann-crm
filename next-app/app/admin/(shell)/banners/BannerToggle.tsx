"use client";

import { useState, useTransition } from "react";
import { toggleBannerAction } from "./actions";

export function BannerToggle({
  id,
  initialEnabled,
}: {
  id: string;
  initialEnabled: boolean;
}) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    if (pending) return;
    const next = !enabled;
    setEnabled(next);
    const fd = new FormData();
    fd.set("id", id);
    fd.set("next", String(next));
    startTransition(async () => {
      try {
        await toggleBannerAction(fd);
      } catch {
        setEnabled(!next);
      }
    });
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={enabled ? "Tắt banner" : "Bật banner"}
      onClick={handleClick}
      disabled={pending}
      className={`toggle ${enabled ? "on" : ""}`}
      style={{ opacity: pending ? 0.6 : 1 }}
    />
  );
}
