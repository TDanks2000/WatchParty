import React from "react";
import {
  SetUsername,
  SetUsernameButtonContainer,
  SetUsernameButtonIcon,
  SetUsernameContainer,
  SetUsernameError,
} from "./styles";
import { setUsername, utils } from "../../utils";
import { SocketContext } from "../../contexts";

const SetUsernameInput = () => {
  const [error, setError] = React.useState<string | boolean>(false);
  const { socket } = React.useContext(SocketContext)!;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const usernameInput = form.elements[0] as HTMLInputElement;
    const username = usernameInput.value;
    const checkUsername = utils.verifyUsername(username);

    if (typeof checkUsername !== "string" && checkUsername?.error)
      return setError(checkUsername.error);

    setError(false);
    setUsername(username, socket);
  };

  const onChange = () => {
    setError(false);
  };

  return (
    <>
      <SetUsernameContainer onSubmit={onSubmit} autoComplete={"false"} autoCorrect="false">
        <SetUsername placeholder="Enter username" onChange={onChange} />
        <SetUsernameButtonContainer>
          <SetUsernameButtonIcon />
        </SetUsernameButtonContainer>
      </SetUsernameContainer>
      {error && <SetUsernameError>{error}</SetUsernameError>}
    </>
  );
};

export default SetUsernameInput;
