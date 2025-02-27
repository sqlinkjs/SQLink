export const STRINGS = {
  APP_VERSION: "1.1.9",
  APP_NAME: "sqlink",
  APP_DESCRIPTION:
    "SQLink is a Node.js library that turns MySQL tables into RESTful APIs with procedure execution and full CRUD support.",
  RUN_COMMAND: "runs the sqlink program",
  RUN_AUTH_COMMAND: "runs the sqlink program with authentication",
  UPDATE_COMMAND: "updates the library to the latest version",
  CONFIG_COMMAND: "you can update the mysql configuration from CLI",
  UPDATE_ERROR:
    "Oops!, something went wrong while updating the package, please try again.",
  UPDATE_SUCCESSFULLY: "Package updated successfully!!",
  UNKNOWN_COMMAND: "Unkown command, please press sqlink -h to see options",
  DATABASE_NOT_INITIALISED:
    "Database pool not initialized. Call initialiseDatabase() first.",
  HOST_STATIC_FILES: "Host static files",
  GENERATE_ENUMS: "Generate enum",
  NPM_INSTALL_CMD: "npm install -g sqlink@latest",
  SUDO_NPM_INSTALL_CMD: "sudo npm install -g sqlink@latest",
  HOST_ERROR_MESSAGE: "Please mention a valid port and folder path to host static file server",
  UNABLE_TO_START_SERVER: "Oops, unable to start the server",
  RERUN_STATEMENT: "Please run 'sqlink run' command to start the program with applied MySQL configuration, or use 'sqlink config' to update the configuration.",
  MYSQL_HOST:"Enter your MySQL host: ",
  MYSQL_USER:"Enter your MySQL user: ",
  MYSQL_PASSWORD:"Enter your MySQL password: ",
  MYSQL_PORT:"Enter your MySQL port: ",
  MYSQL_DATABASE:"Enter Database name: ",
  APP_PORT:"Enter the port where app needs to be hosted: ",
  NO_USERS_TABLE:"No users table found so creating one",
  DATA_INSERTION_SUCCESS:"Data inserted successfully",
  DATA_UPDATE_SUCCESS:"Data updated successfully",
  DATA_DELETE_SUCCESS:"Data deleted successfully",
  DATA_UPSERT_SUCCESS:"Upsert operation completed",
  ACCESS_DENIED: "Access Denied",
  INVALID_TOKEN: "Invalid Token",
  INVALID_CREDENTIALS:"Invalid Credentials",
  USER_REGISTER_SUCCESS:"User register succesful",
  CREATE_NEW_USER: "Request to create a new user",
  NEW_USER_SUCCESS: "New user created successfully",
  ERROR_CREATE_USER: "Unable to create new user",
  LOGIN_REQUEST_RECEIVED: "Login user request received",
  INVALID_CREDENTIALS_ENTERED: "Unable to login user as credentials were invalid",
  USER_LOGIN_SUCCESS: "Login user successfull",
  UNABLE_TO_LOGIN_USER: "Unable to login the user",
  ENUM_INVALID_TABLE: "Please provide a table name to generate the enum",
  ENUM_GENERATED_SUCCESS: "Enum generated successfully",
  ENUM_GENERATION_FAILED: "Failed to generate enum",
  ENUM_COPIED_CLIPBOARD: "Enum has been copied to your clipboard, you can paste it in your code.",
  INVALID_TABLE_NAME: "Invalid table name",
  REQUIRE_FILES_IN_UPLOAD: "please use the payload key name as 'files' to upload",
  UPLOAD_REQUEST_RECEIVED: "File upload request received",
  FILE_UPLOADED_SUCCESS: "File uploaded successfully",
  FILE_SIZE_LIMIT_MESSAGE: "Unable to upload the file, please make sure file size is less than 500 MB",
  UNABLE_TO_START_PROGRAM: "Unable to start the program",
  PORT_ALREADY_IN_USE: "Unable to start program, Port might be already in use",
  RUNNING_IN_AUTH_MODE: "Application is currently running with authentication, please include the token in your queries",
  URLS:{
    WEBSITE: "https://sqlinkjs.github.io/",
    NPM: "https://www.npmjs.com/package/sqlink",
    GITHUB: "https://github.com/Santhoshlm10/SQLink"
  },
  ALREADY_UP_TO_DATE: "SQLink is already on the latest version!",
  NEW_VERSION_AVAILABLE: "New version of SQLink is available",
  CURRENT_VERSION: "Current Version: "
};
