// . Any character except newline.
// \.  A period (and so on for \*, \(, \\, etc.)
// ^ The start of the string.
// $ The end of the string.
// \d,\w,\s  A digit, word character [A-Za-z0-9_], or whitespace.
// \D,\W,\S  Anything except a digit, word character, or whitespace.
// [abc] Character a, b, or c.
// [a-z] a through z.
// [^abc]  Any character except a, b, or c.
// aa|bb Either aa or bb.
// ? Zero or one of the preceding element.
// * Zero or more of the preceding element.
// + One or more of the preceding element.
// {n} Exactly n of the preceding element.
// {n,}  n or more of the preceding element.
// {m,n} Between m and n of the preceding element.
// ??,*?,+?,
// {n}?, etc.  Same as above, but as few as possible.
// (expr)  Capture expr for use with \1, etc.
// (?:expr)  Non-capturing group.
// (?=expr)  Followed by expr.
// (?!expr)  Not followed by expr.


/* [GLOBAL] Functions
*******************************************************************/

	function request_full_profile(id){
		var profile_request = $.post("/full-profile-request/"+id);

		profile_request.done(function (data){
			alert(data)
			if (data == 'success')
				window.location = '/home'
		})
	}

	function resize_map(){
		var windowHeight = $(window).height();
		$('.body').css("height", windowHeight)
	}

	function get_location(){
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(location_success);
		} else {

		}
	}

	function historic(){
		console.log("getting historic ...")
		var get_hitoric = $.get("/historic");
		get_hitoric.done(function (data){
			$.each(data, function() {
				alert(this['sender_name'])
			});
		})
	}

	function location_success(position){
		var lat=position.coords.latitude;
		var lon=position.coords.longitude;
		var myLocation = new google.maps.LatLng(lat, lon);
		var map = draw_map(map, myLocation);
		var marker = new google.maps.Marker({
			position: myLocation,
			map: map,
			title: 'Você'
		});
		var positioning = $.post("/update/location",{
			'lat':lat, 
			'lon':lon
		});
		positioning.done(function (data){
			$.each(data, function() {
				var location = new google.maps.LatLng(this['latitude'], this['longitude']);
				add_marker(map, location, this['name'], this['id'], this['icon_url'])
			});
		})
	}


	function draw_map(map, myLocation){
		var mapOptions = {
			center: myLocation,
			zoom: 20,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		return map = new google.maps.Map(document.getElementById("container-map"),mapOptions);
	}

	function add_marker(map, myLocation, title, id, icon_url){
		var marker = new google.maps.Marker({
			position: myLocation,
			map: map,
			icon: icon_url,
			title: title
		});
		
		marker.set("id", id);

		google.maps.event.addListener(marker, "click", function() {
			var user_id = marker.get('id');

			if (user_id == 0){
				alert('Este é você');
			} else{
				window.location = 'user/'+user_id;
			}
		});
	}

/* [LOCAL] Functions - <Model>
*******************************************************************/

/* [GLOBAL] Calls 
*******************************************************************/
	$(document).on('click', 'button[data-get]', function(e){
		e.preventDefault();

		el = $(this);
		href = el.attr('data-get');

		$.get(href, function(data){
			if (data['template']){
				if(el.attr('data-target')){
					target = $(el.attr('data-target'));

					target.fadeOut(200, function() {
						target.html(data['template']);
					}).fadeIn(300);
				}
			}
		})
	})

	$(document).on('click', 'button[data-post]', function(e){
		e.preventDefault();

		el = $(this);
		form = $(el.attr('data-post'));

		url = form.attr('action');
		method = form.attr('method');

		$.ajax({
			url     : url,
			cache   : false,
			type    : method,
			data    : form.serialize(),
			success : function(data){

			if (data['redirect']){
				$.get(data['redirect'], function(data){
					if(data['target']){
						$(data['target']).fadeOut(200, function() {
							$(data['target']).html(data['template']);
						}).fadeIn(300);

						$(data['target']).html(data['template']);
					} else {
						$('#container').fadeOut(200, function() {
							$('#container').html(data['template']);
						}).fadeIn(300);
					}
				});
			}

			if (data['alert-success']){
					alertify.success(data['alert-success']);
				} else if (data['alert-error']){
					alertify.error(data['alert-error']);
				} 
			},
			error   : function(data) {
				alert('Erro!');     
			}
		});
	})

/*  [LOCAL] Calls - <Model>
*******************************************************************/