// const express = require('express')
// const app = express()

// function getUsers() {
//     const numUsers = 100;

// }

// app.get('/records', (req, res) => {
//     const users = getUsers();
//     res.json(users)
// })

// app.listen(3000)

// import express, { Request, Response, NextFunction } from "express";
import express from "express";
import { Request, Response, NextFunction } from "express";
import RecordsRoutes from "./routes/recordsRoutes";

const app = express();

// Middlewares
app.use(function (req: Request, res: Response, next: NextFunction) {
  console.log(`-----> ${req.method}: ${req.url}`);

  // Initialize the context so other middleware can add into it.
  // req.context = {};
  return next();
});

app.use("/records", RecordsRoutes);

// Error handler.
app.use(async function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // err can be huge. Don't log this, it's excessive.
  // logger.error(`Error in route ${req.path}: `, err);
  console.error(`Error in route ${req.path}: ${err}`); // , err);
  //   console.error(err);

  if (process.env.NODE_ENV !== "production") {
    // Return whole error for dev purposes.
    return res.status(500).json(err.message);
  }

  // await EmailService.sendErrorEmailProduction(JSON.stringify(serializeError(err)));

  // Production strip out error info.
  return res.send(500);
});

export default app;

// class App {
//   public express;

//   constructor() {
//     console.log("wtf");
//     this.express = express();
//     this.mountRoutes();
//   }
//   private mountRoutes(): void {
//     const router = express.Router();

//     router.get("/", (req: Request, res: Response) => {
//       res.json({ message: "Go away, world!" });
//     });

//     router.get("/records", RecordsRoutes);

//     this.express.use("/", router);
//   }
// }

// export default new App().express;
