if (!navigator.onLine){
	requestfailed()
}


function requestfailed(){
	window.external.requestfailed();
}
function lidLogin() {
	//测试
	//alert("你还没登陆哦，我是一个模拟登陆窗口");
    window.external.lidLogin();
}


var pageState=1;
function btnGoBack() {
	//window.location.href = document.referrer;
	history.go(-1);//记录返回上一步
	showGoBack('false');
}
//function updateTime(time){
//	window.external.updateTime(time);
//}
function updateTime(time){
	window.external.updateTime(time);
}
function btnRefresh() {
    $('.section ul').empty();
	$.ajax({
		type:'GET',
		url:base_url+"/qa/questions/details/id/"+_id,
		//测试用
		//url:"dataJson/data.json",
		dataType:'json',
		cache:false,
		success:function(res){
			var html = '';
			$(res.data).each(function(i,data){
				var qlist = data.q_list;
				var alist = data.a_list;
				//qlist[0].createdTime = qlist[0].createdTime.replace("T",' ').substring(0,19);
				qlist[0].createdTime = moment.utc(qlist[0].createdTime).local().format('YYYY-MM-DD HH:mm:ss');
				html+=
					"<li>"+
						"<div class='user_info'>"+
							"<div class='inline user_info_right'>"+
								"<img src='images/head.png' class='icon_header user_header'/>"	+									
							"</div>"+
							"<div class='user_info_left'>"+
								"<div class='user_data'>"+
									"<span class='user_name'>"+
										"<a href='#' class='lf'>"+qlist[0].userName+"</a>"+
									"</span>"+
									"<span class='rf icon_msg'>"+
										qlist[0].replyCount+
									"</span>"+
									"<span class='rf icon_view'>"+
										qlist[0].viewCount+
									"</span>"+
								"</div>"+
								"<div class='user_text'>"+
									"<span class='inline'>"+qlist[0].body+"</span>"+
								"</div>"+
							"</div>"+
							"<div class='user_text'>"+
								"<span class='reply_time block'>"+qlist[0].createdTime+"</span>"+
							"</div>"+
						"</div>"+
					"</li>";
				$.each(alist,function(i,data){
					data.createdTime = moment.utc(data.createdTime).local().format('YYYY-MM-DD HH:mm:ss');
					if(data.isOfficial==true){
						//data.createdTime = data.createdTime.replace("T",' ').substring(0,19);
						html+=
							"<li>"+
								"<div class='user_info'>"+
									"<div class='inline user_info_right'>"+
										"<img src='images/ico_officalReply.png' class='icon_header'/>"+									
									"</div>"+
									"<div class='user_info_left'>"+
										"<div class='user_data'>"+
											"<span class='user_name'>"+
												"<a href='#' class='lf official_name'>"+data.userName+"</a>"+
											"</span>"+
										"</div>"+
										"<div class='user_text'>"+
											"<span>"+data.body+"</span>"+
											"<span class='reply_time block'>"+data.createdTime+"</span>"+
										"</div>"+
									"</div>"+
								"</div>"+
							"</li>";
					}else{
						html+=
							"<li>"+
								"<div class='user_info'>"+
									"<div class='inline user_info_right'>"+
										"<img src='images/head.png' class='icon_header user_header'/>"+									
									"</div>"+
									"<div class='user_info_left'>"+
										"<div class='user_data'>"+
											"<span class='user_name'>"+
												"<a href='#' class='lf'>"+data.userName+"</a>"+
											"</span>"+
										"</div>"+
										"<div class='user_text'>"+
											"<span>"+data.body+"</span>"+
											"<span class='reply_time block'>"+data.createdTime+"</span>"+
										"</div>"+
									"</div>"+
								"</div>"+
							"</li>";
					}
				})
				
			})
			
			$('.section ul').append(html);
			//$('.inp').val("请输入您的回复");
		}
	})
}
function showMask(msg) {
	//临时测试注释
    window.external.showMask(msg);
}
function lenovoidChanged(msg) {
    alert("lenovoidChanged" + msg);
}
loginState = sessionStorage.getItem('loginState');
uid = sessionStorage.getItem('uid');
userName = sessionStorage.getItem('userName');

function lenovoidChanged(msg) {
    
    var msg = eval("("+msg+")")
    sessionStorage.setItem('loginState',msg.loginState);
    sessionStorage.setItem('uid',msg.uid);
    sessionStorage.setItem('userName',msg.username);
   	loginState = sessionStorage.getItem('loginState');
   	uid = sessionStorage.getItem('uid');
   	userName = sessionStorage.getItem('userName');
}
function updateinfo(info){
	
	var info=eval("("+info+")")
	sessionStorage.setItem('mt',info.mt);
	sessionStorage.setItem("sn",info.sn);
	sessionStorage.setItem("os",info.os);
	mt = sessionStorage.getItem("mt");
	sn = sessionStorage.getItem("sn");
	os = sessionStorage.getItem("os");
}



var clickState=true;
function clickSupport(state){
	if(clickState){
		$('.support').html(parseInt($('.support').html())+1);
		$('.support').css('background','url(images/ico_support_selected.png) no-repeat 0 -2px')
		clickState=false;
	}else{
		$('.support').html(parseInt($('.support').html())-1);
		$('.support').css('background','url(images/ico_support.png) no-repeat 0 -2px')
		clickState=true;
	}
}
$('.support').click(clickSupport)

var loginState = sessionStorage.getItem('loginState');
var uid = sessionStorage.getItem('uid');
var userName = sessionStorage.getItem('userName');
var _id = sessionStorage.getItem('_id');
function submit(e){
	e.preventDefault();
	if($('.reply_txt').val()){
		$('.inp').val($('.reply_txt').val());
	}
	
	if((navigator.userAgent.indexOf('MSIE') >= 0)&& (navigator.userAgent.indexOf('Opera') < 0)){
		showMask('false')
		$('.mask').fadeOut(0);
	}else{
		showMask('false')
		$('.mask').fadeOut(300);
	}
}

$('.mask').on('click','.submit_lg_btn',submit);

function CurentTime(){ 
    var now = new Date();
   
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
   
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
	var ss= now.getSeconds();          //秒
   
    var clock = year + "-";
   
    if(month < 10)
        clock += "0";
   
    clock += month + "-";
   
    if(day < 10)
        clock += "0";
       
    clock += day + " ";
   
    if(hh < 10)
        clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0'; 
    clock += mm+ ":";
	if ( ss < 10) clock += '0';
	clock += ss;
    return(clock); 
} 

$('.submit_btn').on('click',function(e){
	e.preventDefault();
	mt = sessionStorage.getItem("mt");
	sn = sessionStorage.getItem("sn");
	os = sessionStorage.getItem("os");
	loginState = sessionStorage.getItem('loginState');
   	uid = sessionStorage.getItem('uid');
   	userName = sessionStorage.getItem('userName');
	showMask('false');
	if(loginState=='true'){
		if($('.reply_txt').val()&&$('.reply_txt').val()!='请输入您的问题、意见或建议。请避免使用敏感文字，文明发言。字数不要超过300字，超出300字后系统会将多余的字体截断。'){
			var body=$('.reply_txt').val();
			var req={};
			req.body=body;
			req.sn=sn;
			req.mt=mt;
			req.os=os;
			req.userID=uid;
			req.userName=userName;
			req.parentID=_id;
			$.ajax({
				type:"POST",
				url:base_url+"/QA/answer",
				dataType:'json',
				data:req,
				success:function(res){
					updateTime(res.data.createdTime);
					
					var html=
						"<li name="+res.data._id+">"+
							"<div class='user_info'>"+
								"<div class='inline user_info_right'>"+
									"<img src='images/head.png' class='icon_header user_header'/>"+										
								"</div>"+
								"<div class='user_info_left'>"+
									"<div class='user_data'>"+
										"<span class='user_name'>"+
											"<a href='#' class='lf'>"+userName+"</a>"+
										"</span>"+
									"</div>"+
									"<div class='user_text'>"+
										"<span>"+body+"</span>"+
										"<span class='reply_time block'>"+CurentTime()+"</span>"+
									"</div>"+
								"</div>"+
							"</div>"+
						"</li>";
					
					$('.section ul').append(html);
					$('.section').scrollTop(parseInt($('.section ul').css('height'))-470);
					$('.section ul').perfectScrollbar('update');
					//$('.inp').val("提问、吐槽、发表意见或建议");
					//$('.Mplaceholder-one').hide();
					$(".icon_msg").html(parseInt($(".icon_msg").html())+1);
				}
			});
		}
		$('.reply_txt').val('');
		$('.inp').val("提问、吐槽、发表意见或建议");
		$('.Mplaceholder-one').hide();
		//测试新加文字
		//$('.inp').val("请输入您的回复");
		if((navigator.userAgent.indexOf('MSIE') >= 0)&& (navigator.userAgent.indexOf('Opera') < 0)){
			showMask("false");
			$('.mask').fadeOut(0);
		}else{
			showMask("false")
			$('.mask').fadeOut(300);
		}
	}else{
		lidLogin();
	}
})


/*异步提交回答*/
$('.submit_lg_btn').click(function(e){
	e.preventDefault();
	mt = sessionStorage.getItem("mt");
	sn = sessionStorage.getItem("sn");
	os = sessionStorage.getItem("os");
	loginState = sessionStorage.getItem('loginState');
   	uid = sessionStorage.getItem('uid');
   	userName = sessionStorage.getItem('userName');
	showMask('false');
	if(loginState=='true'){
		if($('.reply_txt').val()&&$('.reply_txt').val()!='请输入您的问题、意见或建议。请避免使用敏感文字，文明发言。字数不要超过300字。'){
			var body=$('.reply_txt').val();
			var req={};
			req.body=body;
			req.sn=sn;
			req.mt=mt;
			req.os=os;
			req.userID=uid;
			req.userName=userName;
			req.parentID=_id;
			$.ajax({
				type:"POST",
				url:base_url+"/QA/answer",
				dataType:'json',
				data:req,
				success:function(res){
					updateTime(res.data.createdTime);
					var html=
						"<li name="+res.data._id+">"+
							"<div class='user_info'>"+
								"<div class='inline user_info_right'>"+
									"<img src='images/head.png' class='icon_header user_header'/>"+										
								"</div>"+
								"<div class='user_info_left'>"+
									"<div class='user_data'>"+
										"<span class='user_name'>"+
											"<a href='#' class='lf'>"+userName+"</a>"+
										"</span>"+
									"</div>"+
									"<div class='user_text'>"+
										"<span>"+body+"</span>"+
										"<span class='reply_time block'>"+CurentTime()+"</span>"+
									"</div>"+
								"</div>"+
							"</div>"+
						"</li>";
					
					$('.section ul').append(html);
					$('.section').scrollTop(parseInt($('.section ul').css('height'))-470);
					$('.section ul').perfectScrollbar('update');
					//$('.inp').val("");
					//$('.Mplaceholder-one').show();
					$(".icon_msg").html(parseInt($(".icon_msg").html())+1);
				
				},
				error:function (xhr, errorType, error) {
					alert(error);
				}
			});
		}
		$('.reply_txt').val('');
		$('.inp').val("");
		$('.Mplaceholder-one').show();
		//加上文字试试
		//$('.inp').val("请输入您的回复");
		if((navigator.userAgent.indexOf('MSIE') >= 0)&& (navigator.userAgent.indexOf('Opera') < 0)){
			showMask("false");
			$('.mask').fadeOut(0);
		}else{
			showMask("false")
			$('.mask').fadeOut(300);
		}
	}else{
		lidLogin();
	}
})


$().ready(function(){
	var _id=sessionStorage.getItem('_id');
	showGoBack('true');
	$('.section ul').empty();
	$.ajax({
		type:'GET',
		url:base_url+"/qa/questions/details/id/"+_id+'/page/1',
		//测试用地址
		//url:"dataJson/data.json",
		dataType:'json',
		cache:false,
		success:function(res){
			//测试
			//alert("获取到数据了");
			// console.log(res);
			var html = '';
			$(res.data).each(function(i,data){
				var qlist = data.q_list;
				var alist = data.a_list;
				//qlist[0].createdTime=qlist[0].createdTime.replace("T",' ').substring(0,19);
				qlist[0].createdTime = moment.utc(qlist[0].createdTime).local().format('MM-DD HH:mm');
				html+=
					"<li>"+
						"<div class='user_info'>"+
							"<div class='inline user_info_right'>"+
								"<img src='images/head.png' class='icon_header user_header'/>"	+									
							"</div>"+
							"<div class='user_info_left'>"+
								"<div class='user_data'>"+
									"<span class='user_name'>"+
										"<a href='#' class='lf'>"+qlist[0].userName+"</a>"+
									"</span>"+
									"<span class='rf icon_msg'>"+
										qlist[0].replyCount+
									"</span>"+
									"<span class='rf icon_view'>"+
										qlist[0].viewCount+
									"</span>"+
								"</div>"+
								"<div class='user_text'>"+
									"<span class='inline'>"+qlist[0].body+"</span>"+
								"</div>"+
							"</div>"+
							"<div class='user_text'>"+
								"<span class='reply_time block'>"+qlist[0].createdTime+"</span>"+
							"</div>"+
						"</div>"+
					"</li>";
				$.each(alist,function(i,data){
					if(data.isOfficial==true){
						//data.createdTime=data.createdTime.replace("T",' ').substring(0,19);
						data.createdTime = moment.utc(data.createdTime).local().format('MM-DD HH:mm');
						html+=
							"<li>"+
								"<div class='user_info'>"+
									"<div class='inline user_info_right'>"+
										"<img src='images/ico_officalReply.png' class='icon_header'/>"+									
									"</div>"+
									"<div class='user_info_left'>"+
										"<div class='user_data'>"+
											"<span class='user_name'>"+
												"<a href='#' class='lf official_name'>"+data.userName+"</a>"+
											"</span>"+
										"</div>"+
										"<div class='user_text'>"+
											"<span>"+data.body+"</span>"+
											"<span class='reply_time block'>"+data.createdTime+"</span>"+
										"</div>"+
									"</div>"+
								"</div>"+
							"</li>";
					}else{
						//data.createdTime=data.createdTime.replace("T",' ').substring(0,19);
						data.createdTime = moment.utc(data.createdTime).local().format('YYYY-MM-DD HH:mm:ss');
						html+=
							"<li>"+
								"<div class='user_info'>"+
									"<div class='inline user_info_right'>"+
										"<img src='images/head.png' class='icon_header user_header'/>"+									
									"</div>"+
									"<div class='user_info_left'>"+
										"<div class='user_data'>"+
											"<span class='user_name'>"+
												"<a href='#' class='lf'>"+data.userName+"</a>"+
											"</span>"+
										"</div>"+
										"<div class='user_text'>"+
											"<span>"+data.body+"</span>"+
											"<span class='reply_time block'>"+data.createdTime+"</span>"+
										"</div>"+
									"</div>"+
								"</div>"+
							"</li>";
					}
				})
				
			})
			
			$('.section ul').append(html);
		},
		error:function(msg){
			console.log(msg)
		}
	})
		
})


function showGoBack(msg) {
	//测试用注释
	window.external.showGoBack(msg);
}