import MusicJS from "..";
import { UIElements } from "../types";

export function initUI(elements: UIElements | undefined): void {
  if (elements === undefined) {
    /* 
        Add Design to control music...
    */
    const container = document.createElement("div");
    container.classList.add("song-controller-container");
    container.innerHTML = `
        <div class="controller-container">
          <div class="corner"></div>
          <div class="controllers">
            <i class="fa-solid fa-backward" id="prev-button"></i>
            <i class="fa-solid fa-play" id="play-pause-button"></i>
            <i class="fa-solid fa-forward" id="next-button"></i>
          </div>
        </div>
        <i class="fa-solid fa-music"></i>
    `;
    document.body.appendChild(container);

    // Get the elements
    const playPauseButton = document.getElementById("play-pause-button");
    const nextButton = document.getElementById("next-button");
    const prevButton = document.getElementById("prev-button");

    if (
      playPauseButton === null ||
      nextButton === null ||
      prevButton === null
    ) {
      console.error("Elements not found");
      return;
    }

    // Set the elements
    elements = {
      playPauseButton,
      nextButton,
      prevButton,
    };
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
}
