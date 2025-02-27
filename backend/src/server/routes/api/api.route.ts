import { Router } from "express";
import socialRouter from "@/server/routes/api/social.route";
<<<<<<< HEAD
<<<<<<< HEAD
import postRouter from "@server/routes/api/posts.route";
=======
>>>>>>> b48d77c (api social router; user info by ID route)
=======
import postRouter from "@server/routes/api/posts.route";
>>>>>>> b9f0b0a (add zod-express-middleware; add dummy posts route)

const router: Router = Router();

router.use("/s", socialRouter);
<<<<<<< HEAD
<<<<<<< HEAD
router.use("/p", postRouter);
=======
>>>>>>> b48d77c (api social router; user info by ID route)
=======
router.use("/p", postRouter);
>>>>>>> b9f0b0a (add zod-express-middleware; add dummy posts route)

export default router;
