import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";
import * as scrypt from "https://deno.land/x/scrypt@v4.3.4/mod.ts";
import * as userService from "./userService.js";

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const showRegistrationForm = (c) => c.html(eta.render("registration.eta"));

const registerUser = async (c) => {
    const body = await c.req.parseBody();

    // Confirming that the two passwords match
    if (body.password !== body.verification) {
        return c.text("The passwords you entered don’t match");
    }

    // Confirming that the email provided is already registered
    const existingUser = await userService.findUserByEmail(body.email);
    if (existingUser) {
      return c.text(`A user with the email ${body.email} already exists.`);
    }

    // Adding the user to the database
    const user = {
        id: crypto.randomUUID(),
        email: body.email,
        passwordHash: scrypt.hash(body.password),
      };

      await userService.createUser(user);

    return c.text(JSON.stringify(body));
  };

export { showRegistrationForm, registerUser };