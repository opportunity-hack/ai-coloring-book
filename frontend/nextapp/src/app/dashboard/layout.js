import RequireAdmin from "@/components/auth/RequireAdmin";

export const metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }) {
  return <RequireAdmin>{children}</RequireAdmin>;
}
