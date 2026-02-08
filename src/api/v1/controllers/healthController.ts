import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpStatus";

export const healthCheck = (req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK).json({ status: "ok" });
};
