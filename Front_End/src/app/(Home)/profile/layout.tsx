import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./components/sidebar-nav";

const sidebarNavItems = [
  {
    title: "Change Password",
    href: "/profile",
  },
  {
    title: "History",
    href: "/profile/history",
  },
];

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container hidden space-y-6 p-10 pt-5 pb-5 md:block">
      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-12 lg:col-span-12">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">
              Manage your account settings and set e-mail preferences.
            </p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">{children}</div>
          </div>
        </div>
        {/* <div className="col-span-0 lg:col-span-4">
          <img
            src="https://images.pexels.com/photos/220429/pexels-photo-220429.jpeg?cs=srgb&dl=pexels-pixabay-220429.jpg&fm=jpg"
            alt="Description of your image"
            className="lg:max-w-full lg:h-auto"
            style={{ width: "100%", height: "100%" }}
          />
        </div> */}
      </div>
    </div>
  );
}

export default layout;
