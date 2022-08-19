import { SortOptionObject, UpdateOneOptions, UpdateQuery } from "mongodb";

export type DynamicKey = {
    [key: string] : number
}
export  interface ICountQuery {
    query: {
        [key: string] : any;
    }
}
export  interface IFindQuery {
    query: {
        [key: string] : any;
    },
    fields: DynamicKey,
    sort?: any;
    skip?: number;
    limit?: number;
}

export  interface IUpdateQuery {
    query: {
        [key: string] : any;
    },
    set: UpdateQuery<any>,
    options: UpdateOneOptions
}
