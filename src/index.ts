import { InitOptions } from "./types";
import * as YT from "./functions/youtube";
import { YouTubePlayer as YouTubePlayerType } from "youtube-player/dist/types";

export default class MusicJS {
  static YTPlayer: YouTubePlayerType | null = null;
  static songs: string[] = [];
  static currentSongIndex: number = 0;

  static init(options: InitOptions) {
    if (options.method === "youtube") {
      // Initialilze YouTube player
      this.YTPlayer = YT.init();

      // Setup songs
      if (!Array.isArray(options.src)) {
        // extract song ID from URL & push it into this.songs
        const songId = YT.getIdByUrl(options.src);
        this.songs.push(songId);
      } else {
        this.setSongs(options.src);
        // Shuffle songs if randomize option is enabled
        if (options.randomize) {
          this.shuffle();
        }
      }

      // Start playing first song
      this.YTPlayer.loadVideoById(this.songs[0]);
      this.YTPlayer.playVideo().then(() => {
        console.log(
          "Starting to play song. It will take some time to buffer video before it starts playing."
        );
      });
    }
  }

  static shuffle() {
    this.songs.sort(() => Math.random() - 0.5);
  }

  static setSongs(songs: string[]): void {
    // set songs' IDs into this.songs
    songs.forEach((song: string) => {
      let url = YT.getIdByUrl(song);
      if (url != "") {
        songs.push(url);
      }
    });
  }
}
