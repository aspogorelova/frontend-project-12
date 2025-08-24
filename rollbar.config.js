import Rollbar from 'rollbar'

const getNodeEnv = () => {
  try {
    return import.meta.env.MODE || 'development'
  }
  catch (error) {
    console.log(error)
    return 'development'
  }
}

const rollbar = new Rollbar({
  accessToken: 'a218e30b0e254c818713a532a06258711722db09c0cc4e584a6d801b00f987d4c9d74f97a9cd60f7fb638f9136991548',
  environment: getNodeEnv(),
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    client: {
      javascript: {
        source_map_enabled: true,
        guess_uncaught_frames: true,
      },
    },
  },
})

export default rollbar
