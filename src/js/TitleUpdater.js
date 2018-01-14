export default (to, from, next) => {
  if (to.params.photoid === -1) {
    document.title = 'pi|Gallery p' + to.params.page
  } else {
    document.title = 'pi|Photo ' + to.params.photoid
  }
  next()
}
