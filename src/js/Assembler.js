import PhpUrlHelper from './PhpUrlHelper.js'
import AlbumNavigator from './AlbumNavigator.js'
import ImageWorker from './loaders/ImageWorker'
import XhrWorker from './loaders/XhrWorker'
import QueuedLoader from './loaders/QueuedLoader'
import CachedLoader from './loaders/CachedLoader'
import titleUpdater from './TitleUpdater'
import KeyHandler from './watchers/KeyHandler'
import GallerySizeListener from './watchers/GallerySizeListener'
import DataRetriever from './DataRetriever'
import ErrorHandler from './ErrorHandler'
import DataUpdater from './DataUpdater'
import ApplicationState from './ApplicationState'

class Assembler {
  constructor (injector, http, router, store) {
    this.injector = injector
    this.http = http
    this.router = router
    this.store = store
  }

  assemble () {
    this.router.beforeEach(titleUpdater)

    this.injector.constant('router', this.router)
    let photoCache = {}
    let jsonCache = {}
    let tagCache = {}
    let exifCache = {}

    let gallerySizeListener = new GallerySizeListener()
    this.injector.constant('thumbnailLoader', new QueuedLoader([new ImageWorker(), new ImageWorker(), new ImageWorker(), new ImageWorker()], true))
    this.injector.constant('photoLoader', new CachedLoader(photoCache, new QueuedLoader([new ImageWorker()], false)))
    this.injector.constant('tagsLoader', new CachedLoader(tagCache, new QueuedLoader([new XhrWorker(this.http)], false)))
    this.injector.constant('exifLoader', new CachedLoader(exifCache, new QueuedLoader([new XhrWorker(this.http)], true)))
    this.injector.constant('jsonLoader', new CachedLoader(jsonCache, new QueuedLoader([new XhrWorker(this.http)], true)))
    this.injector.constant('store', this.store)
    this.injector.constant('applicationState', new ApplicationState())
    this.injector.constant('httpClient', this.http)
    this.injector.constant('gallerySizeListener', gallerySizeListener)

    this.injector.service('errorHandler', ErrorHandler)
    this.injector.service('dataRetriever', DataRetriever)
    this.injector.service('dataUpdater', DataUpdater)
    this.injector.service('navigator', AlbumNavigator)
    this.injector.service('urlHelper', PhpUrlHelper)
    this.injector.service('keyHandler', KeyHandler)

    window.addEventListener('resize', gallerySizeListener.calibrateThumbnails)
    this.store.watch(state => state.album.images, () => {
      gallerySizeListener.calibrateThumbnails()
    })
  }
}

export default Assembler
