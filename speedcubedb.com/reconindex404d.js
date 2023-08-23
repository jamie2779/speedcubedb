$(document).ready(function(){	
	
	
	$("#searchtoggle").click(function(e){
		e.preventDefault();
		$(this).find("i").toggleClass("fa-chevron-down");
		$(this).find("i").toggleClass("fa-chevron-up");
		$("#searchtogglewindow").slideToggle();
	});
	
	$("input[type=checkbox]").on("change", function() {
		$(".recontable").empty();
		$(".recontable").append($("<div class='d-flex'><i class=\"fas fa-sync-alt\"></i>Refreshing</div>"));
		$(this).closest("form").submit();
	});
	
	$("#sortbyorder, #sortby").change(function() {
		console.log($(this).closest("form").serialize());
		$("#searchform button[type=submit]").trigger("click");
	});
});