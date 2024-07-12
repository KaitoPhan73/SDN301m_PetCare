import PasswordForm from "./components/password-form";
import { Separator } from "@/components/ui/separator";

function page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Change password</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <PasswordForm />
    </div>
  );
}

export default page;
