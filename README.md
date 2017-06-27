[![License](https://img.shields.io/badge/license-BSD--3--Clause-blue.svg)](https://img.shields.io/badge/license-BSD--3--Clause-blue.svg)

# Clappr Nerd Stats
A [Clappr](https://github.com/clappr/clappr) UI plugin to show statistics provided by
[clappr-stats](https://github.com/clappr/clappr-stats).

<p align="center">
  <img src="https://raw.githubusercontent.com/lucasrodcosta/clappr-nerd-stats/master/images/clappr-nerd-stats.png" alt="Clappr Nerd Stats"/>
</p>

## Usage

```html
<script>
  window.player = new Clappr.Player({
    parentId: '#player',
    plugins: [ClapprNerdStats, ClapprStats],
    // source: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
    source: 'http://www.streambox.fr/playlists/x36xhzz/x36xhzz.m3u8',
    height: 607.5,
    width: 1080
  })
</script>
```

Note that this plugin depends on `clappr-stats`. So, you must include both `ClapprNerdStats` and
`ClapprStats` in plugins list above.
