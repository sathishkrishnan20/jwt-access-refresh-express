
# JWT Refresh Token Authorization

JWT Refresh Token Authorization is to Validate/Authorize the access token before proceeding. It Also generates the refresh token, with the long expiry 




## API Reference

#### Register

```http
  POST /auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Your Email     |
| `password` | `string` | **Required**. Your password |
| `userName` | `string` | **Required**. Your userName |


#### Signin

```http
  POST /auth/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Your Email     |
| `password` | `string` | **Required**. Your password |

#### Generate accessToken

```http
  POST /auth/accessToken
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `string` | **Required**. Your userId     |
| `refreshToken` | `string` | **Required**. refreshToken provided by Login Response |



#### Get User

```http
  GET /users
```


## Run Locally

Clone the project

```bash
  git clone https://github.com/sathishkrishnan20/jwt-access-refresh-express.git
```

Go to the project directory

```bash
  cd jwt-access-refresh-express
```

Install dependencies

```bash
  npm install
```

Env Variables

```bash
    Create a .env file under root 
    Copy the env Variables from envsample and paste them to .env file.
```

Start the server

```bash
  npm run start
```

