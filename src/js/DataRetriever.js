/**
 * Do a retrieve canceling the previous call. Assumes the loader is LIFO that way the last one will take precedence
 * old calls
 */
function doRetrieveSerial (promiseMap, loader, url, params) {
  let promise = promiseMap[url]
  if (promise && !promise.isDone()) {
    promise.cancel()
  }

  promiseMap[url] = loader.load(url, params)
  return promiseMap[url]
}

class DataRetriever {
  constructor (jsonLoader, tagsLoader, exifLoader, urlHelper) {
    this.jsonLoader = jsonLoader
    this.tagsLoader = tagsLoader
    this.exifLoader = exifLoader
    this.urlHelper = urlHelper
    this.promiseMap = {}
  }

  retrieveImages (query) {
    return doRetrieveSerial(this.promiseMap, this.jsonLoader, this.urlHelper.getListing(), {params: query})
  }

  retrieveTags (photo) {
    return doRetrieveSerial(this.promiseMap, this.tagsLoader, this.urlHelper.getTagsUrl(photo), {})
  }

  retrieveExif (photo) {
    return doRetrieveSerial(this.promiseMap, this.exifLoader, this.urlHelper.getExifUrl(photo), {})
  }
}

export default DataRetriever
