$(document).ready(function(){
	
	//
	// mnemonics
	//
	$(".mnemonics").on("click", function() {
		$(this).parent().hide();
		$(this).parent().parent().find(".fullalg").show();
	});
	
	//
	// cross orientation
	//
	$("#crossorientation").change(function(){
		setCookie("crossorientation",$(this).val(),500000,'/',  'speedcubedb.com');
		location.reload();
	});
	
	
	//
	// voting
	//
	$(".postvote, .bookmark, .nope").on("click tap vclick", function() {
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
		if ($(this).hasClass("selected"))
			postdata[$(this).attr("data-vote")] = 0;
		else
			postdata[$(this).attr("data-vote")] = 1;
		var thumbsbutton = $(this);
		
		$.ajax({
            url: "uservote.ajax.php",
            method: "POST",
            data: postdata,
			}).done(function( e ) {
				if (e=="success")
				{
					$(thumbsbutton).toggleClass("selected");
				}
				else
				{
					console.log(e);
				}
			});
	});
	
	//
	// Suggestion Form
	//
	$(".suggestionform").submit(function(e){
		e.preventDefault();
		if ($("#login-lightbox").length !=0)
		{
			$("#login-lightbox").fadeIn();
			return;
		}
		
		let postdata = $(this).serialize();
		
		$.ajax({
            url: "addalternative.ajax.php",
            method: "POST",
            data: postdata,
			}).done(function( e ) {
				$("#modal-text").text(e);
				
				var myModal = new bootstrap.Modal(document.getElementById('suggestionDialog'), {});
				myModal.show();
				myModalEl = document.getElementById('suggestionDialog');
				myModalEl.addEventListener('hidden.bs.modal', function (event) {
				  location.reload();
				})
			});
			
		return false;
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
		console.log(postdata);
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
		
		
		$("ul.pro-algs").hide();
		$("ul.community-algs").show();
		$(this).blur();
	});
	
	$(".pro_algs").click(function(){
		$(this).parent().find(".pro_algs").removeClass("btn-outline-secondary");
		$(this).parent().find(".community_algs").removeClass("btn-outline-light");
		
		$(this).parent().find(".pro_algs").addClass("btn-outline-light");
		$(this).parent().find(".community_algs").addClass("btn-outline-secondary");
		
		$("ul.pro-algs").show();
		$("ul.community-algs").hide();
		$(this).blur();
	});
	
	
	$(".recon-list-toggle").click(function(){
		
		let recondiv = $(this).parent().find(".recon-list");
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