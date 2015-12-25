function ZhiChi(){
	var param = {
    enterpriseId:"6755a2531a734082a80ceba2d8e18642",
    customBannerColor:"#f1c40f",
    leftChatColor:"#FFFFFF",
    rightChatColor:"#08b0b0",
    userId:"100081",
    nickName:"晓风残月"
};
var zhichi = api.require('zhiChi');
zhichi.startZhiChi(param);
}