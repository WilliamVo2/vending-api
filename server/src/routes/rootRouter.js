import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import venOrderRouter from "./api/v1/venOrderRouter.js";
import itemsRouter from "./api/v1/itemsRouter.js";
const rootRouter = new express.Router();

rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("api/v1/orders", venOrderRouter);
rootRouter.use("/api/v1/items", itemsRouter)


//place your server-side routes here

export default rootRouter;
