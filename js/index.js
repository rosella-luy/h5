$(document).ready(function(){
	function hengshuping(){ 
	    if(window.orientation==180||window.orientation==0){ 
	        $('body').height($(window).height());
			$('body').width($(window).width());       
	    } 
		if(window.orientation==90||window.orientation==-90){ 
	        $('body').height($(window).height());
	        $('body').width($(window).width());
	    } 
	} 
	window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false); 
	$('body').height($(window).height());
	$('body').width($(window).width());
	$('main').css('margin-top',-$(window).height()*page.index+'px');
	$('.page').css('opacity',1);
	$('.page').height($(window).height());
	$('.page4 .circle1').height($(window).width()*0.6852+'px');
	$('.page4 .circle2').height($(window).width()*0.456+'px').css('margin-top',$(window).width()*0.1146+'px');
	$('.page4 .circle3').height($(window).width()*0.3038+'px').css('margin-top',$(window).width()*0.1907+'px');
	$('.page4 .logo').css('margin-top',$(window).width()*0.2648+'px');
	circleRound('page4');
	$('.page6 .logo').css('margin-left',-($(window).height()*0.033)+'px');
	$('.page6 .circle1').css({'width':$('.page6 .circle1').height(),'margin-left':-($('.page6 .circle1').height()/2)});
	$('.page6 .circle2').css({'width':$('.page6 .circle2').height(),'margin-left':-($('.page6 .circle2').height()/2)});
	$('.page6 .circle3').css({'width':$('.page6 .circle3').height(),'margin-left':-($('.page6 .circle3').height()/2)});
	$('.fixed').on('click',function(event){
		event.preventDefault();
		if(!page.change){return;}
		page.index += 1;
		$('main').animate({'margin-top':-$(window).height()*page.index+'px'},500);
		if(page.index == 8){
			page.index = 1;
			var timer1 = setTimeout(function(){
				$('main').css('margin-top',-$(window).height()+'px');
				clearTimeout(timer1);
			},600);
		}
		var timeout = setTimeout(function(){
			page.pageAnimation();
			clearTimeout(timeout);
		},500);
	});
	$('body').bind('touchstart',touch.touchstart);
	$('.phone').on('input',function(){
		var submit = $(this).next().next();
		if($(this).val().length==11){
			submit.removeClass('disable');
			submit.prop('disabled',false);
		}else{
			submit.addClass('disable');
			submit.prop('disabled',true);
		}
	});
	$('.submit').on('click',function(event){
		event.preventDefault();
		$.ajax({
			url: '/save',
			type: 'post',
			data: {
				"phone": $(this).prev().prev().val()
			},
			success: function(res){
				var data = $.parseJSON(res);
				if(data.code==200){
					$('.page7 .error').html('已成功提交！请等待我们的工作人员跟您联系~');
				}else if(data.code==401){
					$('.page7 .error').html(data.message);
				}else if(data.code==402){
					$('.page7 .error').html('此号码已经提交过了！');
				}
			},
			error: function(e){
				console.log(e);
			}
		});
	});
});
var touch = {
	isSupportTouch: "ontouchend" in document?true:false,
	events: this.isSupportTouch?{start:'touchstart',move:'touchmove',end:'touchend'}:{start:'mousedown',move:'mousemove',end:'mouseup'},
	startX: 0,
	startY: 0,
	endX: 0,
	endY: 0,
	moveReady: false,
	touchstart: function(event){
		if(!page.change){return;}
		var self = touch;
		var e = event;
		var tagName = e.target.tagName;
	    if (e.type==="mousedown" && tagName !== 'SELECT' && tagName !== 'INPUT' && tagName !== 'TEXTAREA' && tagName !== 'BUTTON') {
	        e.preventDefault();
	    }
	    var point = e.changedTouches?e.changedTouches[0]:e;
	    self.moveReady=false;
	    self.startX=point.pageX;
	    self.startY=point.pageY;
	    $('body').bind('touchmove',self.touchmove);
	    $('body').bind('touchend',self.touchend);
	},
	touchmove: function(event){
		if(!page.change){return;}
		var self = touch;
		var e = event;
		var point = e.changedTouches?e.changedTouches[0]:e;
		var pageX = point.pageX,pageY = point.pageY;
		if(self.isSupportTouch){if(e.touches.length > 1 || e.scale&&e.scale !== 1)return;}
		if(self.moveReady){
				var disY = -(page.index)*$('body').height()+(pageY-self.startY);
				if(parseInt($('main').css('margin-top'))>=0 && disY>0){
					disY = 0;
				}else{
					page.timer = false;
				}
				$('main').animate({'margin-top':disY},500);
		}else{
			var x=Math.abs(self.startX-pageX),y=Math.abs(self.startY-pageY);
	        var z=Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
	        var a=180/(Math.PI/Math.acos(y/z));
	        var b=180/(Math.PI/Math.acos(x/z));
	        if (z > 5) {
	            if (b > 55) {
	                e.preventDefault();
	                self.moveReady = true;
	            }
	        }
		}
	},
	touchend: function(event){
		if(!page.change){return;}
		var self = touch;
		var e = event;
		var point = e.changedTouches?e.changedTouches[0]:e;
		self.endX = point.pageX;
		self.endY = point.pageY;
		var top,move = self.endY-self.startY;
		if(parseInt($('main').css('margin-top'))>=0 && move>0){
			move = 0;
		}
		if(move>20){
			page.index -= 1;
		}else if(move<-20){	
			page.index += 1;
		}
		self.moveReady = false;
		$('body').unbind('touchmove',self.touchmove);
	    $('body').unbind('touchend',self.touchend);
		if(page.index>0){
			$('main').animate({'margin-top':-(page.index)*$('body').height()+'px'},500);
			if(page.index==8){
				page.index = 1;
				var timer2 = setTimeout(function(){
					$('main').css('margin-top',-(page.index)*$('body').height()+'px');
					clearTimeout(timer2)
				},600);
			}
		}else if(page.index==0){
			$('main').animate({'margin-top':-(page.index)*$('body').height()+'px'},500);
			page.index = 7;
			var timer3 = setTimeout(function(){
				$('main').css('margin-top',-(page.index)*$('body').height()+'px');
				clearTimeout(timer3)
			},600);
		}
		var timeout = setTimeout(function(){
			page.pageAnimation();
			clearTimeout(timeout);
		},500);
	}
};
function Page(){
	this.index = 1;
	if(window.localStorage.isnew=='true'){
		window.localStorage.isnew = false;
		this.index = 4;
		$('main').css('margin-top',-(this.index)*$('body').height()+'px');
	}
	this.timer = false;
	this.change = false;
	this.pageAnimation();
}
Page.prototype.Init = function(){
	this.change = false;
	$('.itemshow').css('opacity',0);
	$('.itemhide').css('opacity',1);
	$('.page .fixed').css('opacity',0);
	$('.page6 .itemhide').height('46.4%');
}
Page.prototype.pageAnimation = function(){
	var self = this;
	self.Init();
	document.getElementById('audio').play();
	switch(self.index){
		case 1:
			self.textFadein('page1',300);
			break;
		case 2:
			self.textFadein('page2',500,'reverse');
			break;
		case 3:
			self.textFadeout('page3',300,self.textFadein);
			break;
		case 4:
			$('.page4 .title0').animate({'opacity':1},1000,'linear',function(){
				$('.page4 .logo').animate({'opacity':1},800,'linear',function(){
					$('.page4 .title1').animate({'opacity':1},1000,'linear',function(){
						$('.page4 .circle1').animate({'opacity':1},1000);
						$('.page4 .circle2').animate({'opacity':1},1000);
						$('.page4 .circle3').animate({'opacity':1},1000,'linear',function(){
							$('.page4 .products').animate({'opacity':1},1000);
							$('.page4 .fixed').animate({'opacity':1},100,'linear',function(){
								self.change = true;
							});
						});
					});
				});
			});
			break;
		case 5:
			$('.page5 .logo img').eq(1).animate({'opacity':1},1000);
			self.textFadein('page5',300,'',function(){
				$('.page5 .logo .line').animate({'opacity':1},4000);
				$('.page5 .info').animate({'opacity':1},2000,'linear',function(){
					$('.page5 .fixed').animate({'opacity':1},100,'linear',function(){
						self.change = true;
					});
				});
			});
			break;
		case 6:
			var i=1;
			self.timer = true;
			$('.page6 .itemhide').animate({'height':0},3000,'linear',function(){
				var timer = setInterval(function(){
					if(!self.timer){clearInterval(timer);}
					if(i>3){
						clearInterval(timer);
						$('.page6 .fixed').animate({'opacity':1},100,'linear',function(){
							self.change = true;
						});
					}
					$('.page6 .circle'+i).animate({'opacity':1},800);
					$('.page6 .pshow span').eq(i-1).animate({'opacity':1},800);
					i++;
				},800);
			});
			break;
		case 7:
			document.getElementById('audio').pause();
			$('.page7 .fixed').animate({'opacity':1},100,'linear',function(){
				self.change = true;
			});
			break;
	}			
}
Page.prototype.textFadein = function(Page,speed,type,fun){
	var self = this;
	var if1,if2,if3;
	var ili=0,ispan=0,ip=1;
	var lilen = $('.'+Page+' li.itemshow').length;
	var plen = $('.'+Page+' .pshow').length;
	if(type=='reverse'){
		ip = plen;
		if1 = ip>0?true:false;
		if2 = ip<=0?true:false;
		if3 = false;
	}else if(plen>0){
		if1 = ip!=plen+1?true:false;
		if2 = ip>=plen+1?true:false;
		if3 = true;
	}else{
		if2 = true;
	}
	if(lilen!=0 || plen!=0){
		self.timer = true;
		var timer = setInterval(function(){
			if(ili>=lilen-1&&if2&&fun){
				fun();
			}
			if(if2 && ili>=lilen-1 || !self.timer){
				clearInterval(timer);
			}
			if(lilen>0){
				if(ili==lilen/2 && Page=='page1'){
					$('.'+Page+' .logo').animate({'opacity':1},3000);
					$('.page1 .fixed').animate({'opacity':1},100,'linear',function(){
						self.change = true;
					});
				}
				$('.'+Page+' li').eq(ili).animate({'opacity':1});
				ili++;
			}
			if(if1){
				var spanlen = $('.'+Page+' .pshow').eq(ip-1).children('span').length;
				if(ispan==spanlen){
					if(if3){
						ip++;
						if1 = ip!=plen+1?true:false;
						if2 = ip>=plen+1?true:false;
						ispan = 0;
					}else{
						ip--;
						if1 = ip>0?true:false;
						if2 = ip<=0?true:false;
						if(type=='reverse'&&ip<=0){
							$('.page2 .fixed').animate({'opacity':1},100,'linear',function(){
								self.change = true;
							});
						}
						ispan=1;
					}
				}else{
					$('.'+Page+' .pshow').eq(ip-1).children('span').eq(ispan).animate({'opacity':1},speed);
					if(ispan==spanlen-1 && !if3){
						$('.'+Page+' .pshow').eq(ip-2).children('span').eq(0).animate({'opacity':1},speed*2);
					}
					ispan++;
				}
			}
		},speed);
	}
}
Page.prototype.textFadeout = function(Page,speed,fun){
	var self = this;
	var ili=0;
	var lilen = $('.'+Page+' li.itemhide').length;
	if(lilen>0){
		self.timer = true;
		var timer = setInterval(function(){
			if(ili>=lilen || !self.timer){
				clearInterval(timer);
				fun(Page,speed,'',function(){
					$('.page3 .fixed').animate({'opacity':1},1000,'linear',function(){
						self.change = true;
					});
				});
			}else{
				$('.'+Page+' .itemhide').eq(ili).animate({'opacity':0},speed);
			}
			ili++;
		},speed*2);
	}
}
function circleRound(Page){
	var deg1 = 30,deg2 = 170,deg3 = 250;
	var Timer1 = setInterval(function(){
		if((deg1-30)==360){
			deg1 = 30;
		}
		deg1++;
		$('.'+Page+' .circle1').css('transform','rotate('+deg1+'deg)');
	},16);
	var Timer2 = setInterval(function(){
		if((deg2-170)==360){
			deg2 = 170;
		}
		deg2++;
		$('.'+Page+' .circle2').css('transform','rotate('+deg2+'deg)');
	},13);
	var Timer3 = setInterval(function(){
		if((deg3-250)==360){
			deg3 = 250;
		}
		deg3++;
		$('.'+Page+' .circle3').css('transform','rotate('+deg3+'deg)');
	},10);
}
var page = new Page();
$('.products a').on('click',function(){
	var ua = navigator.userAgent.toLowerCase();  
	if(ua.match(/MicroMessenger/i)=="micromessenger"){
		window.localStorage.isnew = true;
		window.location.href = $(this).attr('wxurl');
	}else {
		window.location.href = $(this).attr('weburl');
	}
});