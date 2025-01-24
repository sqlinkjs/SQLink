<p align="center">
  <img src="https://sqlinkjs.github.io/images/logo.png" alt="github-small" height="110" width="200">
</p>
<h1 align="center">SQLink</h1>
<div align="center">
  <a href="https://sqlinkjs.github.io">Website</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://sqlinkjs.github.io/docs/docs.html">Documentation</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://github.com/Santhoshlm10/SQLink/issues">Issues</a>
  <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
  <a href="https://www.npmjs.com/package/sqlink">npm</a>
  <br /><br />

  [![npm version](https://img.shields.io/npm/v/sqlink.svg?style=flat-square)](https://badge.fury.io/js/sqlink)
![license](https://img.shields.io/npm/l/sqlink.svg?style=flat-square)
[![downloads](https://img.shields.io/npm/dm/sqlink.svg?style=flat-square)](https://www.npmjs.com/package/sqlink)

</div><br/>




**SQLink** is a Node.js library that turns MySQL tables into RESTful APIs with procedure execution and full CRUD (Create, Read, Update, Delete) support. With SQLink, you can easily expose your MySQL tables and stored procedures as APIs, allowing seamless interaction with your database through HTTP requests.

## Installation

Before using SQLink, ensure that you have npm installed on your machine. You can install SQLink globally using the following commands:

- **For Linux/MacOS:**
  ```bash
  sudo npm install -g sqlink
  ```
- **For Windows:**
  ```bash
  npm install -g sqlink
  ```

## Getting Started

Before querying data from MySQL, you need to configure SQLink. To do this, run the following command:

- **Without Auth**
  ```
  sqlink run
  ```
- **With Auth**
  ```
  sqlink run auth
  ```
After running this command, you will be prompted in the console to enter your MySQL credentials.

> **Important:** Configuration is required only when you run the program for the first time or if the configuration file has been deleted.

Once you enter the MySQL and Server configuration, you can re-run `sqlink run` command again and start querying the data.

## Usage

### Querieing Tables

SQLink allows you to interact with your MySQL tables using RESTful endpoints.

**Base URL:**
```
https://localhost:3001/table/{tableName}/{mode}
```

- **`tableName`**: The name of the MySQL table you want to query.
- **`mode`**: The operation you want to perform. It can be one of the following: `create`, `read`, `update`, `delete`.

#### Create

Use this method to insert data into your MySQL table.

- **URL:**
  ```
  https://localhost:3001/table/{tableName}/create
  ```
- **Method:** `POST`
- **Payload:**
  ```json
  {
      "column1": "value1",
      "column2": "value2"
  }
  ```
- **Response:**
  - `200 OK` if inserted successfully.

#### Read

Use this method to retrieve data from your MySQL table.

- **URL:**
  ```
  https://localhost:3001/table/{tableName}/read
  ```
- **Method:** `GET`
- **Response:**
  - `200 OK` if queried successfully.

#### Update

Use this method to update data in your MySQL table.

- **URL:**
  ```
  https://localhost:3001/table/{tableName}/update({updateKey},{updateValue})
  ```
- **Method:** `PUT`
- **Payload:**
  ```json
  {
      "column1": "value1_updated",
      "column2": "value2_updated"
  }
  ```
- **Response:**
  - `200 OK` if updated successfully.

#### Delete

Use this method to delete a record from your MySQL table.

- **URL:**
  ```
  https://localhost:3001/table/{tableName}/delete({deleteKey},{deleteValue})
  ```
- **Method:** `DELETE`
- **Payload:**
  ```json
  {
     // Payload is not considered even if sent from the client
  }
  ```
- **Response:**
  - `200 OK` if deleted successfully.

### Executing Procedures

SQLink also supports executing stored procedures through API calls.

**Base URL:**
```
https://localhost:3001/procedure/{procedureName}
```

- **Stored Procedures:** A stored procedure in SQL is a precompiled collection of SQL statements stored in the database, which can be executed as a single unit to perform a specific task, like data manipulation or business logic.

#### Example

- **URL:**
  ```
  https://localhost:3001/procedure/topfiveusers()
  ```
  Or with arguments:
  ```
  https://localhost:3001/procedure/topfiveusers('MALE')
  ```
- **Method:** `GET`
- **Response:**
  - `200 OK` if executed successfully.

### Hosting Files

You can also host local files throught http and access from URL.

- **In your terminal**
  ```bash
  sqlink host YOUR_PORT YOUR_PATH
  ```

#### Example
- **In your terminal**
  ```bash
  sqlink host 3002 Downloads
  ```

Open your browser and navigate to http://localhost:3002/static/<ANY_FILENAME_IN_DOWNLOADS_DIRECTORY>

### Uploading Files

SQLink provides inbuild API to upload files and returns the URL where the file is uploaded.

- **URL**
  ```bash
  http://localhost:YOUR_PORT/upload
  ```
#### Example
- **URL**
  ```bash
  http://localhost:3001/upload
  ```
- **Method:** `POST`
- **Payload:**
  ```json
  {
      "files": (file)
  }
  ```
- **Response:**
  - `200 OK` if uploaded successfully.
  ```
   {
          "success": true,
          "data": [
              {
                  "fieldname": "files",
                  "originalname": "YOUR_FILE_NAME",
                  "encoding": "7bit",
                  "mimetype": "text/csv",
                  "destination": "YOUR_DESTINATION",
                  "filename": "YOUR_FILE_NAME",
                  "path": "YOUR_PATH",
                  "size": 512,
                  "accessURL": "http://192.168.1.4:3001/file/YOUR_FILE_NAME.csv"
              }
          ]
      }
  ```
> **Important:** Make sure the key in the payload remains as ***files***, using any other payload key will result in error response.


### Generating Enum

SQLink helps you to generate enum for your MySQL tables and you can use the generated enum directly in your code.

- **Usage**
  ```bash
  sqlink enum <YOUR_TABLE_NAME>
  ```
- **Example**
  ```bash
  sqlink enum customer
  ```
- **Output**
  ```bash
  export enum CUSTOMERS_Enum {
	customerNumber = "customerNumber",
	customerName = "customerName",
	contactLastName = "contactLastName",
	contactFirstName = "contactFirstName",
	phone = "phone",
	addressLine1 = "addressLine1",
	addressLine2 = "addressLine2",
	city = "city",
	state = "state",
	postalCode = "postalCode",
	country = "country",
	salesRepEmployeeNumber = "salesRepEmployeeNumber",
	creditLimit = "creditLimit"
  }
  ```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss potential improvements or new features.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.