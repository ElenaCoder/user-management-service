import {
    getSignedCookie,
    setSignedCookie,
  } from "https://deno.land/x/hono@v3.12.11/helper.ts";
  
  const secret = "secret";
  
  const createSession = async (c, user) => {
    const sessionId = crypto.randomUUID();
    await setSignedCookie(c, "sessionId", sessionId, secret, {
      path: "/",
    });
  
    const kv = await Deno.openKv();
    await kv.set(["sessions", sessionId], user);
  };
  
  export { createSession };