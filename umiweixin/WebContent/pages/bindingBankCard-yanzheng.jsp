<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0" />
<meta name="format-detection" content="telephone=no" />
<meta http-equiv="Cache-Control" content="no-transform" />
<meta name="layoutmode" content="standard" />
<meta name="renderer" content="webkit" />
<!--uc浏览器判断到页面上文字居多时，会自动放大字体优化移动用户体验。添加以下头部可以禁用掉该优化-->
<meta name="wap-font-scale" content="no" />
<meta http-equiv="Pragma" content="no-cache" />
<title>绑卡验证</title>
<link type="text/css" rel="stylesheet" href="<%=basePath%>css/css.css" />
<script src="<%=basePath%>js/jquery-1.11.0.min.js"></script>
<script src="<%=basePath%>js/common.js"></script>
<script src="<%=basePath %>js/count.js"></script>
</head>

<body>
	<div class="proving-user">账号：${user.userNameCT }</div>
	<div class="common-input">
		<input type="tel" name="validCode" placeholder="请输入验证码" maxlength="6" style="width: 65%;" class="left" />
		<input name="code-btn" type="button" value="30" class="resend-btn unclick right" />
	</div>
	<button class="submit" type="button">确定</button>
	<script type="text/javascript">
	writeFooter(3,true);
	var resendBtn = $("input[name='code-btn']");
	var maxResendTime = resendBtn.val();
	var resendTime = maxResendTime;
	
	var cd = setInterval(function(){
		
		if(resendTime <= 0){
			resendTime = maxResendTime;
			resendBtn.val("重发").removeClass("unclick");
			clearInterval(cd);
			return;
		}
		
		resendTime--;
		resendBtn.val(resendTime);
	},1000);		
		
		function resend(){
			if($(this).hasClass("unclick")) return;
			
			$(this).addClass("unclick").val(resendTime);
			
			var reCd = setInterval(function(){				
				if(resendTime <= 0){
					resendBtn.val("重发").removeClass("unclick");
					clearInterval(reCd);
					return;
				}				
				resendTime--;
				resendBtn.val(resendTime);
			},1000);
			
			$.ajax({
					type : "get",
					url : getContextPath() + "/bankCardAction!getVerCode.action",
					success : function(data) {
						if (data === "0") {
							alert("短信发送成功，请注意查收！");
						} else if (data === "1") {
							alert("短信发送失败，请稍后重新发送！");
						} else if (data === "2") {
							alert("登录状态失效(太久未登录或在别处登录引起)!");
							location.href = getContextPath() + "/login!logout.action";
						}else if (data === "502") {
					          alert("本次操作已经结束，请返回首页!");
					          location.href = getContextPath() + "/login!loadIndexPage.action";
					    }
					}
				})
		}

		function doSubmit() {
			var validCode = $("input[name='validCode']").val();

			if (validCode == "") {
				alert("请输入验证码!");
				return;
			}

			layer();

			$.ajax({
				type : "get",
				url : getContextPath() + "/bankCardAction!bindingBankCardAdvance.action",
				data : {"validCode" : validCode},
				success : function(data) {
					var data = stringToJson(data);
					if (data.retcode === "0") {
						$("#layer").remove();
						location.href = getContextPath() + "/bankCardAction!loadUserBankInfo.action";
					} else if (data.retcode === "1") {
						$("#layer").remove();
						alert(data.retmessage);
					} else if (data.retcode === "2") {
						$("#layer").remove();
						alert("个人信息有误，请重新登录!");
						location.href = getContextPath() + "/login!logout.action";
					} else if (data.retcode === "501") {
						alert("您已提交请求,请请耐心等待!");
					} else if (data.retcode === "502") {
						$("#layer").remove();
						alert("本次操作已结束！");
						location.href=getContextPath() + "/bankCardAction!loadUserBankInfo.action";
					}
				},
				error: function(data){
					console.log(data);
				}
			})
		}
		$(function() {
			$("button.submit").on("touchend", doSubmit);
			resendBtn.on("touchend",resend);
		})
	</script>
</body>
</html>
