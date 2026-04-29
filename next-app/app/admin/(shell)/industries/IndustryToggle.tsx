"use client";

import { useState, useTransition } from "react";
import { Toggle } from "@/components/admin/atoms/Toggle";
import { toggleIndustryAction } from "./actions";

export function IndustryToggle({ id, initialEnabled }: { id: string; initialEnabled: boolean }) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [, start] = useTransition();
  return (
    <Toggle
      on={enabled}
      onChange={(next) => {
        setEnabled(next);
        const fd = new FormData();
        fd.set("id", id);
        fd.set("next", next ? "on" : "off");
        start(() => {
          void toggleIndustryAction(fd);
        });
      }}
    />
  );
}
