# Music-JS

Music-JS is a lightweight library that simplifies adding background music to your website using YouTube links or audio files. Built with TypeScript, this library provides an easy-to-use interface for integrating background music seamlessly into your web projects.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
    - [Importing the Library](#importing-the-library)
    - [Initializing the Library](#initializing-the-library)
        - [Using Audio Files](#example-1-using-audio-files)
        - [Using YouTube Videos](#example-2-using-youtube-videos)
    - [Additional Options](#additional-options)
        - [Randomizing Playback](#example-3-randomizing-playback)
        - [Adjusting Volume](#example-4-adjusting-volume)
    - [Customizing the Music Controller](#customizing-the-music-controller)
- [Summary](#summary)
- [License](#license)

## Features

- **Easy Integration**: Add background music to your website using YouTube links or audio files.

- **TypeScript Support**: Built with TypeScript for robust type checking and development experience.

- **Wide Range of Support**: Compatible with various frameworks such as React, Vue, Nuxt, Next, and Angular.

- **Customizable Controller**: Override default controller elements with custom HTML elements.

## Installation

To install Music-JS, use npm:

```
npm install music-js
``` 

*Note: CDN support is not available yet.*

## Usage

After installing the package, you can import and initialize the library in your project. Below are the steps and examples to get you started.

### Importing the Library

First, you need to import MusicJS:

```
import MusicJS from "music-js";
```

### Initializing the Library

To initialize the library, use the `MusicJS.init()` function. This function takes a JavaScript object as a parameter with the following required keys:

- **method**: Specifies the source type, either `youtube` or `file`.
- **src**: Specifies the source URL(s). It can be a string or an array of strings.

#### Example 1: Using Audio Files

If you are using audio files as your source, set the method to `"file"` and provide the path(s) to the audio file(s) in the **src** key.

```
import MusicJS from "music-js";

// Example with multiple audio files
MusicJS.init({
  method: "file",
  src: ["/song_file1.mp3", "/song_file2.mp3"],
});

// Example with a single audio file
MusicJS.init({
  method: "file",
  src: "/song_file1.mp3",
});
```

#### Example 2: Using YouTube Videos

If you are using YouTube videos as your source, set the method to `"youtube"` and provide the YouTube video link(s) in the **src** key.

```
import MusicJS from "music-js";

// Example with multiple YouTube videos
MusicJS.init({
  method: "youtube",
  src: [
    "https://www.youtube.com/watch?v=video1",
    "https://www.youtube.com/watch?v=video2",
  ],
});

// Example with a single YouTube video
MusicJS.init({
  method: "youtube",
  src: "https://www.youtube.com/watch?v=video1",
});
```

### Additional Options

The `MusicJS.init()` function also accepts optional parameters for further customization:

- randomize: (boolean) Defaults to false. Set to true to shuffle songs to a random order before playing.

- volume: (number) A value between 0 and 1 to adjust the volume.

#### Example 3: Randomizing Playback

```
import MusicJS from "music-js";

MusicJS.init({
  method: "file",
  src: ["/song_file1.mp3", "/song_file2.mp3"],
  randomize: true,
});
```

#### Example 4: Adjusting Volume

```
import MusicJS from "music-js";

MusicJS.init({
  method: "file",
  src: ["/song_file1.mp3", "/song_file1.mp3"],
  volume: 0.6,
});
```

### Customizing the Music Controller

You can customize the default design of the music controller by passing custom controller elements using the **elements** option. Use ID or class selectors (prefixed with `#` or `.` respectively).

#### Example 5: Custom Controller Elements

```
import MusicJS from "music-js";

MusicJS.init({
  method: "file",
  src: ["/bass_boosted_1.mp3", "/bass_boosted_2.mp3"],
  elements: {
    nextButton: ".music-js-next",
    prevButton: ".music-js-prev",
    playButton: ".music-js-play",
  }
});
```
*If you define custom elements, the default elements will be overridden and disappear.*

### Summary

Music-JS makes it simple to add background music to your website, whether you prefer to use YouTube videos or audio files. By following the installation and usage instructions, you can easily integrate background music into your project with just a few lines of code.

### License

[MIT License](https://github.com/eversoft-lk/music-js/blob/main/LICENSE)