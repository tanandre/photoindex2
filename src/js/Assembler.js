import UrlHelper from './UrlHelper.js'
import ImageWorker from './loaders/ImageWorker'
import QueuedLoader from './loaders/QueuedLoader'

class Assembler {
  constructor (injector) {
    this.injector = injector
  }

  assemble (serverUrl) {
    this.injector.constant('serverUrl', serverUrl)
    this.injector.service('urlHelper', UrlHelper)

    this.injector.constant('imageLoader', new QueuedLoader([new ImageWorker()], true))
  }
}

export default Assembler
