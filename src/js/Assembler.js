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

    let photoCache = {}
    let jsonCache = {}
    let tagCache = {}
    let exifCache = {}

    let gallerySizeListener = new GallerySizeListener()
    let thumbnailLoader = new QueuedLoader([new ImageWorker(), new ImageWorker(), new ImageWorker(), new ImageWorker()], true);
    let photoLoader = new CachedLoader(photoCache, new QueuedLoader([new ImageWorker()], false));
    let tagsLoader = new CachedLoader(tagCache, new QueuedLoader([new XhrWorker(this.http)], false));
    let exifLoader = new CachedLoader(exifCache, new QueuedLoader([new XhrWorker(this.http)], true));
    let jsonLoader = new CachedLoader(jsonCache, new QueuedLoader([new XhrWorker(this.http)], true));

    let urlHelper = new PhpUrlHelper()
    let applicationState = new ApplicationState()
    let navigator = new AlbumNavigator(this.router);
    this.store.commit('urlHelper', urlHelper)
    this.store.commit('dataUpdater', new DataUpdater(this.http, urlHelper, applicationState))
    this.store.commit('dataRetriever', new DataRetriever(jsonLoader, tagsLoader, exifLoader, urlHelper, applicationState))
    this.store.commit('applicationState', applicationState)
    this.store.commit('keyHandler', new KeyHandler(navigator))
    this.store.commit('navigator', navigator)
    this.store.commit('thumbnailLoader', thumbnailLoader)
    this.store.commit('photoLoader', photoLoader)

    window.addEventListener('resize', gallerySizeListener.calibrateThumbnails)
    this.store.watch(state => state.album.images, () => {
      gallerySizeListener.calibrateThumbnails()
    })
  }
}

export default Assembler
