// pages/subject-list/subject-list.js
Page({
  data: {
    films: [],
    page: 1,
    size: 6,
    loading: true,
    type: ''
  },

  onLoad(options) {
    const { type } = options
    this.setData({ type })
    this.loadFilms()
  },

  loadFilms() {
    const { size, page, type } = this.data

    this.setData({ loading: true })

    wx.request({
      url: `https://db.miaov.com/doubanapi/v0/movie/list?type=${type}&page=${page}&size=${size}`,
      success: (res) => {
        const { data } = res.data
        const films = this.data.films || []

        for (let i = 0; i < data.length; i += 2) {
          films.push([data[i], data[i + 1] ? data[i + 1] : null])
        }
        this.setData({ films, loading: false })
      }
    })
  },

  scrollhander() {

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