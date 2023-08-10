import React from "react";
import { Container } from "./styles";
import CreateRoomPopup from "./Popup";
import { getUsername } from "../../utils";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../contexts";

const CreateRoomCard: React.FC = () => {
  const navigate = useNavigate();
  const { socket, changeRoom } = React.useContext(SocketContext)!;
  const [showPopup, setShowPopup] = React.useState(false);
  const [roomName, setRoomName] = React.useState("");
  const [roomId, setRoomId] = React.useState("");

  const handleSubmit = () => {
    const username = getUsername()!;

    if (!username || !roomId || !roomName) return;

    socket.createRoom({
      id: roomId,
      name: roomName,
      username,
    });
    changeRoom({
      room_id: roomId,
      room_name: roomName,
    });

    navigate(`/room/${roomId}`);

    setShowPopup(false);
  };

  return (
    <>
      <Container onClick={() => setShowPopup(true)}>Create party</Container>
      <dialog open={showPopup}>
        <CreateRoomPopup
          onSubmit={handleSubmit}
          roomId={roomId}
          roomdName={roomName}
          setRoomId={setRoomId}
          setRoomdName={setRoomName}
        />
      </dialog>
    </>
  );
};

export default CreateRoomCard;
