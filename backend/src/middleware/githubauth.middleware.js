import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { User } from "../models/user.model.js";

// Serializing and deserializing user (unchanged)
passport.serializeUser((user, done) => {
    done(null, user.id);
});

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
            callbackURL: "https://workik-assignment-production.up.railway.app/users/auth/github/callback",
            scope: ['repo', 'admin:repo_hook', 'user:email'] // Updated scopes
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("GitHub profile:", profile);
                
                // Verify granted scopes
                const grantedScopes = profile._json.scope ? profile._json.scope.split(',') : [];
                console.log("Granted scopes:", grantedScopes);
                
                // Check if all required scopes were granted
                const requiredScopes = ['repo', 'admin:repo_hook', 'user:email'];
                const hasAllScopes = requiredScopes.every(scope => grantedScopes.includes(scope));
                
                if (!hasAllScopes) {
                    console.warn("Not all required scopes were granted.");
                    return done(new Error("Insufficient permissions granted. Please authorize all requested permissions."), null);
                }

                const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;

                let user = await User.findOne({ githubId: profile.id });
                if (!user) {
                    user = await User.create({
                        githubId: profile.id,
                        username: profile.username,
                        email: email,
                        accessToken: accessToken,
                        scope: grantedScopes.join(',') // Store granted scopes
                    });
                } else {
                    user.accessToken = accessToken;
                    user.scope = grantedScopes.join(','); // Update scopes
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