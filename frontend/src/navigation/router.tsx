import { createBrowserRouter } from "react-router-dom";
import { HomeScreen, RoomScreen, RoomsScreen } from "../screens/";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RoomsScreen />,
  },
  {
    path: "/rooms",
    element: <RoomsScreen />,
  },
  {
    path: "/room/:roomId",
    element: <RoomScreen />,
  },
]);
