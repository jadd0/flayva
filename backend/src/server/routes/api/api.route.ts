import { Router } from "express";
import socialRouter from "@/server/routes/api/social.route";
<<<<<<< HEAD
import postRouter from "@server/routes/api/posts.route";
=======
>>>>>>> b48d77c (api social router; user info by ID route)

const router: Router = Router();

router.use("/s", socialRouter);
<<<<<<< HEAD
router.use("/p", postRouter);
=======
>>>>>>> b48d77c (api social router; user info by ID route)

export default router;
