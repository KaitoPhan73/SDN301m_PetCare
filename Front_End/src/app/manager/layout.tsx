import Header from "@/page/layout/Manager/Header";

export default function ManagerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
}
