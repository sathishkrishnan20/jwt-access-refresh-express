
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

export default (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
      return next()
    }
    let token = req.get('authorization');
    if (!token) {
      return res.status(401).send({
        success: false,
        message: '401 UnAuthorized'
      });
    }
      if (token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
      }
      jwt.verify(token, config.secretToken.accessTokenSecretKey, function (err, decoded: any)  {
          if (err) {
              console.log(err);
              return res.status(401).send({
                  success: false,
                  message: '401 UnAuthorized'
              });
          }
          req.body.userId = decoded?.id;
          return next();
      })
};
