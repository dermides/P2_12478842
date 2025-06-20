import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from '../models/UserGoogle'; // Asegúrate de que la ruta sea correcta

dotenv.config();

passport.use(new GoogleStrategy(
  {
    clientID: process.env.CLIENT_ID!,
    clientSecret: process.env.CLIENT_SECRET!,
    callbackURL: process.env.CLIENT_CALLBACK!,
  },
  async (_accessToken, _refreshToken, profile, done) => {
    try {
      // Buscar usuario existente
      const existingUser = await User.findOne({ where: { googleId: profile.id } });

      if (existingUser) {
        return done(null, existingUser);
      }

      console.log(profile.displayName, profile.id, profile.emails?.[0].value);

      // Crear nuevo usuario
      const newUser = await User.create({
        username: profile.displayName,
        googleId: profile.id,
        correo: profile.emails?.[0].value,
        
      });

      console.log("Usuario creado:", newUser.toJSON());
      return newUser;

    } catch (err) {
      console.error("Error al crear usuario:", err);
      throw err;
    }
  }
));

// Serialización para mantener sesión
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: unknown, done) => {
  try {
    const user = await User.findByPk(id as string);
    done(null, user);
  } catch (err) {
    done(err, undefined);
  }
});