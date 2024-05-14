import YouTubePlayer from "youtube-player";
import { InitOptions } from "./types";
import { initYT } from "./functions";
import { YouTubePlayer as YouTubePlayerType } from "youtube-player/dist/types";

export default class MusicJS {
  static YTPlayer: YouTubePlayerType | null = null;

  static init(options: InitOptions) {
    if (options.method === "youtube") {
      initYT();
      this.YTPlayer = YouTubePlayer("yt-player", {
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          enablejsapi: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
      });

      if (!Array.isArray(options.src)) {
        this.YTPlayer.loadVideoById(options.src);
      }

      this.YTPlayer.playVideo().then(() => {
        console.log(
          "Starting to play song. It will take some time to buffer video before it starts playing."
        );
      });
    }
  }
}
