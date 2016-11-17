loginState=sessionStorage.getItem('loginState');
uid = sessionStorage.getItem('uid');
userName=sessionStorage.getItem('userName');
/*点击我的  异步添加用户帖子*/
/*
$().ready(function(){
	showGoBack('false');
	$('.section ul').empty();
	$.ajax({
		type:'GET',
		url:"http://10.100.18.140:3000/api/v1/qa/question/1/",
		dataType:'json',
		success:function(res){
			var html='';
			$.each(res.data,function(i,data){
				html+=
					"<li>"+
						"<div class='user_info'>"+
							"<div class='inline user_info_right'>"+
								"<img src='images/head.png' class='icon_header user_header'/>"+									
							"</div>"+
							"<div class='user_info_left'>"+
								"<div class='user_data'>"+
									"<span class='user_name'>"+
										"<a href='#' class='lf'>ZengYJ</a>"+
									"</span>"+
									"<span class='rf icon_msg'>"+
										16
									"</span>"+
									"<span class='rf icon_view'>"+
										1356
									"</span>"+
								"</div>"+
								"<div class='user_text'>"+
									"<span>"+电脑管家,"专家帮忙"那块,都没看...+"</span>"+
									"<span class='reply_time block'>"22分钟前+"</span>"+
								"</div>"+
							"</div>"+
						"</div>"+
					"</li>";
			}
			$('.section ul').append(html);
		}
	})
})
*/