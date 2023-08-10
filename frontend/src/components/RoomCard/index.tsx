import React from "react";
import { Container } from "./styles";

type Props = {
  room: string;
};

const RoomCard: React.FC<Props> = ({ room }) => {
  return <Container href={`/room/${room}`}>{room}</Container>;
};

export default RoomCard;
