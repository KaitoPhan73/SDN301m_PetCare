import SilderBar from "@/page/layout/App";


export default function AdminLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            <SilderBar role={"admin"}>{children}</SilderBar>
        </div>
    );
}
