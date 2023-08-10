import React from "react";
import { SocketContext } from "../../contexts";
import { CreateRoomCard, RoomCard } from "../../components";
import { Container } from "./styles";

const RoomsScreen: React.FC = () => {
  const [rooms, setRooms] = React.useState([]);
  const { socket } = React.useContext(SocketContext)!;

  React.useEffect(() => {
    socket.getAllRooms();

    socket.conn.on("rooms", (data: any) => {
      data = JSON.parse(data);
      console.log(data);
      setRooms(!data?.room_names ? null : data?.room_names);
    });
  }, []);

  return (
    <Container>
      <CreateRoomCard />
      {rooms.map((room: any) => {
        return <RoomCard room={room} key={room} />;
      })}
    </Container>
  );
};

export default RoomsScreen;
