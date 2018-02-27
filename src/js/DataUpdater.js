class DataUpdater {
  constructor (httpClient, urlHelper, applicationState) {
    this.urlHelper = urlHelper
    this.httpClient = httpClient
    this.applicationState = applicationState
  }

  updatePhotoDate (ids, datetime) {
    return this.httpClient.post(this.urlHelper.getPhotoUpdateUrl(), {
      date: datetime,
      id: ids
    }, {
      emulateJSON: true
    }).then((resp) => {
      this.applicationState.setListingUpdateTime(new Date().getTime())
      return resp
    })
  }

  updatePhotoDateOffset (ids, datetimeOffset) {
    return this.httpClient.post(this.urlHelper.getPhotoEditDateUrl(), {
      daysOffset: datetimeOffset,
      id: ids
    }, {
      emulateJSON: true
    }).then((resp) => {
      this.applicationState.setListingUpdateTime(new Date().getTime())
      return resp
    })
  }

  updatePhotosRating (ids, rating) {
    return this.httpClient.post(this.urlHelper.getPhotoEditRatingUrl(), {
      rating: rating,
      id: ids
    }, {
      emulateJSON: true
    }).then((resp) => {
      this.applicationState.setListingUpdateTime(new Date().getTime())
      return resp
    })
  }
}

export default DataUpdater
