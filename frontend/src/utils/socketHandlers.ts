import { Socket } from "socket.io-client";
import { CreateRoomData, JoinRoomData, MessageData, Room } from "../@types";
import { socket } from "./socket";

export const connect = () => {
  if (!socket.connected) socket.connect();
};

export const disconnect = () => {
  if (socket.connected) socket.disconnect();
};

export default class SocketHandler {
  conn: Socket;
  username?: string;
  room?: Room;

  constructor() {
    connect();
    this.conn = socket;
  }

  createRoom(data: CreateRoomData) {
    if (!data) return;

    this.conn.emit("create_room", data);
    this.room = {
      room_name: data.name,
      room_id: data.id,
    };
  }

  joinRoom(data: JoinRoomData) {
    if (!data) return;

    this.conn.emit("join_room", data);
    this.room = {
      room_name: data.name,
      room_id: data.id,
    };
  }

  leaveRoom() {
    this.conn.emit("leave_room");
    this.room = undefined;
  }

  sendMessage(data: MessageData) {
    if (!data) return;

    this.conn.emit("send_message", data);
  }

  getAllRooms() {
    this.conn.emit("get_all_rooms");
  }
}
