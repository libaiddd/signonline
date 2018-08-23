<?php
	
date_default_timezone_set("PRC");
require_once('email.php');
require_once('func.php');

$data=$_POST;
$contact='';

if(isset($data['tel'])){
    if(!telcheck($data['tel'])){
        echo "手机号码格式有误";
        exit;
    }
    $contact.=" 手机号码为：".$data['tel'];
}
if(isset($data['other_contact']) && !empty($data['other_contact'])){
    $contact.=" 其它联系方式为：".$data['other_contact'];
}
if(empty($contact)){
    echo "联系方式不能为空";
    exit;
}
if(isset($data['uname']))
{
	//##########################################
	$smtpserver = "smtp.vip.163.com";//SMTP服务器
	$smtpserverport = 465;//SMTP服务器端口
	$smtpusermail = "xxx@xxx";//SMTP服务器的用户邮箱
	$smtpemailto = "xxx@xxx";//发送给谁
	$smtpuser = "xxx";//SMTP服务器的用户帐号
	$smtppass = "xxx";//SMTP服务器的用户密码
	$mailsubject = "【xxx】";//邮件主题

    $addon=empty($data['addon_data'])?'':" 附加信息:".$data['addon_data'];
	$mailbody = "【请及时联系】：客户姓名：{$data['uname']},$contact".$addon;//邮件内容

	$mailtype = "TXT";//邮件格式（HTML/TXT）,TXT为文本邮件
	##########################################
	$mail = new MySendMail();
	$mail->setServer($smtpserver, $smtpuser, $smtppass, $smtpserverport, true);
	$mail->setFrom($smtpusermail);
	$mail->setReceiver($smtpemailto); 
	$mail->setMail($mailsubject, $mailbody);
	$res=$mail->sendMail();
	if($res){
	   echo '提交成功，感谢您的参与！';
	}
}else{
	echo '提交失败，请重试';
}
?>
