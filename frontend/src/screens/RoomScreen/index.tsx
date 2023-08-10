import React from "react";

import { useParams, Navigate } from "react-router-dom";
import { getUsername } from "../../utils";
import { SocketContext } from "../../contexts";
import { VideoPlayer } from "../../components";

const RoomScreen: React.FC = () => {
  const { socket } = React.useContext(SocketContext)!;
  const { roomId } = useParams();

  React.useEffect(() => {
    if (socket.room?.room_id === roomId) return;
    socket.joinRoom({
      id: roomId!,
      name: "",
      username: getUsername()!,
    });
    socket.getAllRooms();

    console.log(socket.room);
  }, [roomId]);

  if (!roomId) return <Navigate to="/room" />;

  return (
    <>
      <VideoPlayer socket={socket} />
    </>
  );
};

export default RoomScreen;
