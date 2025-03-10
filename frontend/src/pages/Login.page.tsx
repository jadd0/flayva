import { LoginForm } from "@/components/login-form";
import Slideshow from "@/components/Slideshow";
<<<<<<< HEAD
<<<<<<< HEAD
import { useMe } from "@hooks/auth.hooks";
import { ClassNameValue } from "tailwind-merge";
=======
import { Button } from "@/components/ui/button";
import { useLogout, useMe } from "@/hooks/auth.hooks";
import { useGlobalErrorToast } from "@/hooks/error.hooks";
import { toast } from "sonner";
<<<<<<< HEAD
>>>>>>> 7cbbbe6 (Added slideshow to the login page)
=======
import { User } from "@flayva-monorepo/shared/types";
>>>>>>> 04fc0dd (Fixed the login page resizing issues)
=======
import { useMe } from "@hooks/auth.hooks";
import { ClassNameValue } from "tailwind-merge";
>>>>>>> a45a58d (refactor login; slightly restyle login; remove amber background;)

import disp1 from "@assets/disp1.jpg";
import disp2 from "@assets/disp2.jpg";
import disp3 from "@assets/disp3.jpg";
import disp4 from "@assets/disp4.jpg";

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> a45a58d (refactor login; slightly restyle login; remove amber background;)
//TODO: create a proper set of slideshow items
const SLIDESHOW_ITEMS = [
  {
    Image: disp1,
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
    alt: "disp1",
  },
  {
    Image: disp2,
    caption:
      "Loewm ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
    alt: "disp2",
  },
  {
    Image: disp3,
    caption:
      "Loewm ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
    alt: "disp3",
  },
  {
    Image: disp4,
    caption:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
    alt: "disp4",
  },
];
<<<<<<< HEAD
=======
  return (
    <>
      <p className="text-green-800"> Authenticated! - '{user.username}' </p>
      <Button disabled={isPending} onClick={() => mutate(undefined)}>
        Logout
      </Button>
    </>
  );
}
>>>>>>> 68ed90d (Created profile and edit profile pages; created reuseable profile page header; added mock post images; added routes for the pages.)

<<<<<<< HEAD
function LoginImageSlideShow({ className }: { className: ClassNameValue }) {
  return <Slideshow items={SLIDESHOW_ITEMS} header="FLAYVA" className={className} />;
=======
function TestUnauthenticated() {
  return (
    <>
    <div className="w-screen h-screen flex items-center justify-center">
      <Slideshow className="sm:block hidden w-[50%] h-full"/>
      <LoginForm className="flex sm:w-[50%] w-full h-full items-center justify-center"/>
    </div>
    </>
  );
>>>>>>> 0562c4a (Fixed Login page)
=======

function LoginImageSlideShow({ className }: { className: ClassNameValue }) {
  return <Slideshow items={SLIDESHOW_ITEMS} header="FLAYVA" className={className} />;
>>>>>>> a45a58d (refactor login; slightly restyle login; remove amber background;)
}

export default function LoginPage() {
  const { isLoading, error } = useMe();

  // TODO: improve loading and error states
  if (isLoading) return "loading...";
  if (error) return `Error: ${error.message}`;
<<<<<<< HEAD
<<<<<<< HEAD
=======
  if (data?.authenticated && data.user)
    return <TestAuthenticated user={data.user} />;
>>>>>>> 68ed90d (Created profile and edit profile pages; created reuseable profile page header; added mock post images; added routes for the pages.)
=======
>>>>>>> a45a58d (refactor login; slightly restyle login; remove amber background;)

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <LoginImageSlideShow className="lg:block hidden w-[50%] h-full" />
      <div className="grow flex items-center justify-center h-full">
        <LoginForm className="flex xl:w-lg lg:w-96 w-96 sm:w-lg h-full items-center justify-center border-0" />
      </div>
    </div>
  );
}
