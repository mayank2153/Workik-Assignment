import { Router } from "express"
const userRouter=Router();
userRouter.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }))

userRouter.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication
    res.redirect('/dashboard');
  }
)
