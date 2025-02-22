import { Router, Request, Response } from "express";
import exampleRoute from "@server/routes/example.route";
import api from "@server/routes/api/api.route";
import auth from "@server/routes/auth/auth.route";

const router: Router = Router();

router.use("/api", api);
router.use("/auth", auth);

export default router;
