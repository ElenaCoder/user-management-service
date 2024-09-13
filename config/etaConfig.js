import { Eta } from "../deps.js";

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

export { eta };