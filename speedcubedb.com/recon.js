$(document).ready(function(){  
	$(".reconrow-btn").on("click",function(){
		if ($(this).find(".fa-caret-down").length > 0)
		{
			$(this).find(".fa-caret-down").remove();
			$("<i class=\"fa-solid fa-caret-up\"></i>").appendTo(this);
			
			let $statswindow = $(this).parent(".reconrow").children(".reconrow-stats");
			$statswindow.slideDown();
			
			if (!$statswindow.is("[data-loaded]"))
			{
				$statswindow.load("reconline.ajax.php",{
					id: $(this).attr("data-id"),
					stage: $(this).attr("data-stage")
				}, function(e){
						$("<div class='arrow'><div></div></div>").appendTo($statswindow);
				});
				
				
				
				$(this).parent(".reconrow").children(".reconrow-stats").attr("data-loaded","true");
			}
		}
		else
		{
			$(this).find(".fa-caret-up").remove();
			$("<i class=\"fa-solid fa-caret-down\"></i>").appendTo(this);
			$(this).parent(".reconrow").children(".reconrow-stats").slideUp();
		}
		$(this).blur();
	});
});