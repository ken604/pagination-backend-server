"use strict";
// const express = require('express')
// const app = express()
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// function getUsers() {
//     const numUsers = 100;
// }
// app.get('/records', (req, res) => {
//     const users = getUsers();
//     res.json(users)
// })
// app.listen(3000)
// import express, { Request, Response, NextFunction } from "express";
const express_1 = __importDefault(require("express"));
const recordsRoutes_1 = __importDefault(require("./routes/recordsRoutes"));
const app = express_1.default();
// Middlewares
app.use(function (req, res, next) {
    console.log(`-----> ${req.method}: ${req.url}`);
    // Initialize the context so other middleware can add into it.
    // req.context = {};
    return next();
});
app.use("/records", recordsRoutes_1.default);
// Error handler.
app.use(function (err, req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
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
});
exports.default = app;
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
//# sourceMappingURL=App.js.map