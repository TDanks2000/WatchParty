import Client from "./Client";
import Queue from "./Queue";

class Watchroom {
  id: string;
  clients: Set<Client>;
  admin: Client;
  queue: Queue;

  constructor(id: string, client: Client) {
    this.id = id;
    this.clients = new Set();
    this.admin = client;
    this.queue = new Queue();

    this.join(client, true);
  }

  join(client: Client, isAdmin: boolean = false) {
    if (client.watchroom) {
      // throw new Error('Client already in watchroom');
      console.log("Client already in watchroom");
      return;
    }
    this.clients.add(client);
    client.watchroom = this;
    client.isAdmin = isAdmin;
  }

  leave(client: Client) {
    if (client.watchroom !== this) {
      // throw new Error('Client not in watchroom');
      console.log("Client not in watchroom");
      return;
    }
    this.clients.delete(client);
    client.watchroom = null;
  }
}

export default Watchroom;
