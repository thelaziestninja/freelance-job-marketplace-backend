import * as core from "express-serve-static-core";
import { IUser } from "./user";
import { IProfile } from "./profile";

// if separated into multiple services, separate to multiple files and on a more generic location

interface IRequestUser {
  userId: string;
}

export type Request<ReqBody> = core.Request<
  core.ParamsDictionary,
  any,
  ReqBody
> & {
  user?: IRequestUser;
};

export interface BaseResponse {
  message?: string;
  error?: string;
  token?: string;
  user?: IUser;
  profile?: IProfile;
  profiles?: IProfile[];
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
