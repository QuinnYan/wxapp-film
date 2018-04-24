// page/user/user.js
Page({
  data: {
    avatarUrl: '',
    nickName: '',
    gender:'',
    //url1:'assets/image/sexm.png',
    films: [],
    funcList:[
      {enName:'favorite', zhName:'收藏'},
      {enName:'history', zhName:'历史记录'},
    ]
  },

  onLoad :function(options) {
    wx.getUserInfo({
      success: (res) => {        
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName,
          gender:res.userInfo.gender,
          
        })
        
      }
    })
  },

  funcDetail(e){
    var data = e.currentTarget.dataset
    wx.navigateTo({
      url: '../' + data.url + '/' +data.url
    })
  },

  gotoShare() {
    wx.navigateTo({
      url: '../share/share',
    })
  },

})