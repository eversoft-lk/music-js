import { YouTubePlayer as YouTubePlayerType } from "youtube-player/dist/types";
import YouTubePlayer from "youtube-player";

export function init(): YouTubePlayerType {
  // Create a div element to hold the YouTube player
  const player = document.createElement("div");
  player.id = "yt-player";
  player.classList.add("yt-player");
  document.body.appendChild(player);

  // Load CSS file for YouTube player
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/dist/css/music-js.css";
  document.head.appendChild(link);

  // Initialize & return YouTube player API
  return YouTubePlayer("yt-player", {
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
}
