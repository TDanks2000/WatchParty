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
import Queue from "../structs/Queue";
import { isClientInWatchroom } from "../services";

const createQueue = () => {
  return new Queue();
};

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

    client.send({
      type: "create_room",
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

    client.send({
      type: "join_room",
      message: `Joined ${data.name}`,
    });

    client.broadcast({
      type: "join_room",
      message: `${data.username} joined`,
    });
  }
};

export const getRoomsHandler = (client: Client) => {
  const rooms = Data.getWatchrooms();
  let room_names = [...rooms.keys()];
  room_names.sort();

  client.send({
    room_names,
  });
};

export const PlayStatusHandler = (client: Client, data: PlayStatusData) => {
  client.broadcast(data);
};

export const SendMessageHandler = (client: Client, data: MessageData) => {
  client.broadcast({
    username: client.username,
    ...data,
  });
};

export const TypingStatusHandler = (client: Client, data: TypingStatusData) => {
  client.broadcast({
    username: client.username,
    ...data,
  });
};
