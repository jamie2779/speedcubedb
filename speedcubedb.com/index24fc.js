$(document).ready(function(){
	$("[data-alg-category]").click(function(){
		let cat = $(this).attr("data-alg-category");
		$("[data-alg-category]").each(function(){
			if (cat == $(this).attr("data-alg-category"))
			{
				$(this).addClass("btn-light");
				$(this).removeClass("btn-outline-light");
			}
			else
			{
				$(this).removeClass("btn-light");
				$(this).addClass("btn-outline-light");
			}
		});
		
		$("[data-alg-category-panel]:visible").hide();
		$("[data-alg-category-panel="+cat+"]").show();
		$(this).blur();
	});
});