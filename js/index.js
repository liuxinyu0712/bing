window.onload = function () {//页面加载时执行这个函数
	//获取class元素的函数
	function getByClass(sClass) {
		var aResult = [];
		var aEle = document.getElementsByTagName('*');
		var re = new RegExp("\\b" + sClass + "\\b","g");
		for (var i = 0; i < aEle.length; i++) {
			if (aEle[i].className.search(re) != -1) {
				aResult.push(aEle[i]);
			}
		}		
		return aResult;
	}
	
	//获取元素样式
 	function getStyle(ele,sty) {
 		var styValue = '';
 		if (window.getComputedStyle) {
 			styValue = window.getComputedStyle(ele,null)[sty];//w3c里面的
 		}
 		else{
 			styValue = ele.currentStyle[sty];//ie浏览器的
 		}
 		return styValue;
 	}

	//阻止冒泡
	function stopBubble(e) {
		if (e && e.stopPropagation) {
 			e.stopPropagation();//w3c阻止事件冒泡
 		} else {
 			window.event.cancelBubble = true;//ie阻止事件冒泡
 		}
	}
 	//获取屏幕的高
 	var bodyHeightWithScroll = document.body.scrollHeight;
 	var _height = bodyHeightWithScroll + 'px';
 	var bgImg = getByClass('js_bg_img');
 	for (var i = 0; i<bgImg.length; i++){
 		bgImg[i].style.height = _height;
 	}
 	getByClass('js_bing')[0].style.height = _height;
 	getByClass('js_bg_mask')[0].style.height = _height;
 	getByClass('js_hpla')[0].style.height = bodyHeightWithScroll - 130 + 'px';
 	console.log(getByClass('js_bg_img')[0].style.height);

 	//鼠标移入移出online office处理事件
 	var online = getByClass('js_online')[0];
 	var office = getByClass('js_office')[0];
 	online.onmouseover = office.onmouseover = function(){
 		office.style.visibility = 'visible';
 	}
 	online.onmouseout = office.onmouseout = function(){
 		office.style.visibility='hidden';
 	}

 	//点击设置图标处理函数
 	var setBlock = getByClass('js_set_block')[0];
 	getByClass('js_setting')[0].onclick = function(e){
 		var flag = getStyle(setBlock,'display');
 		if(flag == 'none'){
 			setBlock.style.display = 'block';
 		}else{
 			setBlock.style.display = 'none'
 		}
 		stopBubble(e);
 	}
 	var sidebar = getByClass('js_sidebar')[0];
 	var sidebarWidth=getStyle(sidebar,'width').slice(0,getStyle(sidebar,'width').search('px'));
 	document.onclick=function(){
 		var flag = getStyle(setBlock,'display');
 		if(flag == 'block'){
 			setBlock.style.display = 'none';
 		}
 		var sidebarRight = getStyle(sidebar,'right');
 		if(sidebarRight == '0px'){
 			for (var i = 0; i <= 10; i++) {
				(function (){
					var _right = - sidebarWidth/10 * i;
					setTimeout(function(){ 
		        		sidebar.style.right = _right + 'px';
		      		},i*25)
				})(i);
			}
		}
 	}
 	//输入框获得焦点时，图片出现遮罩层
 	var searchInput = getByClass('js_search_input')[0];
	var bgMask = getByClass('js_bg_mask')[0];
	searchInput.onfocus = function(){
		bgMask.style.display = 'block';
	};
	searchInput.onblur = function(){
		bgMask.style.display = 'none';
	};
 	//鼠标移入移出分享事件
 	var share = getByClass('js_share')[0];
 	var shareWrap = getByClass('js_share_wrap')[0];
 	share.onmouseover = function(){
 		share.style.width = '240px';
 		shareWrap.style.width = '180px';
 		shareWrap.style.display = 'inline-block';
 	}
 	share.onmouseout = function(){
 		share.style.width = '60px';
 		shareWrap.style.width = 0;
 		shareWrap.style.display = 'none';
 	}

 	//点击左右切换图片
 	//设置透明度
 	function setOpacity(elem,level){
 		if(elem.filters){
 			elem.style.filter = "alpha(opacity=" + level + ")";
 		}else{
 			elem.style.opacity = level / 100;
 		}
 	}
 	//淡入处理函数
 	function fadeIn(elem){
 		setOpacity(elem,0);//初始全透明
 		for (var i = 0; i <= 20; i++) {//透明度改变 20* 5=100
 			(function(){
 				var level = i*5;//透明度每次变化量
 				setTimeout(function(){
 					setOpacity(elem,level);
 				},i*25);//i*25即为每次改变透明度的时间间隔，自行设置
 			})(i);//每次循环变化一次
 		}
 	}
 	//淡出处理
 	function fadeOut(elem){
 		for (var i = 0; i <= 20; i++) {//透明度改变 20* 5=100
 			(function(){
 				var level = 100 - i * 5;//透明度每次变化量
 				setTimeout(function(){
 					setOpacity(elem,level);
 				},i*25);//i*25即为每次改变透明度的时间间隔，自行设置
 			})(i);//每次循环变化一次
 		}
 	}
 	var imgRight = document.getElementById('img_right');
 	var imgLeft = document.getElementById('img_left');
 	//点击向右图片变化函数
 	imgRight.onclick = function(){
 		var len = bgImg.length;
 		for (var i = 0; i < len; i++) {
 			var flag = getStyle(bgImg[i],'filter')=='alpha(opacity=100)'|| getStyle(bgImg[i],'opacity')==1;
 			if(flag){
 				var curIndex = i;
 			}
 		}
 		if (curIndex == len-1) {
 			fadeOut(bgImg[curIndex]);
 			fadeIn(bgImg[0]);
 		} else if (curIndex< len-1){
 			fadeOut(bgImg[curIndex]);
 			fadeIn(bgImg[curIndex+1]);
 		}
 	}
 	//点击向左图片变化
 	imgLeft.onclick = function(){
 		var len = bgImg.length;
 		for (var i = 0; i < len; i++) {
 			var flag = getStyle(bgImg[i],'filter')=='alpha(opacity=100)'|| getStyle(bgImg[i],'opacity')==1;
 			if(flag){
 				var curIndex = i;
 			}
 		}
 		if (curIndex == 0) {
 			fadeOut(bgImg[curIndex]);
 			fadeIn(bgImg[len-1]);
 		} else if (curIndex> 0){
 			fadeOut(bgImg[curIndex]);
 			fadeIn(bgImg[curIndex-1]);
 		}
 	}

 	document.getElementById('news_icon').onclick = function(e){
 		var sidebarRight = getStyle(sidebar,'right');
 		if(sidebarRight == '-' + sidebarWidth + 'px'){
			for (var i = 0; i <= 10; i++) {
				(function (){
					var _right = - sidebarWidth + sidebarWidth/10 * i;
					setTimeout(function(){ 
		        		sidebar.style.right = _right + 'px';
		      		},i*25)
				})(i);
			}
		}else if(sidebarRight == '0px'){
			for (var i = 0; i <= 10; i++) {
				(function (){
					var _right = - sidebarWidth/10 * i;
					setTimeout(function(){ 
		        		sidebar.style.right = _right + 'px';
		      		},i*25)
				})(i);
			}
		}
 		stopBubble(e);
 	}
 	sidebar.onclick = function (e) {
 		stopBubble(e);
 	}
};
