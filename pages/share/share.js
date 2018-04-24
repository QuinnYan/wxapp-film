// pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: 'https://www.newfq.com/assets/wx/movie-trailer/QRcode.png'
  },

  share(){
    wx.updateShareMenu({
      withShareTicket: true,
      success() {
        wx.downloadFile({
          url: imgUrl,
          success: (res) => {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath
            })
          }
        })
      }
  })
  }
})
