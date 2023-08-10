export type CreateRoomData = {
  id: string;
  name: string;
  username: string;
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

export type Room = {
  room_name: string;
  room_id: string;
};
