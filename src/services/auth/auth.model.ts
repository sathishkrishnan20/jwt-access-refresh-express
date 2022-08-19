import {
    NextFunction,
    Response,
    Request
} from "express";
import bcrypt from 'bcryptjs';
import DbUtil from "../../utils/db-util";
import { IResponse } from "../../interfaces/request-response";
import authorizer  from '../../helpers/authorizer/index';
import config from "../../config";
import { ObjectId } from "mongodb";

class AuthService {
    private connection: DbUtil;
    private collection: string;
    private saltRounds: number;
    constructor(collection: string) {
        this.connection = new DbUtil();
        this.collection = collection;
        this.saltRounds = 10;
    }
    findAuthCollectionResponse = async (userEmail: string) => { // get all Matched Auth Result details
        const selectQueryForAuth = {
            "query": {
                email: userEmail.toLowerCase(),
            },
            "fields": {
              _id: 1,
              email: 1,
              userName: 1,
              password: 1,
            }
          };
          console.log(JSON.stringify(selectQueryForAuth))
          return this.connection.findOne(this.collection, selectQueryForAuth);
    }
    async signIn(request: Request, response: Response, next: NextFunction) {
        try {
            const reqData = request.body;
            const findAuthStatus = await this.findAuthCollectionResponse(String(reqData.email));

            if (!findAuthStatus.success) {
                return response.status(404).send(findAuthStatus);
            }
            if(!findAuthStatus.data?.password) {
                const result : IResponse = {
                    success: false,
                    message: 'Please Generate Password by Using Forgot Password and Try Login Again'
                }
                return response.status(404).send(result);
            }
            const isPasswordValid = bcrypt.compareSync(reqData.password, findAuthStatus.data?.password);
            if(!isPasswordValid) {
                const result : IResponse = {
                    success: false,
                    message: 'Invalid Credentials'
                }
                return response.status(401).send(result);
            }
            const userData = findAuthStatus.data;
            const { accessToken, refreshToken } = await this.generateAccessTokenRefreshToken(userData._id)
            const result: IResponse = {
                success: true,
                message: 'logged-in Successfully',
                data: {
                    id: userData._id,
                    token: accessToken,
                    refreshToken: refreshToken
                }
            }
            return response.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }
   

    async signUp(request: Request, response: Response, next: NextFunction) {
        try {
            console.log('coming here...');
            const reqData = request.body;
            const findAuthStatus = await this.findAuthCollectionResponse(String(request.body.email));
            if (findAuthStatus.success) {
                const result: IResponse = {
                    success: false,
                    message: 'User Already Exists',
                }
                return response.status(400).send(result)
            }
            const password = bcrypt.hashSync(reqData.password, this.saltRounds);
            const authData = {
                email: reqData.email.toLowerCase(),
                user_name: reqData.userName,
                password: password,
            }
            const status = await this.connection.insertOne(this.collection, authData, 'system');
            const result: IResponse = {
                success: true,
                message: 'Account Created Successfully',
                data: {
                  userId: status.insertedId,
                }
              }
            return response.send(result);
        } catch (error) {
            next(error);
        }
    }
    async generateAccessToken(request: Request, response: Response, next: NextFunction) {
        try {
            const { refreshToken: token, userId } = request.body;
            const selectQueryForRefreshToken = {
                "query": {
                    refresh_token: token,
                    user_id: userId
                }, fields : {}
              };
            const findAuthStatus = await this.connection.findOne(config.collections.tokens, selectQueryForRefreshToken);
            if (!findAuthStatus) {
                response.status(401).send({
                    success: false,
                    message: 'UnAuhorized Refresh token',
                })
            }
            const payload = {
                id: userId.toString(),
            }
            const { success, message } = await authorizer.verifyRefreshToken(token);
            if(!success) {
                const result: IResponse = {
                    success: false,
                    message: message,
                } 
                return response.status(401).send(result);
            }
            const accessToken = authorizer.sign(payload, { expiresIn: config.secretToken.accessTokenExpiresInMinutes }, config.secretToken.accessTokenSecretKey);
            const result: IResponse = {
                success: true,
                message: 'Token generated Successfully',
                data: {
                    token: accessToken
                }
            }
            return response.status(200).send(result);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    private async generateAccessTokenRefreshToken(userId: ObjectId | string) {
        const payload = {
            id: userId.toString(),
        }
        const accessToken = authorizer.sign(payload, { expiresIn: config.secretToken.accessTokenExpiresInMinutes }, config.secretToken.accessTokenSecretKey,);
        const refreshToken = authorizer.sign(payload, { expiresIn: config.secretToken.refreshTokenExpiresInMinutes }, config.secretToken.refreshTokenSecretKey);
        await this.connection.insertOne(config.collections.tokens, { user_id: new ObjectId(userId), refresh_token: refreshToken }, userId);
        return { accessToken, refreshToken }
    }

    
}
export default AuthService;