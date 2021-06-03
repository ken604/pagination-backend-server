// import { Express } from "express-serve-static-core";
// import { Response } from "express";
import { IRecord } from "../models/recordModel";

declare module "express-serve-static-core" {
  interface Response {
    paginatedResults?: IRecord[];
    // // context?: RequestContext;
    // token?: any;
    // _validationContexts?: Array<ValidationContext>;
  }
}

// export interface RequestContext {
//     logger?: ILogger;
// }

export interface ValidationContext {
  fields: Array<string>;
  locations: Array<string>;
}
