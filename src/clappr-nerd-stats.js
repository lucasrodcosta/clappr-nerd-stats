import {UICorePlugin, Mediator, Events, Styler, template} from 'clappr'
import ClapprStats from 'clappr-stats'
import pluginStyle from './public/clappr-nerd-stats.css'
import pluginHtml from './public/clappr-nerd-stats.html'
import get from 'lodash.get'
import cloneDeep from 'lodash.clonedeep'

var Formatter = require('./formatter')
var Mousetrap = require('mousetrap')

export default class ClapprNerdStats extends UICorePlugin {
  get name() { return 'clappr-nerd-stats' }
  get template() { return template(pluginHtml) }

  get attributes() {
    return {
      'data-clappr-nerd-stats': '',
      'class': 'clappr-nerd-stats'
    }
  }

  get events() {
    return {
      'click [data-show-stats-button]': 'showOrHide',
      'click [data-close-button]': 'hide'
    }
  }

  get statsBoxElem() { return '.clappr-nerd-stats[data-clappr-nerd-stats] .stats-box' }
  get statsBoxWidthThreshold() { return 720 }

  get playerWidth() { return this.core.playerInfo.computedSize.width }
  get playerHeight() { return this.core.playerInfo.computedSize.height }

  constructor(core) {
    super(core)
    this._shortcut = get(core, 'options.clapprNerdStats.shortcut', ['command+shift+s', 'ctrl+shift+s'])
    this._iconPosition = get(core, 'options.clapprNerdStats.iconPosition', 'top-right')
    this.metrics = {}
  }

  bindEvents() {
    this.listenToOnce(this.core, Events.CORE_READY, this.init)
  }

  init() {
    this.container = this.core.getCurrentContainer()
    const clapprStats = this.container.getPlugin('clappr_stats')
    if (typeof clapprStats === 'undefined') {
      console.error('clappr-stats not available. Please, include it as a plugin of your Clappr instance.\n' +
                    'For more info, visit: https://github.com/clappr/clappr-stats.')
      this.disable()
    } else {
      Mousetrap.bind(this._shortcut, () => this.showOrHide())
      Mediator.on(`${this.core.options.playerId}:${Events.PLAYER_RESIZE}`, this.onPlayerResize, this)
      this.listenTo(clapprStats, ClapprStats.REPORT_EVENT, this.updateMetrics)
      this.updateMetrics(clapprStats._metrics)
      this.render()
    }
  }

  showOrHide(event) {
    if (this.showing) {
      this.hide(event)
    } else {
      this.show(event)
    }
  }

  show(event) {
    this.core.$el.find(this.statsBoxElem).show()
    this.showing = true
    if (event) {
      event.stopPropagation()
    }
  }

  hide(event) {
    this.core.$el.find(this.statsBoxElem).hide()
    this.showing = false
    if (event) {
      event.stopPropagation()
    }
  }

  onPlayerResize() {
    this.setStatsBoxSize()
  }

  addGeneralMetrics() {
    this.metrics.general = {
      displayResolution: (this.playerWidth + 'x' + this.playerHeight),
      volume: this.container.volume
    }
  }

  updateMetrics(metrics) {
    this.metrics = cloneDeep(metrics)
    this.addGeneralMetrics()

    var scrollTop = this.core.$el.find(this.statsBoxElem).scrollTop()

    this.$el.html(this.template({
      metrics: Formatter.format(this.metrics),
      iconPosition: this._iconPosition
    }))
    this.setStatsBoxSize()

    this.core.$el.find(this.statsBoxElem).scrollTop(scrollTop)

    if (!this.showing) {
      this.hide()
    }
  }

  setStatsBoxSize() {
    if (this.playerWidth >= this.statsBoxWidthThreshold) {
      this.$el.find(this.statsBoxElem).addClass('wide')
      this.$el.find(this.statsBoxElem).removeClass('narrow')
    } else {
      this.$el.find(this.statsBoxElem).removeClass('wide')
      this.$el.find(this.statsBoxElem).addClass('narrow')
    }
  }

  render() {
    const style = Styler.getStyleFor(pluginStyle, {baseUrl: this.options.baseUrl})
    this.core.$el.append(style)
    this.core.$el.append(this.$el)
    this.hide()
    return this
  }
}
