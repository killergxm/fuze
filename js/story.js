// 创建一个操作页面动画的对象
function PagesOpr(pages) {
	if(!(this instanceof PagesOpr))
		throw new Error('please invoke with new');
	this.current_page = 1;
	this.pages = pages;
	this.if_animating = false; //判断是否在页面跳转动画中
	this.if_autojump = false; //是否进行自动跳转
	this.moveto_enable = false; //moveto函数的使能状态
}
PagesOpr.prototype = {
	//使能moveto
	enabelMoveto: function() {
		this.moveto_enable = true;
	},
	//页面跳转处理
	moveto: function(page) {
		if(!this.moveto_enable)
			return;
		var thisopr = this;
		//如果动画还未结束则直接返回
		if(thisopr.if_animating)
			return;
		var windowH = $(window).height();
		if(page == thisopr.current_page || page < 1 || page > thisopr.pages)
			return;
		//动画开始
		thisopr.if_animating = true;
		var moveto_obj = $('.page'+page);
		var current_obj = $('.page'+thisopr.current_page);
		//按钮状态调整
		$('.btn li[value='+page+']').addClass('active').siblings().removeClass('active');
		//标题状态调整
		if(page == 1 || page == 9) {
			$('.title').slideUp();
		}else {
			switch(page) {
				case 2:
					$('.title-text').html('拉上三五个小伙伴一起打游戏，成为了我最美好的回忆<br />Playing games with couple of friends is the best moment in my childhood');
					$('.title').css('background','#00b69e');
					break;
				case 3:
					$('.title-text').html('拉上三五个小伙伴一起打游戏，成为了我最美好的回忆<br />Playing games with couple of friends is the best moment in my childhood');
					$('.title').css('background','#00b69e');
					break;
				case 4:
					$('.title-text').html('拥有一台Play Station，使我成为了班里的高富帅<br />Having a Play Station, I became the“tall, rich and handsome”in the class');
					$('.title').css('background','#1ABCE2');
					break;
				case 5:
					$('.title-text').html('一直想拥有属于自己的街机，虽然明知那是遥不可及的梦想<br />Always dreaming to have my own arcade, though I do know that\'s a“mission impossible”');
					$('.title').css('background','#643ADB');
					break;
				case 6:
					$('.title-text').html('“电子鸦片”，“精神毒品”，打破了我所有的梦想<br />“Electronic opium”, “psychiatric drugs”, break all of my dreams');
					$('.title').css('background','#28A528');
					break;
				case 7:
					$('.title-text').html('无处不在的坑爹，快餐化的游戏，这不是我想要的游戏<br />Those are not the games I really want');
					$('.title').css('background','#07A866');
					break;
				case 8:
					$('.title-text').html('无处不在的坑爹，快餐化的游戏，这不是我想要的游戏<br />Those are not the games I really want');
					$('.title').css('background','#07A866');
					break;
			}
			$('.title').fadeIn(0);
		}
		//判断移动方向
		if(page < thisopr.current_page) { //向上
			moveto_top = -windowH;
			current_top = windowH;
		}else if(page > thisopr.current_page) { //向下
			moveto_top = windowH;
			current_top = -windowH;
		}
		moveto_obj.css('top',moveto_top);
		// moveto_obj.css('z-index',91);
		// current_obj.css('z-index',90);
		moveto_obj.animate({'top':0},1000);
		current_obj.animate({'top':current_top},1000,function(){
			thisopr.if_animating = false;
			//页面状态调整
			$('.page'+page).addClass('active').siblings().removeClass('active');
			//当前页面指向跳转页面
			thisopr.current_page = page;
		});
	},
	//页面自动跳转开始
	autoJumpStart: function() {
		var thisopr = this;
		thisopr.enabelMoveto();
		//设置定时器
		thisopr.timer = setInterval(jump_tonext,5000);
		function jump_tonext(){
			if(thisopr.current_page != thisopr.pages)
				thisopr.moveto(thisopr.current_page+1);
			else{
				clearInterval(thisopr.timer);
				thisopr.if_autojump = false;
			}
		}
	},
	//页面自动跳转结束
	autoJumpStop: function() {
		var thisopr = this;
		if(thisopr.timer)
			clearInterval(thisopr.timer);
		thisopr.if_autojump = false;
	}
}
	
	

$(function(){
	//实例化页面对象
	var pagesopr = new PagesOpr(9);
	//点击开始按钮后自动播放动画
	$('.p1-start').click(function(){
		pagesopr.moveto_enable = true;
		pagesopr.autoJumpStart();
		//火箭动画
		$('.p1-img2').animate({'margin-bottom':'400px'},3000,function(){
			$('.p1-start').fadeOut(1000);
		});
	})
	
	//点击产生动画
	$('.btn li').click(function(){
		pagesopr.moveto($(this).val());
		if(pagesopr.if_autojump)
		{
			pagesopr.autoJumpStop();
			pagesopr.autoJumpStart();
		}
	})

	//滚轮产生动画
	$(document).on('mousewheel',function(e){
		if(e.deltaY > 0) { //向上滑动滚轮
			if(pagesopr.current_page != 1)
				pagesopr.moveto(pagesopr.current_page-1);
		}else { //向下滑动滚轮
			if(pagesopr.current_page != 9)
			{
				pagesopr.moveto(pagesopr.current_page+1);
			}

		}
		if(pagesopr.if_autojump)
		{
			pagesopr.autoJumpStop();
			pagesopr.autoJumpStart();
		}
	})
})