import UrlHelper from './UrlHelper.js'
import AlbumNavigator from './AlbumNavigator.js'
import ImageWorker from './loaders/ImageWorker'
import XhrWorker from './loaders/XhrWorker'
import QueuedLoader from './loaders/QueuedLoader'
import titleUpdater from './TitleUpdater'
import KeyHandler from './watchers/KeyHandler'

class Assembler {
  constructor (injector, http, router) {
    this.injector = injector
    this.http = http
    this.router = router
  }

  assemble (serverUrl) {
    this.router.beforeEach(titleUpdater)

    this.injector.constant('serverUrl', serverUrl)
    this.injector.constant('router', this.router)

    this.injector.constant('thumbnailLoader', new QueuedLoader([new ImageWorker()], true))
    this.injector.constant('photoLoader', new QueuedLoader([new ImageWorker()], false))
    this.injector.constant('jsonLoader', new QueuedLoader([new XhrWorker(this.http)], true))

    this.injector.service('navigator', AlbumNavigator)
    this.injector.service('urlHelper', UrlHelper)
    this.injector.service('keyHandler', KeyHandler)
  }
}

export default Assembler
