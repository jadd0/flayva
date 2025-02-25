import { Button } from "@/components/ui/button";
import { useLogout, useMe } from "@/hooks/auth.hooks";
import { useGlobalErrorToast } from "@/hooks/error.hooks";
import { toast } from "sonner";

//TODO: delete, this page is only for testing purposes

export default function LogoutPage() {
  const { data } = useMe();

  const { showErrorToast } = useGlobalErrorToast();
  const { isPending, mutate } = useLogout({
    onError: () => showErrorToast("failed to log out!"),
    onSuccess: () => {
      toast.success("Logged out!");
    },
  });

  return (
    <>
<<<<<<< HEAD
<<<<<<< HEAD
      <p className="text-green-800"> Authenticated! - '{data?.user?.username ?? "-"}' </p>
=======
      <p className="text-green-800"> Authenticated! - '{data?.user?.email ?? "-"}' </p>
>>>>>>> 4407f90 (improved client side routing)
=======
      <p className="text-green-800"> Authenticated! - '{data?.user?.username ?? "-"}' </p>
>>>>>>> 3905ba8 (restructure auth schema to accomodate multiple oauth account connections)
      <Button disabled={isPending} onClick={() => mutate(undefined)}>
        Logout
      </Button>
    </>
  );
}
