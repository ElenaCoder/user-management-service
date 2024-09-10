import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";
import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import * as authController from './authController.js';

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const app = new Hono();

app.get("/auth/registration", authController.showRegistrationForm);

Deno.serve(app.fetch);