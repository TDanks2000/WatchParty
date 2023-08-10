import { createServer } from "node:http";
import { Server, Socket } from "socket.io";
import { console } from "./utils";
import {
  CreateRoomHandler,
  JoinRoomHandler,
  PlayStatusHandler,
  SendMessageHandler,
  TypingStatusHandler,
  changeRoomHandler,
  getRoomsHandler,
  leaveRoomHandler,
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

const PORT = process.env.PORT ?? 3002;

io.on("connection", (socket) => {
  console.info("Connected", socket.id);
  const client = createClient(socket);

  socket.on("disconnect", (reason) => {
    console.setColor("redBright");
    console.log("Disconnected", reason);
    client.watchroom?.leave(client);
    client.sendEmit("left_room", true);
  });

  socket.on("create_room", (data: CreateRoomData) => CreateRoomHandler(client, data));

  socket.on("join_room", (data: JoinRoomData) => JoinRoomHandler(client, data));

  socket.on("leave_room", () => leaveRoomHandler(client));

  socket.on("change_room", (data: JoinRoomData) => changeRoomHandler(client, data));

  socket.on("get_all_rooms", () => getRoomsHandler(client));

  socket.on("play_status", (data: PlayStatusData) => PlayStatusHandler(client, data));

  socket.on("send_message", (data: MessageData) => SendMessageHandler(client, data));

  socket.on("typing_status", (data: TypingStatusData) => TypingStatusHandler(client, data));
});

httpServer.listen(PORT, () => {
  console.setColor("greenBright");
  console.log(`Server started on port ${PORT}`);
});
