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
    accessTokenSecretKey: 'accessTokenSecretKey!',
    refreshTokenSecretKey: 'refreshTokenSecretKey',
    accessTokenExpiresInMinutes: 15 * 60,
    refreshTokenExpiresInMinutes: 60 * 60 * 24
  } 
}

 