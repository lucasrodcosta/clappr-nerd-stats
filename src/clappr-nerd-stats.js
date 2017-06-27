import {UIContainerPlugin, Events, Styler, template} from 'clappr'
import ClapprStats from 'clappr-stats'
import pluginStyle from './public/clappr-nerd-stats.css'
import pluginHtml from './public/clappr-nerd-stats.html'

export default class ClapprNerdStats extends UIContainerPlugin {
  get name() { return 'clappr-nerd-stats' }
  get template() { return template(pluginHtml) }

  constructor(container) {
    super(container)
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
      this.style = Styler.getStyleFor(pluginStyle, {baseUrl: this.options.baseUrl})
      this.listenTo(clapprStats, ClapprStats.REPORT_EVENT, this.render)
    }
  }

  render(metrics) {
    if (metrics) {
      this.$el.html(this.template({
        metrics: metrics
      }))
      this.$el.append(this.style)
      this.container.$el.append(this.el)
    }
    return this
  }
}
