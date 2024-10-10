import { Router } from "express";
import passport from "../middleware/githubauth.middleware.js";  // Import passport
import { getUserById } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/user/:userId", getUserById);
const REQUIRED_SCOPES = ['repo', 'admin:repo_hook', 'user:email'];
userRouter.get('/auth/github', passport.authenticate('github', 
  { scope: REQUIRED_SCOPES }
));

userRouter.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }), 
  (req, res) => {
    const userId = req.user.id;  
    res.redirect(`http://localhost:5173/repos/${userId}`);
  }
);

export default userRouter;
