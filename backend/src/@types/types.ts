import { Socket } from "socket.io";
import { z } from "zod";
import Client from "../structs/Client";

const Username = z.string().max(60).min(3);

export type Username = z.infer<typeof Username>;

export type CreateRoomData = {
  id: string;
  name: string;
  username: Username;
};

export type JoinRoomData = {
  id: string;
  name: string;
  username: string;
};

export type PlayStatusData = {
  status: "playing" | "paused";
  current_time: number;
};

export type MessageData = {
  message: string;
};

export type TypingStatusData = {
  typing: boolean;
};

type VideoData = {
  name: string;
  id: string;
  description?: string;
  image?: string;
  duration?: number;
};

export type Video = {
  id: string;
  video_data: VideoData;
  src: string;
  headers?: any;
};
