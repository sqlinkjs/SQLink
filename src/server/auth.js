import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getPool } from "./../mysql/connector.js";
import { STRINGS } from "../strings.js";
import { SQLog } from "../utils/logger/logger.js";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const pool = getPool();
    SQLog.request(STRINGS.CREATE_NEW_USER,true)
    const [rows, fields] = await pool.query(
      `INSERT into users_created_by_sqlink(email,password) values ('${email}','${hashedPassword}')`
    );
    SQLog.response(STRINGS.NEW_USER_SUCCESS,true)
    res.status(201).json({ success:true,message: STRINGS.USER_REGISTER_SUCCESS });
  } catch (error) {
    res.status(500).json({ success:false,message: "Error creating user: "+error.message });
    SQLog.error(STRINGS.ERROR_CREATE_USER)
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const pool = getPool();
    SQLog.request(STRINGS.LOGIN_REQUEST_RECEIVED,true)
    const [rows, fields] = await pool.query(
      `SELECT * from users_created_by_sqlink where email = '${email}'`
    );
    if (rows.length == 0) {
      return res.status(400).json({ success:false,message: STRINGS.INVALID_CREDENTIALS});
    }
    const user = rows[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      SQLog.error(STRINGS.INVALID_CREDENTIALS_ENTERED,true)
      return res.status(400).json({ success:false,message: STRINGS.INVALID_CREDENTIALS });
    }
    const token = jwt.sign({ userId: user.id }, "THISISASECRETKEYFORSQLINK", {
      expiresIn: "90d",
    });
    res.json({ success:true,token });
    SQLog.response(STRINGS.USER_LOGIN_SUCCESS,true)
  } catch (error) {
    SQLog.error(STRINGS.UNABLE_TO_LOGIN_USER)
    res
      .status(500)
      .json({
        message: "There was an error logging in the user: " + error.message,
      });
  }
});

export default authRouter;
