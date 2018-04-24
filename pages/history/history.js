// pages/history/history.js

Page({
  data: {
    films: [],
    loading: true,
    page: 1,
    size: 6
  },

  onShow(options) {
    this.setData({
      page: 1,
      films: []
    })
    this.loadFilms()
  },

  loadFilms() {
    let { page, size } = this.data
    let history = wx.getStorageSync('history');

    let data = []

    if (history) {
      for (let i = (page - 1) * size; i < page * size; i++) {
        if (history[i]) {
          data.push(history[i])
        }
      }

      this.getHistoryFilms(data)
    }
  },

  getHistoryFilms(data) {
    this.setData({ loading: true })
    const films = this.data.films

    for (let i = 0; i < data.length; i += 2) {
      films.push([data[i], data[i + 1] ? data[i + 1] : null])
    }

    this.setData({ films, loading: false })
  },

  scrollHandler() {
    const { page } = this.data
    this.setData({
      page: page + 1
    })
    this.loadFilms()
  },

  gotoDetail(e) {
    const { movieData } = e.currentTarget.dataset
    const { _id } = movieData

    wx.navigateTo({
      url: '../film_detail/film_detail?id=' + _id
    })
  }
})
