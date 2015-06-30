<!DOCTYPE html>
<html lang="en-US">
	<head>
		<meta charset="utf-8">
	</head>
	<body>
		<h2>Welcome to Myfrontpage.in!</h2>

		<div>
			please click the link to verify your account: <a href='{{URL::to('register/verify/'. $confirmation_code)}}' target='blank'>{{URL::to('register/verify/'. $confirmation_code)}}</a>
		</div>
	</body>
</html>