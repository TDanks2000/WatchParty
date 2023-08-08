import Client from "../structs/Client";
import Watchroom from "../structs/Watchroom";
import { console } from "./utils";

class DataConstructor {
  public readonly rooms: Map<string, Watchroom> = new Map();

  createWatchroom(id: string, client: Client) {
    if (this.rooms.has(id)) {
      return console.log(`room ${id} already exists`);
    }

    const watchroom = new Watchroom(id, client);
    console.info("Creating watchroom", watchroom.id);

    this.rooms.set(id, watchroom);
  }

  getWatchroom(id: string) {
    return this.rooms.get(id);
  }

  getWatchrooms() {
    return this.rooms;
  }
}

export const Data = new DataConstructor();
