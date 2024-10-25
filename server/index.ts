import type { ErrorResponse } from "@/shared/types";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Harun Welcome back");
});

app.onError((err, c) => {
  // Expected error
  if(err instanceof HTTPException){
    const errResponse = err.res ?? c.json<ErrorResponse>({
      success: false,
      error: err.message,
      isFormError: err.cause && typeof err.cause === "object" && "form" in err.cause ? err.cause.form === true : false
    }, err.status)

    return errResponse
  }
  // Unexpected errors
  return c.json<ErrorResponse>({
    success: false,
    error: process.env.NODE_ENV === "production" ? "Internal server error" : err.stack ?? err.message
  }, 500)
})
export default app;
