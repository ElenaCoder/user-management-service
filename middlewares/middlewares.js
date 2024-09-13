const errorHandler = async (c, next) => {
    try {
      await next();
    } catch (error) {
      console.error("Error caught by middleware:", error);
      return c.text("An error occurred. Please try again later.", 500);
    }
  };

export { errorHandler };