import React from "react";
import {
  Button,
  ButtonContainer,
  Container,
  Form,
  FormItem,
  Input,
  Label,
  Title,
  Wrapper,
} from "./styles";

type Props = {
  onSubmit: () => void;

  roomdName: string;
  roomId: string;

  setRoomdName: (name: string) => void;
  setRoomId: (id: string) => void;
};

const CreateRoomPopup: React.FC<Props> = ({
  onSubmit,
  roomId,
  roomdName,
  setRoomId,
  setRoomdName,
}) => {
  return (
    <Container>
      <Wrapper>
        <Title>Create a new Watch Party</Title>
        <Form method="dialog" onSubmit={onSubmit}>
          <FormItem>
            <Label>Name</Label>
            <Input value={roomdName} onChange={(e) => setRoomdName(e.target.value)} />
          </FormItem>
          <FormItem>
            <Label>Id</Label>
            <Input value={roomId} onChange={(e) => setRoomId(e.target.value)} />
          </FormItem>
          <ButtonContainer>
            <Button>Create</Button>
          </ButtonContainer>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default CreateRoomPopup;
