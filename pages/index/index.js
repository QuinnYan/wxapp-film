// pages/index/index.js
Page({
  data: {
    films: [],
    film_poster: [
      { url: '/assets/poster/poster0.jpg'},
      { url: '/assets/poster/poster1.jpg' },
      { url: '/assets/poster/poster2.jpg' },
      { url: '/assets/poster/poster3.jpg' }
    ],    
    page: 1,
    size: 6,
    loading: true
  },

  onLoad(options) {
    this.loadFilms()
    //console.log("index")
    //console.log(this.data.films)
  },

  saveData(data) {
    //从本地缓存中同步获取指定 key 对应的内容,let表示history为一个局部变量,getStorageSync的返回类型为string或一个对象
    let history = wx.getStorageSync('history') || []

    history = history.filter((item) => {
      return item._id !== data._id
    })

    history.unshift(data)
    wx.setStorageSync('history', history)
    //第一个 history为本地缓存中指定的 key ,第二个则为需要存储的内容
  },


  loadFilms() {
    const { size, page } = this.data
    this.setData({
      loading: true
    })
    wx.request({
      url: `http://db.miaov.com/doubanapi/v0/movie/list?page=${page}&size=${size}`,
      //es6的箭头函数 =>使内部的this指向外部的this
      success: (res) => {
        const { data } = res.data
        const films = this.data.films || []

        for (let i = 0; i < data.length; i += 2) {
          films.push([data[i], data[i + 1] ? data[i + 1] : null])
        }

        this.setData({
          films,
          loading: false
        })
      }
    })
  },

  scrollHandler() {
    const { page } = this.data;
    this.setData({
      page: page + 1
    })
    this.loadFilms();
  },
  
  gotoDetail(e) {
    const { movieData } = e.currentTarget.dataset
    const { _id } = movieData
    this.saveData(movieData)

    wx.navigateTo({
      url: '../film_detail/film_detail?id=' + _id
    })
  }

  
})