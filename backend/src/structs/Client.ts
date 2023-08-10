import { Socket } from "socket.io";
import { Username } from "../@types";
import Watchroom from "./Watchroom";
import { console } from "../utils";

class Client {
  connection: Socket;
  watchroom: Watchroom | null;
  id: string;
  username: Username;
  isAdmin: boolean;

  constructor(conn: Socket) {
    this.connection = conn;
    this.watchroom = null;
    this.id = conn.id;
    this.username = "";
    this.isAdmin = false;
  }

  setUsername(username: Username) {
    this.username = username;
  }

  broadcast(data: any) {
    if (!this.watchroom)
      return console.log("Unable to broadcast, not in a watchroom", this.id, this.username);

    [...this.watchroom.clients]
      .filter((client) => client !== this)
      .forEach((client) => client.send(data));
  }

  send(data: any) {
    const msg = JSON.stringify(data);
    this.connection.send(msg, (err: any) => err && console.log("Error sending message", msg, err));
  }

  sendEmit(type: string, data: any) {
    const msg = JSON.stringify(data);
    try {
      this.connection.emit(type, msg);
    } catch (error) {
      console.error(error);
    }
  }
}

export default Client;
