// pages/film_detail/film_detail.js
Page({
  data: {
    films: {},
    time: ''
  },
  // onShow: function () {
  //   console.log("show")
  //   console.log(this.data)
  //   var data = this.data.films
  //   console.log(data)
  //   console.log(this.data.films)
  //   console.log(data.films)
  // },
  
  onLoad(options) {
    const id = options.id
    this.data.currentPostId = id;
    //var postData = postData.post
     
    wx.request({
      url: `http://db.miaov.com/doubanapi/v0/movie/detail/${id}`,
      success: (res1) => {
       
        const films = res1.data.data
        //console.log(films)  ////输出当前电影信息
        this.setData({
          films: films
        })
        //console.log(this.data.films)      //输出当前电影信息 同上
        //this.saveData(this.data.films)
        /*wx.setNavigationBarTitle({
          title: res.data.data.title
        })*/
      }
    })  

    var postsCollected = wx.getStorageSync('posts_collected')
    
    if (postsCollected) {
      console.log("this.data.films")
      console.log(this.data)
      console.log(this)
      console.log(this.data.currentPostId)
      //const data = this.data
      //console.log(data.films)
      //console.log(this.data.films)
      
      // console.log("hh")
      // for (let key in this.data)
      //   console.log('test', key, this.data[key])
      // console.log(Object.keys(this.data))

      console.log(this.data.films)
      //console.log(postsCollected)
      console.log(postsCollected.length)
      for (var i = 0; i < postsCollected.length; i++) {
        //console.log(postsCollected[i])
        
        if (postsCollected[i]._id == this.data.currentPostId) {
          console.log("you!!")
          this.setData({
            collected: 1
          })
        }
      }

      //var postCollected = postsCollected[this.data.currentPostId]
      //postsCollected.push(this.data.films)
      //console.log("123123!!")
      //console.log(this.data.films)
      //console.log(postsCollected)
    } else {

      let postsCollected = []
      //postsCollected[this.data.currentPostId] = false;
      // console.log(postsCollected)
      // postsCollected.push(this.data.films)
      // console.log(postsCollected)
      wx.setStorageSync('posts_collected', postsCollected)

    }

  },
  
  favoriteFilm:function(event){
    let postsCollected = wx.getStorageSync('posts_collected')
    
    //var postCollected = postsCollected[this.data.currentPostId]
    let postCollected = this.data.films;
    //console.log(postCollected)
    var flag = 1
    for(var i = 0; i < postsCollected.length; i++){
      if (postsCollected[i]._id == this.data.films._id){
        console.log("same!!")
        //postsCollected.pop(postsCollected[i])
        postsCollected.splice(i, 1);
        flag = 0
      }
    }
    if(flag){
      postsCollected.push(postCollected)
    }
    // console.log(postsCollected)

    // postCollected = !postCollected
    // postsCollected[this.data.currentPostId] = postCollected
    wx.setStorageSync('posts_collected', postsCollected)

    
    this.setData({
      collected: flag
    })

    wx.showToast({
      title: flag ? "收藏成功" : "取消收藏",
      duration:1000,
      icon:"success",
      mask:true
    })
    
  },

  /*saveData(data) {
    let history = wx.getStorageSync('history') || []
    
    history = history.filter((item) => {
      return item._id !== data._id
    })
    history.unshift(data)
    wx.setStorageSync('history', history)

  }*/

})