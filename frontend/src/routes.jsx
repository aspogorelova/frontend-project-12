const apiPath = 'api/v1'

export default {
  loginPagePath: () => [apiPath, 'login'].join('/'),
  signUpPagePath: () => [apiPath, 'signup'].join('/'),
  mainPagePath: () => [apiPath, '/'].join(''),
  errorPagePath: () => [apiPath, 'error'].join('/'),
}