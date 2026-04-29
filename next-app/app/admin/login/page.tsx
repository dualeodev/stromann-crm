import { loginAction } from "./actions";

const ERRORS: Record<string, string> = {
  missing: "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.",
  invalid: "Tên đăng nhập hoặc mật khẩu không đúng.",
  no_profile: "Tài khoản chưa được cấp quyền quản trị.",
};

export const metadata = { title: "Đăng nhập — Stromann Admin" };

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string; next?: string };
}) {
  const errorMsg = searchParams.error ? ERRORS[searchParams.error] : null;

  return (
    <div className="min-h-screen grid place-items-center" style={{ background: "#F5F6F8" }}>
      <form
        action={loginAction}
        className="w-full max-w-[400px] bg-white rounded-r-12 p-8 shadow-card-md"
        style={{ boxShadow: "var(--shadow-card-md)" }}
      >
        <div className="mb-6">
          <div className="text-2xl font-bold text-n-900">Stromann Admin</div>
          <div className="text-sm text-n-500 mt-1">Đăng nhập để quản trị nội dung.</div>
        </div>

        {errorMsg && (
          <div
            className="mb-4 px-3 py-2 rounded-r-8 text-sm"
            style={{ background: "#FEE", color: "#B00020", border: "1px solid #FBB" }}
          >
            {errorMsg}
          </div>
        )}

        <input type="hidden" name="next" value={searchParams.next ?? "/admin"} />

        <label className="block mb-3">
          <div className="text-xs font-semibold text-n-700 mb-1.5">Tên đăng nhập</div>
          <input
            name="username"
            type="text"
            autoComplete="username"
            required
            className="input input--lg"
            placeholder="vd: vana"
          />
        </label>

        <label className="block mb-5">
          <div className="text-xs font-semibold text-n-700 mb-1.5">Mật khẩu</div>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="input input--lg"
            placeholder="••••••••"
          />
        </label>

        <button
          type="submit"
          className="w-full h-12 rounded-r-8 font-semibold text-white"
          style={{ background: "var(--accent)" }}
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
