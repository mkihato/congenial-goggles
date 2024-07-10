const apiLogger= require('./apiLogger')

let logger= apiLogger;

// if (process.env.NODE_ENV !== 'production') {
//     logger=apiLogger;
// }

module.exports= logger;