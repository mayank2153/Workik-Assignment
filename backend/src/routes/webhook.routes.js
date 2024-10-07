import { Router } from "express";
import { createReview } from "../controllers/webhook.controller.js";
import verifyGitHubSignature from "../middleware/verifygithud.middleware.js";
const webHookRouter=Router();
webHookRouter.post('/webhook', verifyGitHubSignature,createReview);
export default webHookRouter