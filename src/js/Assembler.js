import injector from 'vue-inject'
import UrlHelper from './UrlHelper.js'
import ImageWorker from './loaders/ImageWorker'
import QueuedLoader from './loaders/QueuedLoader'

export default {
  assemble: function (serverUrl) {
    injector.constant('serverUrl', serverUrl)
    injector.service('urlHelper', UrlHelper)

    injector.constant('imageLoader', new QueuedLoader([new ImageWorker()], true))
  }
}
