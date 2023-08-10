import React from "react";
import {
  MediaCommunitySkin,
  MediaOutlet,
  MediaPlayer,
  MediaPoster,
  useMediaRemote,
} from "@vidstack/react";
import { Container, Wrapper } from "./styles";
import SocketHandler from "../../utils/socketHandlers";
import { useEffect, useRef, FC, useContext } from "react";
import { type Player, type MediaPlayerElement, MediaSeekedEvent } from "vidstack";
import { SocketContext } from "../../contexts";

type Props = {
  socket: SocketHandler;
};

const VideoPlayer: FC<Props> = ({ socket }) => {
  const [byServer, setByServer] = React.useState<boolean>(false);
  const { setPaused, paused } = useContext(SocketContext)!;
  const remote = useMediaRemote();
  const player = useRef<Player>(null);

  useEffect(() => {
    socket.conn.on("message", (data: any) => {
      data = JSON.parse(data);
      if (!Object.keys(data).includes("status")) return;
      console.log(data);
      data.status === "playing" ? player.current!.pause() : player.current!.play();

      player.current!.currentTime = data.current_time;
    });
  }, []);

  useEffect(() => {
    socket.conn.emit("play_status", {
      status: player.current!.paused === true ? "paused" : "playing",
      current_time: player.current!.currentTime,
    });
  }, [paused]);

  const handleSeekChange = (e: MediaSeekedEvent) => {
    socket.conn.emit("play_status", {
      status: "playing",
      current_time: player.current!.currentTime,
    });
  };

  return (
    <Container>
      <Wrapper>
        <MediaPlayer
          paused={paused}
          onSeeked={(e: MediaSeekedEvent) => handleSeekChange(e)}
          ref={player}
          title="Sprite Fight"
          src="https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/low.mp4"
          poster="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=980"
          thumbnails="https://media-files.vidstack.io/sprite-fight/thumbnails.vtt"
          aspectRatio={16 / 9}
          crossorigin=""
        >
          <MediaOutlet>
            <MediaPoster alt="Girl walks into sprite gnomes around her friend on a campfire in danger!" />
          </MediaOutlet>
          <MediaCommunitySkin />
        </MediaPlayer>
      </Wrapper>
    </Container>
  );
};

export default VideoPlayer;
