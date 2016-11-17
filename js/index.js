//function lidLogin() {
//  window.external.lidLogin();
//}
//function showGoBack(msg) {
//  window.external.showGoBack(msg);
//}
//function showMask(msg) {
//  window.external.showMask(msg);
//}
//function lenovoidChanged(msg) {
//  alert("lenovoidChanged" + msg);
//}
//function btnRefresh() {
//  alert("btnRefresh");
//}
//function btnGoBack(msg) {
//  alert("btnGoBack");
//}

/*AJAX请求域名前缀-pro*/
//var base_url="https://lt.lenovo.com.cn/iip/api/v1";
///*AJAX请求域名前缀-dev*/
var base_url="http://10.100.18.140/iip/api/v1";


$('.header a').click(function(){
	$(this).addClass('selected').siblings('.selected').removeClass('selected')
})
$().ready(function(){
	$(".section").perfectScrollbar({suppressScrollX: !0});
	$('.section').on('mousewheel',function(){
		if($('.ps-scrollbar-y-rail').css('top')!='0px'){
			if((navigator.userAgent.indexOf('MSIE') >= 0)&& (navigator.userAgent.indexOf('Opera') < 0)){
				$('.go_top').show();
			}else{
				$('.go_top').fadeIn(300);
			}
		}else{
			if((navigator.userAgent.indexOf('MSIE') >= 0)&& (navigator.userAgent.indexOf('Opera') < 0)){
				$('.go_top').hide();
			}else{
				$('.go_top').fadeOut(300);
			}
		}
	})
	$('.go_top').on('click',function(){
		$('.section').scrollTop(0);
		$('.go_top').hide(200);
	})

})

$().ready(function(){
	var minNum=1;
	$(".section").on("scroll",function(){
		var top2=$(".section").scrollTop();
		ulHeight=$(".section ul").height();
		secHeight=$(".section").height();
		var endNum=ulHeight-secHeight;
		//console.log(top2);
		//console.log(endNum);
		if(top2<minNum){
			$(".clickUp").css("display","none");
		}else if(top2>=minNum){
			$(".clickUp").css("display","block");
		};
		if(top2>=endNum){
			//console.log("到底了");
			$(".clickDown").css("display","none");
		}else{
			$(".clickDown").css("display","block");
		};
	})
})

//点击悬浮向下按钮
$(".clickDown").on("click",function(){
	var top=$(".section").scrollTop();
	var num=1;
	var ulHeight=$(".section ul").height();
	var secHeight=$(".section").height();
	top=top+num*100;
	//if(top>=ulHeight-secHeight){
	//	$(".clickDown").css("display","none");
	//}else{
	$(".section").scrollTop(top);
	//}

})
//点击悬浮向上按钮
$(".clickUp").on("click",function(){
	var top=$(".section").scrollTop();
	if(top=="0"){
		$(".clickUp").css("display","none");
	}else{
		var num=1;
		top=top-num*100;
		$(".section").scrollTop(top);
	}
})



//设置记录位置的cookie
/*$(function () {
	var str = window.location.href;
	str = str.substring(str.lastIndexOf("/") + 1);
	if ($.cookie(str)) {
		//$(".section").animate({ scrollTop: $.cookie(str) }, 1000);
		$(".section").scrollTop(parseInt($.cookie(str)));
	}
	else {
		$(".section").scrollTop(0);
	}
})
$(".section").scroll(function () {
	// alert("滚动执行了吗？")
	var str = window.location.href;
	str = str.substring(str.lastIndexOf("/") + 1);
	// alert(str);
	var top = $(".section").scrollTop();
	// alert(top);
	$.cookie(str, top, { path: '/' });
	return $.cookie(str);
})*/





