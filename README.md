# musicli [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Music player controlled by interactive cli.

## Dependencies

Musicli is based on:
- Echonest API for artists;
- Song365 for mp3 streams;
- MPlayer to play mp3 stream;

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
    search <artist...>  Search an artist.
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

### Can I search multiple artists at the same time?

No, you can't. It's one artist at a time.

### How can I select artists?

Press the SPACE bar to check/uncheck selectboxes.

### I always a 'No playlist loaded...' message.

You must create a playlist and load it with the load command.

### I have created a playlist, selected some artists but when I run the play command, nothing happen.

Verify that MPlayer is installed. If yes, don't forget to refresh your playlist. Refreshing can take a long time. Please be patient!

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
