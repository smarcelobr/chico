const natural = require('natural');

// create a BayesClassifier
const PorterStemmerPt = require('./node_modules/natural/lib/natural/stemmers/porter_stemmer_pt');
const dayAndNightClassifier = new natural.BayesClassifier(PorterStemmerPt);

// supply a training set of data for two membership: night and day
dayAndNightClassifier.addDocument('Lua está no céu', 'noite');
dayAndNightClassifier.addDocument('Eu vejo estrelas', 'noite');
dayAndNightClassifier.addDocument('Está escuro', 'noite');
dayAndNightClassifier.addDocument('O Sol está no céu', 'dia');
dayAndNightClassifier.addDocument('Está claro', 'dia');
dayAndNightClassifier.addDocument('Que dia lindo', 'dia');
dayAndNightClassifier.addDocument('Que noite linda', 'noite');
// training
dayAndNightClassifier.train();
const classificacao = dayAndNightClassifier.classify("Eu vejo um Sol Brilhante");
// new input is classified as day
console.log(classificacao);

dayAndNightClassifier.save('dayAndNightClassifier.json', (err, classifier) => {
    if (err) {
        throw new Exception(err);
    }
    console.log(classifier);
});


