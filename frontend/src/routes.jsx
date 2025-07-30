export const apiPath = 'api/v1'

export default {
  loginPagePath: () => [apiPath, 'login'].join('/'),
  signUpPagePath: () => [apiPath, 'signup'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  mainPagePath: () => [apiPath, '/'].join(''),
  errorPagePath: () => [apiPath, 'error'].join('/'),
}