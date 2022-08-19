import {
  MongoClient,
  Db,
  ObjectId,
  InsertOneResult
} from 'mongodb';
import {
  IFindQuery,
} from '../interfaces/db-connection';
import {
  IResponse,
  IResponseInsertQuery
} from '../interfaces/request-response';

let url: string = process.env.MONGODB_URL as string;
const dbName: string = process.env.DB_NAME as string;

let db: Db;
export default class DbUtil {
  constructor() {

  }

  initiateConnection = async function () {
    let client = await MongoClient.connect(url);
    db = client.db(dbName);
    return db
  }


  insertOne = async function (table: string, data: any, createdBy: ObjectId | string): Promise <InsertOneResult> {
    try {
      const collectionData = {
        ...data,
        active: data.active === undefined ? true : data.active,
        createdDate: new Date(),
        createdBy: createdBy
      }
      const collection = db.collection(table);
      return collection.insertOne(collectionData);
    } catch (ex) {
        throw ex;
    }
  }


  findOne = async function (table: string, data: IFindQuery): Promise < IResponse > {
    try {
      const collection = db.collection(table);
      const resp = await collection.findOne(data.query, {
        projection: data.fields,
      });
      if (!resp) {
        const response: IResponse = {
          success: false,
          message: 'Not Found',
        }
        return response
      }

      const response: IResponse = {
        success: true,
        message: 'Fetch Successfully',
        data: resp
      };
      return response;
    } catch (ex) {
      throw ex;
    }
  }
}