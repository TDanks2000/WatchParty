import { Username } from "../@types";
import Client from "../structs/Client";
import Watchroom from "../structs/Watchroom";

export const isClientInWatchroom = (watchroom: Watchroom, username: Username) => {
  if (watchroom && username) {
    for (let client of watchroom.clients) if (client.username === username) return true;
  }
  return false;
};
