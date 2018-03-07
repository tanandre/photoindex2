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
  // return loader.load(url, params)
}

class DataRetriever {
  constructor (jsonLoader, tagsLoader, exifLoader, urlHelper, applicationState) {
    this.jsonLoader = jsonLoader
    this.tagsLoader = tagsLoader
    this.exifLoader = exifLoader
    this.urlHelper = urlHelper
    this.promiseMap = {}
    this.applicationState = applicationState
  }

  retrieveImages (query) {
    return doRetrieveSerial(this.promiseMap, this.jsonLoader, this.urlHelper.getListing() + this.applicationState.getListingUpdateTime(), {params: query})
  }

  retrieveTags (photo) {
    return this.tagsLoader.load(this.urlHelper.getTagsUrl(photo) + this.applicationState.getTagsUpdateTime(), {})
  }

  retrieveTagGroups () {
    return this.tagsLoader.load(this.urlHelper.getTagGroupsUrl() + this.applicationState.getTagsUpdateTime(), {}).then(data => {
      let response = data.body
      return response.map(tagItem => tagItem.name)
    })
  }

  retrieveAllTags () {
    return this.tagsLoader.load(this.urlHelper.getAllTags() + this.applicationState.getTagsUpdateTime(), {})
  }

  retrieveExif (photo) {
    return this.exifLoader.load(this.urlHelper.getExifUrl(photo), {})
  }
}

export default DataRetriever
