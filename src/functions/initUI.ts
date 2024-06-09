import MusicJS from "..";
import { UIElements } from "../types";

export function initUI(elements: UIElements | undefined): void {
  if (elements === undefined) {
    /* 
        Add Design to control music...
    */
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css";
    document.head.appendChild(link);

    const container = document.createElement("div");
    container.classList.add("help-button-wrapper");
    container.innerHTML = `
        <ul class="help-list">
        <div id="player">
          <div id="controls">
            <button id="prev"><i class="bi bi-rewind-fill"></i></button>
            <button id="play-pause"><i class="bi bi-pause-fill"></i></button>
            <button id="next"><i class="bi bi-fast-forward-fill"></i></button>
          </div>
          <div id="volume-container">
            <i class="bi bi-volume-up" id="mute-unmute"></i>
            <input
              type="range"
              id="volume"
              min="0"
              max="1"
              step="0.05"
              value="0.5"
            />
          </div>
        </div>
      </ul>

      <button class="help-button">
        <img src="https://cdn.eversoft.lk/music-js/img/icon.png" alt="" />
      </button>
    `;
    document.body.appendChild(container);

    document
      .querySelector("#mute-unmute")
      ?.addEventListener("click", async () => {
        // Mute or Unmute the music
        let volume: number = await MusicJS.getVolume();

        // If volume is 0, then unmute it
        if (volume === 0) {
          MusicJS.setVolume(MusicJS.options?.volume ?? 0.5);
          document
            .querySelector("#mute-unmute")
            ?.classList.remove("bi-volume-mute");
          document.querySelector("#mute-unmute")?.classList.add("bi-volume-up");
          document
            .querySelector("#volume")
            ?.setAttribute(
              "value",
              (MusicJS.options?.volume ?? 0.5).toString()
            );
          return;
        }

        // If volume is not 0, then mute it
        MusicJS.setVolume(0);
        document
          .querySelector("#mute-unmute")
          ?.classList.remove("bi-volume-up");
        document.querySelector("#mute-unmute")?.classList.add("bi-volume-mute");
        document.querySelector("#volume")?.setAttribute("value", "0");
      });

    document
      .querySelector(".help-button")
      ?.addEventListener("click", toggleExpanded);

    window.addEventListener("click", (event) => {
      const target = event.target as Element;
      if (!target.closest(".help-button-wrapper")) {
        closeExpanded();
      }
    });

    document.getElementById("volume")?.addEventListener("change", (event) => {
      const volume = (event.target as HTMLInputElement).value;
      if (volume === "0") {
        document
          .querySelector("#mute-unmute")
          ?.classList.remove("bi-volume-up");
        document.querySelector("#mute-unmute")?.classList.add("bi-volume-mute");
      } else {
        document
          .querySelector("#mute-unmute")
          ?.classList.remove("bi-volume-mute");
        document.querySelector("#mute-unmute")?.classList.add("bi-volume-up");
      }
      MusicJS.setVolume(parseFloat(volume));
    });

    // Set the elements
    elements = {
      playPauseButton: "#play-pause",
      nextButton: "#next",
      prevButton: "#prev",
    };
  }

  /* 
      Call controller functions from given Elements...  
  */
  document
    .querySelector(elements.playPauseButton)
    ?.addEventListener("click", () => {
      // Play or Pause the music
      MusicJS.PlayOrPause();
    });

  document.querySelector(elements.nextButton)?.addEventListener("click", () => {
    // Play next song
    MusicJS.next();
  });

  document.querySelector(elements.prevButton)?.addEventListener("click", () => {
    // Play previous song
    MusicJS.prev();
  });
}

function toggleExpanded() {
  document.querySelector(".help-button-wrapper")?.classList.toggle("expanded");
}

function closeExpanded() {
  document.querySelector(".help-button-wrapper")?.classList.remove("expanded");
}
