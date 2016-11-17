$().ready(function(){
	$(".section").perfectScrollbar({suppressScrollX: !0});
	$('.section').on('mousewheel',function(){
		if($('.ps-scrollbar-y-rail').css('top')!='0px'){
			$('.go_top').fadeIn(300);
		}else{
			$('.go_top').fadeOut(300);
		}
	})
	$('.go_top').on('click',function(){
		$('.section').scrollTop(0);
		$('.go_top').hide(200);
	})
})
var clickState=true;
function clickSupport(){
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
$('.support').click(clickSupport);
