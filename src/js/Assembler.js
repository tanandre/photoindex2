import UrlHelper from './UrlHelper.js'
import AlbumNavigator from './AlbumNavigator.js'
import ImageWorker from './loaders/ImageWorker'
import XhrWorker from './loaders/XhrWorker'
import QueuedLoader from './loaders/QueuedLoader'
import CachedLoader from './loaders/CachedLoader'
import titleUpdater from './TitleUpdater'
import KeyHandler from './watchers/KeyHandler'
import DataRetriever from './DataRetriever'

class Assembler {
  constructor (injector, http, router, store) {
    this.injector = injector
    this.http = http
    this.router = router
    this.store = store
  }

  assemble (serverUrl) {
    this.router.beforeEach(titleUpdater)

    this.injector.constant('serverUrl', serverUrl)
    this.injector.constant('router', this.router)
    let jsonCache = {}
    let tagCache = {}

    this.injector.constant('thumbnailLoader', new QueuedLoader([new ImageWorker()], true))
    this.injector.constant('photoLoader', new QueuedLoader([new ImageWorker()], false))
    this.injector.constant('tagsLoader', new CachedLoader(tagCache, new QueuedLoader([new XhrWorker(this.http)], false)))
    this.injector.constant('jsonLoader', new CachedLoader(jsonCache, new QueuedLoader([new XhrWorker(this.http)], true)))
    this.injector.constant('store', this.store)

    this.injector.service('dataRetriever', DataRetriever)
    this.injector.service('navigator', AlbumNavigator)
    this.injector.service('urlHelper', UrlHelper)
    this.injector.service('keyHandler', KeyHandler)
  }
}

export default Assembler
