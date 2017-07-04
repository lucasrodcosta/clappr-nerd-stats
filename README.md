[![npm version](https://badge.fury.io/js/clappr-nerd-stats.svg)](https://badge.fury.io/js/clappr-nerd-stats)
[![License](https://img.shields.io/badge/license-BSD--3--Clause-blue.svg)](https://img.shields.io/badge/license-BSD--3--Clause-blue.svg)

# Clappr Nerd Stats
A [Clappr](https://github.com/clappr/clappr) UI plugin to show statistics provided by
[clappr-stats](https://github.com/clappr/clappr-stats).

<p align="center">
  <img src="https://raw.githubusercontent.com/lucasrodcosta/clappr-nerd-stats/master/images/clappr-nerd-stats.png" alt="Clappr Nerd Stats"/>
</p>

## Usage

You can use it from JSDelivr (`https://cdn.jsdelivr.net/npm/clappr-nerd-stats/dist/clappr-nerd-stats.min.js`) or as
a NPM package.

```html
<head>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/clappr/dist/clappr.min.js"></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/clappr-stats/dist/clappr-stats.min.js"></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/clappr-nerd-stats/dist/clappr-nerd-stats.min.js"></script>
</head>

<body>
  <div id="player"></div>
  <script>
    window.player = new Clappr.Player({
      parentId: '#player',
      plugins: [ClapprNerdStats, ClapprStats],
      // source: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      source: 'http://www.streambox.fr/playlists/x36xhzz/x36xhzz.m3u8',
      height: 607.5,
      width: 1080,
      clapprNerdStats: {
        // Optional: provide multiple combination of keyboard shortcuts to show/hide the statistics.
        // For reference, visit: https://github.com/ccampbell/mousetrap.
        // Default: ['command+shift+s', 'ctrl+shift+s']
        shortcut: ['command+shift+s', 'ctrl+shift+s'],

        // Optional: position of the icon to show/hide the statistics.
        // Values: 'top-right', 'top-left', 'bottom-right', 'bottom-left', 'none'
        // Default: 'top-right'
        iconPosition: 'top-right'
      }
    })
  </script>
</body>
```

Now, just press `<ctrl+shift+s>` or click in the info icon to show/hide the stats.

Note that this plugin depends on `clappr-stats`. So, you must include both `ClapprNerdStats` and
`ClapprStats` in plugins list above.
