import { Video } from "../@types";

class Queue {
  videos: Map<string, Video> = new Map();

  addVideo(video: Video) {
    this.videos.set(video.id, video);
  }

  getVideo(id: string) {
    return this.videos.get(id);
  }

  getVideos() {
    return this.videos;
  }
}

export default Queue;
