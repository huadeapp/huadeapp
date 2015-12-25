function udesk(){
	var param = {
    key:'332471d5e9d42647c4750447ae481a72',
    domain:'huade.udesk.cn'
};

var udesk = api.require('udesk');
udesk.initUdesk(param);
udesk.showFAQs();
var param2 = {
    Picture: 'true',
    emoji: 'true'
};

var udesk = api.require('udesk');
udesk.setShowPictureFunction(param2);
}