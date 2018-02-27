class DataUpdater {
  constructor (httpClient, urlHelper) {
    this.urlHelper = urlHelper
    this.httpClient = httpClient
  }

  updatePhotoDate (ids, datetime) {
    return this.httpClient.post(this.urlHelper.getPhotoUpdateUrl(), {
      date: datetime,
      id: ids
    }, {
      emulateJSON: true
    })
  }

  updatePhotoDateOffset (ids, datetimeOffset) {
    return this.httpClient.post(this.urlHelper.getPhotoEditDateUrl(), {
      daysOffset: datetimeOffset,
      id: ids
    }, {
      emulateJSON: true
    })
  }

  updatePhotosRating (ids, rating) {
    return this.httpClient.post(this.urlHelper.getPhotoEditRatingUrl(), {
      rating: rating,
      id: ids
    }, {
      emulateJSON: true
    })
  }
}

export default DataUpdater
