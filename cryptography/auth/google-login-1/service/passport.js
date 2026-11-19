
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

export function passportMiddleware() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.client_id,
        clientSecret: process.env.client_secret,
        callbackURL: process.env.redirect_uri,
      },
      function (accessToken, refreshToken, profile, done) {
        try {
          // Google profile contains the authenticated user's information.
          const user = {
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0]?.value,
            photo: profile.photos?.[0]?.value,
          };

          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
}
