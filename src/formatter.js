var humanFormat = require('human-format')

const timeScale = new humanFormat.Scale({
  ms: 1,
  sec: 1000,
  min: 60000,
  hours: 3600000
})

const percentScale = new humanFormat.Scale({
  '%': 1
})

const formattingTemplate = {
  general: {
    volume: {
      scale: percentScale
    }
  },
  timers: {
    startup: {
      scale: timeScale
    },
    watch: {
      scale: timeScale
    },
    pause: {
      scale: timeScale
    },
    buffering: {
      scale: timeScale
    },
    session: {
      scale: timeScale
    },
    latency: {
      scale: timeScale
    }
  },
  extra: {
    buffersize: {
      scale: timeScale
    },
    duration: {
      scale: timeScale
    },
    currentTime: {
      scale: timeScale
    },
    bitrateWeightedMean: {
      unit: 'bps'
    },
    bitrateMostUsed: {
      unit: 'bps'
    },
    bandwidth: {
      unit: 'bps'
    },
    watchedPercentage: {
      scale: percentScale
    },
    bufferingPercentage: {
      scale: percentScale
    }
  }
}

export default class Formatter {
  static format(metrics) {
    var formattedMetrics = {}

    Object.keys(metrics).forEach((type) => {
      formattedMetrics[type] = {}
      var typeTemplate = formattingTemplate[type]
      Object.keys(metrics[type]).forEach((name) => {
        var value = metrics[type][name]
        if (typeTemplate && typeTemplate[name] && (typeof value === 'number') && !isNaN(value)) {
          var templateScale = typeTemplate[name].scale || 'SI'
          var templateUnit = typeTemplate[name].unit || ''
          formattedMetrics[type][name] = humanFormat(value, {
            scale: templateScale,
            unit: templateUnit,
            decimals: 2
          })
        } else {
          formattedMetrics[type][name] = value
        }
      })
    })

    return formattedMetrics
  }
}
