import util from './util'

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
    return doRetrieveSerial(this.promiseMap, this.tagsLoader, this.urlHelper.getTagsUrl(photo) + this.applicationState.getTagsUpdateTime(), {})
  }

  retrieveAllTags () {
    return doRetrieveSerial(this.promiseMap, this.tagsLoader, this.urlHelper.getAllTags() + this.applicationState.getTagsUpdateTime(), {}).then(data => {
      let response = data.body
      let groups = response.map(tagItem => tagItem.groupName)
      let responseMap = util.removeDuplicates(groups).map(group => {
        return {
          'name': group,
          'id': response.find(tagItem => tagItem.groupName === group).groupId,
          'tags': response.filter(tagItem => tagItem.groupName === group)
        }
      })
      console.log('responseMap', responseMap)
      return responseMap
    })
  }

  retrieveExif (photo) {
    return doRetrieveSerial(this.promiseMap, this.exifLoader, this.urlHelper.getExifUrl(photo), {})
  }
}

export default DataRetriever
