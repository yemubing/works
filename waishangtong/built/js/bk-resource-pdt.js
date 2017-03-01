require(["common"],function(){require(["jqform","jqueryUI"],function(){function t(){$("#group-set ul").children("li").remove(),$.ajax({url:Base.sitUrl+"/api/product/v1/product/catelog/list",dataType:"json",type:"POST",success:function(t){if(!t.success)return void $.unLogin(res);var e=t.data;e.length>0&&$("#group-set-save").show();for(var a=0;a<e.length;a++){var n=(e[a].name.substring(0,1),'<li data-id="'+e[a].id+'" data-type="" data-totalCount="'+e[a].totalCount+'"><i class="iconfont group-move"></i><input type="text" class="resource-input" value="'+e[a].name+'" placeholder=""><i class="iconfont group-remove"></i></li>');$("#group-set ul").append(n)}}})}function e(){$.ajax({url:Base.sitUrl+"/api/product/v1/product/type/sublist?pid=0",type:"GET",dataType:"json",success:function(t){if(!t.success)return void $.unLogin(t);for(var e=t.data,a="",n=0;n<e.length;n++)a+='<option value="'+e[n].id+'">'+e[n].name+"</option>";$("#pdt1").empty().append('<option value="">请选择产品类型</option>').append(a)}})}function a(){$.ajax({url:Base.sitUrl+"/api/product/v1/product/catelog/list",type:"GET",dataType:"json",success:function(t){if(!t.success)return void $.unLogin(t);for(var e=t.data,a="",n=0;n<e.length;n++)a+='<option value="'+e[n].id+'">'+e[n].name+"</option>";$("#pdtGroup").empty().append('<option value="">请选择产品分组</option>').append(a)}})}function n(){window.location.href=Base.sitUrl+"/api/product/v1/product/template/download"}function o(t,e){$("#form_file").ajaxForm({url:Base.sitUrl+"/api/file/upload",beforeSend:function(){$.BlockUI()},complete:function(){$.UnblockUI()},success:function(e){if(!e.success)return void $.unLogin(e);var a="http://"+e.data,n='<li data-url="'+a+'" style="display: inline-block;padding: 5px 0;"><i class=""></i><span class="filesName">'+t+'</span>&nbsp;&nbsp;&nbsp;<span class="file-del" style="color:#4b73ec;cursor:pointer;">删除</span></li>';$("#addFiles").prepend(n)}}).submit()}function i(t){var e=!0,a=t.prop("files"),n=Math.round(a[0].size/1024*100)/100/1024,o=a[0].size;return n>5&&($.Alert("上传附件需小于5MB"),e=!1),{flag:e,name:a[0].name,size:o}}function s(){var t,e=$("#pdt1 option:selected").val(),a=$("#pdt2 option:selected").val(),n=$("#pdt3 option:selected").val(),o=$("#pdt4 option:selected").val();void 0!==o&&""!==o?productType=o:void 0!==n&&""!==n?productType=n:void 0!==a&&""!==a?productType=a:void 0!==e&&""!==e&&(productType=e);var t=$("#pdtGroup option:selected").val();if($("#addFiles").find("li").length<1)return void $.Alert("请添加产品模板");var i=$("#addFiles").find("li").eq(0).find(".filesName").text(),s=$("#addFiles").find("li").eq(0).attr("data-url"),r={productType:productType,productCatelog:t,url:s,taskName:i,fileName:i};$.ajax({url:Base.sitUrl+"/api/product/v1/product/import",type:"POST",dataType:"json",data:{data:JSON.stringify(r)},beforeSend:function(){$.BlockUI()},complete:function(){$.UnblockUI()},success:function(t){return t.success?(p(),void $.Alert("上传成功")):void $.unLogin(t)}})}function p(){({currentPage:l.currentPage,pageSize:l.pageSize});$.ajax({url:Base.sitUrl+"/api/product/v1/product/import/history",type:"POST",data:{currentPage:l.currentPage,pageSize:l.pageSize},dataType:"json",success:function(t){if(!t.success)return void $.unLogin(t);for(var e=t.data.results,a=(t.data.totalItem,""),n=0;n<e.length;n++){var o=e[n].createTime;if(1==e[n].status)var i="导入中";else if(2==e[n].status)var i="导入成功";a+='<tr data-id="'+e[n].id+'"><td>'+e[n].taskName+"</td><td>"+o+"</td><td>"+e[n].productCatelog+"</td><td>"+i+"</td><td>"+e[n].productSum+'</td><td><span class="del-td" style="color:#4b73ec;cursor:pointer;">删除本次导入产品</span></td></tr>'}$(".table tbody").empty().append(a),$(".i-content-wrapper").stop().animate({scrollTop:0},500),$(".panel-left").height($(".panel-right").height())}})}var r=top.funcList;$("[data-code]").each(function(){for(var t=0;t<r.length;t++)r[t].code==$(this).attr("data-code")&&$(this).removeClass("none")}),$("#group-set-li").on("click",function(){$(this).children(".panel-left-label").addClass("active"),$(this).siblings().find(".panel-left-label").removeClass("active"),$("#group-set").show(),$("#group-set").siblings(".panel-body").hide(),$(".panel-left").height($(".panel-right").height())}),$("#pdt-li").on("click",function(){$(this).children(".panel-left-label").addClass("active"),$(this).siblings().find(".panel-left-label").removeClass("active"),$("#pdtIn-set").show(),$("#pdtIn-set").siblings(".panel-body").hide(),e(),a(),p()}),$(".addGoup").on("click",function(){var t=($(this).prev("ul").find("li").length,'<li data-id="" data-type="1" data-totalCount=""><i class="iconfont group-move"></i><input type="text" class="resource-input" value="" placeholder=""><i class="iconfont group-remove"></i></li>');$(this).prev("ul").append(t),$("#group-set-save").show()}),t(),$("#group-set-li").on("click",function(){t()}),$(document).on("click","#group-set .group-remove",function(){var t=$(this),e=parseInt($(this).parents("li").attr("data-totalCount"));e>0?$.Alert("此状态中有关联信息,请取消后删除"):$.Confirm("确认删除？","",function(){t.parent().hide(),t.parent("").attr("data-type","2")})}),$(".resource-ul").sortable({change:function(t,e){console.log(e.item.index())}}),$("#group-set-save").on("click",function(){for(var e=$("#group-set ul").children("li"),a="",n="",o="",i=0;i<e.length;i++){var s=e.eq(i).find("input[type=text]").val(),p=e.eq(i).index()+1;if(o=""!==e.eq(i).data("type")?e.eq(i).data("type"):3,""==s&&"none"!==e.eq(i).css("display"))return void $.Alert("名称不能为空！");var r='{"key":"'+e.eq(i).data("id")+'","value":"'+s+'","type":"'+o+'","valueI":"'+p+'"},';""==s?r="":a+=r}a=a.substr(0,a.length-1),n='{"keyValueTypes":['+a+"]}",$.ajax({url:Base.sitUrl+"/api/org/v1/org/staff/product/catelog/edit",dataType:"json",type:"POST",data:{data:n},success:function(e){return e.success?($.Alert("保存成功！"),void t()):void $.unLogin(res)}})}),$("#pdt1").on("change",function(){var t=$("#pdt1 option:selected").val();$.ajax({url:Base.sitUrl+"/api/product/v1/product/type/sublist?pid="+t,type:"GET",dataType:"json",success:function(t){if(!t.success)return void $.unLogin(t);for(var e=t.data,a="",n=0;n<e.length;n++)a+='<option value="'+e[n].id+'">'+e[n].name+"</option>";$("#pdt2").empty().append('<option value="">请选择产品类型</option>').append(a)}})}),$("#pdt2").on("change",function(){var t=$("#pdt2 option:selected").val();$.ajax({url:Base.sitUrl+"/api/product/v1/product/type/sublist?pid="+t,type:"GET",dataType:"json",success:function(t){if(!t.success)return void $.unLogin(t);for(var e=t.data,a="",n=0;n<e.length;n++)a+='<option value="'+e[n].id+'">'+e[n].name+"</option>";$("#pdt3").empty().append('<option value="">请选择产品类型</option>').append(a)}})}),$("#pdt3").on("change",function(){var t=$("#pdt3 option:selected").val();$.ajax({url:Base.sitUrl+"/api/product/v1/product/type/sublist?pid="+t,type:"GET",dataType:"json",success:function(t){if(!t.success)return void $.unLogin(t);for(var e=t.data,a="",n=0;n<e.length;n++)a+='<option value="'+e[n].id+'">'+e[n].name+"</option>";$("#pdt4").empty().append('<option value="">请选择产品类型</option>').append(a)}})}),$("#downloadTem").on("click",function(){n()}),$(".add-attachment").on("click",function(){return $("#addFiles").children("li").length>0?($.Alert("只支持一个上传文件"),!1):$("#up-files").click()}),$("#up-files").on("change",function(t){$.EventFn(t);var e=i($(this));o(e.name)}),$(document).on("click",".file-del",function(){$(this).parent().remove()}),$("#pdtUpload").on("click",function(){s()});var l={homepage:1,currentPage:1,lastpage:null,pageSize:10};$(document).on("click",".del-td",function(){var t=$(this).parents("tr").attr("data-id");$.Confirm("确认删除？","",function(){$.ajax({url:Base.sitUrl+"/api/product/v1/product/import/delete",type:"POST",dataType:"json",data:{id:t},success:function(t){return t.success?(p(),void $(this).parents("td").remove()):void $.unLogin(t)}})})})})});