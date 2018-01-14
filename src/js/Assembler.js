import UrlHelper from './UrlHelper.js'
import AlbumNavigator from './AlbumNavigator.js'
import ImageWorker from './loaders/ImageWorker'
import XhrWorker from './loaders/XhrWorker'
import QueuedLoader from './loaders/QueuedLoader'

class Assembler {
  constructor (injector, http, router) {
    this.injector = injector
    this.http = http
    this.router = router
  }

  assemble (serverUrl) {
    this.injector.constant('serverUrl', serverUrl)
    this.injector.service('urlHelper', UrlHelper)

    this.injector.constant('navigator', new AlbumNavigator(this.router))
    this.injector.constant('thumbnailLoader', new QueuedLoader([new ImageWorker()], true))
    this.injector.constant('photoLoader', new QueuedLoader([new ImageWorker()], false))
    this.injector.constant('jsonLoader', new QueuedLoader([new XhrWorker(this.http)], true))
  }
}

export default Assembler
