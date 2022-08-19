import {
    NextFunction,
    Response,
    Request
} from "express";
import DbUtil from "../../utils/db-util";
import {
    IFindQuery,
} from "../../interfaces/db-connection";
import config from "../../config";
import { ObjectId } from "mongodb";
import { IResponse } from "../../interfaces/request-response";

class UserService {
    private connection: DbUtil;
    private table: string;
    constructor() {
        this.connection = new DbUtil();
        this.table = config.collections.users;
    }
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const findQuery: IFindQuery = {
                query: {
                    _id: new ObjectId(req.body.userId),
                    active: true
                },
                fields: {
                    email: 1,
                    user_name:1,
                }
            }
            const result = await this.connection.findOne(this.table, findQuery);
            let response: IResponse;
            console.log(result)
            if (!result) {
                response  = {
                    success: false,
                    message: 'Not Found',
                }
                return res.status(404).send(response);
            }
            else {
                response = {
                    success: true,
                    message: 'Fetch Successfully',
                    data: result
                };
                return res.status(200).send(response);
            }
            
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}
export default new UserService();