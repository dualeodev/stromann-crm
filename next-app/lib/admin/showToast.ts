export function showToast(msg: string): void {
  if (typeof document === "undefined") return;
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<span>✓</span><span>${msg}</span>`;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 300);
  }, 2200);
}
