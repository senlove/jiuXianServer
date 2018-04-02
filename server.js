var express = require('express');
var app = express();


// 一个范围的随机数 0，6 包括6
function rnd(n, m){
	var random = Math.floor(Math.random()*(m-n+1)+n);
	return random;
}

// 轮播图
var loopImgArrs = [
	'http://img08.jiuxian.com/bill/2018/0327/9eccdbcce1244ebf9a711cc04f242a62.jpg',
	'http://img09.jiuxian.com/bill/2018/0331/f1051f9aa9424801b9c514807d2023e7.jpg',
	'http://img08.jiuxian.com/bill/2018/0331/28ccc25274f742478bea729a85ea9959.jpg',
	'http://img06.jiuxian.com/bill/2018/0326/8409e04ca94e4957a7722a2963a6b92e.jpg',
	'http://img07.jiuxian.com/bill/2018/0330/c4ed45a6c2034495be55ef28650adebd.jpg',
	'http://img09.jiuxian.com/bill/2018/0326/32621d26d564452ea1111bc86f14dff4.jpg'
];

// 轮播右边提示的图片
var loopPrompImgArrs = [
	'http://img10.jiuxian.com/bill/2017/1127/b5bb8b4be445443094e894fdb4abb9b6.jpg',
	'http://img06.jiuxian.com/bill/2017/1115/df8f4e868bec46fdbcb967a9e5ef8a49.png',
	'http://img06.jiuxian.com/bill/2017/1115/df8f4e868bec46fdbcb967a9e5ef8a49.png',
	'http://img09.jiuxian.com/bill/2017/1124/7b1a1bf0d96e4bb0b756b1f249aed0c1.png',
	'http://img10.jiuxian.com/bill/2017/1115/31ff2840b8084acf9bb4ee6b94ae4b0c.png',
	'http://img10.jiuxian.com/bill/2017/1127/b5bb8b4be445443094e894fdb4abb9b6.jpg'
];

//item 切换的内容
var multiItemImgArrs = [
	'http://img06.jiuxian.com/2017/0105/278b55960b474dffa34479d2c67277f22.jpg',
	'http://img07.jiuxian.com/2014/0605/6fe09906c6274a6bae38dcc006d7dbe32.jpg',
	'http://img08.jiuxian.com/2017/1018/43fb011b99ba4630a07817e05e6b4fac2.jpg',
	'http://img09.jiuxian.com/2016/0331/03c13aa80c9c4dc0b9a5a6c72b04b7752.jpg',
	'http://img06.jximage.com/2015/0706/547035d5b46a4ace9071ed22c6dfaa4b2.jpg'
];

//活动的地址列表
var activityImgArrs = [
	'http://img07.jiuxian.com/bill/2018/0323/48a96c5edd4d4a258a2ff1aa9802cab6.png',
	'http://img07.jiuxian.com/bill/2018/0323/48a96c5edd4d4a258a2ff1aa9802cab6.png',
	'http://img07.jiuxian.com/bill/2018/0323/48a96c5edd4d4a258a2ff1aa9802cab6.png'
];

//优惠推荐图片数组
var discountsImgArrs = [
	'http://img09.jximage.com/2017/0317/38cf9dfd1f3a4b3bb95a19f3f72a1b002.jpg',
	'http://img09.jximage.com/2017/0227/31f189c611994d0984c88620a059b6b82.jpg',
	'http://img09.jximage.com/2018/0123/31a0cfca47fa4ef285a4dd965567a4232.jpg'
];



function LoopEntry(){

}

LoopEntry.prototype = {
	loopImgUrl:'',
	loopPromptImgArrs:''

};


function createBaseJsonTxt(dataValue) {
	var baseData = {
		code:200,
		message:'success'
	};

	baseData.data = dataValue;
	var baseDataJsonTxt = JSON.stringify(baseData);
	return baseDataJsonTxt;
}		


app.listen(8081, 'localhost',function(){
	console.log('来了没');
});


//轮播图数据接口
app.get('/loopDataList', function(req, response){

	//创建轮播图的数据
	var random = rnd(3, 6);
	var loopDataArrs = new Array();
	for(var i=0; i<random; i++){
		var loopEntry = new LoopEntry();
		loopEntry.loopImgUrl = loopImgArrs[i%loopImgArrs.length];

		var loopPromptArrs = new Array();
		for(var j=0; j<3; j++){
			loopPromptArrs.push(loopPrompImgArrs[i%loopImgArrs.length]);
		}

		loopEntry.loopPromptImgArrs = loopPromptArrs;

		loopDataArrs.push(loopEntry);

	}

	var baseDataJsonTxt = createBaseJsonTxt(loopDataArrs);

	response.writeHead(200, {
		'Content-Type':"text/html; charset=utf-8",
		'Access-Control-Allow-Origin':'*'
	});
	response.write(baseDataJsonTxt);
	response.end();
});

//多类型数据接口
app.get('/mulCategoryData', function(req, response){

	var categorys = ['疯狂抢购','整箱优惠','爆款精选','口粮钜惠','大牌特卖'];

	var entryNameArrs = ['【清仓】52°贵州茅台集团封坛1992铂金版500ml',
						'52°五粮液股份公司金六福双福星475ml（6瓶装）',
						'【超级秒杀日】52°白水杜康一坛老酒1000ml（双坛装）',
						'53°玻瓶汾酒475ml（3瓶装）',
						'53°汾酒商务蓝475ml'];
	var priceArrs = [100, 200, 300, 400, 500];

	// var categoryEntry = {
	// 	imgUrl:'',
	// 	des:'',
	// 	price:0
	// };

	// var multiCategroryEntry = {
	// 	name:'',
	// 	categoryEntryList:''
	// };

	var multiCatEntryList = new Array();

	for(var i=0; i<categorys.length; i++){

		var categoryEntryList = new Array();
		var multiCategroryEntry = new Object();
		for(var j=0; j<10; j++){

			var categoryEntry = new Object();

			categoryEntry.imgUrl = multiItemImgArrs[(i%(multiItemImgArrs.length - 1))];
			categoryEntry.des = entryNameArrs[(i%entryNameArrs.length)];
			categoryEntry.price = priceArrs[(i%priceArrs.length)];

			categoryEntryList.push(categoryEntry);
		}

		multiCategroryEntry.name = categorys[i%(categorys.length - 1)];
		multiCategroryEntry.categoryEntryList = categoryEntryList;

		multiCatEntryList.push(multiCategroryEntry);

	}
	
	var baseDataJsonTxt = createBaseJsonTxt(multiCatEntryList);

	response.writeHead(200, {
		'Content-Type':"text/html; charset=utf-8",
		'Access-Control-Allow-Origin':'*'
	});
	response.write(baseDataJsonTxt);
	response.end();
});

