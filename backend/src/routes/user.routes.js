import { Router } from "express";
import passport from "../middleware/githubauth.middleware.js";  // Import passport
import { getUserById } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/user/:userId", getUserById);

userRouter.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

userRouter.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }), 
  (req, res) => {
    const userId = req.user.id;  
    res.redirect(`http://localhost:5173/repos/${userId}`);
  }
);

export default userRouter;
