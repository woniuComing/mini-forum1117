//显示返回按钮
function showGoBack(msg) {
    //测试临时注释
    window.external.showGoBack(msg);
}

//返回操作
function btnGoBack() {
    //alert("点击了返回按钮");
    //alert(window.location.href);
    history.go(-1);//记录返回上一步

}
//封装ajax函数

var totalPage;
function getajax(url,page,uid){
    $.ajax({
        type:'GET',
        url:base_url+url+"pageNum="+page+"&userID="+uid,
        //url:base_url+"/QA/message/unread?pageNum=1&userID="+uid,
        //测试地址
        //url:"dataJson/mine_new_reply.json",
        cache:false,
        dataType:'json',
        success:function(res){
            alert(JSON.stringify(res));
            var html='';
            var html1='';
            var nowPage=res.data.current_pagenum;
            if(nowPage==1){
                totalPage=res.data.total_pagenum;
                sessionStorage.setItem("totalPage",totalPage);
            }else{
                totalPage=sessionStorage.getItem("totalPage");
            };
            //alert("nowPage="+nowPage);
            //alert("totalPage="+totalPage);
            //alert("totalPage="+totalPage);
            if(totalPage>1){
                $(".loadMore").css("display","block");
            };
            $(res.data).each(function(i,data){
                $.each(data.a_list,function(i,adata){
                    adata.createdTime = moment.utc(adata.createdTime).local().format('MM-DD  HH:mm');
                    if(adata.isOfficial==true){
                        html+=
                            "<li name="+adata._id+">"+
                            "<div class='offical pub_box'>"+
                            "<div class='inline user_info_right'>"+
                            "<img src='images/minif_home_icon1.png' class='icon_header'/>"+
                            "</div>"+
                            "<div class='user_info_left'>"+
                            "<div class='user_data off_user_data'>"+
                            "<span class='user_name'>"+
                            "<a href='#' class='lf official_name'>"+adata.userName+"</a>"+
                            "</span>"+
                            "<span class='rf off_reply_time'>"+adata.createdTime+"</span>"+
                            "</div>"+
                            "<div class='n_r_user_text'>"+adata.body+"</div>"+
                            "</div>"+
                            "<div class='main_info'>"+
                            "</div>"+
                            "</div>"+
                            "</li>";
                    }else{
                        html+=
                            "<li name="+adata._id+">"+
                            "<div class='user_info'>"+
                            "<div class='inline user_info_right'>"+
                            "<img src='images/head.png' class='icon_header user_header'/>"+
                            "</div>"+
                            "<div class='user_info_left'>"+
                            "<div class='user_data main_user_data'>"+
                            "<span class='user_name'>"+
                            "<a href='#' class='lf'>"+adata.userName+"</a>"+
                            "</span>"+
                            "<span class='rf reply_time block'>"+adata.createdTime+"</span>"+
                            "</div>"+
                            "<div class='n_r_user_text'>"+adata.body+"</div>"+
                            "</div>"+
                            "<div class='main_info'>"+
                            "</div>"+
                            "</div>"+
                            "</li>";
                    }

                });
                $('.section .new_reply_list').append(html);
                $.each(data.a_list,function(i,adata){
                    $.each(data.q_list,function(i,qdata){
                        if(qdata.groupID==adata.groupID){
                            qdata.createdTime = moment.utc(qdata.createdTime).local().format('MM-DD HH:mm');
                            html1=
                                "<span class='question' name="+qdata._id+">"+qdata.userName+"</span><span>&nbsp;:&nbsp;</span>"+
                                "<span class='main_info_txt'>"+qdata.body+"</span>";
                            $("[name="+adata._id+"]").find(".main_info").append(html1);
                            return false;
                        };

                    })

                })
            });
            if(page>=totalPage){
                $(".loadMore").css("display","none");
            }
        },
        error:function(msg){
            alert("ajax请求失败");
            alert(JSON.stringify(msg));
        }
    });
}

var urlStr="";
var index="";
var urlType="";
var urlArr="";
var type="";
//页面加载完成后
$().ready(function(){
    //测试临时注释
    showGoBack('true');
    uid = sessionStorage.getItem('uid');
    $('.section ul').empty();
    if(sessionStorage.getItem("nList")){
        var oldNList=sessionStorage.getItem("nList");
        var oldNTop=sessionStorage.getItem("nTopNum");
        $(".new_reply_list").html(oldNList);
        $(".section").scrollTop(parseInt(oldNTop));
        if(sessionStorage.getItem("dId")){
            //alert("111");
            var dId3=sessionStorage.getItem("dId");
            $(".new_reply_list span[name="+dId3+"]").parent().parent().parent("li").remove();
            if($(".new_reply_list li").length==0){
                $(".nur-contain").show();
            }
        };
        var oldNPage=parseInt(sessionStorage.getItem("nPageNow"));
        $(".loadMore").attr("name",oldNPage);
        var tolNPage=parseInt(sessionStorage.getItem("totalPage"));
        //alert("oldNPage="+oldNPage);
        //alert("tolNPage="+tolNPage);
        if(oldNPage>=tolNPage){
            $(".loadMore").css("display","none");
        }else{
            $(".loadMore").css("display","block");
        }
    }else{
        urlStr=window.location.href;
        index=urlStr.indexOf("?");
        urlArr=urlStr.substring(index+1).split("=");
        type=urlArr[1];
        if(type==1){
            var preurl='/QA/message/unread?';
            var page=1;
            //再次获取未读消息的个数
            $.ajax({
                type:'GET',
                url: base_url + "/QA/message/unreadCount?pageNum=1&userID="+uid,
                dataType:'json',
                cache:false,
                success:function(result){
                    var unRead=parseInt(result.data);
                    if(unRead>0){
                        $(".nur-contain").hide();
                        getajax(preurl,page,uid);
                    }else{
                        $(".nur-contain").show();
                    }
                }
            });

        }else if(type==2){
            var preurl2="/QA/replies/receive?";
            var page2=1;
            getajax(preurl2,page2,uid);
        }
    }
});

//当页面刷新的时候
function btnRefresh(){
    sessionStorage.removeItem("nList");
    sessionStorage.removeItem("nTopNum");
    sessionStorage.removeItem("nPageNow");
    sessionStorage.removeItem("totalPage");
    uid = sessionStorage.getItem('uid');
    $('.section ul').empty();
    urlStr=window.location.href;
    index=urlStr.indexOf("?");
    urlType=urlStr.substring(index+1);
   /* if(urlType.indexOf("#")!=-1){
        var i=urlType.indexOf("#");
        urlType=urlType.substring(0,i);
    };*/
    //alert(urlType);
   window.location.href="pcmgrbbs_personal_new_reply.html?"+urlType;
}

//点击加载更多
var pageNum="";
$(".loadMore").on("click",function(){
    uid = sessionStorage.getItem('uid');
    urlStr=window.location.href;
    index=urlStr.indexOf("?");
    urlArr=urlStr.substring(index+1).split("=");
    type=urlArr[1];
    /*if(type.indexOf("#")!=-1){
        var index=type.indexOf("#");
        type=type.substring(0,index);
    };*/
    //alert(type);
    pageNum=$(this).attr("name");
    pageNum=parseInt(pageNum)+1;
    $(this).attr("name",pageNum);
    //alert(pageNum);
    if(type==1){
        var preurl='/QA/message/unread?';
        getajax(preurl,pageNum,uid);
    }else if(type==2){
        var preurl2="/QA/replies/receive?";
        getajax(preurl2,pageNum,uid);
    }

});


//点击问题跳转到对应的详情页面
$("body").on("click",".new_reply_list li",function(){
    var _id=$(this).find(".question").attr("name");
    sessionStorage.setItem('_id',_id);
    var nList=$(".new_reply_list").html();
    var nTop=$(".section").scrollTop();
    var nP1=$(".loadMore").attr("name");
    //alert("currentP1="+nP1);
    sessionStorage.setItem('nList',nList);
    sessionStorage.setItem('nTopNum',nTop);
    sessionStorage.setItem("nPageNow",nP1);
    window.location.href = "pcmgrbbs_reply_all.html";
});

//点击问题跳转到对应的详情页面
//var url;
$('.go_top').on('click',function(){
    $('.section').scrollTop(0);
    $('.go_top').hide(200);
});