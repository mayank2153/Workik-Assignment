import passport from "passport"
import GithubStrategy from passport-github2
import { User } from "../models/user.model.js"

// serializing user
passport.serializeUser((user, done) => {
    done(null, user.id)
})

//deserializing user
passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        done(null, user);
    })
    .catch(err => {
        done(err, null);
    });
});

passport.use(
    new Strategy(
        {
            GITHUB_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
            GITHUB_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/github/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        }
    )
);



export default passport;