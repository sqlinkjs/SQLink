import { platform } from "os";
import { SQLog } from "./utils/logger/logger.js";
import { exec } from "child_process";
import { launchProvider } from "./utils/config/provider.js";
import {
  createConfigurationIfNotPresent,
  getAppLatestVersion,
  hasConfiguration,
  initConfiguration,
  returnPropertiesPath,
  writeConfig,
} from "./utils/config/checker.js";
import { initServer } from "./server/init.js";
import { initialiseDatabase } from "./mysql/connector.js";
import { STRINGS } from "./strings.js";
import { staticHost } from "./server/host.js";
import { generateEnum } from "./server/generator.js";

export async function validateCommand(command) {
  if (command == "run") {
    let hasConfig = await hasConfiguration();
    if (hasConfig) {
      await initConfiguration();
      await initialiseDatabase();
      await initServer();
    } else {
      await lpFunction();
    }
  } else if (command == "upgrade") {
    let latestVersion = await getAppLatestVersion()
    if (latestVersion === STRINGS.APP_VERSION) {
      SQLog.info(STRINGS.ALREADY_UP_TO_DATE)
    } else {
      SQLog.info(`${STRINGS.NEW_VERSION_AVAILABLE} ${latestVersion}.`)
      SQLog.info(`${STRINGS.CURRENT_VERSION} ${STRINGS.APP_VERSION}`)
      let update_command =
        platform() == "win32"
          ? STRINGS.NPM_INSTALL_CMD
          : STRINGS.SUDO_NPM_INSTALL_CMD;
      exec(update_command, (error, stdout, stderr) => {
        if (error) {
          SQLog.error(STRINGS.UPDATE_ERROR, false);
          return;
        }
        if (stdout) {
          SQLog.success(STRINGS.UPDATE_SUCCESSFULLY, false);
          return;
        }
        if (stderr) {
          SQLog.error(STRINGS.UPDATE_ERROR, false);
          return;
        }
      });
    }
  } else if (command == "config") {
    await lpFunction();
  } else if (command == "host") {
    staticHost();
  } else if (command == "enum") {
    await initConfiguration();
    await initialiseDatabase();
    await generateEnum();
  }
  else {
    SQLog.error(STRINGS.UNKNOWN_COMMAND, false);
  }
}
export async function lpFunction() {
  await launchProvider()
    .then((res) => {
      let config_path = returnPropertiesPath();
      return { res, config_path };
    })
    .then(async (res) => {
      if (res.res != null) {
        createConfigurationIfNotPresent().then(() => {
          writeConfig(res.res, res.config_path);
        });
      }
    })
    .then(() => {
      return;
    });
}
