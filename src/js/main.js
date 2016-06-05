
function getWords() {
    var result="";
    var promise = $.ajax({
      url:"config/getData.php",
      async: false,
      dataType: 'json',
      
   });    

    promise.done(
    	function (data){         	
      	result = data;
    });
	
	promise.fail(
    	function (){         	
      	result = getWords();
    });

   return result;
}

function hideWord(word){
	var txt = word[0];
	for (var i = 1; i < word.length; i++) {
		if( word[i]==' '){

		 	// au cas ou la gameuction est en deux mots
		 	// on est sympa et on lui donne la première
		 	//lettre du second mot
		 	txt = txt + ' ' +  word[i+1]
		 	i++;
		}
		 		
		 else
		 	txt = txt + '-';
	}; 
	return txt;
}


function game(){

	this.points = 10;
	this.words = getWords();

	console.log(this.words);

	$('.french').html(this.words.french);
	$('.english').html(hideWord(this.words.english));
	
}


function verify(enter, correction, points){

		if (enter == correction){

			$('.showAnwser').html('Bonne réponse :)');
			points++;
		}
			
		
		else{
			$('.showAnwser').html('La réponse était : <br> '+correction);
			points--;
		}

		setTimeout(function(){

			$('.showAnwser').html('');
		},1500);

		
		return points;
}


game = new game();

function update(){

	game.points = verify($('.answer').val(), game.words.english, game.points)

	if (game.points >= 20){

		$('.verify').css('display', 'none');
		$('.replay').css('display', 'inline-block');
		$('.progressBar').width(game.points/20*100+'%');		
	}
	

	else if (game.points <= 0){

		$('.verify').css('display', 'none');
		$('.replay').css('display', 'inline-block');
		$('.progressBar').width(game.points/20*100+'%');
	}

	else{

		$('.progressBar').width(game.points/20*100+'%')
		game.words = getWords();

		$('.french').html(game.words.french);
		$('.english').html(hideWord(game.words.english));
		

	}
	$('.answer').val('');

}

$('.verify').click(function(){
	update();
});


$(document).keypress(function(e) {

    if(e.keyCode === 13) {
		update();
	}
});


$('.replay').click(function(){

	game = new game();
	$('.progressBar').width(game.points/20*100+'%');
	$('.replay').css('display', 'none');
	$('.verify').css('display', 'inline-block');
	$('.gameStatut').html('');
});
