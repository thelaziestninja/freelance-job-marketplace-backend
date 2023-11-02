import { IJob } from "./job";
import { IUser } from "./user";
import { IProfile } from "./profile";
import * as core from "express-serve-static-core";
import { IApplication } from "./application";
import { IReview } from "./review";

// if separated into multiple services, separate to multiple files and on a more generic location

interface IRequestUser {
  userId: string;
}

export type Request<Params = {}, ReqBody = {}> = core.Request<
  Params,
  any,
  ReqBody
> & {
  user?: IRequestUser;
};

export interface BaseResponse {
  message?: string;
  exists?: boolean;
  error?: string;
  token?: string;
  name?: string;
  img_url?: string;
  user?: IUser;
  profile?: IProfile;
  profiles?: IProfile[];
  job?: IJob;
  jobs?: IJob[];
  application?: IApplication;
  applications?: IApplication[];
  review?: IReview;
  reviews?: IReview[];
}

export type Response<ResBody> = core.Response<ResBody>;

export enum ResponseStatus {
  Success = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  InternalServerError = 500,
}
