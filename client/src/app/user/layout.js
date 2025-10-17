import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { navItems } from "./navItems";


export default function RootLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar items={navItems} />
      <main className="flex-1 flex flex-col">
        <Header />
        <section className="p-6">{children}</section>
      </main>
    </div>
  );
}
