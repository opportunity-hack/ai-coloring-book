import SiteHeader from "@/components/site-header/SiteHeader";
import SiteFooter from "@/components/site-footer/SiteFooter";

export default function SiteLayout({ children }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}
