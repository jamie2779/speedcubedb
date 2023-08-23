$(document).ready(function(){
	
	  
	//
	// filter categories
	//		
	$(".category-summary[data-filter]").on('click touch', function(e){
		e.preventDefault();
		
		if ($(this).hasClass("active"))
		{
			$(this).removeClass("active");
			$(".singlealg").show();
			return;
		}
		
		$(".category-summary[data-filter]").removeClass("active");
		let val = $(this).attr("data-filter");
		
		$(".singlealg").hide();
		$(".singlealg[data-subgroup='"+val+"']").show();
		$(this).addClass("active");
	});

	
	//
	// different orientations tabs
	//
	$(".tabs-orientation li a").on("click",function(e) {
		e.preventDefault();
		
		
		// activate this tab
		$(this).parent().parent().find("li a").removeClass("active");
		$(this).addClass("active");
		
		
		// show algs
		$(this).parent().parent().parent().find("div[data-ori]").addClass("d-none");
		$(this).parent().parent().parent().find("div[data-ori="+$(this).attr("data-ori")+"]").removeClass("d-none");
		
		// pick the first alg
		$(this).parent().parent().parent().find("div[data-ori="+$(this).attr("data-ori")+"] .pigtrigger:nth-child(1)").click();
	});
	
	
	$("#crossorientation").change(function(){
		console.log($(this).val());
		setCookie("crossorientation",$(this).val(),500000,'/',  'speedcubedb.com');
		location.reload();
	});
	
	
	
	// dropdowns
	$(".selectbox-menu").click(function(){
		$(this).find(".selectbox-dropdown").toggle();
	});

	
	$(".recon-list-toggle").click(function(){
		
		let recondiv = $(this).parent().parent().find(".recon-list");
		if ($(recondiv).children().length ==0)
		{
			$(recondiv).load("category.recons.ajax.php",{
				datastage: $(this).attr("data-stage"),
				alg: $(this).attr("data-alg"),
				solver: $("#solver").val()
			});
		}
		else
			recondiv.slideToggle();
		
		$(this).blur();
	});
});