<?php 

include 'config.php';


// on va lire les fichiers txt pour en retirer les mots
// et les stocker dans des tableaux
$TradFr = array();

$Fr = fopen('liste_fr.txt', 'r+');
$i = 0;
 
while (FALSE !== ($line = fgets($Fr))){
	
	$TradFr[$i] = $line ;
	$i++;

}

fclose($Fr);

$TradEn = array();

$En = fopen('liste_en.txt', 'r+');
$i = 0;
 
while (FALSE !== ($line = fgets($En))){
	
	$TradEn[$i] = $line ;
	$i++;

}

fclose($En);

// on parcours les tableaux
for ($j=0; $j < $i ; $j++) { 


		// On enlève les saut à la ligne 
		$TradEn[$j] = preg_replace('#[\n\r]#', "", $TradEn[$j]);
		$TradFr[$j] = preg_replace('#[\n\r]#', "", $TradFr[$j]);

		// on s'assure qu'il y a bien un résultat en anglais
		// car google des fois refuse de traduire ou nous redonne le mot tel qu'il est
		// et les accents en anglais ça n'existe pas
	if (!empty($TradEn[$j]) &&  !preg_match("#[ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ]#", $TradEn[$j])){

		// enlever les to devant les verbes anglais
		$TradEn[$j] = preg_replace('/to /', "", $TradEn[$j]);

		// mettre tout à la même casse, certains commençait par une majuscule après traduction
		$TradEn[$j] = strtolower($TradEn[$j]);

		// et on insère dans la BDD
		$data = array('french'=>$TradFr[$j], 'english'=>$TradEn[$j]);
          
	  	$prepare = $pdo->prepare('INSERT INTO words (french, english) VALUES (:french, :english)');
	          
	  	$exec = $prepare->execute($data);
	}
	

}


?>