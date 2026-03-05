import SideNav from "@/components/side-nav";
import { ComponentsNavbar } from "@/utils/constants";

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SideNav navBar={ComponentsNavbar}>
      <div className="max-w-7xl mx-auto w-full">{children}</div>
    </SideNav>
  );
}
