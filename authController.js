import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";
import * as scrypt from "https://deno.land/x/scrypt@v4.3.4/mod.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import * as userService from "./userService.js";
import * as sessionService from "./sessionService.js";

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const validator = z.object({
    email: z.string().trim().email({ message: "Please provide a valid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long." }),
});

const showLoginForm = (c) => c.html(eta.render("login.eta"));

const loginUser = async (c) => {
    const body = await c.req.parseBody();
    console.log(body);

    // Confirming that the user is in the system
    const user = await userService.findUserByEmail(body.email);
    if (!user) {
      return c.text(`No user with the email ${body.email} exists in the system.`);
    }

    // Confirming that the entered password is correct.
    const passwordsMatch = scrypt.verify(body.password, user.passwordHash);
    if (!passwordsMatch) {
      return c.text(`Invalid password`);
    }

    await sessionService.createSession(c, user);

    return c.redirect("/");
};

const showRegistrationForm = (c) => c.html(eta.render("registration.eta"));

const registerUser = async (c) => {
    const body = await c.req.parseBody();

    const validationResult = validator.safeParse(body);

    if (!validationResult.success) {
        const errors = validationResult.error.format();
        return c.html(eta.render("registration.eta", {
            ...body,
            errors,
        }));
      }

    // Confirming that the two passwords match
    if (body.password !== body.verification) {
        return c.text("The passwords you entered don’t match");
    }

    // Confirming that the email provided is already registered
    const existingUser = await userService.findUserByEmail(body.email);
    if (existingUser) {
      return c.text(`A user with the email ${body.email} already exists in the system.`);
    }

    // Adding the user to the database
    const user = {
        id: crypto.randomUUID(),
        email: body.email,
        passwordHash: scrypt.hash(body.password),
      };

      await userService.createUser(user);
      await sessionService.createSession(c, user);

      return c.redirect("/");
  };

  const logoutUser = async (c) => {
    await sessionService.deleteSession(c);
    return c.redirect("/");
  };

export { showLoginForm, loginUser , showRegistrationForm, registerUser, logoutUser };