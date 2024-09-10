import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const showRegistrationForm = (c) => c.html(eta.render("registration.eta"));

const registerUser = async (c) => {
    const body = await c.req.parseBody();

    // Confirming that the two passwords match
    if (body.password !== body.verification) {
        return c.text("The passwords you entered don’t match");
    }

    return c.text(JSON.stringify(body));
  };

export { showRegistrationForm, registerUser };