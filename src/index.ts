import { InitOptions } from "./types";
import * as YT from "./functions/youtube";
import * as FILE from "./functions/file";
import { YouTubePlayer as YouTubePlayerType } from "youtube-player/dist/types";
import { initUI, shuffle } from "./functions";

export default class MusicJS {
  static options: InitOptions | null = null;

  static YTPlayer: YouTubePlayerType | null = null;
  static AudioPlayer: HTMLAudioElement | null = null;

  static songs: string[] = [];
  static currentSongIndex: number = 0;

  static init(options: InitOptions): void {
    // Save options for later use
    this.options = options;

    // Initialize UI Controllers for to control Music
    initUI(options.elements);

    if (options.method === "youtube") {
      // Initialilze YouTube player
      this.YTPlayer = YT.init();

      // Setup songs
      this.setSongs(options.src);
      if (options.randomize) {
        this.songs = shuffle<string>(this.songs);
      }

      // Set volume if provided
      this.setVolume(options.volume ?? 0.5);

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
      return;
    }

    // initialize file player
    this.AudioPlayer = FILE.init();
    this.setSongs(options.src);

    // shuffle songs if randomize is true
    if (options.randomize) {
      this.songs = shuffle<string>(this.songs);
    }

    // Set volume if provided
    this.setVolume(options.volume ?? 0.5);

    // Start playing first song
    this.AudioPlayer.src = this.songs[0];
    this.AudioPlayer.play().then(() => {
      console.log(
        "Starting to play song. It will take some time to buffer video before it starts playing."
      );
    });

    // Play next song when current song ends
    this.AudioPlayer.addEventListener("ended", () => {
      this.next();
    });
  }

  static setSongs(songs: string | string[]): void {
    // set songs' IDs into this.songs if type is YT
    if (this.options?.method === "youtube") {
      if (Array.isArray(songs)) {
        songs.forEach((song: string) => {
          let url = YT.getIdByUrl(song);
          if (url != "") {
            this.songs.push(url);
          }
        });
        return;
      } else {
        let url = YT.getIdByUrl(songs);
        if (url != "") {
          this.songs.push(url);
          return;
        }
      }
    }

    // set songs' URLs into this.songs if type is file
    if (Array.isArray(songs)) {
      this.songs = songs;
      return;
    }

    this.songs.push(songs);
  }

  static PlayOrPause(): void {
    // Get the play-pause button icon, if not customized
    let icon = null;
    let isCustomized = this.options?.elements !== undefined;
    if (!isCustomized) {
      icon = document.querySelector("#play-pause i");
    }

    if (this.options?.method === "youtube") {
      if (!this.YTPlayer) {
        return;
      }
      // Get current state of player and toggle it
      this.YTPlayer.getPlayerState().then((state) => {
        if (state === 1) {
          icon?.classList.remove("bi-pause-fill");
          icon?.classList.add("bi-play-fill");
          this.YTPlayer?.pauseVideo();
        } else {
          icon?.classList.remove("bi-play-fill");
          icon?.classList.add("bi-pause-fill");
          this.YTPlayer?.playVideo();
        }
      });
      return;
    }

    if (!this.AudioPlayer) {
      return;
    }

    // Play or pause the audio player
    if (this.AudioPlayer.paused) {
      icon?.classList.remove("bi-play-fill");
      icon?.classList.add("bi-pause-fill");
      this.AudioPlayer.play();
    } else {
      icon?.classList.remove("bi-pause-fill");
      icon?.classList.add("bi-play-fill");
      this.AudioPlayer.pause();
    }
  }

  static next(): void {
    // update currentSongIndex to next song
    if (this.currentSongIndex + 1 < this.songs.length) {
      this.currentSongIndex += 1;
    } else {
      this.currentSongIndex = 0;
    }

    // Load and play next song based on method
    if (this.options?.method === "youtube") {
      this.YTPlayer?.loadVideoById(this.songs[this.currentSongIndex]);
      this.YTPlayer?.playVideo();
      return;
    }

    if (!this.AudioPlayer) {
      return;
    }
    this.AudioPlayer.pause();
    this.AudioPlayer.src = this.songs[this.currentSongIndex];
    this.AudioPlayer.play();
  }

  static prev(): void {
    // update currentSongIndex to previous song
    if (this.currentSongIndex - 1 >= 0) {
      this.currentSongIndex -= 1;
    } else {
      this.currentSongIndex = this.songs.length - 1;
    }

    // Load and play previous song based on method
    if (this.options?.method === "youtube") {
      this.YTPlayer?.loadVideoById(this.songs[this.currentSongIndex]);
      this.YTPlayer?.playVideo();
      return;
    }

    if (!this.AudioPlayer) {
      return;
    }

    this.AudioPlayer.pause();
    this.AudioPlayer.src = this.songs[this.currentSongIndex];
    this.AudioPlayer.play();
  }

  static setVolume(volume: number) {
    // Set volume based on method
    if (this.options?.method === "youtube") {
      if (!this.YTPlayer) {
        return;
      }
      this.YTPlayer.setVolume(volume * 100);
      return;
    }

    if (!this.AudioPlayer) {
      return;
    }

    this.AudioPlayer.volume = volume;
  }

  static async getVolume(): Promise<number> {
    // Get volume based on method
    if (this.options?.method === "youtube") {
      if (!this.YTPlayer) {
        return 0;
      }
      return await this.YTPlayer.getVolume() / 100;
    }

    if (!this.AudioPlayer) {
      return 0;
    }

    return this.AudioPlayer.volume;
  }
}
