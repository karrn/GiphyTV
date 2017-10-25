/* 1. Grab the input value */

document.querySelector(".js-go").addEventListener('click', function(){
	var input = document.getElementsByClassName("js-userinput")[0].value;
	
	// call function to retrive gifs
	getGifs(input);
	
})

document.querySelector(".js-userinput").addEventListener('keyup', function(e){
	var input = document.getElementsByClassName("js-userinput")[0].value;

	// if the key ENTER is pressed......
	if (e.which === 13) {
		// call function to retrive gifs
		getGifs(input);
	};
	
	
});

/* 2. Do stuff using API */

function getGifs(input){
	//call function to refresh page
	refeshPage();

	var url = "https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=dc6zaTOxFJmzC";
	
	// AJAX Request
	var GiphyAJAXCall = new XMLHttpRequest();
	GiphyAJAXCall.open( 'GET', url );
	GiphyAJAXCall.send();

	GiphyAJAXCall.addEventListener('load', function(e){
		var data = e.target.response;
		pushToDOM(data);

	});
};

// function to refresh page and clear out existing gifs
function refeshPage() {
    document.getElementsByClassName("js-container")[0].innerHTML=""; 
};

/* 3. Show the GIFs */

function pushToDOM(input) {
	
	
	var response = JSON.parse(input);
	var imageURLs = response.data;
	// get total number of gifs returned
	totalGifs =imageURLs.length;
	var output = document.getElementsByClassName("js-container")[0];

	for(i=0;i<totalGifs;i++){
	
		(function(ind) {
       			setTimeout(function(){
       				console.log(ind);
       				var src = imageURLs[ind].images.fixed_height.url;
					output.innerHTML = "<img src=\"" + src + "\" class=\"container-image\"\">";
       			}, 5000 * ind);
   			})(i);
	
	}



}