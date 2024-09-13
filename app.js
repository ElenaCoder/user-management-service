import {Hono} from "./deps.js";

import * as authController from './controllers/authController.js';
import * as mainController from "./controllers/mainController.js";
import * as middlewares from "./middlewares/middlewares.js";
;
const app = new Hono();

app.use("*", middlewares.errorHandler);

app.get("/auth/login", authController.showLoginForm);
app.post("/auth/login", authController.loginUser);

app.post("/auth/logout", authController.logoutUser);

app.get("/auth/registration", authController.showRegistrationForm);
app.post("/auth/registration", authController.registerUser);

app.get("/", mainController.showMain);

Deno.serve(app.fetch);