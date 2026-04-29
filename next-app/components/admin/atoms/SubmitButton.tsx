"use client";

import { useFormStatus } from "react-dom";
import { Save } from "lucide-react";
import { Button, type ButtonProps } from "./Button";

type SubmitButtonProps = Omit<ButtonProps, "loading" | "icon" | "type">;

export function SubmitButton(props: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      {...props}
      type="submit"
      icon={Save}
      loading={pending}
      disabled={pending || props.disabled}
      style={{
        backgroundColor: "#E11D2C",
        color: "#fff",
        padding: "9px 16px",
        borderRadius: "8px",
        fontWeight: 600,
        fontSize: 13,
        ...(props.style ?? {}),
      }}
    />
  );
}
