import PhpUrlHelper from '@/js/PhpUrlHelper.js'
import AlbumNavigator from '@/js/AlbumNavigator.js'
import ImageWorker from '@/js/loaders/ImageWorker'
import XhrWorker from '@/js/loaders/XhrWorker'
import QueuedLoader from '@/js/loaders/QueuedLoader'
import CachedLoader from '@/js/loaders/CachedLoader'
import titleUpdater from '@/js/TitleUpdater'
import KeyHandler from '@/js/watchers/KeyHandler'
import GallerySizeListener from '@/js/watchers/GallerySizeListener'
import DataRetriever from '@/js/DataRetriever'
import ErrorHandler from '@/js/ErrorHandler'
import DataUpdater from '@/js/DataUpdater'
import ApplicationState from '@/js/ApplicationState'

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

    this.injector.service('errorHandler', ['store'], ErrorHandler)
    this.injector.service('dataRetriever', ['jsonLoader', 'tagsLoader', 'exifLoader', 'urlHelper', 'applicationState'], DataRetriever)
    this.injector.service('dataUpdater', ['httpClient', 'urlHelper', 'applicationState'], DataUpdater)
    this.injector.service('navigator', ['router'], AlbumNavigator)
    this.injector.service('urlHelper', [], PhpUrlHelper)
    this.injector.service('keyHandler', ['navigator'], KeyHandler)

    window.addEventListener('resize', gallerySizeListener.calibrateThumbnails)
    this.store.watch(state => state.album.images, () => {
      gallerySizeListener.calibrateThumbnails()
    })
  }
}

export default Assembler
