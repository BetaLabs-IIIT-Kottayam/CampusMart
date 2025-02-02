const app = require('./app');

process.on('uncaughtException', (err) => {

  console.log(err.name, err.message);
  console.log('Unhandled Exception!  Shutting down...');

  process.exit(1);
});

const port = 3000;
const server = app.listen(port, () => {
  console.log('server is running in the port 3000');
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled rejection!  Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
