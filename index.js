#!/usr/bin/env node

import { program } from "commander";
import { validateCommand } from "./src/app.js";
import { STRINGS } from "./src/strings.js";

program
  .version(STRINGS.APP_VERSION)
  .name(STRINGS.APP_NAME)
  .description(STRINGS.APP_DESCRIPTION)
  .option("run", STRINGS.RUN_COMMAND)
  .option("upgrade", STRINGS.UPDATE_COMMAND)
  .option("config", STRINGS.CONFIG_COMMAND)
  .option("host", STRINGS.HOST_STATIC_FILES)
  .option("generate", STRINGS.GENERATE_ENUMS)
  .arguments("option")
  .action(async (command) => {
    await validateCommand(command);
  });
program.parse(process.argv);
