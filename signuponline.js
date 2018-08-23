/**
 * ���߱������1.0
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
            tel:"",//�ֻ���
            other_contact:"", //������ϵ��ʽ������QQ ΢�źŵ�
            addon_data:'',//������Ϣ
            channel:'default'
        },
        init:function(){
            if(this.options.url==undefined || this.options.url==''){
                console.log('�������������ַ��');
                return false;
            }
            if(this.options.tel ==undefined && this.options.other_contact ==undefined){
                console.log('�����ṩһ����ϵ��ʽ');
                return false;
            }
            if(this.options.tel !=undefined){
                if(this.options.tel==''){
                    layer.msg('���벻��Ϊ��Ŷ');
                    return false;
                }
                if(!this.telCheck(this.options.tel)){
                    layer.msg('�����ʽ����');
                    return false;
                }
            }

            this.submit();
        },
        /**
         * �ֻ��źϷ��Լ��
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
                layer.msg('��������������Ŷ��');
                return false;
            }
			if(typeof(Storage)!=="undefined"){
				if(localStorage.getItem(tel)==1){
					layer.msg('�벻Ҫ�ظ��ύŶ��');
					return false;
				}
			}
            $.ajax({
                type:'POST',
                data: this.options,
                url:this.options.url,
				beforeSend:function(){
					layer.msg('������...')
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

