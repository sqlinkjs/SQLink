import express from "express";
import multer from "multer";
import { SQLog } from "../utils/logger/logger.js";
import { db_config, uploads_folder } from "../utils/config/checker.js";
import { getLocalIpAddress } from "../utils/config/ipconfig.js";
import { STRINGS } from "../strings.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploads_folder);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage,
  limits: {
    fileSize: 500 * 1024 * 1024,
  },
});

const fileuploadrouter = express.Router();
let current_ip = getLocalIpAddress();
fileuploadrouter.post("/", upload.array("files", 50), async (req, res) => {
  const port = db_config.server_port;
  try {
    if(!req.files){
      return res.status(500).json({
        success:false,
        message:STRINGS.REQUIRE_FILES_IN_UPLOAD
      })
    }
    const req_arr = req.files.map((item) => {
      return {
        ...item,
        accessURL:`http://${current_ip}:${port}/file/${item.filename}`
      }
    })
    SQLog.request(STRINGS.UPLOAD_REQUEST_RECEIVED, true);
    SQLog.response(STRINGS.FILE_UPLOADED_SUCCESS,true)
    return res.json({
      success: true,
      data:req_arr
    });
  } catch (error) {
    SQLog.error(
      `File upload failed ${error.message ? error.message : ""}`,
      true
    );
    return res
      .status(500)
      .json({
        success: false,
        message:
          STRINGS.FILE_SIZE_LIMIT_MESSAGE,
      });
  }
});

export default fileuploadrouter;
