import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { User } from "../models/user.model.js";

// Serializing user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserializing user
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => done(null, user))
        .catch(err => done(err, null));
});

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "https://workik-assignment-production.up.railway.app/users/auth/github/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("GitHub profile:", profile);
                const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;

                let user = await User.findOne({ githubId: profile.id });
                if (!user) {
                    user = await User.create({
                        githubId: profile.id,
                        username: profile.username,
                        email: email,
                        accessToken: accessToken, 
                    });
                } else {
                    
                    user.accessToken = accessToken;
                    await user.save();
                }

                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

export default passport;
