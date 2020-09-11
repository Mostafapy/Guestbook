const _errorFormat = (error, addStack = false) => ({
    name: error.name,
    message: error.message,
    ...(addStack ? {
        stack: error.stack.split('\n').map((ele) => ele.trim()),
    } : {})
});

const _prepareMetaData= (metaData) => {
    for (const i in metaData) {
      if (metaData[i] instanceof Error) {
        metaData[i] =_errorFormat(
          metaData[i],
          true
        );
      }
    }

    return metaData;
}

const createLogger = (moduleName) => {
   const logger = {};

   // log
   logger.log = (message, metaData= {}) => {
    const date= new Date();

    if (process.env.NODE_ENV !== 'test') {
      console.log(
        JSON.stringify({
          name: moduleName,
          message,
          level: 'log',
          formattedDate: date.toISOString(),
          env: process.env.NODE_ENV,
          processId: process.pid,
          timestamp: date.getTime(),
          metaData: _prepareMetaData(metaData),
        }),
      );
      console.log(' ');
    }
  }

  // error
  logger.error = (message, metaData= {}) => {
    const date = new Date();

    if (process.env.NODE_ENV !== 'test') {
      console.error(
        JSON.stringify({
          name: moduleName,
          message,
          level: 'error',
          formattedDate: date.toISOString(),
          env: process.env.NODE_ENV,
          processId: process.pid,
          timestamp: date.getTime(),
          metaData: _prepareMetaData(metaData),
        }),
      );
      console.error(' ');
    }
  }

  return logger;
}

module.exports = createLogger;