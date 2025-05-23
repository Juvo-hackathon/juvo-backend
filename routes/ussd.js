import { Router } from "express";
import { handleUssd } from "../controllers/ussd.js";

const ussdRouter = Router();
ussdRouter.post('/', handleUssd);


export default ussdRouter;