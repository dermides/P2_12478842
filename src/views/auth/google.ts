import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UsersModel from "../../models/UsersModel";

const clientID = process.env.GOOGLE_CLIENT_ID || "";
const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "";
const callbackURL = process.env.GOOGLE_CALLBACK_URL || "";

passport.use(new GoogleStrategy({
  clientID,
  clientSecret,
  callbackURL
}, async (profile: any, done:any) => {
  const existing = await UsersModel.findOne({ where: { googleId: profile.id } });
  if (existing) return done(null, existing);

  const newUser = await UsersModel.create({
    googleId: profile.id,
    nombre: profile.displayName,
    correo: profile.emails?.[0].value,
  });
  return done(null, newUser);
}));