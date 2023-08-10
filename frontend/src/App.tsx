import React, { useEffect } from "react";
import { VideoPlayer } from "./components";
import { SocketContext } from "./contexts";
import SetUsername from "./containers/SetUsername";
import { SharedContainer } from "./styles/shared-styles";

import { RouterProvider } from "react-router-dom";
import { router } from "./navigation";
const App = () => {
  const { socket, room, changeRoom, username } = React.useContext(SocketContext)!;

  if (!username) {
    return (
      <SharedContainer>
        <SetUsername />
      </SharedContainer>
    );
  }

  return <RouterProvider router={router} />;
};

export default App;
