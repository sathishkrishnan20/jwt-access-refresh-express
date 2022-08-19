import { ObjectId } from "mongodb";
import { DATA_TYPE, HTTP_METHODS, PARAMIN } from "../enums";

export interface IResponse {
    success: boolean;
    message: string;
    data?: any;
    stackTrace?: any;
}


interface ParamInfo {
    name: string;
    in: PARAMIN,
    type?: DATA_TYPE;
    description? : string; 
    optional?: boolean
}
export interface RouteInfo {
    path: any
    parameters: ParamInfo[];
    isAuthorized: boolean;
    description: string;
    method: HTTP_METHODS,
    tags: string[]
}
export interface IResponseInsertQuery extends IResponse {
    insertedId: ObjectId;
}