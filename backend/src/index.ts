import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import { PORT } from "./config";
import { eventsHandler, sendEventToAllSubscriber } from "./sever-sent";

const app = express();

// Setup middlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Define endpoints
app.get("/message", eventsHandler);

app.post("/connect", (req: Request, res: Response) => {
  const { user } = req.body;
  if (!user) {
    return res.status(400).json({ error: true, message: "invalid payload" });
  }

  sendEventToAllSubscriber({
    type: "message",
    username: user,
    message: `Welcome ${user} to the chat room!!`,
  });
  return res.status(200).json({ success: true });
});

app.post("/message", (req: Request, res: Response) => {
  const { user, message } = req.body;
  if (!user || !message) {
    return res.status(400).json({ error: true, message: "invalid payload" });
  }

  sendEventToAllSubscriber({
    type: "message",
    username: user,
    message,
  });
  return res.status(200).json({ success: true });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
