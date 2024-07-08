import SilderBar from "@/page/layout/App";


export default function ManagerLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            <SilderBar role={"manager"}>{children}</SilderBar>
        </div>
    );
}
