import {AppRootContainer} from "./AppRootContainer";
import {UI_DiscordContainer} from "./ui/discord/UI_DiscordContainer";
import {UI_WebappContainer} from "./ui/webapp/UI_WebappContainer";

console.log('Aplicação iniciada!');

let rootContainer = new AppRootContainer();

/*
const PorterStemmerPt = require('./node_modules/natural/lib/natural/stemmers/porter_stemmer_pt');
var bayesClassifier = new natural.BayesClassifier(PorterStemmerPt);

// carrega a classificacao natural
bayesClassifier.load('dayAndNightClassifier.json', null, (err, classifier) => {
	if (err) {
		throw new Exception(err);
	}
	console.log(classifier);
});
*/



