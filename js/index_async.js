function requestfailed() {
    window.external.requestfailed();
}

function lidLogin() {
    window.external.lidLogin();
    //测试数据
    //alert("你还没登陆哦，我是一个模拟登陆窗口");
    //sessionStorage.setItem('loginState',"true");
}
function showGoBack(msg) {
    //测试临时注释
    window.external.showGoBack(msg);
}


function btnGoBack() {
    history.go(-1);//记录返回上一步
}
function showMask(msg) {
    //测试临时注释
    window.external.showMask(msg);
}
function updateTime(time) {
    window.external.updateTime(time);
}
var loginState = "";
var uid = "";
var userName = "";
var mt = "";
var sn = "";
var os = "";
var vs = "";

function lenovoidChanged(msg) {
    var msg = eval("(" + msg + ")")
    sessionStorage.setItem('loginState', msg.loginState);
    sessionStorage.setItem('uid', msg.uid);
    sessionStorage.setItem('userName', msg.username);
    //问吧传参
    sessionStorage.setItem('st', msg.st);
    loginState = sessionStorage.getItem('loginState');
    uid = sessionStorage.getItem('uid');
    userName = sessionStorage.getItem('userName');


}
function updateinfo(info) {

    var info = eval("(" + info + ")")
    sessionStorage.setItem('mt', info.mt);
    sessionStorage.setItem("sn", info.sn);
    sessionStorage.setItem("os", info.os);
    sessionStorage.setItem("vs", info.vs);
    //增加版本号
    vs = sessionStorage.getItem("vs");
    mt = sessionStorage.getItem("mt");
    sn = sessionStorage.getItem("sn");
    os = sessionStorage.getItem("os");
}

function btnRefresh() {
    showGoBack('false');
    sessionStorage.removeItem("ulList");
    sessionStorage.removeItem("topNum");
    sessionStorage.removeItem("pageNow");
    sessionStorage.removeItem("tPage");
    sessionStorage.removeItem("detId");
    sessionStorage.removeItem("drCount");
    window.location.href = "index.html";
}

//超出字符串显示为省略号
function clipStr(str) {
    var maxwidth = 48;
    if (str.length > maxwidth) {
        str = str.substring(0, maxwidth) + "...";
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
    var clock = "";
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
    clock += mm;
    //clock += mm+ ":";
    //if ( ss < 10) clock += '0';
    //clock += ss;
    return clock;
}

//发帖提交按钮
$('#commit_btn').click(function (e) {
    e.preventDefault();
    loginState = sessionStorage.getItem('loginState');
    uid = sessionStorage.getItem('uid');
    userName = sessionStorage.getItem('userName');
    mt = sessionStorage.getItem("mt");
    sn = sessionStorage.getItem("sn");
    os = sessionStorage.getItem("os");
    //增加版本号
    vs = sessionStorage.getItem("vs");
    if (loginState == 'true') {
        showMask("true");
        if ($('#commit_text').val() && $('#commit_text').val() != '请输入您的问题、意见或建议。请避免使用敏感文字，文明发言。字数不要超过300字。') {
            var body = $('#commit_text').val();
            body = encodeHtml(body);
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
                    $(".c_s_tip").fadeIn(500).delay(1500).fadeOut(500).text("提交成功，可到我的反馈中查看!");
                    $('.inp').val("");
                    $('.Mplaceholder-one').show();
                    $('#commit_text').val('');
                },
                complete: function () {
                    if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)) {
                        showMask("false");
                        //$('.mask').fadeOut(0);
                        $(".countText").css("display", "none");
                        $(".commit_mask_main").css("display", "none");
                        $(".commit_content").slideUp(300, function () {
                            $('.commit_mask').css("display", "none");
                        });
                    } else {
                        showMask("false")
                        //$('.mask').fadeOut(300);
                        $(".countText").css("display", "none");
                        $(".commit_mask_main").css("display", "none");
                        $(".commit_content").slideUp(300, function () {
                            $('.commit_mask').css("display", "none");
                        });
                    }
                    ;
                }
            });
        }
        ;
        if ($('#commit_text').val() == "") {
            $(".c_s_tip").stop(true, false).fadeIn(500).delay(1500).fadeOut(500).text("不能发送空内容!");
            $('.inp').val("");
            $('.Mplaceholder-one').show();
        }

    } else {
        lidLogin()
    }
})

var fatherId = "";
var tolPage = "";
var oldPage = "";
/*页面初次加载显示数据*/
/*$().ready(function(){
 //测试临时注释
 showGoBack('false');
 $('.section ul').empty();
 if(sessionStorage.getItem("ulList")){
 var oldList=sessionStorage.getItem("ulList");
 $("#index_list").html(oldList);
 var oldTop=sessionStorage.getItem("topNum");
 $(".section").scrollTop(parseInt(oldTop));
 var indetId=sessionStorage.getItem("detId");
 var indrCount=sessionStorage.getItem("drCount");
 $(".section li[name="+indetId+"]").find(".icon_msg").text(indrCount);
 oldPage=parseInt(sessionStorage.getItem("pageNow"));
 $(".loadMore").attr("name",oldPage);
 tolPage=parseInt(sessionStorage.getItem("tPage"));
 //alert("tolPage:"+tolPage);
 //alert("oldPage:"+oldPage);
 if(oldPage>=tolPage){
 $(".loadMore").css("display","none");
 }else{
 $(".loadMore").css("display","block");
 }
 $(".fake").focus();
 }else{
 //$('.section ul').empty();
 $.ajax({
 type:'GET',
 url:base_url+"/qa/questions/page/1",
 //测试地址
 //url:"dataJson/data.json",
 dataType:'json',
 cache:false,
 success:function(res){
 var html='';
 var html1='';
 var totalPage=res.data.total_pagenum;
 sessionStorage.setItem("tPage",totalPage);
 $(res.data).each(function(i,data){
 $.each(data.q_list,function(i,qdata){
 qdata.createdTime = moment.utc(qdata.createdTime).local().format('MM-DD  HH:mm');
 qdata.body=clipStr(qdata.body);
 html+=
 "<li name="+qdata._id+">"+
 "<div class='user_info'>"+
 "<div class='inline user_info_right'>"+
 "<img src='images/head.png' class='icon_header user_header'/>"+
 "</div>"+
 "<div class='user_info_left'>"+
 "<div class='user_data main_user_data'>"+
 "<span class='user_name'>"+
 "<a href='#' class='lf'>"+qdata.userName+"</a>"+
 "</span>"+
 "<span class='rf reply_time block'>"+qdata.createdTime+"</span>"+
 "</div>"+
 "<div class='user_text'>"+qdata.body+"</div>"+
 "</div>"+
 "</div>"+
 "<div class='extra_reply'>"+
 "<span class='top-line'></span>"+
 "<span class='icon_msg'>"+qdata.replyCount+"</span>"+
 "<span class='icon_view'>"+qdata.viewCount+"</span>"+
 "<span class='lit_icon_reply'>"+"回复TA"+"</span>"+
 "</div>"+
 "</li>";
 })
 $('.section ul').append(html);
 $.each(data.q_list,function(i,qdata){
 $.each(data.a_list,function(i,adata){
 if(adata.parentID==qdata._id){
 adata.createdTime = moment.utc(adata.createdTime).local().format('MM-DD HH:mm');
 //adata.createdTime = adata.createdTime.replace("T",' ').substring(0,19);
 adata.body=clipStr(adata.body);
 html1=
 "<div class='offical pub_box'>"+
 "<div class='inline user_info_right'>"+
 "<img src='images/minif_home_icon1.png' class='icon_header'/>"+
 "</div>"+
 "<div class='user_info_left'>"+
 "<div class='user_data'>"+
 "<span class='user_name'>"+
 "<a href='#' class='lf official_name'>"+adata.userName+"</a>"+
 "</span>"+
 "<span class='rf off_reply_time'>"+adata.createdTime+"</span>"+
 "</div>"+
 "<div class='user_text'>"+adata.body+"</div>"+
 "</div>"+
 "</div>";
 $("[name="+qdata._id+"]").find(".user_info").after(html1);
 return false;
 //$(li).children(".offical").hide();
 //$(li).children(".offical").eq(0).show();
 }
 })

 })

 });
 $('.section').scrollTop(0);
 $('.section ul').perfectScrollbar('update');
 $(".ps-scrollbar-y-rail").css("display","block");
 $(".fake").focus();
 if(totalPage>=2){
 $(".loadMore").css("display","block");
 };
 }
 })
 }
 })*/


//页面初次加载增加官方发帖
$().ready(function () {
    //测试临时注释
    showGoBack('false');
    $('.section ul').empty();
    if (sessionStorage.getItem("ulList")) {
        var oldList = sessionStorage.getItem("ulList");
        $("#index_list").html(oldList);
        var oldTop = sessionStorage.getItem("topNum");
        $(".section").scrollTop(parseInt(oldTop));
        var indetId = sessionStorage.getItem("detId");
        var indrCount = sessionStorage.getItem("drCount");
        var indvCount =sessionStorage.getItem("dvCount");
        $(".section li[name=" + indetId + "]").find(".icon_msg").text(indrCount);
        $(".section li[name=" + indetId + "]").find(".icon_view").text(indvCount);
        if (sessionStorage.getItem("dId")) {
            var dId2 = sessionStorage.getItem("dId");
            $("#index_list li[name=" + dId2 + "]").remove();
        }
        ;
        oldPage = parseInt(sessionStorage.getItem("pageNow"));
        $(".loadMore").attr("name", oldPage);
        tolPage = parseInt(sessionStorage.getItem("tPage"));
        //alert("tolPage:"+tolPage);
        //alert("oldPage:"+oldPage);
        if (oldPage >= tolPage) {
            $(".loadMore").css("display", "none");
        } else {
            $(".loadMore").css("display", "block");
        }
        $(".fake").focus();
    } else {
        //$('.section ul').empty();
        //展示置顶的帖子
        $.ajax({
            type: 'GET',
            url: base_url + "/QA/questions/isTop",
            //测试地址
            //url:"dataJson/data.json",
            dataType: 'json',
            cache: false,
            success: function (result) {
                //展示非置顶的帖子;
                $.ajax({
                    type: 'GET',
                    url: base_url + "/qa/questions/page/1",
                    //测试地址
                    //url:"dataJson/data.json",
                    dataType: 'json',
                    cache: false,
                    success: function (res) {
                        var tHtml = '';
                        var tHtml1 = '';
                        $(result.data).each(function (i, data) {
                            $.each(data.q_list, function (i, qdata) {
                                qdata.createdTime = moment.utc(qdata.createdTime).local().format('MM-DD  HH:mm');
                                qdata.body = clipStr(qdata.body);
                                if (qdata.isOfficial == true) {
                                    tHtml +=
                                        "<li name=" + qdata._id + ">" +
                                            "<div class='user_info'>" +
                                                "<div class='inline user_info_right'>"+
                                                    "<img src='images/minif_home_icon1.png' class='icon_header'/>"+
                                                "</div>"+
                                                "<div class='user_info_left'>" +
                                                    "<div class='user_data main_user_data'>" +
                                                        "<span class='user_name'>" +
                                                             "<a href='#' class='lf official_name'>" + qdata.userName + "</a>" +
                                                        "</span>" +
                                                        "<span class='rf reply_time block'>" + qdata.createdTime + "</span>" +
                                                    "</div>" +
                                                    "<div class='off_title'>"+
                                                        "<span class='showTop'></span>"+ qdata.title +
                                                    "</div>"+
                                                "</div>" +
                                            "</div>" +
                                            "<div class='extra_reply'>" +
                                                "<span class='top-line'></span>" +
                                                "<span class='icon_msg'>" + qdata.replyCount + "</span>" +
                                                "<span class='icon_view'>" + qdata.viewCount + "</span>" +
                                                "<span class='lit_icon_reply'>回复TA</span>" +
                                            "</div>" +
                                        "</li>";

                                } else {
                                    tHtml +=
                                        "<li name=" + qdata._id + ">" +
                                        "<div class='user_info'>" +
                                        "<div class='inline user_info_right'>" +
                                        "<img src='images/head.png' class='icon_header user_header'/>" +
                                        "</div>" +
                                        "<div class='user_info_left'>" +
                                        "<div class='user_data main_user_data'>" +
                                        "<span class='user_name'>" +
                                        "<a href='#' class='lf'>" + qdata.userName + "</a>" +
                                        "</span>" +
                                        "<span class='rf reply_time block'>" + qdata.createdTime + "</span>" +
                                        "</div>" +
                                        "<div class='user_text'>" +
                                        "<span class='showTop'></span>"+ qdata.body + "</div>" +
                                        "</div>" +
                                        "</div>" +
                                        "<div class='extra_reply'>" +
                                        "<span class='top-line'></span>" +
                                        "<span class='icon_msg'>" + qdata.replyCount + "</span>" +
                                        "<span class='icon_view'>" + qdata.viewCount + "</span>" +
                                        "<span class='lit_icon_reply'>" + "回复TA" + "</span>" +
                                        "</div>" +
                                        "</li>";
                                }
                            })
                            $('.section ul').append(tHtml);
                            $.each(data.q_list, function (i, qdata) {
                                $.each(data.a_list, function (i, adata) {
                                    if (adata.parentID == qdata._id) {
                                        adata.createdTime = moment.utc(adata.createdTime).local().format('MM-DD HH:mm');
                                        //adata.createdTime = adata.createdTime.replace("T",' ').substring(0,19);
                                        adata.body = clipStr(adata.body);
                                        tHtml1 =
                                            "<div class='offical pub_box'>" +
                                            "<div class='inline user_info_right'>" +
                                            "<img src='images/minif_home_icon1.png' class='icon_header'/>" +
                                            "</div>" +
                                            "<div class='user_info_left'>" +
                                            "<div class='user_data'>" +
                                            "<span class='user_name'>" +
                                            "<a href='#' class='lf official_name'>" + adata.userName + "</a>" +
                                            "</span>" +
                                            "<span class='rf off_reply_time'>" + adata.createdTime + "</span>" +
                                            "</div>" +
                                            "<div class='user_text'>" + adata.body + "</div>" +
                                            "</div>" +
                                            "</div>";
                                        $("[name=" + qdata._id + "]").find(".user_info").after(tHtml1);
                                        return false;
                                    }
                                })

                            })

                        });
                        var html = '';
                        var html1 = '';
                        var totalPage = res.data.total_pagenum;
                        sessionStorage.setItem("tPage", totalPage);
                        $(res.data).each(function (i, data) {
                            $.each(data.q_list, function (i, qdata) {
                                qdata.createdTime = moment.utc(qdata.createdTime).local().format('MM-DD  HH:mm');
                                qdata.body = clipStr(qdata.body);
                                if (qdata.isOfficial == true) {
                                    if (qdata.title != "") {
                                        html +=
                                            "<li name=" + qdata._id + ">" +
                                            "<div class='user_info'>" +
                                            "<div class='off_title'>" + qdata.title + "</div>" +
                                            "<div class='user_info_left'>" +
                                            "<div class='user_data main_user_data'>" +
                                            "<span class='user_name'>" +
                                            "<a href='#' class='lf'>" + qdata.userName + "</a>" +
                                            "</span>" +
                                            "<span class='rf reply_time block'>" + qdata.createdTime + "</span>" +
                                            "</div>" +
                                            "<div class='user_text'>" + qdata.body + "</div>" +
                                            "</div>" +
                                            "</div>" +
                                            "<div class='extra_reply'>" +
                                            "<span class='top-line'></span>" +
                                            "<span class='icon_msg'>" + qdata.replyCount + "</span>" +
                                            "<span class='icon_view'>" + qdata.viewCount + "</span>" +
                                            "<span class='lit_icon_reply'>回复TA</span>" +
                                            "</div>" +
                                            "</li>";
                                    } else {
                                        html +=
                                            "<li name=" + qdata._id + ">" +
                                            "<div class='user_info'>" +
                                            "<div class='user_info_left'>" +
                                            "<div class='user_data main_user_data'>" +
                                            "<span class='user_name'>" +
                                            "<a href='#' class='lf'>" + qdata.userName + "</a>" +
                                            "</span>" +
                                            "<span class='rf reply_time block'>" + qdata.createdTime + "</span>" +
                                            "</div>" +
                                            "<div class='user_text'>" + qdata.body + "</div>" +
                                            "</div>" +
                                            "</div>" +
                                            "<div class='extra_reply'>" +
                                            "<span class='top-line'></span>" +
                                            "<span class='icon_msg'>" + qdata.replyCount + "</span>" +
                                            "<span class='icon_view'>" + qdata.viewCount + "</span>" +
                                            "<span class='lit_icon_reply'>回复TA</span>" +
                                            "</div>" +
                                            "</li>";
                                    }
                                } else {
                                    html +=
                                        "<li name=" + qdata._id + ">" +
                                        "<div class='user_info'>" +
                                        "<div class='inline user_info_right'>" +
                                        "<img src='images/head.png' class='icon_header user_header'/>" +
                                        "</div>" +
                                        "<div class='user_info_left'>" +
                                        "<div class='user_data main_user_data'>" +
                                        "<span class='user_name'>" +
                                        "<a href='#' class='lf'>" + qdata.userName + "</a>" +
                                        "</span>" +
                                        "<span class='rf reply_time block'>" + qdata.createdTime + "</span>" +
                                        "</div>" +
                                        "<div class='user_text'>" + qdata.body + "</div>" +
                                        "</div>" +
                                        "</div>" +
                                        "<div class='extra_reply'>" +
                                        "<span class='top-line'></span>" +
                                        "<span class='icon_msg'>" + qdata.replyCount + "</span>" +
                                        "<span class='icon_view'>" + qdata.viewCount + "</span>" +
                                        "<span class='lit_icon_reply'>" + "回复TA" + "</span>" +
                                        "</div>" +
                                        "</li>";
                                }
                            })
                            $('.section ul').append(html);
                            $.each(data.q_list, function (i, qdata) {
                                $.each(data.a_list, function (i, adata) {
                                    if (adata.parentID == qdata._id) {
                                        adata.createdTime = moment.utc(adata.createdTime).local().format('MM-DD HH:mm');
                                        //adata.createdTime = adata.createdTime.replace("T",' ').substring(0,19);
                                        adata.body = clipStr(adata.body);
                                        html1 =
                                            "<div class='offical pub_box'>" +
                                            "<div class='inline user_info_right'>" +
                                            "<img src='images/minif_home_icon1.png' class='icon_header'/>" +
                                            "</div>" +
                                            "<div class='user_info_left'>" +
                                            "<div class='user_data'>" +
                                            "<span class='user_name'>" +
                                            "<a href='#' class='lf official_name'>" + adata.userName + "</a>" +
                                            "</span>" +
                                            "<span class='rf off_reply_time'>" + adata.createdTime + "</span>" +
                                            "</div>" +
                                            "<div class='user_text'>" + adata.body + "</div>" +
                                            "</div>" +
                                            "</div>";
                                        $("[name=" + qdata._id + "]").find(".user_info").after(html1);
                                        return false;
                                        //$(li).children(".offical").hide();
                                        //$(li).children(".offical").eq(0).show();
                                    }
                                })

                            })

                        });
                        $('.section').scrollTop(0);
                        $('.section ul').perfectScrollbar('update');
                        $(".ps-scrollbar-y-rail").css("display", "block");
                        $(".fake").focus();
                        if (totalPage >= 2) {
                            $(".loadMore").css("display", "block");
                        }
                        ;
                    }
                })
            },
            error: function (msg) {
                alert(msg);
            }
        })

    }
})

//页面初次加载暂时没有官方发帖及置顶
/*$().ready(function () {
 //测试临时注释
 showGoBack('false');
 $('.section ul').empty();
 if (sessionStorage.getItem("ulList")) {
 var oldList = sessionStorage.getItem("ulList");
 $("#index_list").html(oldList);
 var oldTop = sessionStorage.getItem("topNum");
 $(".section").scrollTop(parseInt(oldTop));
 var indetId = sessionStorage.getItem("detId");
 var indrCount = sessionStorage.getItem("drCount");
 var indvCount =sessionStorage.getItem("dvCount");
 $(".section li[name=" + indetId + "]").find(".icon_msg").text(indrCount);
 $(".section li[name=" + indetId + "]").find(".icon_view").text(indvCount);
 if (sessionStorage.getItem("dId")) {
 var dId2 = sessionStorage.getItem("dId");
 $("#index_list li[name=" + dId2 + "]").remove();
 }
 ;
 oldPage = parseInt(sessionStorage.getItem("pageNow"));
 $(".loadMore").attr("name", oldPage);
 tolPage = parseInt(sessionStorage.getItem("tPage"));
 //alert("tolPage:"+tolPage);
 //alert("oldPage:"+oldPage);
 if (oldPage >= tolPage) {
 $(".loadMore").css("display", "none");
 } else {
 $(".loadMore").css("display", "block");
 }
 $(".fake").focus();
 } else {
 //$('.section ul').empty();
 //展示非置顶的帖子;
 $.ajax({
 type: 'GET',
 url: base_url + "/qa/questions/page/1",
 //测试地址
 //url:"dataJson/data.json",
 dataType: 'json',
 cache: false,
 success: function (res) {
 var html = '';
 var html1 = '';
 var totalPage = res.data.total_pagenum;
 sessionStorage.setItem("tPage", totalPage);
 $(res.data).each(function (i, data) {
 $.each(data.q_list, function (i, qdata) {
 qdata.createdTime = moment.utc(qdata.createdTime).local().format('MM-DD  HH:mm');
 qdata.body = clipStr(qdata.body);
 if (qdata.isOfficial == true) {
 if (qdata.title != "") {
 html +=
 "<li name=" + qdata._id + ">" +
 "<div class='user_info'>" +
 "<div class='off_title'>" + qdata.title + "</div>" +
 "<div class='user_info_left'>" +
 "<div class='user_data main_user_data'>" +
 "<span class='user_name'>" +
 "<a href='#' class='lf'>" + qdata.userName + "</a>" +
 "</span>" +
 "<span class='rf reply_time block'>" + qdata.createdTime + "</span>" +
 "</div>" +
 "<div class='user_text'>" + qdata.body + "</div>" +
 "</div>" +
 "</div>" +
 "<div class='extra_reply'>" +
 "<span class='top-line'></span>" +
 "<span class='icon_msg'>" + qdata.replyCount + "</span>" +
 "<span class='icon_view'>" + qdata.viewCount + "</span>" +
 "<span class='lit_icon_reply'>回复TA</span>" +
 "</div>" +
 "</li>";
 } else {
 html +=
 "<li name=" + qdata._id + ">" +
 "<div class='user_info'>" +
 "<div class='user_info_left'>" +
 "<div class='user_data main_user_data'>" +
 "<span class='user_name'>" +
 "<a href='#' class='lf'>" + qdata.userName + "</a>" +
 "</span>" +
 "<span class='rf reply_time block'>" + qdata.createdTime + "</span>" +
 "</div>" +
 "<div class='user_text'>" + qdata.body + "</div>" +
 "</div>" +
 "</div>" +
 "<div class='extra_reply'>" +
 "<span class='top-line'></span>" +
 "<span class='icon_msg'>" + qdata.replyCount + "</span>" +
 "<span class='icon_view'>" + qdata.viewCount + "</span>" +
 "<span class='lit_icon_reply'>回复TA</span>" +
 "</div>" +
 "</li>";
 }
 } else {
 html +=
 "<li name=" + qdata._id + ">" +
 "<div class='user_info'>" +
 "<div class='inline user_info_right'>" +
 "<img src='images/head.png' class='icon_header user_header'/>" +
 "</div>" +
 "<div class='user_info_left'>" +
 "<div class='user_data main_user_data'>" +
 "<span class='user_name'>" +
 "<a href='#' class='lf'>" + qdata.userName + "</a>" +
 "</span>" +
 "<span class='rf reply_time block'>" + qdata.createdTime + "</span>" +
 "</div>" +
 "<div class='user_text'>" + qdata.body + "</div>" +
 "</div>" +
 "</div>" +
 "<div class='extra_reply'>" +
 "<span class='top-line'></span>" +
 "<span class='icon_msg'>" + qdata.replyCount + "</span>" +
 "<span class='icon_view'>" + qdata.viewCount + "</span>" +
 "<span class='lit_icon_reply'>" + "回复TA" + "</span>" +
 "</div>" +
 "</li>";
 }
 })
 $('.section ul').append(html);
 $.each(data.q_list, function (i, qdata) {
 $.each(data.a_list, function (i, adata) {
 if (adata.parentID == qdata._id) {
 adata.createdTime = moment.utc(adata.createdTime).local().format('MM-DD HH:mm');
 //adata.createdTime = adata.createdTime.replace("T",' ').substring(0,19);
 adata.body = clipStr(adata.body);
 html1 =
 "<div class='offical pub_box'>" +
 "<div class='inline user_info_right'>" +
 "<img src='images/minif_home_icon1.png' class='icon_header'/>" +
 "</div>" +
 "<div class='user_info_left'>" +
 "<div class='user_data'>" +
 "<span class='user_name'>" +
 "<a href='#' class='lf official_name'>" + adata.userName + "</a>" +
 "</span>" +
 "<span class='rf off_reply_time'>" + adata.createdTime + "</span>" +
 "</div>" +
 "<div class='user_text'>" + adata.body + "</div>" +
 "</div>" +
 "</div>";
 $("[name=" + qdata._id + "]").find(".user_info").after(html1);
 return false;
 //$(li).children(".offical").hide();
 //$(li).children(".offical").eq(0).show();
 }
 })

 })

 });
 $('.section').scrollTop(0);
 $('.section ul').perfectScrollbar('update');
 $(".ps-scrollbar-y-rail").css("display", "block");
 $(".fake").focus();
 if (totalPage >= 2) {
 $(".loadMore").css("display", "block");
 }
 ;
 }
 })
 }
 })*/


//点击回复按钮事件
$("#reply_btn").on("click", function (e) {
    e.preventDefault();
    mt = sessionStorage.getItem("mt");
    sn = sessionStorage.getItem("sn");
    os = sessionStorage.getItem("os");
    vs = sessionStorage.getItem("vs");
    loginState = sessionStorage.getItem('loginState');
    uid = sessionStorage.getItem('uid');
    userName = sessionStorage.getItem('userName');
    //showMask('true');
    if (loginState == 'true') {
        $('#reply_text').val($('#reply_text').val().replace(/(^\s*)|(\s*$)/g, ""));

        if ($('#reply_text').val() == "") {
            showMask("true");
            $(".c_s_tip").stop(true, false).fadeIn(500).delay(1500).fadeOut(500).text("不能发送空内容!");
            $('#reply_text').val("");
            return;
        }
        ;
        if ($('#reply_text').val() != '') {
            var body = $('#reply_text').val();
            body = encodeHtml(body);
            var req = {};
            req.body = body;
            req.sn = sn;
            req.mt = mt;
            req.os = os;
            req.vs = vs;
            req.userID = uid;
            req.userName = userName;
            req.parentID = fatherId;
            $.ajax({
                type: "POST",
                url: base_url + "/QA/answer",
                dataType: 'json',
                data: req,
                success: function (res) {
                    updateTime(res.data.createdTime);
                    $(".c_s_tip").fadeIn(500).delay(1500).fadeOut(500).text("提交成功，可点击进入详情查看!");
                    $('#reply_text').val("");
                    var res = $("[name=" + fatherId + "]").find(".icon_msg").html();
                    $("[name=" + fatherId + "]").find(".icon_msg").html(parseInt(res) + 1);
                    //alert("数据发送成功");
                    //alert(body);可到我的反馈中查看
                },
                error: function (msg) {
                    alert(JSON.stringify(msg));
                },
                complete: function () {
                    if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)) {
                        showMask("false");
                        $(".countText").css("display", "none");
                        $(".mask_main").css("display", "none");
                        $(".mask_content").slideUp(300, function () {
                            $(".reply_mask").css("display", "none");
                        });
                    } else {
                        showMask("false")
                        $(".countText").css("display", "none");
                        $(".mask_main").css("display", "none");
                        $(".mask_content").slideUp(300, function () {
                            $(".reply_mask").css("display", "none");
                        });
                    }
                }
            });


        }
    } else {
        lidLogin();
    }
})

//点击回复框的取消按钮
$("#re_cel_btn").on("click", function () {
    if ($("#reply_text").val()) {
        $("#reply_text").val("");
    }
    ;
    showMask("false");
    $(".countText").css("display", "none");
    $(".mask_main").css("display", "none");
    $(".mask_content").slideUp(300, function () {
        $(".reply_mask").css("display", "none");
    });
})


var pp = "";
$('.loadMore').click(function () {
    pp = $(this).attr("name");
    pp = parseInt(pp) + 1;
    $(this).attr("name", pp);
    //alert("当前页是:")
    $.ajax({
        type: "GET",
        url: base_url + "/qa/questions/page/" + pp,
        //url:"dataJson/detail.json",
        cache: false,
        dataType: 'json',
        success: function (res) {
            var html = '';
            var html1 = '';
            var totalPage = res.data.total_pagenum;
            $(res.data).each(function (i, data) {
                $.each(data.q_list, function (i, qdata) {
                    qdata.createdTime = moment.utc(qdata.createdTime).local().format('MM-DD  HH:mm');
                    qdata.body = clipStr(qdata.body);
                    html +=
                        "<li name=" + qdata._id + ">" +
                        "<div class='user_info'>" +
                        "<div class='inline user_info_right'>" +
                        "<img src='images/head.png' class='icon_header user_header'/>" +
                        "</div>" +
                        "<div class='user_info_left'>" +
                        "<div class='user_data main_user_data'>" +
                        "<span class='user_name'>" +
                        "<a href='#' class='lf'>" + qdata.userName + "</a>" +
                        "</span>" +
                        "<span class='rf reply_time block'>" + qdata.createdTime + "</span>" +
                        "</div>" +
                        "<div class='user_text'>" + qdata.body + "</div>" +
                        "</div>" +
                        "</div>" +
                        "<div class='extra_reply'>" +
                        "<span class='top-line'></span>" +
                        "<span class='icon_msg'>" + qdata.replyCount + "</span>" +
                        "<span class='icon_view'>" + qdata.viewCount + "</span>" +
                        "<span class='lit_icon_reply'>" + "回复TA" + "</span>" +
                        "</div>" +
                        "</li>";
                })
                $('.section ul').append(html);

                $.each(data.q_list, function (i, qdata) {
                    $.each(data.a_list, function (i, adata) {
                        //$('.section ul li').each(function(i,li){
                        //	$.each(data.a_list,function(i,adata){
                        if (adata.parentID == qdata._id) {
                            adata.createdTime = moment.utc(adata.createdTime).local().format('MM-DD HH:mm');
                            //adata.createdTime = adata.createdTime.replace("T",' ').substring(0,19);
                            adata.body = clipStr(adata.body);
                            html1 =
                                "<div class='offical pub_box'>" +
                                "<div class='inline user_info_right'>" +
                                "<img src='images/minif_home_icon1.png' class='icon_header'/>" +
                                "</div>" +
                                "<div class='user_info_left'>" +
                                "<div class='user_data'>" +
                                "<span class='user_name'>" +
                                "<a href='#' class='lf official_name'>" + adata.userName + "</a>" +
                                "</span>" +
                                "<span class='rf off_reply_time'>" + adata.createdTime + "</span>" +
                                "</div>" +
                                "<div class='user_text'>" + adata.body + "</div>" +
                                "</div>" +
                                "</div>";
                            $("[name=" + qdata._id + "]").find(".user_info").after(html1);
                            return false;
                        }
                    })
                })
            })
            if (pp >= totalPage) {
                $(".loadMore").css("display", "none");
            }
            ;
        }
    });
})

//点击回复框的遮罩事件
$(".mask_main").on("click", function () {
    if ($("#reply_text").val()) {
        $("#reply_text").val("");
    }
    ;
    showMask("false");
    $(".countText").css("display", "none");
    $(".mask_main").css("display", "none");
    $(".mask_content").slideUp(300, function () {
        $(".reply_mask").css("display", "none");
    });
})


//点击

//点击悬浮向下按钮
//$(".clickDown").on("click",function(){
//	var top=$(".section").scrollTop();
//	var num=1;
//	var ulHeight=$(".section ul").height();
//	var secHeight=$(".section").height();
//	top=top+num*100;
//	//if(top>=ulHeight-secHeight){
//	//	$(".clickDown").css("display","none");
//	//}else{
//		$(".section").scrollTop(top);
//	//}
//
//})
//点击悬浮向上按钮
//$(".clickUp").on("click",function(){
//	var top=$(".section").scrollTop();
//	if(top=="0"){
//		$(".clickUp").css("display","none");
//	}else{
//		var num=1;
//		top=top-num*100;
//		$(".section").scrollTop(top);
//	}
//
//})


/*鼠标滚轮下滑,加载第二页*/
/*var page=2;
 $('.section').on('scroll',function(){
 //scrollbarTop=parseInt($('.section ul').css('height'))-parseInt($('.ps-scrollbar-y-rail').css('top'));
 scrollbarTop=parseInt($('.section ul').height())-parseInt($('.section').scrollTop());
 console.log($('.section ul').height());
 console.log($('.section').scrollTop());
 if(scrollbarTop<=476){
 $.ajax({
 type:'GET',
 url:base_url+"/qa/questions/page/"+page,
 //url:"dataJson/data.json",
 dataType:"json",
 success:function(res){
 var html='';
 var html1='';
 $(res.data).each(function(i,data){
 $.each(data.q_list,function(i,qdata){
 qdata.createdTime = moment.utc(qdata.createdTime).local().format('MM-DD  HH:mm');
 html+=
 "<li name="+qdata._id+">"+
 "<div class='user_info'>"+
 "<div class='inline user_info_right'>"+
 "<img src='images/head.png' class='icon_header user_header'/>"+
 "</div>"+
 "<div class='user_info_left'>"+
 "<div class='user_data main_user_data'>"+
 "<span class='user_name'>"+
 "<a href='#' class='lf'>"+qdata.userName+"</a>"+
 "</span>"+
 "<span class='rf reply_time block'>"+qdata.createdTime+"</span>"+
 "</div>"+
 "<div class='user_text'>"+qdata.body+"</div>"+
 "</div>"+
 "</div>"+
 "<div class='extra_reply'>"+
 "<span class='top-line'></span>"+
 "<span class='icon_msg'>"+qdata.replyCount+"</span>"+
 "<span class='icon_view'>"+qdata.viewCount+"</span>"+
 "<span class='lit_icon_reply'>回复TA</span>"+
 "</div>"+
 "</li>";
 })
 $('.section ul').append(html);
 $.each(data.a_list,function(i,adata){
 $('.section ul li').each(function(i,li){
 if(adata.parentID==$(li).attr('name')){
 adata.createdTime = moment.utc(adata.createdTime).local().format('MM-DD HH:mm');
 //adata.createdTime = adata.createdTime.replace("T",' ').substring(0,19);
 html1=
 "<div class='offical pub_box'>"+
 "<div class='inline user_info_right'>"+
 "<img src='images/minif_home_icon1.png' class='icon_header'/>"+
 "</div>"+
 "<div class='user_info_left'>"+
 "<div class='user_data'>"+
 "<span class='user_name'>"+
 "<a href='#' class='lf official_name'>"+adata.userName+"</a>"+
 "</span>"+
 "<span class='rf off_reply_time'>"+adata.createdTime+"</span>"+
 "</div>"+
 "<div class='user_text'>"+adata.body+"</div>"+
 "</div>"+
 "</div>";
 $(li).find(".user_info").after(html1);
 }
 })
 })

 })
 page++;
 }
 })
 }

 })*/
