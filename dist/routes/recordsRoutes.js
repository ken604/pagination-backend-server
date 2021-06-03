"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const records_1 = __importDefault(require("../data/records"));
const recordModel_1 = require("../models/recordModel");
const router = express.Router();
// router.get("/",
//   (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const page = parseInt(req.query.page as string);
//     const limit = parseInt(req.query.limit as string);
//     const records = getRecords(page, limit);
//     res.json(paginatedResults(records));
//   } catch (ex) {
//     return next(ex);
//   }
// });
// function paginatedResults(records: IRecord[]): IRecord[] {
//   return records;
// }
router.get("/", paramValidation(), paginatedResults(), (req, res, next) => {
    try {
        //   res.json("res.paginatedResults");
        res.json(res.locals.paginatedResults);
    }
    catch (ex) {
        return next(ex);
    }
});
function paramValidation() {
    return (req, res, next) => {
        const sort = req.query.sort;
        if (sort === undefined || sort === "")
            return next();
        switch (sort.toLowerCase()) {
            case recordModel_1.RecordSortTypes.Data:
            case recordModel_1.RecordSortTypes.Name:
            case recordModel_1.RecordSortTypes.ID:
                break;
            default:
                return next(new Error("bad sort type"));
        }
        const ascending = req.query.ascending;
        if (ascending === undefined || ascending === "")
            return next();
        if (ascending === "false" || ascending === "true")
            return next();
        return next(new Error("bad ascending type"));
    };
}
function paginatedResults() {
    return (req, res, next) => {
        try {
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const sort = req.query.sort;
            const ascendingParam = req.query.ascending;
            const ascending = ascendingParam === "true" ? true : false;
            const records = records_1.default(page, limit);
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            let results = { records: [] };
            console.log("p");
            if (endIndex < records.length) {
                results.next = {
                    page: page + 1,
                    limit: limit,
                };
            }
            if (startIndex > 0) {
                results.previous = {
                    page: page - 1,
                    limit: limit,
                };
            }
            switch (sort.toLowerCase()) {
                case recordModel_1.RecordSortTypes.Name:
                    records.sort((a, b) => {
                        if (ascending)
                            return a.name > b.name ? 1 : -1;
                        if (!ascending)
                            return a.name < b.name ? 1 : -1;
                        // const sort = a.name > b.name && ascending ? 1 : -1;
                        // return sort;
                    });
                    break;
                case recordModel_1.RecordSortTypes.Name:
                case recordModel_1.RecordSortTypes.ID:
                    records.sort((a, b) => {
                        if (ascending)
                            return a.id > b.id ? 1 : -1;
                        if (!ascending)
                            return a.id < b.id ? 1 : -1;
                    });
                    break;
                default:
                    return next(new Error("bad sort type"));
            }
            results.records = records.slice(startIndex, endIndex);
            res.locals.paginatedResults = results; // NOT typed
            next();
        }
        catch (ex) {
            //   console.log(ex);
            return next(ex);
        }
    };
}
exports.default = router;
//# sourceMappingURL=recordsRoutes.js.map