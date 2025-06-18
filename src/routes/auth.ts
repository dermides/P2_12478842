import express from 'express';
import authController from '../controllers/authController';
import passport from 'passport';

const router = express.Router();

//routeHome.get("/", renderHome);

router.get("auth/registro", authController.userRegistro);
//routeAuth.get("admin/login");

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/auth/google/callback", passport.authenticate("google", {
  failureRedirect: "/admin/login",
}), (_req, res) => res.redirect("admin/panel"));

export default router;