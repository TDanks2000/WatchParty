import { createServer } from "node:http";
import { Server, Socket } from "socket.io";
import { console } from "./utils";
import {
  CreateRoomHandler,
  JoinRoomHandler,
  PlayStatusHandler,
  SendMessageHandler,
  TypingStatusHandler,
  getRoomsHandler,
} from "./hadnlers";
import {
  CreateRoomData,
  JoinRoomData,
  MessageData,
  PlayStatusData,
  TypingStatusData,
} from "./@types";
import Client from "./structs/Client";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const createClient = (conn: Socket) => {
  return new Client(conn);
};

io.on("connection", (socket) => {
  console.info("Connected", socket.id);
  const client = createClient(socket);

  socket.on("disconnect", (reason) => {
    console.setColor("redBright");
    console.log("Disconnected", reason);
  });

  socket.on("create_room", (data: CreateRoomData) => CreateRoomHandler(client, data));

  socket.on("join_room", (data: JoinRoomData) => JoinRoomHandler(client, data));

  socket.on("get_all_rooms", () => getRoomsHandler(client));

  socket.on("play_status", (data: PlayStatusData) => PlayStatusHandler(client, data));

  socket.on("send_message", (data: MessageData) => SendMessageHandler(client, data));

  socket.on("typing_status", (data: TypingStatusData) => TypingStatusHandler(client, data));
});

httpServer.listen(3000, () => {
  console.setColor("greenBright");
  console.log(`Server started on port 3000`);
});
