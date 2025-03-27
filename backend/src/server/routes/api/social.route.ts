import { Router } from "express";
import socialControllers from "@/server/controllers/social.controllers";

const router: Router = Router();

/**
 * Get a user's profile
 */
router.get("/u/:userID", socialControllers.getUserById);

/** 
 * Get users by username
 */
router.get("/u/usernameSearch/:usernames", socialControllers.getUsersByUsername);

export default router;
