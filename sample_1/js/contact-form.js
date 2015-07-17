jQuery(document).ready(function($) {	
	var focusColor = "#169fe6";
	var labelError = { "color" : "#fff", "background" :"#ff4444" };
	var formError = { "border-color" : "#ff4444" };

	$('#buttonsend').click( function() {

		var name    = $('.contact-form #name').val();
		var subject = $('.contact-form #subject').val();
		var email   = $('.contact-form #email').val();
		var message = $('.contact-form #message').val();

		$('.loading').css('display','inline-block').fadeIn('slow');

		if (name != "" && subject != "" && email != "" && message != "") {

			$.ajax({
				url: 'sendemail.php',
				type: 'POST',
				data: "name=" + name + "&subject=" + subject + "&email=" + email + "&message=" + message,
				success: function(result) {
					$('.loading').fadeOut('fast');
					
					if(result == "email_error") {
						$('#email').css(formError).next('.require').text(' !');
						$('label[for="email"]').css(labelError);
					} else {
						$('#name, #subject, #email, #message').val("","Name","Subject","Email","Message");
						$('.success-contact').fadeIn();
						$('.success-contact').fadeOut(5000, function(){ $(this).remove(); });
					}
				}
			});

			return false;

		} else {
			$('.loading').fadeOut('slow');

			if(name <= 0) { 
				$('.contact-form #name').css(formError); 
				$('label[for="name"]').css(labelError);
			} else {
				$('.contact-form #name, label[for="name"]').attr('style', '');
			}

			if(subject <= 0) {
				$('.contact-form #subject').css(formError);
				$('label[for="subject"]').css(labelError);
			} else {
				$('.contact-form #subject, label[for="subject"]').attr('style', '');
			}

			if(email <= 0) {
				$('.contact-form #email').css(formError);
				$('label[for="email"]').css(labelError);
			} else {
				$('.contact-form #email, label[for="email"]').attr('style', '');
			}

			if(message <= 0) {
				$('.contact-form #message').css(formError);;
				$('label[for="message"]').css(labelError);
			} else {
				$('.contact-form #message, label[for="message"]').attr('style', '');
			}

			return false;
		}
	});
		
	$("#name, #subject, #email, #message").focus(function(){
		$("label[for='"+$(this).attr('id')+"']").addClass('focus');
		$(this).attr('style', '');
		$("label[for='"+$(this).attr('id')+"']").attr('style', '');
	}).blur(function() {
		$("label[for='"+$(this).attr('id')+"']").removeClass('focus');
		$(this).attr('style', '');
	});      	
});