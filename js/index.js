
// requirejs(['jquery'],function($){
$(function(){
	//开始动画
	var i=5;
	setTimeout(imageStart,150);
	
	function imageStart(){
		
		$(".index-handshank"+i).css("opacity",1);
		$(".index-handshank"+i).css({
					"transform":"scale(1,1)",
					"-moz-transform":"scale(1,1)",
					"-ms-transform":"scale(1,1)",
					"-webkit-transform":"scale(1,1)",
				});
		console.info(".index-handshank"+i);
		i--;
		if(i!=0)
		{
			setTimeout(imageStart,150);
		}
	}
	$(".likeus").fadeIn(3000);
	
	$(".hand_shank").on("transitionend ",".index-handshank1",function(){  //开始动画结束后
		//清除transition属性
		$(".hand_shank_img").css("transition","none");
		//根据鼠标移动事件触发动画
		var imagewidth = 700;
		var originX = $(window).width()/2; //以图片中心为原点
		var r_movex_scope = 200; //旋转时鼠标移动有效范围单侧
		var u_movex_scope = $(window).width()/2; //展开时鼠标移动有效范围单侧
		$(document).mousemove(function(e){
			var mouseleft = e.clientX;
			var mouseX = mouseleft - originX; //鼠标位置x坐标

			//3D旋转
			var rotate_scope = 30; //旋转度数范围
			if(mouseX < r_movex_scope && mouseX > -r_movex_scope){
				var rotate = -mouseX/r_movex_scope*rotate_scope;
				$(".hand_shank_img").css({
					"-moz-transform": "rotateY("+rotate+"deg)",
					"-ms-transform": "rotateY("+rotate+"deg)",
					"-webkit-transform": "rotateY("+rotate+"deg)",
					"transform": "rotateY("+rotate+"deg)",
				})
			}

			//手柄合成
			var unfold_scope = 300; //展开范围单侧
			var unfold;
			if(mouseX < u_movex_scope && mouseX > 0){
				unfold = mouseX/u_movex_scope*unfold_scope;
				$(".index-handshank1").css("marginLeft",-350-unfold);
				$(".index-handshank2").css("marginLeft",-350-unfold/2);
				$(".index-handshank4").css("marginLeft",-350+unfold/2);
				$(".index-handshank5").css("marginLeft",-350+unfold);
			}else if(mouseX <= 0)
			{
				$(".hand_shank_img").css("marginLeft",-350);
			}
			
		})
	})

	//图片预加载
	new Image().src = "../images/product/bk1.jpg";
	new Image().src = "../images/product/bk2.jpg";
})
// })
