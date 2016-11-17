function requestfailed() {
    window.external.requestfailed();
}


function lidLogin() {
    //测试
    //alert("你还没登陆哦，我是一个模拟登陆窗口");
    window.external.lidLogin();
}
function showGoBack(msg) {
    //测试临时注释
    window.external.showGoBack(msg);
}
function showMask(msg) {
    //测试临时注释
    window.external.showMask(msg);
}

function updateTime(time) {
    window.external.updateTime(time);
}

var loginState="";
var uid="";
var userName="";
var mt="";
var sn="";
var os="";
var vs="";

function lenovoidChanged(msg) {
    var msg = eval("("+msg+")")
    sessionStorage.setItem('loginState',msg.loginState);
    sessionStorage.setItem('uid',msg.uid);
    sessionStorage.setItem('userName',msg.username);
    loginState = sessionStorage.getItem('loginState');
    uid = sessionStorage.getItem('uid');
    userName = sessionStorage.getItem('userName');

}

//超出字符串显示为省略号
function clipStr(str){
    var maxwidth=48;
    if(str.length>maxwidth){
        str=str.substring(0,maxwidth)+"...";
    }
    return str;
}

function CurentTime() {
    var now = new Date();
    //var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    //var ss = now.getSeconds();          //秒
    //var clock = year + "-";
    var clock="";
    if (month < 10)
        clock += "0";
    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day + " ";

    if (hh < 10)
        clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock+=mm;
    /*clock += mm+ ":";
    if ( ss < 10) clock += '0';
    clock += ss;*/
    return clock;
}

loginState = sessionStorage.getItem('loginState');
uid = sessionStorage.getItem('uid');
userName = sessionStorage.getItem('userName');
function lenovoidChanged(msg) {
    var msg = eval("(" + msg + ")")
    sessionStorage.setItem('loginState', msg.loginState);
    sessionStorage.setItem('uid', msg.uid);
    sessionStorage.setItem('userName', msg.username);
    loginState = sessionStorage.getItem('loginState');
    uid = sessionStorage.getItem('uid');
    userName = sessionStorage.getItem('userName');
    if (loginState == 'true') {
        //alert("我是已经登录的")
        $('.needLogin').hide();
        $(".top_tips").show();
        $('.section ul').empty();
        //获取未读消息的个数
        $.ajax({
            type:'GET',
            url: base_url + "/QA/message/unreadCount?pageNum=1&userID="+uid,
            dataType:'json',
            cache:false,
            success:function(result){
                //alert("未读消息个数"+JSON.stringify(result));
                //alert(JSON.stringify(result.data));
                var unRead=parseInt(result.data);
                if(unRead>0){
                    $("#new_count").text(unRead);
                    $("#new_text").text("条未读消息");
                }else{
                    $("#new_text").text("已读消息");
                }
            },
            error:function(msg){
                alert("未读消息个数ajax请求失败");
                alert(JSON.stringify(msg));
            }
        });
        //获取我的所有反馈
        $.ajax({
            type: 'GET',
            url: base_url + "/qa/questions/page/1/uid/" + uid,
            //url:"dataJson/data.json",
            dataType: 'json',
            cache: false,
            success: function (res) {
                //alert("获取我的"+JSON.stringify(res));
                if (res.data.q_list.length == 0) {
                    $('.msgEnpty').show();
                } else {
                    var html = '';
                    var html1 = " ";
                    var totalPage=res.data.total_pagenum;
                    sessionStorage.setItem("tPage2",totalPage);
                    $.each(res.data.q_list, function (i, data) {
                        data.createdTime = moment.utc(data.createdTime).local().format('MM-DD HH:mm');
                        html +=
                            "<li name=" + data._id + ">"+
                            "<div class='user_info'>"+
                            "<div class='inline user_info_right'>"+
                            "<img src='images/head.png' class='icon_header user_header'/>"+
                            "</div>"+
                            "<div class='user_info_left'>"+
                            "<div class='user_data main_user_data'>"+
                            "<span class='user_name'>"+
                            "<a class='lf'>"+data.userName+"</a>"+
                            "</span>"+
                            "<span class='rf reply_time block'>"+data.createdTime+"</span>"+
                            "</div>"+
                            "<div class='user_text'>"+data.body+"</div>"+
                            "</div>"+
                            "</div>"+
                            "<div class='extra_reply'>"+
                            "<span class='top-line'></span>"+
                            "<span class='icon_msg'>"+data.replyCount+"</span>"+
                            "<span class='icon_view'>"+data.viewCount+"</span>"+
                            "</div>"+
                            "</li>"
                    });
                    $('.section ul').append(html);
                    $.each(res.data.q_list, function (i, data) {
                            $.each(res.data.a_list, function (i, adata) {
                            if (adata.parentID == data._id) {
                                adata.createdTime = moment.utc(adata.createdTime).local().format('MM-DD HH:mm');
                                html1 =
                                    "<div class='offical pub_box'>"+
                                    "<div class='inline user_info_right'>"+
                                    "<img src='images/minif_home_icon1.png' class='icon_header'/>"+
                                    "</div>"+
                                    "<div class='user_info_left'>"+
                                    "<div class='user_data'>"+
                                    "<span class='user_name'>"+
                                    "<a class='lf official_name'>"+adata.userName+"</a>"+
                                    "</span>"+
                                    "<span class='rf off_reply_time'>"+adata.createdTime+"</span>"+
                                    "</div>"+
                                    "<div class='user_text'>"+adata.body+"</div>"+
                                    "</div>"+
                                    "</div>";
                                $("[name="+data._id+"]").find(".user_info").after(html1);
                                return false;
                            }
                        })
                    });
                    if(totalPage>=2){
                        $(".loadMore").css("display","block");
                    };
                }
                $(".fake").focus();
            },
            error:function(msg){
                alert("获取我的ajax请求失败");
                alert(JSON.stringify(msg));
            }
        })
    }else{
        $(".loadMore").hide();
        $(".top_tips").hide();
        $('.msgEnpty').hide();
        $('.section ul').empty();
        $('.needLogin').show();
    }
}

function updateinfo(info) {
    var info = eval("(" + info + ")")
    sessionStorage.setItem('mt', info.mt);
    sessionStorage.setItem("sn", info.sn);
    sessionStorage.setItem("os", info.os);
    sessionStorage.setItem("vs", info.vs);
    mt = sessionStorage.getItem("mt");
    sn = sessionStorage.getItem("sn");
    os = sessionStorage.getItem("os");
    vs = sessionStorage.getItem("vs");
}


function btnRefresh() {
    showGoBack('false');
    sessionStorage.removeItem('ulList2');
    sessionStorage.removeItem('topNum2');
    sessionStorage.removeItem("pageNow2");
    sessionStorage.removeItem("tPage2");
    sessionStorage.removeItem("detId");
    sessionStorage.removeItem("drCount");
    $('.section ul').empty();
   window.location.href="pcmgrbbs_personal.html";
}


function btnGoBack() {
    history.go(-1);
}



$('#commit_btn').click(function (e) {
    e.preventDefault();
    sessionStorage.removeItem('ulList2');
    sessionStorage.removeItem('topNum2');
    sessionStorage.removeItem("pageNow2");
    sessionStorage.removeItem("tPage2");
    sessionStorage.removeItem("detId");
    sessionStorage.removeItem("drCount");
    sessionStorage.removeItem("dId");
    loginState = sessionStorage.getItem('loginState');
    uid = sessionStorage.getItem('uid');
    userName = sessionStorage.getItem('userName');
    mt = sessionStorage.getItem("mt");
    sn = sessionStorage.getItem("sn");
    os = sessionStorage.getItem("os");
    vs = sessionStorage.getItem("vs");
    if (loginState == 'true') {

        if ($('#commit_text').val() && $('#commit_text').val() != '请输入您的问题、意见或建议。请避免使用敏感文字，文明发言。字数不要超过300字。') {
            var body = $('#commit_text').val();
            body=encodeHtml(body);
            var req = {};
            req.body = body;
            req.sn = sn;
            req.mt = mt;
            req.os = os;
            req.vs = vs;
            req.userID = uid;
            req.userName = userName;
            $.ajax({
                type: "POST",
                url: base_url + "/QA/question",
                dataType: 'json',
                cache: false,
                data: req,
                success: function (res) {
                    updateTime(res.data.createdTime);

                  /*  var html =
                   "<li name=" + res.data._id + ">"+
                        "<div class='user_info'>"+
                            "<div class='inline user_info_right'>"+
                        "<img src='images/head.png' class='icon_header user_header'/>"+
                        "</div>"+
                        "<div class='user_info_left'>"+
                        "<div class='user_data main_user_data'>"+
                        "<span class='user_name'>"+
                        "<a href='#' class='lf'>"+userName+"</a>"+
                        "</span>"+
                        "<span class='rf reply_time block'>"+ CurentTime() +"</span>"+
                    "</div>"
                    "<div class='user_text'>"+body+ "</div>"+
                    "</div>"+
                    "</div>"+

                    "<div class='extra_reply'>"+
                        "<span class='top-line'></span>"+
                        "<span class='icon_msg'>0</span>"+
                        "<span class='icon_view'>0</span>"+
                        "</div>"+
                        "</li>";

                    $('.section ul').append(html);
                    $('.section').scrollTop(parseInt($('.section ul').css('height')) - 470);
                    $('.section ul').perfectScrollbar('update');*/
                    //测试
                    //$('.inp').val("");
                    $('#commit_text').val('');
                },
                complete:function(){
                    if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)) {
                     showMask("false");
                        $(".countText").css("display","none");
                        $(".commit_mask_main").css("display","none");
                        $(".commit_content").slideUp(300,function(){
                            $('.commit_mask').css("display","none");
                        });
                     } else {
                     showMask("false")
                        $(".countText").css("display","none");
                        $(".commit_mask_main").css("display","none");
                        $(".commit_content").slideUp(300,function(){
                            $('.commit_mask').css("display","none");
                        });
                     }
                     window.location.href = 'pcmgrbbs_personal.html';
                }
            });
        }
        if($('#commit_text').val()==""){
            $(".c_s_tip").stop(true,false).fadeIn(500).delay(1500).fadeOut(500).text("不能发送空内容!");
            $('.inp').val("");
            $('.Mplaceholder-one').show();
        }
    } else {
        lidLogin()
    }
})


/*点击登录按钮,调用登录方法*/
$('.btn_login').click(function (e) {
    e.preventDefault();
    lidLogin();
})


//页面初始加载
$().ready(function () {
    showGoBack('false');
    loginState = sessionStorage.getItem('loginState');
    uid = sessionStorage.getItem('uid');
    userName = sessionStorage.getItem('userName');
    //window.location.href = 'pcmgrbbs_personal.html';
      //alert(loginState);
      //alert(typeof(loginState));
    if (loginState&&loginState == 'true') {
        //alert("我是已经登录的")
        $(".top_tips").show();
        $('.section ul').empty();
        //获取未读消息的个数
        $.ajax({
            type:'GET',
            url: base_url + "/QA/message/unreadCount?pageNum=1&userID="+uid,
            dataType:'json',
            cache:false,
            success:function(result){
                //alert("未读消息个数"+JSON.stringify(result));
                var unRead=parseInt(result.data);
                if(unRead>0){
                    $("#new_count").text(unRead);
                    $("#new_text").text("条未读消息");
                }else{
                    $("#new_text").text("已读消息");
                }
            },
            error:function(msg){
                alert("未读消息个数ajax请求失败");
                alert(JSON.stringify(msg));
            }
        });
         if(sessionStorage.getItem("ulList2")){
            var oldList2=sessionStorage.getItem("ulList2");
            $("#personal_list").html(oldList2);
            var oldTop2=sessionStorage.getItem("topNum2");
            $(".section").scrollTop(parseInt(oldTop2));
            var indetId2=sessionStorage.getItem("detId");
            var indrCount2=sessionStorage.getItem("drCount");
            var indvCount2 =sessionStorage.getItem("dvCount");
            $(".section li[name="+indetId2+"]").find(".icon_msg").text(indrCount2);
            $(".section li[name=" + indetId2 + "]").find(".icon_view").text(indvCount2);
            if(sessionStorage.getItem("dId")){
                var dId=sessionStorage.getItem("dId");
                $("#personal_list li[name="+dId+"]").remove();
            };
            var oldPage2=parseInt(sessionStorage.getItem("pageNow2"));
            var tolPage2=parseInt(sessionStorage.getItem("tPage2"));
            //alert("oldPage2="+oldPage2);
            //alert("tolPage2="+tolPage2);
            $(".loadMore").attr("name",oldPage2);
            if(oldPage2>=tolPage2){
                $(".loadMore").css("display","none");
            }else{
                $(".loadMore").css("display","block");
            }
            $(".fake").focus();
        }else{
            $('.needLogin').hide();
            $.ajax({
                type: 'GET',
                url: base_url + "/qa/questions/page/1/uid/" + uid,
                //"http://10.100.18.140/iip/api/v1/QA/replies/sent?pageNum=1&userID="+uid
                //url:"dataJson/data.json",
                dataType: 'json',
                cache: false,
                success: function (res) {
                    if (res.data.q_list.length == 0) {
                        $('.msgEnpty').show();
                    } else {
                        var html = '';
                        var html1 = " ";
                        var totalPage=res.data.total_pagenum;
                        sessionStorage.setItem("tPage2",totalPage);
                        $.each(res.data.q_list, function (i, data) {
                            data.createdTime = moment.utc(data.createdTime).local().format('MM-DD HH:mm');
                            data.body=clipStr(data.body);
                            html +=
                                "<li name=" + data._id + ">"+
                                "<div class='user_info'>"+
                                "<div class='inline user_info_right'>"+
                                "<img src='images/head.png' class='icon_header user_header'/>"+
                                "</div>"+
                                "<div class='user_info_left'>"+
                                "<div class='user_data main_user_data'>"+
                                "<span class='user_name'>"+
                                "<a class='lf'>"+data.userName+"</a>"+
                                "</span>"+
                                "<span class='rf reply_time block'>"+data.createdTime+"</span>"+
                                "</div>"+
                                "<div class='user_text'>"+data.body+"</div>"+
                                "</div>"+
                                "</div>"+
                                "<div class='extra_reply'>"+
                                "<span class='top-line'></span>"+
                                "<span class='icon_msg'>"+data.replyCount+"</span>"+
                                "<span class='icon_view'>"+data.viewCount+"</span>"+
                                "</div>"+
                                "</li>"
                        })
                        $('.section ul').append(html);
                        $.each(res.data.q_list, function (i, data) {
                            $.each(res.data.a_list, function (i, adata) {
                                /* $('.section ul li').each(function (i, li) {*/
                                if (adata.parentID == data._id) {
                                    adata.createdTime = moment.utc(adata.createdTime).local().format('MM-DD HH:mm');
                                    adata.body=clipStr(adata.body);
                                    html1 =
                                        "<div class='offical pub_box'>"+
                                        "<div class='inline user_info_right'>"+
                                        "<img src='images/minif_home_icon1.png' class='icon_header'/>"+
                                        "</div>"+
                                        "<div class='user_info_left'>"+
                                        "<div class='user_data'>"+
                                        "<span class='user_name'>"+
                                        "<a class='lf official_name'>"+adata.userName+"</a>"+
                                        "</span>"+
                                        "<span class='rf off_reply_time'>"+adata.createdTime+"</span>"+
                                        "</div>"+
                                        "<div class='user_text'>"+adata.body+"</div>"+
                                        "</div>"+
                                        "</div>";
                                    $("[name="+data._id+"]").find(".user_info").after(html1);
                                    return false;
                                }
                            })
                        })

                        if(totalPage>=2){
                            $(".loadMore").css("display","block");
                        };
                    }
                    $(".fake").focus();
                },
                complete:function(){
                    var ulHeight=$(".section ul").height();
                    var secHeight=$(".section").height();
                    if(ulHeight>secHeight){
                        $(".clickDown").css("display","block");
                    }else{
                        $(".clickDown").css("display","none");
                    };
                }
            })
        };

    }else if(loginState&&loginState == 'false'){
        $(".top_tips").hide();
        $('.needLogin').show();
    }

})

//点击加载更多
var pp2="";
$(".loadMore").on("click",function(){
    pp2=$(this).attr("name");
    pp2=parseInt(pp2)+1;
    $(this).attr("name",pp2);
    //pagenum++;
    $.ajax({
        type: 'GET',
        url: base_url + "/qa/questions/page/"+pp2+"/uid/" + uid,
        dataType: 'json',
        cache: false,
        success: function (res) {

                var html = '';
                var html1 = " ";
                var totalPage=res.data.total_pagenum;
                $.each(res.data.q_list, function (i, data) {

                    data.createdTime = moment.utc(data.createdTime).local().format('MM-DD HH:mm');
                    data.body=clipStr(data.body);
                    html +=
                        "<li name=" + data._id + ">"+
                        "<div class='user_info'>"+
                        "<div class='inline user_info_right'>"+
                        "<img src='images/head.png' class='icon_header user_header'/>"+
                        "</div>"+
                        "<div class='user_info_left'>"+
                        "<div class='user_data main_user_data'>"+
                        "<span class='user_name'>"+
                        "<a class='lf'>"+data.userName+"</a>"+
                        "</span>"+
                        "<span class='rf reply_time block'>"+data.createdTime+"</span>"+
                        "</div>"+
                        "<div class='user_text'>"+data.body+"</div>"+
                        "</div>"+
                        "</div>"+
                        "<div class='extra_reply'>"+
                        "<span class='top-line'></span>"+
                        "<span class='icon_msg'>"+data.replyCount+"</span>"+
                        "<span class='icon_view'>"+data.viewCount+"</span>"+
                        "</div>"+
                        "</li>"
                })
                $('.section ul').append(html);
            $.each(res.data.q_list, function (i, data) {
                $.each(res.data.a_list, function (i, adata) {
                    //$('.section ul li').each(function (i, li) {
                        if (adata.parentID == data._id) {
                            //adata.createdTime = adata.createdTime.replace("T",' ');
                            //adata.createdTime = adata.createdTime.substring(0,19);
                            adata.createdTime = moment.utc(adata.createdTime).local().format('MM-DD HH:mm');
                            adata.body=clipStr(adata.body);
                            html1 =
                                "<div class='offical pub_box'>"+
                                "<div class='inline user_info_right'>"+
                                "<img src='images/minif_home_icon1.png' class='icon_header'/>"+
                                "</div>"+
                                "<div class='user_info_left'>"+
                                "<div class='user_data'>"+
                                "<span class='user_name'>"+
                                "<a class='lf official_name'>"+adata.userName+"</a>"+
                                "</span>"+
                                "<span class='rf off_reply_time'>"+adata.createdTime+"</span>"+
                                "</div>"+
                                "<div class='user_text'>"+adata.body+"</div>"+
                                "</div>"+
                                "</div>";
                            $("[name="+data._id+"]").find(".user_info").after(html1);
                            return false;
                            //$(li).children(".offical").hide();
                            //$(li).children(".offical").eq(0).show();
                        }
                    })
                })
            if(pp2>=totalPage){
                $(".loadMore").css("display","none");
            };

         }
    })

})

//点击进入详情
$('body').on('click', '.section ul li', function () {
    var _id = $(this).attr('name');
    sessionStorage.setItem('_id', _id);
    var list2=$("#personal_list").html();
    var top2=$(".section").scrollTop();
    var p2=$(".loadMore").attr("name");
    //alert("当前页="+p2);
    sessionStorage.setItem('ulList2',list2);
    sessionStorage.setItem('topNum2',top2);
    sessionStorage.setItem("pageNow2",p2);
    window.location.href = "pcmgrbbs_reply_all.html";
})


//点击未读消息/所有评论的事件
$(".new_reply").on("click",function(){
    sessionStorage.removeItem("nList");
    sessionStorage.removeItem("nTopNum");
    sessionStorage.removeItem("nPageNow");
    sessionStorage.removeItem("totalPage");
    sessionStorage.setItem("topNum2",0);
    $.ajax({
        type:'GET',
        //url: base_url + "/qa/questions/page/1/uid/" + uid,
        url: base_url + "/QA/replies/receive?pageNum=1&userID=" + uid,
        //测试地址
        //url:"dataJson/mine_new_reply.json",
        cache:false,
        dataType:'json',
        success:function(res){
            //alert("收到的评论"+JSON.stringify(res));
            if(res.data.q_list.length==0){
                $(".c_s_tip").stop(true,false).fadeIn(500).delay(1500).fadeOut(500).text("您还未发过帖子哦!");
                return false;
            }else if(res.data.a_list.length==0){
                $(".c_s_tip").stop(true,false).fadeIn(500).delay(1500).fadeOut(500).text("您发的帖子还未收到回复!");
                return false;
            }else {
                //window.location.href="pcmgrbbs_personal_new_reply.html";
               var newNum= $("#new_count").text();
                if(newNum&&newNum!=0){
                    window.location.href="pcmgrbbs_personal_new_reply.html?type=1";
                }else {
                    window.location.href="pcmgrbbs_personal_new_reply.html?type=2";
                }
            }
        },
        error:function(msg){
            alert("收到的评论ajax请求失败");
            alert(JSON.stringify(msg));
        }
    });
})

//点击我回复的
$("#mine_replied").on("click",function(){
    sessionStorage.removeItem('mList');
    sessionStorage.removeItem('mTopNum');
    sessionStorage.removeItem("mPageNow");
    sessionStorage.removeItem("mtotalPage");
    sessionStorage.setItem("topNum2",0);
    $.ajax({
        type:'GET',
        url:base_url+"/QA/replies/sent?pageNum=1&userID="+uid,
        //测试地址
        //url:"dataJson/mine_new_reply.json",
        cache:false,
        dataType:'json',
        success:function(res){
            //alert("我回复的"+JSON.stringify(res));
            if(res.data.a_list.length==0){
                $(".c_s_tip").stop(true,false).fadeIn(500).delay(1500).fadeOut(500).text("您还未回复过任何帖子!");
                return false;
            }else{
              window.location.href="pcmgrbbs_personal_mine_replied.html";
            }
        },
        error:function(msg){
            alert("我回复的ajax请求失败");
            alert(JSON.stringify(msg));
        }
    });
})