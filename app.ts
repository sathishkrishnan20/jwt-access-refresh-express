
import express, { Request, Response, NextFunction } from "express";
import DBUtil from './src/utils/db-util';
import HttpException from './src/utils/error-handler';
import cors  from 'cors';
import authRouter from './src/services/auth/auth.router'

import userRouter from './src/services/users/users.router'
import createError from 'http-errors';
import validateAuthorization from "./src/middlewares/validateAuthorization";


const connectDb = async () => {
  try {
    var connection = new DBUtil();
    await connection.initiateConnection();
  } catch (ex) {
    console.error('Failed to make database connections!')
    console.error(ex)
  }
}
connectDb();

var app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);

app.use(validateAuthorization)
app.use('/users', userRouter);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: HttpException, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    success: false,
    message: err.message,
    stack: err.stack,
    status: err.status
  });
});

export default app;
