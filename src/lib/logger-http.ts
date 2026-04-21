import { randomUUID } from "crypto";

import { logger } from "./logger.js";
import { pinoHttp } from "pino-http";

export const loggerHttp = pinoHttp({
  logger,
  genReqId: () => randomUUID(),
  customLogLevel: (req, res, err) => {
    if (res.statusCode >= 500 || err) {
      return "error";
    } else if (res.statusCode >= 400) {
      return "warn";
    }
    return "info";
  },
  serializers: {
    req(req) {
      return {
        method: req.method,
        url: req.url,
        reqId: req.id,
      };
    },
    res(res) {
      return {
        statusCode: res.statusCode,
      };
    },
  },
});
