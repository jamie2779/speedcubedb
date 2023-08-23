$(document).ready(function(){
	//
	// filter categories
	//		
	$(".category-summary[data-filter]").on('click touch', function(e){
		e.preventDefault();
		
		if ($(this).hasClass("active"))
		{
			$(this).removeClass("active");
			$(".singlealgorithm").show();
			return;
		}
		
		$(".category-summary[data-filter]").removeClass("active");
		let val = $(this).attr("data-filter");
		
		$(".singlealgorithm").hide();
		$(".singlealgorithm[data-subgroup='"+val+"']").show();
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
	
	
	//
	// mnemonics
	//
	$(".mnemonics").on("click", function() {
		$(this).parent().hide();
		$(this).parent().parent().find(".fullalg").show();
	});
	
	$("#crossorientation").change(function(){
		setCookie("crossorientation",$(this).val(),500000,'/',  'speedcubedb.com');
		location.reload();
	});
	
	//
	// add to my algs
	//
	$(".action-bookmark").on("click tap vclick", function(e) {
		e.preventDefault();
		if ($("#login-lightbox").length !=0)
		{
			$("#login-lightbox").fadeIn();
			return;
		}
		let postdata = {
				"userid": $("#userid").val(),
				"algid": $(this).attr("data-algid"),
				"alternativeid": $(this).attr("data-altid"),
				"sessid": $(this).attr("data-sessid")
				};
				
				
		postdata["bookmark"] = $(this).attr("data-value") == 0 ? 1 : 0;
		
		var thumbsbutton = $(this);
		
		$.ajax({
            url: "uservote.ajax.php",
            method: "POST",
            data: postdata,
			}).done(function( e ) {
				if (e=="success")
				{
					if ($(thumbsbutton).attr("data-value") == 0)
					{
						$(thumbsbutton).attr("data-value", 1);
						$(thumbsbutton).find("small").text("Bookmarked");
					    $(thumbsbutton).find(".fas").attr("style",'color: yellow;text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;');	
					}
					else
					{
						$(thumbsbutton).attr("data-value", 0);
						$(thumbsbutton).find("small").text("Bookmark");
					    $(thumbsbutton).find(".fas").attr('style','');
					}
					
					
					$(thumbsbutton).find(".fas").toggleClass("fa-folder-plus");
					$(thumbsbutton).find(".fas").toggleClass("fa-star");
				}
				else
				{
					console.log(e);
				}
			});
	});
	
	//
	// add to my algs
	//
	$(".action-learnt").on("click tap vclick", function(e) {
		e.preventDefault();
		if ($("#login-lightbox").length !=0)
		{
			$("#login-lightbox").fadeIn();
			return;
		}
		let postdata = {
				"userid": $("#userid").val(),
				"algid": $(this).attr("data-algid"),
				"alternativeid": $(this).attr("data-altid"),
				"sessid": $(this).attr("data-sessid")
				};
				
				
		postdata["learnt"] = $(this).attr("data-value");
		var thumbsbutton = $(this);
		
		$.ajax({
            url: "uservote.ajax.php",
            method: "POST",
            data: postdata,
			}).done(function( e ) {
				if (e=="success")
				{
					let el = $(thumbsbutton).closest(".selectbox-menu");
					$(el).attr("data-learnt", $(thumbsbutton).attr("data-value"));
					$(el).children("i").removeClass("fab");
					$(el).children("i").removeClass("fas");
					$(el).children("i").removeClass("fa-leanpub");
					$(el).children("i").removeClass("fa-check");
					$(el).children("i").removeClass("fa-times");
					
					switch (Number($(thumbsbutton).attr("data-value")))
					{
						case 0: 
							$(el).find("small").text("Not Learnt"); 
							$(el).children("i").addClass("fas fa-times");
							break;
						case 1: 
							$(el).find("small").text("Learning"); 
							$(el).children("i").addClass("fab fa-leanpub");
							break;
						case 2: 
							$(el).find("small").text("Learnt");
							$(el).children("i").addClass("fas fa-check");
							break;
					}
				}
				else
				{
					console.log(e);
				}
			});
	});
	
	// dropdowns
	$(".selectbox-menu").click(function(){
		let thisboxvisible = $(this).find(".selectbox-dropdown").is(":visible");
		$(".selectbox-dropdown:visible").slideUp();
		
		if (!thisboxvisible)
			$(this).find(".selectbox-dropdown").slideDown();
	});


	$(".community_algs").click(function(){
		$(this).parent().find(".community_algs").removeClass("btn-outline-secondary");
		$(this).parent().find(".pro_algs").removeClass("btn-outline-light");
		
		$(this).parent().find(".community_algs").addClass("btn-outline-light");
		$(this).parent().find(".pro_algs").addClass("btn-outline-secondary");
		
		
		$("ul[data-t='"+$(this).attr("data-t")+"'].pro-algs").hide();
		$("ul[data-t='"+$(this).attr("data-t")+"'].community-algs").show();
		$(this).blur();
	});
	
	$(".pro_algs").click(function(){
		$(this).parent().find(".pro_algs").removeClass("btn-outline-secondary");
		$(this).parent().find(".community_algs").removeClass("btn-outline-light");
		
		$(this).parent().find(".pro_algs").addClass("btn-outline-light");
		$(this).parent().find(".community_algs").addClass("btn-outline-secondary");
		
		$("ul[data-t='"+$(this).attr("data-t")+"'].community-algs").hide();
		let recondiv = $("ul[data-t='"+$(this).attr("data-t")+"'].pro-algs");
		$(recondiv).show();
		$(this).blur();
		
		if ($(recondiv).is(".unloaded"))
		{
			$(recondiv).removeClass("unloaded");
			$(recondiv).load("category.proalgs.ajax.php",{
				orientation: $(this).attr("data-ori"),
				category: $(this).attr("data-category"),
				alg: $(this).attr("data-alg")
			},
			function() {
				$(recondiv).find(".recon-list-toggle").click(function(){
					
					let recondiv = $(this).parent().parent().find(".recon-list");
					if ($(recondiv).children().length ==0)
					{
						$(recondiv).load("category.recons.ajax.php",{
							datastage: $(this).attr("data-stage"),
							alg: $(this).attr("data-alg")
						});
					}
					else
						recondiv.slideToggle();
					
					$(this).blur();
				});
			});
		}
	});
	
	
	$(".action-addtonewlist").on("click tap vclick", function(e) {
		e.preventDefault();
		console.log("adding to new list");
		if ($("#login-lightbox").length !=0)
		{
			$("#login-lightbox").fadeIn();
			return;
		}
		let postdata = {
				"userid": $("#userid").val(),
				"algid": $(this).attr("data-algid"),
				"alternativeid": $(this).attr("data-altid"),
				"action": "addtonewlist",
				"sessid": $(this).attr("data-sessid")
				};
				
				
		var addtobutton = $(this);
		
		$.ajax({
            url: "listop.ajax.php",
            method: "POST",
            data: postdata,
			}).done(function( e ) {
				if (e=="success")
				{
					$(addtobutton).remove();
				}
				else
				{
					console.log(e);
				}
			});
	});
	
	
	$(".action-addtolist").on("click tap vclick", function(e) {
		e.preventDefault();
		if ($("#login-lightbox").length !=0)
		{
			$("#login-lightbox").fadeIn();
			return;
		}
		let postdata = {
				"userid": $("#userid").val(),
				"algid": $(this).attr("data-algid"),
				"alternativeid": $(this).attr("data-altid"),
				"action": "addtolist",
				"sessid": $(this).attr("data-sessid"),
				"listid": $(this).attr("data-list")
				};
				
				
		var addtobutton = $(this);
		
		$.ajax({
            url: "listop.ajax.php",
            method: "POST",
            data: postdata,
			}).done(function( e ) {
				if (e=="success")
				{
					$(addtobutton).find(".textaction").text("Remove From");
				}
				else
				{
					console.log(e);
				}
			});
	});
	
	$(".action-removefromlist").on("click tap vclick", function(e) {
		e.preventDefault();
		if ($("#login-lightbox").length !=0)
		{
			$("#login-lightbox").fadeIn();
			return;
		}
		let postdata = {
				"userid": $("#userid").val(),
				"algid": $(this).attr("data-algid"),
				"alternativeid": $(this).attr("data-altid"),
				"action": "removefromlist",
				"sessid": $(this).attr("data-sessid"),
				"listid": $(this).attr("data-list")
				};
				
				
		var addtobutton = $(this);
		
		$.ajax({
            url: "listop.ajax.php",
            method: "POST",
            data: postdata,
			}).done(function( e ) {
				if (e=="success")
				{
					$(addtobutton).find(".textaction").text("Add to");
				}
				else
				{
					console.log(e);
				}
			});
	});
});