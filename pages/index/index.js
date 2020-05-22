let app = getApp();
//替换成开发者后台设置的安全域名
let url = "http://127.0.0.1:8080";

//let url = "http://abcde.vaiwan.com";
//若要在测试应用中临时使用类似abcdef.vaiwan.com 的二级域名代理到无公网IP的服务端开发环境，
//请参考内网穿透工具，注意：内网穿透工具是用于开发测试，当前不保证多个开发者随意设置相同的子域名导致的冲突以及通道稳定性，因此正式应用、正式环境必须是真实的公网IP或者域名，正式应用上线不能使用本工具。
//https://ding-doc.dingtalk.com/doc#/kn6zg7/hb7000

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
