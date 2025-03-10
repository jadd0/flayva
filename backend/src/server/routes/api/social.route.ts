import { db } from "@/db";
<<<<<<< HEAD
<<<<<<< HEAD
import { users as usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Router, Request, Response } from "express";
import { User } from "@flayva-monorepo/shared";
=======
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Router, Request, Response } from "express";
>>>>>>> b48d77c (api social router; user info by ID route)
=======
import { users as usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Router, Request, Response } from "express";
import { User } from "@flayva-monorepo/shared";
>>>>>>> 21d56c8 (slightly modify axios request wrapper; add fetchUserById hook)

const router: Router = Router();

/**
 * Get a user's profile
 */
router.get("/u/:userID", async (req: Request, res: Response) => {
<<<<<<< HEAD
<<<<<<< HEAD
  const users = await db.select().from(usersTable).where(eq(usersTable.id, req.params.userID));
  const user = users[0];

  if (!user)
=======
  const profiles = await db.select().from(users).where(eq(users.id, req.params.userID));
  const profile = profiles[0];

  if (!profile)
>>>>>>> b48d77c (api social router; user info by ID route)
=======
  const users = await db.select().from(usersTable).where(eq(usersTable.id, req.params.userID));
  const user = users[0];

  if (!user)
>>>>>>> 21d56c8 (slightly modify axios request wrapper; add fetchUserById hook)
    res.status(404).send({
      exists: false,
      message: "Profile not found",
    });
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 21d56c8 (slightly modify axios request wrapper; add fetchUserById hook)

  const structuredUser: User = {
    bio: user.bio,
    id: user.id,
    username: user.username,
    profile_picture_url: user.profile_picture_url ?? undefined,
  };

  res.status(200).send({
    exists: true,
    user: structuredUser,
  });
<<<<<<< HEAD
=======
  else
    res.status(200).send({
      exists: true,
      profile: {
        id: profile.id,
        username: profile.username,
        bio: profile.bio,
        profile_picture_url: profile.profile_picture_url ?? undefined,
      },
    });
>>>>>>> b48d77c (api social router; user info by ID route)
=======
>>>>>>> 21d56c8 (slightly modify axios request wrapper; add fetchUserById hook)
});

export default router;
