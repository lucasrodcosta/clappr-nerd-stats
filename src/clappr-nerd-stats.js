import {UIContainerPlugin, Events, Styler, template} from 'clappr'
import ClapprStats from 'clappr-stats'
import pluginStyle from './public/clappr-nerd-stats.css'
import pluginHtml from './public/clappr-nerd-stats.html'
import get from 'lodash.get'

var Formatter = require('./formatter')
var Mousetrap = require('mousetrap')

export default class ClapprNerdStats extends UIContainerPlugin {
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

  constructor(container) {
    super(container)
    this._shortcut = get(container, 'options.clapprNerdStats.shortcut', ['command+shift+s', 'ctrl+shift+s'])
    this._iconPosition = get(container, 'options.clapprNerdStats.iconPosition', 'top-right')
  }

  bindEvents() {
    this.listenToOnce(this.container, Events.CONTAINER_READY, this.init)
  }

  init() {
    const clapprStats = this.container.getPlugin('clappr_stats')
    if (typeof clapprStats === 'undefined') {
      console.error('clappr-stats not available. Please, include it as a plugin of your Clappr instance.\n' +
                    'For more info, visit: https://github.com/clappr/clappr-stats.')
    } else {
      Mousetrap.bind(this._shortcut, () => this.showOrHide())
      this.listenTo(clapprStats, ClapprStats.REPORT_EVENT, this.onReport)
      this.metrics = clapprStats._metrics
      this.updateMetrics()
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
    this.container.$el.find(this.statsBoxElem).show()
    this.showing = true
    if (event) {
      event.stopPropagation()
    }
  }

  hide(event) {
    this.container.$el.find(this.statsBoxElem).hide()
    this.showing = false
    if (event) {
      event.stopPropagation()
    }
  }

  onReport(metrics) {
    this.metrics = Formatter.format(metrics)
    this.updateMetrics()
  }

  updateMetrics() {
    var scrollTop = this.container.$el.find(this.statsBoxElem).scrollTop()

    this.$el.html(this.template({
      metrics: this.metrics,
      iconPosition: this._iconPosition
    }))

    if (this.container.options.width >= this.statsBoxWidthThreshold) {
      this.$el.find(this.statsBoxElem).addClass('wide')
    } else {
      this.$el.find(this.statsBoxElem).addClass('narrow')
    }

    this.container.$el.find(this.statsBoxElem).scrollTop(scrollTop)

    if (!this.showing) {
      this.hide()
    }
  }

  render() {
    const style = Styler.getStyleFor(pluginStyle, {baseUrl: this.options.baseUrl})
    this.container.$el.append(style)
    this.container.$el.append(this.$el)
    this.hide()
    return this
  }
}
