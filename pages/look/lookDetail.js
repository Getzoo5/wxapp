// pages/look/lookDetail.js
var app = new getApp
Page({
  data: {
    item: []
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.config.apiBase + '/getDetail/id/' + options.id,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          var str = res.data.content
          var str1 = str.replace(/'↵'/g, '\t')
          res.data.content = str1
          that.setData({
            item: res.data
          })
        }
      }
    })

    this.search = this.selectComponent("#search");
    this.navbar_top = this.selectComponent("#navbar-top");
    this.navbar_top.isBack('详 情')
  },
  zanBtn: function () {
    this.setData({
      zanBtn: !this.data.zanBtn
    })
  },




  // 下拉加载
  touchmove: function (event) {
    let currentX = event.touches[0].pageX
    let currentY = event.touches[0].pageY
    if (this.data.lastX <= app.globalData.systemInfo.windowHeight / 2) {
      if (event.touches[0].pageY < app.globalData.systemInfo.windowHeight) {
        this.navbar_top.touchmove(event);
      }
    }
  },
  touchstart: function (event) {
    let currentX = event.touches[0].pageX
    let currentY = event.touches[0].pageY
    if (event.touches[0].pageY < app.globalData.systemInfo.windowHeight / 2) {
      this.setData({
        lastX: event.touches[0].pageX,
        lastY: event.touches[0].pageY
      })
      this.navbar_top.touchstart(event);
    }
  },
  touchend: function (event) {
    var that = this
    if (this.data.lastX <= app.globalData.systemInfo.windowHeight / 2) {
      this.navbar_top.touchend(event);
      setTimeout(function () {   // 请求
        that.navbar_top.isPullEnd();
      }, 2000)
    }
  }
})