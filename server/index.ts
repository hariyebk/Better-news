import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Harun Welcome to the British Council !");
});

export default app;
