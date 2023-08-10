import React from "react";
import SocketHandler from "../utils/socketHandlers";
import { Room } from "../@types";
import { getUsername } from "../utils";

type ContextOptions = {
  socket: SocketHandler;
  paused: boolean;
  setPaused: (paused: boolean) => void;
  room: Room;
  changeRoom: (room: Room) => void;

  username?: string;
  changeUsername: (username: string) => void;
};

export const SocketContext = React.createContext<ContextOptions | null>(null);

export const SocketContextProvider = ({ children }: any) => {
  const [room, setRoom] = React.useState<Room>();
  const [username, setUsername] = React.useState<string>();

  const [paused, setPaused] = React.useState<boolean>(true);

  const socket = new SocketHandler();

  const changeRoom = (room: Room) => {
    setRoom(room);
    socket.room = room;
  };

  const changeUsername = (username: string) => {
    setUsername(username);
    socket.username = username;
  };

  React.useEffect(() => {
    const username = getUsername();
    if (username) {
      setUsername(username);
      socket.username = username;
    }

    socket.conn.on("left_room", () => {
      console.log("left room");
      setRoom(undefined);
      socket.room = undefined;
    });
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        paused,
        setPaused,
        room: room!,
        changeRoom,
        username,
        changeUsername,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
