import MusicJS from "..";
import { UIElements } from "../types";

export function initUI(elements: UIElements | undefined): void {
  if (elements === undefined) {
    /* 
            Add Design to control music...
    */

    return;
  }

  /* 
        Call controller functions from given Elements...  
  */
  elements.playPauseButton.addEventListener("click", () => {
    // Play or Pause the music
    MusicJS.PlayOrPause();
  });

  elements.nextButton.addEventListener("click", () => {
    // Play next song
    MusicJS.next();
  });

  elements.prevButton.addEventListener("click", () => {
    // Play previous song
    MusicJS.prev();
  });

  return;
}
