import {UIContainerPlugin, Events, Styler, template} from 'clappr'
import ClapprStats from 'clappr-stats'
import pluginStyle from './public/clappr-nerd-stats.css'
import pluginHtml from './public/clappr-nerd-stats.html'
import get from 'lodash.get'

var Mousetrap = require('mousetrap')

export default class ClapprNerdStats extends UIContainerPlugin {
  get name() { return 'clappr-nerd-stats' }
  get template() { return template(pluginHtml) }

  constructor(container) {
    super(container)
    this._shortcut = get(container, 'options.clapprNerdStats.shortcut', ['command+shift+s', 'ctrl+shift+s'])
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
      this.style = Styler.getStyleFor(pluginStyle, {baseUrl: this.options.baseUrl})
      this.metrics = clapprStats._metrics
    }
  }

  showOrHide() {
    if (this.showing) {
      this.hide()
    } else {
      this.show()
      this.render()
    }
  }

  show() {
    this.$el.show()
    this.showing = true
  }

  hide() {
    this.$el.hide()
    this.showing = false
  }

  onReport(metrics) {
    this.metrics = metrics
    this.render()
  }

  render() {
    if (this.showing) {
      this.$el.html(this.template({
        metrics: this.metrics
      }))
      this.$el.append(this.style)
      this.container.$el.append(this.el)
    }
    return this
  }
}
