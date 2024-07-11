import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./components/profile-form";

async function page() {
  const payload = {
    data: {
      memberName: "john_doe",
      name: "John Doe",
      yob: 1980,
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm data={payload.data} />
    </div>
  );
}

export default page;
