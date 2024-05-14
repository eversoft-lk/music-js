export interface InitOptions {
  method: "youtube" | "file";
  src: string[] | string;
  elements?: {
    playPauseButton: HTMLElement;
    prevButton: HTMLElement;
    nextButton: HTMLElement;
  };
  randomize?: boolean;
  volume?: number;
}
