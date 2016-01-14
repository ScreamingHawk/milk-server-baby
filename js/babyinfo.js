$(document).ready(function(){
	$('#emailForm').submit(function(e){
		e.preventDefault();
		
		$('#emailNote').removeClass('hidden');
		$('#email').attr('disabled', true);
		$('#emailButton').addClass('hidden');
		
		$('#emailNote').text("Sending request... Please wait...");
		
		AWS.config.update({
			region: 'us-east-1',
			credentials: new AWS.CognitoIdentityCredentials({
				AccountId: '110820207274',
				RoleArn: 'arn:aws:iam::110820207274:role/Cognito_BabyInfoUnauth_Role',
				IdentityPoolId: 'us-east-1:dd2e13bc-64c6-42db-9d43-2eed19cde8bd'
			})
		});
		
		var email = $('#email').val();
		var params = {
			Protocol: 'email', 
			TopicArn: 'arn:aws:sns:us-east-1:110820207274:Baby_Standen_Info',
			Endpoint: email
		};

		new AWS.SNS().subscribe(params, function(err, data){
			if (err){
				console.log(err, err.stack);
				$('#emailNote').text("An error occurred when subscribing.");
			} else {
				console.log(data);
				$('#emailNote').text("A confirmation email has now been sent.");
			}
		});
		
		
		return false;
	});
});