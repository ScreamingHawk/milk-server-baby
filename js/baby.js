$(document).ready(function(){
	$('#addNameForm').submit(function(e){
		e.preventDefault();
		$('#buttonGroup').empty();
		$('#buttonGroup').append("<div class='text-center'><span>Submitting...</span></div>");
		$.ajax('https://jkgwgbtcff.execute-api.us-west-2.amazonaws.com/prod/baby/names/add?'+ $(this).serialize())
				.done(function(data){
					$('#buttonGroup').empty();
					$('#buttonGroup').append("<div class='text-center'><span><strong>Thank you for you submission!</strong></span></div>");
					if ($('#user').val() == ""){
						appendNameToList($('#name').val(), "Anonymous", 0);
					} else {
						appendNameToList($('#name').val(), $('#user').val(), 0);
					}
				}).fail(function(){
					$('#buttonGroup').empty();
					$('#buttonGroup').append("<div class='text-center'><span>Something went wrong while processing your submission.</span></div>");
				});
		return false;
	})
});

function showNameInfo(){
	populateNameList();
	$('#showNameInfoButton').remove();
	$('#nameInfo').removeClass('hidden');
}

function populateNameList(){
	$('#nameList').empty();
	$('#nameList').append('<span>Loading names&hellip;</span>');
	$.ajax('https://jkgwgbtcff.execute-api.us-west-2.amazonaws.com/prod/baby/names/list/')
			.done(function(data){
				$('#nameList').empty();
				var names = $.parseJSON(data);
				names.sort(function(a, b){
					if (a.votes != b.votes){
						return b.votes - a.votes;
					}
					return a.name > b.name ? 1 : -1;
				});
				for (var i = 0; i < names.length; i++){
					if (names[i].user == null || names[i].user == ""){
						appendNameToList(names[i].name, "Anonymous");
					} else {
						appendNameToList(names[i].name, names[i].user, names[i].votes);
					}
				}
				$('#nameList').append('<div><span style="float: right;"><a href="" onclick="return populateNameList();">refresh</span></div>');
				$('#nameList').append('<div class="clearfix"></div>');
				$('#formParent').removeClass('hidden');
			}).fail(function(){
				$('#nameList').empty();
				$('#nameList').append('<div><span>Something went wrong while trying to recieve name list.</span></div>');
			});
	return false;
}

function appendNameToList(name, user, votes){
	$('#nameList').append('<div><span><strong>'+name+'</strong> suggested by '+user+' <i id="'+name+'arrow" class="fa fa-arrow-up" style="cursor: pointer" onclick="vote(\''+name+'\');"></i> <span id="'+name+'votes">'+votes+'</span></span></div>');
}

function vote(name){
	$('#'+name+'arrow').css('color', 'lightgreen');
	$('#'+name+'arrow').prop('onclick', null).attr('onclick', null);
	$('#'+name+'votes').html(parseInt($('#'+name+'votes').html()) + 1);
	$('#'+name+'votes').css('color', 'lightgreen');
	$.ajax('https://jkgwgbtcff.execute-api.us-west-2.amazonaws.com/prod/baby/names/vote?name='+name)
			.fail(function(){
				console.log('Voting for '+name+' failed.');
			});
}