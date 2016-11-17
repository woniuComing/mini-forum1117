function showGoBack(msg) {
	//测试临时注释
    window.external.showGoBack(msg);
}


//输入框获取焦点时,弹出遮罩层
$('.inp').on('focus',function(){
	$('.Mplaceholder-one').hide();
	var loginState = sessionStorage.getItem('loginState');

	if(loginState ==='false'){
		lidLogin();
		$('.Mplaceholder-one').show();
	}else{
		if($(".inp").val()){
			$("#commit_text").val($(".inp").val());
		};
		if((navigator.userAgent.indexOf('MSIE') >= 0)&& (navigator.userAgent.indexOf('Opera') < 0)){
			showMask('true');
			//$('.mask').fadeIn(0);
			//$('.mask').slideDown(500);
			$('.commit_mask').show();
			$(".commit_mask_main").css("display","block");
			$(".commit_content").slideDown(300,function(){
				$(".countText").css("display","block");
			});
		}else{
			showMask('true');
			$('.commit_mask').show();
			$(".commit_mask_main").css("display","block");
			$(".commit_content").slideDown(300,function(){
				$(".countText").css("display","block");
			});
		}
		$("#commit_text").focus();
		if($('#commit_text').val()==""){
			$('.Mplaceholder').show();
		}
	}
})

//回复的输入框获取焦点时的事件
$(".detail_inp").on("focus",function(){
	$('.replyPlace').hide();
	var loginState = sessionStorage.getItem('loginState');
	if(loginState ==='false'){
		lidLogin();
		$('.replyPlace').show();
	}else{
		//showMask("true");
		$(".reply_mask").show();
		$(".mask_main").css("display","block");
		$(".mask_content").slideDown(300,function(){
			$(".countText").css("display","block");
		});
		$('#reply_text').focus();
		if($('#reply_text').val()==""){
			$('.replyPlace').show();
		};
		//待验证
		if($(".detail_inp").val()){
			$("#reply_text").val($(".detail_inp").val());
		};
	}
})


/*兼容ie8maxlength*/
$(function(){
    
	$("textarea[maxlength]").keyup(function(){
	    var area=$(this);
	    var max=parseInt(area.attr("maxlength"),10); //获取maxlength的值
	    if(max>0){
		    if(area.val().length>max){ //textarea的文本长度大于maxlength
				console.log('您输入的文字已超过300字，请缩减');
		    	area.val(area.val().substr(0,max)); //截断textarea的文本重新赋值

		    }
	    }
	});
    //复制的字符处理问题
	$("textarea[maxlength]").blur(function(){
		var area=$(this);
		var max=parseInt(area.attr("maxlength"),10); //获取maxlength的值
		if(max>0){
			if(area.val().length>max){ //textarea的文本长度大于maxlength
				area.val(area.val().substr(0,max)); //截断textarea的文本重新赋值
			}
		}
	});
});

$('#commit_text').on('keydown',function(){
	$('.Mplaceholder').hide();
})

//发表的文本框获取焦点时，placeHolder内容清除
$("#commit_text").on("focus blur",function(){
	$(this).val($(this).val().replace(/(^\s*)|(\s*$)/g,""));
	if($(this).val() == ""){
		$(".Mplaceholder").css("display","block");
		$(".commit_mask .countValue").text(300);
	}else{
		$(".Mplaceholder").css("display","none");
	}
})


//点击到占位符的时候，让文本框获取焦点
$(".Mplaceholder").on("click",function(){
	$('#commit_text').focus();
})
$(".Mplaceholder-one").on("click",function(){
	var loginState = sessionStorage.getItem('loginState');
	if(loginState ==='false'){
		lidLogin();
	}else{
		$(".inp").focus();
	}
})
//点击详情的输入框的占位符的时候
$(".replyPlace").on("click",function(){
	var loginState = sessionStorage.getItem('loginState');
	if(loginState ==='false'){
		lidLogin();
	}else{
		$(".detail_inp").focus();
	}
})

//文本域中的值改变时,记录用户输入多少字
//$('.reply_txt').on('keyup',function(){
	//if($.syncProcessSign) return ;
	//$.syncProcessSign = true;

	/*$(this).val($(this).val().replace(/^\s*!/,""));
	$(this).val($(this).val().substr(0,300));
	$(".countValue").text(300-$('.reply_txt').val().length);

	if($('.reply_txt').val()&&$('.countValue').text()==0){
		$(".tips").stop(true,false).slideDown(300).delay(1000).slideUp(300);
	}*/
	//$.syncProcessSign = false;
	//console.log($('.reply_txt').val().length)
//})


//提交的文本域中的值改变时,记录用户输入多少
$("#commit_text").on("keyup", function() {
	if ($(this).val().length > 300) {
		$(this).val($(this).val().substring(0, 300));
	}
	$(".commit_mask .countValue").text(300 - $(this).val().length);
	if($('#commit_text').val()&&$('.commit_mask .countValue').text()==0){
		$(".commit_tips").stop(true,false).fadeIn(300).delay(2000).fadeOut(300);
	}
});

//回复的文本域中的值改变时,记录用户输入多少
$("#reply_text").on("keyup", function() {
	if ($(this).val().length > 300) {
		$(this).val($(this).val().substring(0, 300));
	}

	$(".reply_mask .countValue").text(300 - $(this).val().length);
	if($('#reply_text').val()&&$('.reply_mask .countValue').text()==0){
		$(".reply_tips").stop(true,false).fadeIn(300).delay(2000).fadeOut(300).text("您已经输入300字了哦!");
	}
});

//回复的文本框获取焦点的时候
$("#reply_text").on("focus",function(){
	//如果值为空，就让字数倒计时为300
	if($.trim($("#reply_text").val())==""){
		$(".reply_mask .countValue").text(300);
	}
})

//点击提交框的取消按钮事件
$("#com_can_btn").on("click",function(e){
	e.preventDefault();
	if($('#commit_text').val()&&$('#commit_text').val()!='请输入您的问题、意见或建议。请避免使用敏感文字，文明发言。字数不要超过300字，超出300字后系统会将多余的字体截断。'){
		$('.inp').val($('#commit_text').val());
		//$('.Mplaceholder-one').hide();
	}else{
		//$('.Mplaceholder-one').show();
		$('.inp').val("");
		$('.Mplaceholder-one').show();
	}
	if((navigator.userAgent.indexOf('MSIE') >= 0)&& (navigator.userAgent.indexOf('Opera') < 0)){
		showMask('false');
		$(".countText").css("display","none");
		$(".commit_mask_main").css("display","none");
		$(".commit_content").slideUp(300,function(){
			$('.commit_mask').css("display","none");
		});
	}else{
		showMask("false");
		$(".countText").css("display","none");
		$(".commit_mask_main").css("display","none");
		$(".commit_content").slideUp(300,function(){
			$('.commit_mask').css("display","none");
		});
	}
})

//点击提交框的遮罩事件
$(".commit_mask_main").on("click",function(){
	if($('#commit_text').val()&&$('#commit_text').val()!='请输入您的问题、意见或建议。请避免使用敏感文字，文明发言。字数不要超过300字，超出300字后系统会将多余的字体截断。'){
		$('.inp').val($('#commit_text').val());
	}else{
		$('.inp').val("");
		$('.Mplaceholder-one').show();
	}
	if((navigator.userAgent.indexOf('MSIE') >= 0)&& (navigator.userAgent.indexOf('Opera') < 0)){
		showMask('false');
		$(".countText").css("display","none");
		$(".commit_mask_main").css("display","none");
		$(".commit_content").slideUp(300,function(){
			$('.commit_mask').css("display","none");
		});
	}else{
		showMask("false");
		$(".countText").css("display","none");
		$(".commit_mask_main").css("display","none");
		$(".commit_content").slideUp(300,function(){
			$('.commit_mask').css("display","none");
		});
	}
})



