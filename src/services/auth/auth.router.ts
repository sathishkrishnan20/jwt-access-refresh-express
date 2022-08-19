import express, { Request, Response, NextFunction } from 'express';
import AuthService from './auth.model';
import JoiValidator from '../../helpers/joi-validator';

import { GenerateAccessToken, UserSignIn, UserSignUp } from './schema';
import config from '../../config';

const router = express.Router();
const  authService = new AuthService(config.collections.users);


router.post('/login', JoiValidator(UserSignIn), (request: Request, response: Response, next: NextFunction) => authService.signIn(request, response, next));
router.post('/accessToken', JoiValidator(GenerateAccessToken), (request: Request, response: Response, next: NextFunction) => authService.generateAccessToken(request, response, next));
router.post('/register', JoiValidator(UserSignUp), (request: Request, response: Response, next: NextFunction) => authService.signUp(request, response, next));

export default router;
