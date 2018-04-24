// pages/favorite/favorite.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    films: [],
    loading: true,
    //show: 'film_favorite',
    page: 1,
    size: 6
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const films = this.data.films
    wx.getStorage({
      key: 'posts_collected',
      success: function(res) {
        
        that.setData({
          //films:res.data
        })        
        
      },
      fail:function(){
        console.log("onLoad fail")
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  
  onShow: function () {
    this.setData({
      page: 1,
      films: []
    })
    this.loadMovies()
    console.log("this.data.films")
    console.log(this.data.films)
    console.log(this.data.films.length)
  },

  loadMovies() {
    let { page, size } = this.data
    let favorite = wx.getStorageSync('posts_collected');
    let data = []
    
    if (favorite) {
      for (let i = (page - 1) * size; i < page * size; i++) {
        if (favorite[i]) {
         
          data.push(favorite[i])
        }
      }
      this.getFavoriteMovies(data)
    }
  },

  getFavoriteMovies(data) {
    // console.log("data")
    // console.log(data)
    this.setData({ loading: true })
    const films = this.data.films
    // console.log("data")
    // console.log(films)
    
    for (let i = 0; i < data.length; i += 2) {
      
      films.push([data[i], data[i + 1] ? data[i + 1] : null])
      
    }
    
    this.setData({ films: films, loading: false })
    
  },

  scrollHandler() {
    const { page } = this.data
    this.setData({
      page: page + 1
    })
    this.loadMovies()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})