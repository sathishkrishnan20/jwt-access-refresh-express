import express, { Request, Response, NextFunction } from 'express';
import UserService from './users.model';
import JoiValidator from '../../helpers/joi-validator';

const router = express.Router();


router.get('/', JoiValidator(undefined), (request: Request, response: Response, next: NextFunction) => UserService.getById(request, response, next));

export default router;
