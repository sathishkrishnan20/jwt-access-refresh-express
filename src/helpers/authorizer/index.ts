
import jwt, { SignOptions } from 'jsonwebtoken';
import config from '../../config';
export = {
  sign: (payload: string | object | Buffer, $Options: any, secretKey: string) => {
    const signOptions: SignOptions = {
      expiresIn:  $Options.expiresIn, // 30 days validity
    };
    return jwt.sign(payload, secretKey, signOptions);
  },
  decode: (token: string) => {
    return jwt.decode(token, {
      complete: true
    });
  },
  verifyRefreshToken: async (token: string) => {
    try {
      await jwt.verify(token, config.secretToken.refreshTokenSecretKey);
      return {
        success: true,
        message:''
      }
    } catch (error) {
      if ((error as Error).name == "TokenExpiredError") {
        return {
          success: false,
          message: 'Refresh Token Expired'
        }
      }
      throw error;
    }
  }
}
