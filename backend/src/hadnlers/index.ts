import { Socket } from "socket.io";
import { console } from "../utils";
import {
  CreateRoomData,
  JoinRoomData,
  MessageData,
  PlayStatusData,
  TypingStatusData,
} from "../@types";
import { Data } from "../utils/Data";
import Client from "../structs/Client";
import { isClientInWatchroom } from "../services";

// create_room
export const CreateRoomHandler = (client: Client, data: CreateRoomData) => {
  if (!data) {
    return client.send({
      type: "create_room",
      err: "No data provided.",
    });
  }

  if (Data.getWatchroom(data.id)) {
    client.send({
      type: "create_room",
      err: "Watchroom already exists.<br /> Please choose another name.",
    });
  } else {
    client.setUsername(data.username);
    Data.createWatchroom(data.id, client);

    client.sendEmit("create_room", {
      message: `Watchroom ${data.id} created`,
    });
  }
};

// join_room
export const JoinRoomHandler = (client: Client, data: JoinRoomData) => {
  if (!data) {
    return client.send({
      type: "join_room",
      err: "No data provided.",
    });
  }
  const watchroom = Data.getWatchroom(data.id);

  if (!watchroom) return;
  if (isClientInWatchroom(watchroom, data.username)) {
    client.send({
      type: "join_room",
      err: "username already exists",
    });
  } else {
    client.setUsername(data.username);
    watchroom.join(client);

    client.sendEmit("join_room", {
      message: `Joined ${data.name}`,
    });

    client.broadcast({
      type: "join_room",
      message: `${data.username} joined`,
    });

    console.info(`${data.username} has joined ${watchroom.id}`);
  }
};

// get_all_rooms
export const getRoomsHandler = (client: Client) => {
  const rooms = Data.getWatchrooms();
  let room_names = [...rooms.keys()];
  room_names.sort();

  client.sendEmit("rooms", {
    room_names,
  });
};

// leave_room
export const leaveRoomHandler = (client: Client) => {
  client.watchroom?.leave(client);
  client.sendEmit("left_room", true);
};

// change_room
export const changeRoomHandler = (client: Client, data: JoinRoomData) => {
  client.watchroom?.leave(client);
  JoinRoomHandler(client, data);
};

// play_status
export const PlayStatusHandler = (client: Client, data: PlayStatusData) => {
  client.broadcast(data);
};

// send_message
export const SendMessageHandler = (client: Client, data: MessageData) => {
  client.broadcast({
    username: client.username,
    ...data,
  });
};

// typing_status
export const TypingStatusHandler = (client: Client, data: TypingStatusData) => {
  client.broadcast({
    username: client.username,
    ...data,
  });
};
