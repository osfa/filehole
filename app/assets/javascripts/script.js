$(function(){
	var drop_x, drop_y = 0;
	/*$(document).mousemove(function(e) {

		drop_x = e.pageX-20;
		drop_y = e.pageY-35;
		//console.log("coords set");
		//console.log(drop_x); console.log(drop_y);
	});*/
	
	var dropbox = $('#dropbox'),
		message = $('.message', dropbox),
		files_container = $('#dropbox .files-container');
	
	dropbox.filedrop({
		// The name of the $_FILES entry:
		paramname:'matter[file]',
		
		maxfiles: 3,
    	maxfilesize: 1,
		url: '/matters',
		allowedfiletypes: [],
		
		uploadFinished:function(i,file,response){
			//console.log($.data(file));
			/*console.log("file entry coords: ");
			console.log($.data(file).offset().left);
			console.log($.data(file).offset().top);*/
			var item = $.data(file);
			/*var entryX = item.offset().left-20;
			var entryY = item.offset().top-20;*/
			// response is the JSON object that post_file.php returns
			console.log("JSON RESP:");
			console.log(response);
			
			item.fadeOut(function(){

				var template = '<span class="imageHolder">'+
										'<a href="#"><img /></a>'+
										'<span class="uploaded"></span>'+
									'</span>';

					var preview = $(template), 
						image = $('img', preview),
						link = $('a', preview);

					image.width = 100;
					image.height = 100;
					
					if(response['file'].indexOf("jpeg") != -1 || response['file'].indexOf("jpg") != -1 || response['file'].indexOf("png") != -1 || response['file'].indexOf("gif") != -1)
						image.attr('src', response['file']);
					else 
						image.attr('src', "/assets/rails.png");
						
					link.attr('href', response['file']);
					
					//preview.appendTo(files_container);
				    item.html('');
					preview.appendTo(item);
					item.fadeIn();
						
			});

		
		},
		drop: function(e) {
			drop_x = e.originalEvent.pageX - 20;
			drop_y = e.originalEvent.pageY - 35;
	        files_container.html('');
			console.log("DROP: ");
			console.log(drop_x); console.log(drop_y);
			files_container.css({
			       left:  drop_x + "px",
			       top:   drop_y + "px"
			    });
	    },
    	error: function(err, file) {
			switch(err) {
				case 'BrowserNotSupported':
					showMessage('Your browser does not support HTML5 file uploads!');
					break;
				case 'TooManyFiles':
					alert('Too many files! Please select 5 at most! (configurable)');
					break;
				case 'FileTooLarge':
					alert(file.name+' is too large! Please upload files up to 2mb (configurable).');
					break;
				default:
					break;
			}
		},
		
		// Called before each upload is started
		beforeEach: function(file){
			/*if(!file.type.match(/^image\//)){
				alert('Only images are allowed!');
				
				// Returning false will cause the
				// file to be rejected
				return false;
			}*/
		},
		
		uploadStarted:function(i, file, len){
			createImage(file);
		},
		
		progressUpdated: function(i, file, progress) {
			//$.data(file).find('.progress').width(progress);
		}
    	 
	});
	
	var template = '<div class="file-icon">'+
						'<span class="imageHolder">'+
							'<img />'+
							'<span class="uploaded"></span>'+
						'</span>'+
					'</div>';
	
	function createImage(file){

		var preview = $(template), 
			image = $('img', preview);
			
		var reader = new FileReader();
		
		image.width = 100;
		image.height = 100;
		
		reader.onload = function(e){
			
			// e.target.result holds the DataURL which
			// can be used as a source of the image:
			//console.log("DataURL:")
			//console.log(e.target.result);
			if(e.target.result.indexOf("image/") != -1)
				image.attr('src',e.target.result);
			else
				console.log("not img");
		};
		
		// Reading the file as a DataURL. When finished,
		// this will trigger the onload function above:
		reader.readAsDataURL(file);
		
		message.hide();
		
		preview.appendTo(files_container);

		// Associating a preview container
		// with the file, using jQuery's $.data():
		
		$.data(file,preview);
	}

	function showMessage(msg){
		message.html(msg);
	}

});