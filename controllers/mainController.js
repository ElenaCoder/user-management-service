import { eta } from "../config/etaConfig.js";

import * as sessionService from "../services/sessionService.js";

const showMain = async (c) => {
    return c.html(eta.render("main.eta", {
      user: await sessionService.getUserFromSession(c),
    }));
  };

export { showMain };