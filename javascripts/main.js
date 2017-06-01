// document.addEventListener('', (e) => {
(function () {
  const height = document.documentElement.clientHeight
  const pageHeader = document.querySelector('.js-page-header')

  if (!pageHeader) {
    return
  }

  pageHeader.style.height = `${height}px`
}())
