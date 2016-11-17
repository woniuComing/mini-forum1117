function showGoBack(msg) {
    window.external.showGoBack(msg);
}

function btnGoBack() {
    history.go(-1);//记录返回上一步
}

//页面加载完成后
$().ready(function(){
    //测试临时注释
    showGoBack('true');
    uid = sessionStorage.getItem('uid');
    $('.section ul').empty();
    if(sessionStorage.getItem("mList")){
        var oldMList=sessionStorage.getItem("mList");
        var oldMTop=sessionStorage.getItem("mTopNum");
        $(".mine_replied_list").html(oldMList);
        $(".section").scrollTop(parseInt(oldMTop));
        if(sessionStorage.getItem("dId")){
            var dId4=sessionStorage.getItem("dId");
            $(".mine_replied_list span[name="+dId4+"]").parent().parent().parent("li").remove();
        };
        var oldMPage=parseInt(sessionStorage.getItem("mPageNow"));
        $(".loadMore").attr("name",oldMPage);
        var tolMPage=parseInt(sessionStorage.getItem("mtotalPage"));
        //alert("oldMPage="+oldMPage);
        //alert("tolMPage="+tolMPage);
        if(oldMPage>=tolMPage){
            $(".loadMore").css("display","none");
        }else{
            $(".loadMore").css("display","block");
        }
    }else{
        $.ajax({
            type:'GET',
            url:base_url+"/QA/replies/sent?pageNum=1&userID="+uid,
            //测试地址
            //url:"dataJson/mine_new_reply.json",
            cache:false,
            dataType:'json',
            success:function(res){
                alert("我回复的"+JSON.stringify(res));
                var html='';
                var html1='';
                var totalPage=res.data.total_pagenum;
                sessionStorage.setItem("mtotalPage",totalPage);
                if(totalPage>1){
                    $(".loadMore").css("display","block");
                };
                $(res.data).each(function(i,data){
                    $.each(data.a_list,function(i,adata){
                        adata.createdTime = moment.utc(adata.createdTime).local().format('MM-DD  HH:mm');
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
                    });
                    $('.section .mine_replied_list').append(html);
                    $.each(data.a_list,function(i,adata){
                        $.each(data.q_list,function(i,qdata){
                            if(adata.groupID==qdata.groupID){
                                qdata.createdTime = moment.utc(qdata.createdTime).local().format('MM-DD HH:mm');
                               if(qdata.isOfficial == true){
                                   html1=
                                       "<span class='question' name="+qdata._id+">"+qdata.userName+"</span><span>&nbsp;:&nbsp;</span>"+
                                       "<span class='main_info_txt main_info_title'>"+qdata.title+"</span>";
                               }else{
                                   html1=
                                       "<span class='question' name="+qdata._id+">"+qdata.userName+"</span><span>&nbsp;:&nbsp;</span>"+
                                       "<span class='main_info_txt'>"+qdata.body+"</span>";
                               }
                                $("[name="+adata._id+"]").find(".main_info").append(html1);
                                return false;
                            };

                        })

                    })
                })
            },
            error:function(msg){
                alert("我回复的ajax请求失败");
                alert(JSON.stringify(msg));
            }
        });
    }

})

//刷新按钮
function btnRefresh(){
    sessionStorage.removeItem('mList');
    sessionStorage.removeItem('mTopNum');
    sessionStorage.removeItem("mPageNow");
    sessionStorage.removeItem("mtotalPage");
    uid = sessionStorage.getItem('uid');
    $('.section ul').empty();
    window.location.href="pcmgrbbs_personal_mine_replied.html";
}

//点击加载更多
var page="";
$(".loadMore").on("click",function(){
    uid = sessionStorage.getItem('uid');
    page=$(this).attr("name");
    page=parseInt(page)+1;
    $(this).attr("name",page);
    //alert(page);
    $.ajax({
        type:'GET',
        url:base_url+"/QA/replies/sent?pageNum="+page+"&userID="+uid,
        //测试地址
        //url:"dataJson/mine_new_reply.json",
        cache:false,
        dataType:'json',
        success:function(res){
            var html='';
            var html1='';
            var totalPage=res.data.total_pagenum;
            if(totalPage>1){
                $(".loadMore").css("display","block");
            };
            $(res.data).each(function(i,data){
                $.each(data.a_list,function(i,adata){
                    adata.createdTime = moment.utc(adata.createdTime).local().format('MM-DD  HH:mm');
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
                });
                $('.section .mine_replied_list').append(html);
            $.each(data.a_list,function(i,adata){
                $.each(data.q_list,function(i,qdata){
                        if(adata.groupID==qdata.groupID){
                            qdata.createdTime = moment.utc(qdata.createdTime).local().format('MM-DD HH:mm');
                            if(qdata.isOfficial == true){
                                html1=
                                    "<span class='question' name="+qdata._id+">"+qdata.userName+"</span><span>&nbsp;:&nbsp;</span>"+
                                    "<span class='main_info_txt main_info_title'>"+qdata.title+"</span>";
                            }else{
                                html1=
                                    "<span class='question' name="+qdata._id+">"+qdata.userName+"</span><span>&nbsp;:&nbsp;</span>"+
                                    "<span class='main_info_txt'>"+qdata.body+"</span>";
                            }
                            $("[name="+adata._id+"]").find(".main_info").append(html1);
                            return false;
                        };

                    })

                })
            })
            if(page>=totalPage){
                $(".loadMore").css("display","none");
            }
        },
        error:function(msg){
            console.log(msg);
        }
    });
})

//点击问题跳转到对应的详情页面
$("body").on("click",".mine_replied_list li",function(){
    var _id=$(this).find(".question").attr("name");
    sessionStorage.setItem('_id',_id);
    var mList=$(".mine_replied_list").html();
    var mTop=$(".section").scrollTop();
    var mP1=$(".loadMore").attr("name");
    //alert("currentP1="+mP1);
    sessionStorage.setItem('mList',mList);
    sessionStorage.setItem('mTopNum',mTop);
    sessionStorage.setItem("mPageNow",mP1);
    window.location.href = "pcmgrbbs_reply_all.html";
})