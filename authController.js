import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const showRegistrationForm = (c) => c.html(eta.render("registration.eta"));

export { showRegistrationForm };