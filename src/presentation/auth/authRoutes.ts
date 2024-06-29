import { Router } from "express";
import { AuthController } from "./authController";
import { AuthService } from "./authService";

export class AuthRoutes {

    static get routes(): Router {

        const router = Router();
        const authService = new AuthService();
        const authController = new AuthController(authService);

        router.post('/', authController.postAuth);
        router.get('/profile/:token', authController.getProfile)
        router.patch('/profile/:token', authController.updateProfile)


        return router;
    }
}