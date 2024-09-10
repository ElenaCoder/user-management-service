const findUserByEmail = async (email) => {
    const kv = await Deno.openKv();
    const user = await kv.get(["users", email]);
    return user?.value;
  };
  
  export { findUserByEmail };