/**
 * 在线报名插件1.0
 */
(function(){
    var signuponline=function(param){
        this.options=param;
    }

    signuponline.prototype={
        options:{
            title:'',
            url:'',
            uname:"",
            tel:"",//手机号
            other_contact:"", //其它联系方式，例如QQ 微信号等
            addon_data:'',//附加信息
            channel:'default'
        },
        init:function(){
            if(this.options.url==undefined || this.options.url==''){
                console.log('必须输入请求地址！');
                return false;
            }
            if(this.options.tel ==undefined && this.options.other_contact ==undefined){
                console.log('至少提供一种联系方式');
                return false;
            }
            if(this.options.tel !=undefined){
                if(this.options.tel==''){
                    layer.msg('号码不能为空哦');
                    return false;
                }
                if(!this.telCheck(this.options.tel)){
                    layer.msg('号码格式有误');
                    return false;
                }
            }

            this.submit();
        },
        /**
         * 手机号合法性检测
         * @returns {boolean}
         */
        telCheck:function(tel){

            var regu =/^[1][3|5|4|7|8][0-9]{9}$/;
            var re = new RegExp(regu);
            if (re.test(tel)) {
                return true;
            }else{
                return false;
            }
        },
        nameCheck:function(){
            if(this.options.uname==undefined || this.options.uname==''){
                return false;
            }else{
                return true
            }
        },
        submit:function(){
			var tel=this.options.tel
            if(!this.nameCheck()){
                layer.msg('请输入您的姓名哦！');
                return false;
            }
			if(typeof(Storage)!=="undefined"){
				if(localStorage.getItem(tel)==1){
					layer.msg('请不要重复提交哦！');
					return false;
				}
			}
            $.ajax({
                type:'POST',
                data: this.options,
                url:this.options.url,
				beforeSend:function(){
					layer.msg('处理中...')
				},
                success:function(msg){
					if(typeof(Storage)!=="undefined"){
						localStorage.setItem(tel,1)
					}
                    layer.msg(msg)
                }
            })

        }
    }
    window.signuponline = signuponline;
})()

