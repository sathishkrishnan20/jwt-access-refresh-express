export default {
  express: {
    port: process.env.EXPRESS_PORT || 3000,
    ip: 'localhost' 
  },
  collections: {
    users: 'users',
    tokens: 'tokens'
  },
  secretToken: {
    accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRETKEY,
    refreshTokenSecretKey: process.env.ACCESS_TOKEN_SECRETKEY,
    accessTokenExpiresInMinutes: 15 * 60,
    refreshTokenExpiresInMinutes: 60 * 60 * 24
  } 
}

 
