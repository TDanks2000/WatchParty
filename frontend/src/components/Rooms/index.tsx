import React from "react";
import SocketHandler from "../../utils/socketHandlers";

type Props = {
  socket: SocketHandler;
};

const Rooms: React.FC<Props> = ({ socket }) => {
  const [rooms, setRooms] = React.useState<any>(null);

  React.useEffect(() => {
    socket.getAllRooms();

    socket.conn.on("rooms", (data: any) => {
      data = JSON.parse(data);
      console.log(data);
      setRooms(!data?.room_names ? null : data?.room_names);
    });
  }, []);

  return (
    <div style={{ color: "white" }}>
      {!rooms?.length ? "ROOMS" : rooms.map((data: any) => data)}
    </div>
  );
};

export default Rooms;
