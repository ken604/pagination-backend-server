import * as express from "express";
import { Request, Response, NextFunction } from "express";
import getRecords from "../data/records";
import { IRecord, RecordSortTypes } from "../models/recordModel";

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

router.get(
  "/",
  paramValidation(),
  paginatedResults(),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      //   res.json("res.paginatedResults");
      res.json(res.locals.paginatedResults);
    } catch (ex) {
      return next(ex);
    }
  }
);

interface results {
  next?: {
    page: number;
    limit: number;
  };
  previous?: {
    page: number;
    limit: number;
  };
  records: IRecord[];
}

function paramValidation() {
  return (req: Request, res: Response, next: NextFunction) => {
    const sort = req.query.sort as string;
    if (sort === undefined || sort === "") return next();

    switch (sort.toLowerCase()) {
      case RecordSortTypes.Data:
      case RecordSortTypes.Name:
      case RecordSortTypes.ID:
        break;
      default:
        return next(new Error("bad sort type"));
    }

    const ascending = req.query.ascending as string;
    if (ascending === undefined || ascending === "") return next();

    if (ascending === "false" || ascending === "true") return next();

    return next(new Error("bad ascending type"));
  };
}
function paginatedResults() {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string);
      const limit = parseInt(req.query.limit as string);
      const sort = req.query.sort as string;
      const ascendingParam = req.query.ascending as string;
      const ascending = ascendingParam === "true" ? true : false;

      const records = getRecords(page, limit);

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      let results: results = { records: [] };
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
        case RecordSortTypes.Name:
          records.sort((a, b) => {
            if (ascending) return a.name > b.name ? 1 : -1;
            if (!ascending) return a.name < b.name ? 1 : -1;
            // const sort = a.name > b.name && ascending ? 1 : -1;
            // return sort;
          });
          break;
        case RecordSortTypes.Name:
        case RecordSortTypes.ID:
          records.sort((a, b) => {
            if (ascending) return a.id > b.id ? 1 : -1;
            if (!ascending) return a.id < b.id ? 1 : -1;
          });
          break;
        default:
          return next(new Error("bad sort type"));
      }

      results.records = records.slice(startIndex, endIndex);
      res.locals.paginatedResults = results; // NOT typed

      next();
    } catch (ex) {
      //   console.log(ex);
      return next(ex);
    }
  };
}

export default router;
