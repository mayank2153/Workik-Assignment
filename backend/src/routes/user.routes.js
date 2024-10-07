import { Router } from "express";
import passport from "../middleware/githubauth.middleware.js";  // Import passport

const userRouter = Router();

// GitHub OAuth login
userRouter.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

// GitHub OAuth callback
userRouter.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }), 
  (req, res) => {
    res.redirect('/dashboard');  
  }
);

export default userRouter;
