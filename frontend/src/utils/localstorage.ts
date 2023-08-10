import SocketHandler from "./socketHandlers";

export const setUsername = (username: string, socket: SocketHandler) => {
  const hasUsername = localStorage.getItem("username");
  if (!hasUsername) {
    socket.username = username;
    return localStorage.setItem("username", username);
  } else {
    socket.username = username;
  }
};

export const getUsername = () => {
  const username = localStorage.getItem("username");
  return username;
};
