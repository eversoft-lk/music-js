import { InitOptions, Method } from "./types";
import * as YT from "./functions/youtube";
import { YouTubePlayer as YouTubePlayerType } from "youtube-player/dist/types";
import { initUI, shuffle } from "./functions";

export default class MusicJS {
  static YTPlayer: YouTubePlayerType | null = null;
  static songs: string[] = [];
  static currentSongIndex: number = 0;

  static init(options: InitOptions): void {
    // Initialize UI Controllers for to control Music
    initUI(options.elements);

    if (options.method === "youtube") {
      // Initialilze YouTube player
      this.YTPlayer = YT.init();

      // Setup songs
      if (!Array.isArray(options.src)) {
        // extract song ID from URL & push it into this.songs
        const songId = YT.getIdByUrl(options.src);
        this.songs.push(songId);
      } else {
        this.setSongs(options.src, options.method);
        // Shuffle songs if randomize option is enabled
        if (options.randomize) {
          this.songs = shuffle<string>(this.songs);
        }
      }

      // Start playing first song
      this.YTPlayer.loadVideoById(this.songs[0]);
      this.YTPlayer.playVideo().then(() => {
        console.log(
          "Starting to play song. It will take some time to buffer video before it starts playing."
        );
      });

      // Play next song when current song ends
      this.YTPlayer.on("stateChange", (event) => {
        if (event.data === 0) {
          this.next();
        }
      });
    }
  }

  static setSongs(songs: string[], method: Method): void {
    // set songs' IDs into this.songs if type is YT
    if (method === "youtube") {
      songs.forEach((song: string) => {
        let url = YT.getIdByUrl(song);
        if (url != "") {
          this.songs.push(url);
        }
      });
      return;
    }

    // if type is file add path directly
    this.songs = songs;
  }

  static PlayOrPause(): void {
    if (this.YTPlayer) {
      this.YTPlayer.getPlayerState().then((state) => {
        if (state === 1) {
          this.YTPlayer?.pauseVideo();
        } else {
          this.YTPlayer?.playVideo();
        }
      });
    }
  }

  static next(): void {
    if (this.currentSongIndex + 1 < this.songs.length) {
      this.currentSongIndex += 1;
    } else {
      this.currentSongIndex = 0;
    }

    this.YTPlayer?.loadVideoById(this.songs[this.currentSongIndex]);
    this.YTPlayer?.playVideo();
  }

  static prev(): void {
    if (this.currentSongIndex - 1 >= 0) {
      this.currentSongIndex -= 1;
    } else {
      this.currentSongIndex = this.songs.length - 1;
    }

    this.YTPlayer?.loadVideoById(this.songs[this.currentSongIndex]);
    this.YTPlayer?.playVideo();
  }
}
