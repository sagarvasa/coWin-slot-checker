const ServerApplication = require('./application');
const constants = require('./utilities/constants');

async function main(config) {
  try {
    global.env = process.env.NODE_ENV ? process.env.NODE_ENV : constants.ENV_LOCAL;
    const app = new ServerApplication(config);

    await app.init();
    app.listen();

    return app;
  } catch (error) {
    console.error(`Error occured while starting application : ${error.message}`);
    throw error;
  }
}

if (require.main === module) {
  const config = {
    rest: {
      port: +(process.env.PORT ? process.env.PORT : 3000),
      host: process.env.HOST
    },
  };

  main(config)
    .then(() => {
      console.log(`Server is running at port ${config.rest.port}`);
    })
    .catch(err => {
      console.error('Cannot start the application [err]: ', err);
      process.exit(1);
    });
}