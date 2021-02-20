import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

export let subscribers: any[] = [];

export function eventsHandler(req: Request, res: Response) {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);

  const processId = uuidv4().substring(0, 8);
  const initSubscribeData = {
    type: "init-connection",
    processId,
    timestamp: Date.now(),
  };

  const data = `data: ${JSON.stringify(initSubscribeData)}\n\n`;
  sendEventToAllSubscriber(data);

  const newSubscriber = {
    processId,
    res,
  };
  subscribers.push(newSubscriber);

  req.on("close", () => {
    console.log(`${processId} connection closed`);
    subscribers = subscribers.filter(s => s.processId !== processId);
  });
}

export async function sendEventToAllSubscriber(event: any) {
  subscribers.forEach(s => s.res.write(`data: ${JSON.stringify(event)}\n\n`));
}
