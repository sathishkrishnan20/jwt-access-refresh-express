import { ObjectId } from "mongodb";


export interface IResponse {
    success: boolean;
    message: string;
    data?: any;
    stackTrace?: any;
}

export interface IResponseInsertQuery extends IResponse {
    insertedId: ObjectId;
}