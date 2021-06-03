import app from "./App";

const port = process.env.PORT || 3000;

async function initializeAsync() {
  try {
    // printMCLogo();
    // validateEnvironmentVars();
    // await initDatabaseAsync();
    // initServiceBus();
    // await accountController.createAdminAccount();

    app.listen(port, () => {
      //   if (err) {
      //     console.error(`Error starting server: ${err}`);
      //     process.abort();
      //   }
      console.log(`Server is listening on port ${port}.`);
      return;
    });
  } catch (ex) {
    console.error("Exception when starting server", ex);

    // await EmailService.sendErrorEmailProduction(JSON.stringify(serializeError(ex)));
  }
}

initializeAsync();
