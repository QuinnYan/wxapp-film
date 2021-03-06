// pages/subject/subject.js
Page({
  data: {
    types: [
      {
        name: '喜剧',
        img: '/assets/image/xiju.png'
      },
      {
        name: '动作',
        img: '/assets/image/dongzuo.png'
      },
      {
        name: '科幻',
        img: '/assets/image/kehuan.png'
      },
      {
        name: '爱情',
        img: '/assets/image/aiqing.png'
      },
      {
        name: '动画',
        img: '/assets/image/donghua.png'
      }
    ]
  },

  tapTypeHandle(e) {
    const type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '../subject-list/subject-list?type=' + type,
    })
  }
})