let app = getApp();
//替换成开发者后台设置的安全域名
let url = "http://127.xxx.xx.1:8080";

Page({
    data:{
        authCode:'',
        openId:'',
        nick:''

    },
    onLoad(){

        let _this = this;

        dd.getAuthCode({
            success:(res)=>{
                _this.setData({
                    authCode:res.authCode
                })
                
                dd.httpRequest({
                    url: url+'/login',
                    method: 'POST',
                    data: {
                        authCode: res.authCode
                    },
                    dataType: 'json',
                    success: function(res) {
                        let userInfo = res.data.result;
                        _this.setData({
                            openId:userInfo.openid,
                            nick:userInfo.nick

                        })
                    },
                    fail: function(res) {
                        dd.alert({content: JSON.stringify(res)});
                    },
                    complete: function(res) {
                        dd.hideLoading();
                    }
                    
                });
            },
            fail: (err)=>{
                dd.alert({
                    content: JSON.stringify(err)
                })
            }
        })
        
    }
})