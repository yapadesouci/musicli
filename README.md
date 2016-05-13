# musicli [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Music player controlled by interactive cli.

## Dependencies

Musicli is based on:
- Echonest API for artists;
- Song365 for mp3 streams;
- MPlayer to play mp3 stream;

## Before starting

### Echonest Apikey

You must have a Echonest Apikey. It's totally free. You can get one [here](https://developer.echonest.com).
One you have one, don't forget to enter it with the init command.

### MPlayer

Musicli uses MPlayer to play mp3. 
On MacOSX, you can install it with homebrew.

```sh
$ brew install mplayer
```

## Installation

```sh
$ npm install -g musicli
```

## Run

```sh
$ musicli
musicli>
```

## Commands

### help

Show a help menu.

```sh
$ musicli> help

  Commands:

    help [command...]   Provides help for a given command.
    exit                Exits application.
    init                Initialize your Echonest ApiKey.
    search <artist...>  Search an artist.
    similar             Search similar artists based on the current playlist.
    all                 List all playlist created.
    create <name>       Create a playlist.
    load <name>         Load playlist <name>
    delete <name>       Delete playlist <name>
    leaves [name]       Show playlist leaves.
    remove              Remove an artist.
    refresh             Refresh playlist links.
    play                Play song in playlist.
    next                Next song.
    pause               Pause song.
```

## Troubleshooting

Q: How can I start?
A: Start by calling the init command to initialize your Echonest Apikey. You can freely retrieve one [here](https://developer.echonest.com).

Q: Can I search multiple artists at the same time?
A: No, you can't it's one artist at a time.

Q: How can I select artists?
A: Press the SPACE bar to check/uncheck selectboxes.

Q: It's always complaining 'No playlist loaded...'
A: You must create a playlist and load it with the load command.

Q: I have created a playlist, selected some artists but when I play song nothing happen.
A: Verify that MPlayer is installed. If yes, don't forget to refresh your playlist.

## License

MIT © [yapadesouci](https://github.com/yapadesouci)


[npm-image]: https://badge.fury.io/js/musicli.svg
[npm-url]: https://npmjs.org/package/musicli
[travis-image]: https://travis-ci.org/yapadesouci/musicli.svg?branch=master
[travis-url]: https://travis-ci.org/yapadesouci/musicli
[daviddm-image]: https://david-dm.org/yapadesouci/musicli.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/yapadesouci/musicli
[coveralls-image]: https://coveralls.io/repos/yapadesouci/musicli/badge.svg
[coveralls-url]: https://coveralls.io/r/yapadesouci/musicli
