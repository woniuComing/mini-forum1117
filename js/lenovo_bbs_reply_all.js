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
function showGoBack(msg) {
	//测试用注释
	window.external.showGoBack(msg);
}
var pageState=1;
function btnGoBack() {
	//window.location.href = document.referrer;
	history.go(-1);//记录返回上一步
	//alert("点击了返回按钮222222");
}

function updateTime(time){
	window.external.updateTime(time);
}
function btnRefresh() {
    $('.section ul').empty();
	window.location.href="pcmgrbbs_reply_all.html";
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
	sessionStorage.setItem("vs",info.vs);
	vs = sessionStorage.getItem("vs");
	mt = sessionStorage.getItem("mt");
	sn = sessionStorage.getItem("sn");
	os = sessionStorage.getItem("os");
}


var loginState = sessionStorage.getItem('loginState');
var uid = sessionStorage.getItem('uid');
var userName = sessionStorage.getItem('userName');
var _id = sessionStorage.getItem('_id');


function CurentTime(){ 
    var now = new Date();
   
    //var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
   
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
	//var ss= now.getSeconds();          //秒
   
    //var clock = year + "-";
    var clock ="";

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
	clock += mm;
    //clock += mm+ ":";
	//if ( ss < 10) clock += '0';
	//clock += ss;
    return clock;
} 



/*点击回复提交按钮事件*/
$('#reply_btn').click(function(e){
	e.preventDefault();
	mt = sessionStorage.getItem("mt");
	sn = sessionStorage.getItem("sn");
	os = sessionStorage.getItem("os");
	vs = sessionStorage.getItem("vs");
	loginState = sessionStorage.getItem('loginState');
   	uid = sessionStorage.getItem('uid');
   	userName = sessionStorage.getItem('userName');
	//showMask('true');
	if(loginState=='true'){
		$('#reply_text').val($('#reply_text').val().replace(/(^\s*)|(\s*$)/g,""));
		if($('#reply_text').val()==""){
			//showMask("true");
			$(".c_s_tip").stop(true,false).fadeIn(500).delay(1500).fadeOut(500).text("不能发送空内容!");
			$('#reply_text').val("");
			return;
		};
		if($('#reply_text').val()!=''){
			var body=$('#reply_text').val();
			body=encodeHtml(body);
			var req={};
			req.body=body;
			req.sn=sn;
			req.mt=mt;
			req.os=os;
			req.vs=vs;
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
					$('#reply_text').val("");
					//$(".c_s_tip").fadeIn(500).delay(1500).fadeOut(500).text("提交成功，可点击进入详情查看!");
					//alert("数据发送成功了");
					//alert(body);
					/*
					var html=
					"<li name="+res.data._id+">"+
						"<div class='other pub_box'>"+
							"<div class='user_info_left'>"+
								"<div class='user_data'>"+
									"<span class='user_name'>"+
										"<a class='lf other_name'>"+userName+"</a>"+
										"<span class='other_name_end'>的回复:</span>"+
									"</span>"+
									"<span class='rf off_reply_time'>"+CurentTime()+"</span>"+
								"</div>"+
								"<div class='user_text'>"+body+"</div>"+
							"</div>"+
						"</div>"+
					"</li>";
					$('.section #msg_reply').append(html);
					*/
					window.location.href="pcmgrbbs_reply_all.html";
					/*
					$('.section').scrollTop(parseInt($('.section ul').css('height'))-470);
					$('.section ul').perfectScrollbar('update');
					//$('.inp').val("");
					//$('.Mplaceholder-one').show();
					$(".icon_msg").html(parseInt($(".icon_msg").html())+1);
					*/
				},
				error:function (xhr, errorType, error) {
					alert(error);
				},
				complete:function(){
					if((navigator.userAgent.indexOf('MSIE') >= 0)&& (navigator.userAgent.indexOf('Opera') < 0)){
						//showMask("false");
						$(".countText").css("display","none");
						$(".mask_main").css("display","none");
						$(".mask_content").slideUp(300,function(){
							$(".reply_mask").css("display","none");
						});
						$(".detail_inp").val("");
						$(".replyPlace").show();
					}else{
						//showMask("false")
						$(".countText").css("display","none");
						$(".mask_main").css("display","none");
						$(".mask_content").slideUp(300,function(){
							$(".reply_mask").css("display","none");
						});
						$(".detail_inp").val("");
						$(".replyPlace").show();
					}
				}
			});

		};
	}else{
		lidLogin();
	}
})
//点击回复取消按钮事件
/*$("#re_cel_btn").on("click",function(){
	if($("#reply_text").val()&&$.trim($("#reply_text").val())!=""){
		$(".detail_inp").val($("#reply_text").val());
		$(".replyPlace").hide();
	}else{
		$("#reply_text").val("");
		$(".replyPlace").show();
	};
	showMask("false");
	$(".countText").css("display","none");
	$(".mask_main").css("display","none");
	$(".mask_content").slideUp(300,function(){
		$(".reply_mask").css("display","none");
	});
});*/

//点击回复框的取消按钮事件
$("#re_cel_btn").on("click",function(){
	//showMask("false");
	var result=$("#reply_text").val();
	result= $.trim(result);
	$(".countText").css("display","none");
	$(".mask_main").css("display","none");
	$(".mask_content").slideUp(300,function(){
		$(".reply_mask").css("display","none");
	});
	if(result==""){
		$("#reply_text").val("");
		$(".detail_inp").val("");
		$(".replyPlace").show();
	}else{
		$(".detail_inp").val(result);
		$(".replyPlace").hide();
	};
});

//点击回复框的遮罩事件
$(".mask_main").on("click",function(){
	//showMask("false");
	var result=$("#reply_text").val();
	result= $.trim(result);
	$(".countText").css("display","none");
	$(".mask_main").css("display","none");
	$(".mask_content").slideUp(300,function(){
		$(".reply_mask").css("display","none");
	});
	if(result==""){
		$("#reply_text").val("");
		$(".detail_inp").val("");
		$(".replyPlace").show();
	}else{
		$(".detail_inp").val(result);
		$(".replyPlace").hide();
	};
})



//页面初次加载;
$().ready(function(){
	var _id=sessionStorage.getItem('_id');
	uid = sessionStorage.getItem('uid');
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
			var html1= "";
			var totalPage=res.data.total_pagenum;
			$(res.data).each(function(i,data){
				var qlist = data.q_list;
				var alist = data.a_list;
				qlist[0].createdTime = moment.utc(qlist[0].createdTime).local().format('MM-DD HH:mm');
				//如果是官方发帖
				if(qlist[0].isOfficial==true){
						html=
						"<li name="+qlist[0]._id+" uId="+qlist[0].userID+">"+
							"<div class='user_info detail_user_info'>"+
								"<div class='off_title d_off_title'>"+qlist[0].title+"</div>"+
								"<div class='user_info_left'>"+
									"<div class='user_data main_user_data'>"+
										"<span class='user_name'>"+
											"<a href='#' class='lf'>"+qlist[0].userName+"</a>"+
										"</span>"+
										"<span class='rf reply_time block'>"+qlist[0].createdTime+"</span>"+
									"</div>"+
									"<div class='detail_user_text'>"+qlist[0].body+"</div>"+
								"</div>"+
							"</div>"+
							"<div class='extra_reply'>"+
								"<span class='top-line'></span>"+
								"<span class='icon_msg'>"+qlist[0].replyCount+"</span>"+
								"<span class='icon_view'>"+qlist[0].viewCount+"</span>"+
								"<span class='icon_del'>删除</span>"+
								"<span class='lit_icon_reply'>回复TA</span>"+
							"</div>"+
						"</li>";
				}else{
					html=
						"<li name="+qlist[0]._id+" uId="+qlist[0].userID+">"+
						"<div class='user_info detail_user_info'>"+
						"<div class='inline user_info_right'>"+
						"<img src='images/head.png' class='icon_header user_header'/>"+
						"</div>"+
						"<div class='user_info_left'>"+
						"<div class='user_data main_user_data'>"+
						"<span class='user_name'>"+
						"<a href='#' class='lf'>"+qlist[0].userName+"</a>"+
						"</span>"+
						"<span class='rf reply_time block'>"+qlist[0].createdTime+"</span>"+
						"</div>"+
						"<div class='detail_user_text'>"+qlist[0].body+"</div>"+
						"</div>"+
						"</div>"+
						"<div class='extra_reply'>"+
						"<span class='top-line'></span>"+
						"<span class='icon_msg'>"+qlist[0].replyCount+"</span>"+
						"<span class='icon_view'>"+qlist[0].viewCount+"</span>"+
						"<span class='icon_del'>删除</span>"+
						"<span class='lit_icon_reply'>回复TA</span>"+
						"</div>"+
						"</li>";
				}
				$('.section #msg').append(html);
				var dUid=$('.section #msg li').attr("uId");
				if(dUid==uid){
					$(".icon_del").show();
				}
				if(alist.length===0){
					$('.section .reply_container').hide();
				}else{
					$('.section .reply_container').show();
					$.each(alist,function(i,data){
						if(data.isOfficial==true){
							//data.createdTime=data.createdTime.replace("T",' ').substring(0,19);
							data.createdTime = moment.utc(data.createdTime).local().format('MM-DD HH:mm');
							html1+=
								"<li>"+
								"<div class='offical pub_box'>"+
								"<div class='inline user_info_right'>"+
								"<img src='images/minif_home_icon1.png' class='icon_header'/>"+
								"</div>"+
								"<div class='user_info_left'>"+
								"<div class='user_data off_user_data'>"+
								"<span class='user_name'>"+
								"<a href='#' class='lf official_name'>"+data.userName+"</a>"+
								"</span>"+
								"<span class='rf off_reply_time'>"+data.createdTime+"</span>"+
								"</div>"+
								"<div class='detail_user_text'>"+data.body+"</div>"+
								"</div>"+
								"</div>"+
								"</li>";

						}else{
							data.createdTime = moment.utc(data.createdTime).local().format('MM-DD HH:mm');
							html1+=
								"<li>"+
								"<div class='other pub_box'>"+
								"<div class='user_info_left'>"+
								"<div class='user_data'>"+
								"<span class='user_name'>"+
								"<a href='#' class='lf other_name'>"+data.userName+"</a>"+
								"<span class='other_name_end'>的回复:</span>"+
								"</span>"+
								"<span class='rf off_reply_time'>"+data.createdTime+"</span>"+
								"</div>"+
								"<div class='detail_user_text'>"+data.body+"</div>"+
								"</div>"+
								"</li>";

						}
					})
				}
			})

			$('.section #msg_reply').append(html1);

			//保存回复个数
			var detId=$('.section #msg li').attr("name");
			sessionStorage.setItem("detId",detId);
			var drCount=$('.section #msg li').find(".icon_msg").text();
			sessionStorage.setItem("drCount",drCount);
			var dvCount=$('.section #msg li').find(".icon_view").text();
			sessionStorage.setItem("dvCount",dvCount);
			if(totalPage>=2){
				$(".loadMore").css("display","block");
			};
		},
		error:function(msg){
			console.log(msg)
		}
	})

})

//点击回复按钮的事件
$("body").delegate(".lit_icon_reply",'click',function(){
	loginState = sessionStorage.getItem('loginState');
	if(loginState=="true"){
		//showMask("true");
		$(".reply_mask").show();
		$(".mask_main").css("display","block");
		$(".mask_content").slideDown(300,function(){
			$(".countText").css("display","block");
		});
		$('#reply_text').focus();
	}else{
		lidLogin();
	}
});

//点击删除,弹出对话框（暂时注释掉）
var delId;
$("body").delegate(".icon_del","click",function(){
	$(".del_mask").show();
	delId=$(this).parent().parent("li").attr("name");
	sessionStorage.setItem("delId",delId);
})

//点击删除的取消事件（暂时注释掉）
$(".del_cancle").on("click",function(){
	$(".del_mask").hide();
})

//点击删除的确定事件（暂时注释掉）
$(".del_sure").on("click",function(){
	var getDelId=sessionStorage.getItem("delId");
	//alert(getDelId);
	$.ajax({
		type:"GET",
		url:base_url+"/QA/questions/delete?_id="+getDelId,
		//url:"dataJson/data.json",
		//data:{dId:getDelId},
		dataType:'json',
		cache:false,
		success:function(res){
			var delNum=res.err_code;
			if(delNum==0){
				sessionStorage.setItem("dId",getDelId);
				history.go(-1);
			}else if(delNum==1){
				alert("删除失败");
			}
		},
		error:function(msg){
			alert(msg);
		}
	})
})


//点击加载更多的事件
var pagenum=1;
$(".loadMore").on("click",function(){
	var _id=sessionStorage.getItem('_id');
	pagenum++;
	$.ajax({
		type:'GET',
		url:base_url+"/qa/questions/details/id/"+_id+'/page/'+pagenum,
		//测试用地址
		//url:"dataJson/data.json",
		dataType:'json',
		cache:false,
		success:function(res){
			var html1= "";
			var totalPage=res.data.total_pagenum;
			$(res.data).each(function(i,data){
				var alist = data.a_list;
					$.each(alist,function(i,data){
						if(data.isOfficial==true){
							data.createdTime = moment.utc(data.createdTime).local().format('MM-DD HH:mm');
							html1+=
								"<li>"+
								"<div class='offical pub_box'>"+
								"<div class='inline user_info_right'>"+
								"<img src='images/minif_home_icon1.png' class='icon_header'/>"+
								"</div>"+
								"<div class='user_info_left'>"+
								"<div class='user_data off_user_data'>"+
								"<span class='user_name'>"+
								"<a href='#' class='lf official_name'>"+data.userName+"</a>"+
								"</span>"+
								"<span class='rf off_reply_time'>"+data.createdTime+"</span>"+
								"</div>"+
								"<div class='detail_user_text'>"+data.body+"</div>"+
								"</div>"+
								"</div>"+
								"</li>";

						}else{
							data.createdTime = moment.utc(data.createdTime).local().format('MM-DD HH:mm');
							html1+=
								"<li>"+
								"<div class='other pub_box'>"+
								"<div class='user_info_left'>"+
								"<div class='user_data'>"+
								"<span class='user_name'>"+
								"<a href='#' class='lf other_name'>"+data.userName+"</a>"+
								"<span class='other_name_end'>的回复:</span>"+
								"</span>"+
								"<span class='rf off_reply_time'>"+data.createdTime+"</span>"+
								"</div>"+
								"<div class='detail_user_text'>"+data.body+"</div>"+
								"</div>"+
								"</li>";

						}
					})
			})

			$('.section #msg_reply').append(html1);

			if(pagenum>=totalPage){
				$(".loadMore").css("display","none");
			};
		},
		error:function(msg){
			console.log(msg)
		}
	})

})