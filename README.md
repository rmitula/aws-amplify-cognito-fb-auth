# aws-amplify-cognito-fb-auth
Simple React based AWS Amplify app connected with AWS Cognito & Facebook calling protected Lambda function

## Technology stack / Tools used
- AWS API Gateway
- AWS Cognito
  - User Pools
  - Federated Identities
- AWS Amplify
- AWS Lambda
- React
- Facebook Login API

## Demo
![](.README_images/showcase.gif)

## Configuration

config.js
```
export default {
    apiGateway: {
        REGION: "",
        URL: ""
    },
    cognito: {
        REGION: "",
        USER_POOL_ID: "",
        APP_CLIENT_ID: "",
        IDENTITY_POOL_ID: ""
    },
    social: {
        FACEBOOK: ""
    }
};
```
