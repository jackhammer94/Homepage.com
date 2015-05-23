$('#input').keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		submitForm('https://www.google.co.in','/search?q=')
		return false;
	}
});
	
url="";
function submitForm( home, url)
{ 
	var sf=document.getElementById('search');
	if(sf.q.value=="")
	{
		var submitto = home;
	}
	else{
		var submitto = home + url + encodeURI(sf.q.value);
	}
   $("#input").val('');
	window.open(submitto);
	return false;
}