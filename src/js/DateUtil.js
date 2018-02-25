export default {
  parseDateFileName (fileNamePart) {
    return fileNamePart.slice(0, 4) + '-' + fileNamePart.slice(4, 6) + '-' + fileNamePart.slice(6)
  },

  parseTimeFileName (fileNamePart) {
    return fileNamePart.slice(0, 2) + ':' + fileNamePart.slice(2, 4) + ':' + fileNamePart.slice(4)
  },

  getDateTimeFromFileName (fileName) {
    if (/(19|20)\d{6}.\d{6}/.test(fileName)) {
      let regex = /((?:19|20)\d{6}).{0,1}?(\d{6})/.exec(fileName)
      return this.parseDateFileName(regex[1])
    }
    let parts = fileName.match(/(\d{4}-\d{1,2}-\d{1,2})/)
    if (parts) {
      return parts[1]
    }
    return null
  }
}
