import Forts from './Forts';
import Locations from './Islands';
import GetRowNum from './RowNums';

export let HasAnimals = ( animalIds, userLocation ) => {
    let ids = animalIds.split(",");
    let choices = new Array(ids.length);
    let possibilities = [];
    //let parseVal = 0;
console.log(ids);
    // ids.forEach(cmd => {
    //     choices.push(cmd.toString());
    // });
    choices = ids;
console.log(choices);
    Locations.forEach((isle, i) => {
        switch (ids.length) {
            case 1:
                if (isle.HasAnimal(choices[0]))
                    possibilities.push(isle);
                break;
            case 2:
                if (isle.HasAnimal(choices[0])
                    && isle.HasAnimal(choices[1]))
                    possibilities.push(isle);
                break;
            case 3: //New - Unstable/Unreliable -vvvvvvvvvvvvvvvvvvvvv//
                if (isle.HasAnimal(choices[0])
                    && isle.HasAnimal(choices[1]))
                    possibilities.push(isle);
                break;
            default: break; //unsupported #
        }
    });

    //TODO -- USE THIS -- it provides input validation, on lowercase letters!!!
    // let newUserLocation;
    // if ('a' <= userLocation.charAt(0) && userLocation.charAt(0) <= 'z')
    //     newUserLocation = (userLocation[0] - 'a' + 'A').toString()
    //         + userLocation.substring(1); //handle lowerCase
    // else newUserLocation = userLocation;

    let curRow = GetRowNum(userLocation[0]);
    console.log(curRow);
    let curCol = 0;
    let dist = 0.0,
        minDist = 2147483645;
    let extra;
   // if(tryParseInt(userLocation.substring(1))) {
        curCol = parseInt(userLocation.substring(1),10);
        console.log(curCol);
   // }//int.TryParse(userLocation.substring(1), out curCol);
    let distances = [];
    possibilities.forEach((poss,i) => {
        dist = Math.sqrt(Math.pow((poss.row - curRow), 2) + Math.pow((poss.col - curCol), 2));
        console.log(dist);
        if (dist < minDist)
            minDist = dist;
        if (!distances[dist])
            distances[dist] = poss;
    });

    if (distances[minDist])
    {
        if(ids.length !== 3) //if nothing left to process
            return (distances[minDist].name + " - " + distances[minDist].fullRowCol);
        else{
            extra = distances[minDist];
            let newAnimalIds = animalIds.substring(4); //1,2,3
            return (extra.name + " - " + extra.fullRowCol) + "\n" + HasAnimals(newAnimalIds, extra.fullRowCol);
        }
    }
    else
        return null;
};

export let HasGp = (curLocale) => {
    let curRow = GetRowNum(curLocale[0]);
    console.log(curRow);
    let curCol = 0;
    let dist = 0.0,
    minDist = 2147483645;
    let minDistFort = null;

    //if(tryParseInt(curLocale.substring(1)))
    curCol = parseInt(curLocale.substring(1),10);
    let distances = [];

    Forts.forEach((poss,i) => {
        dist = Math.sqrt(Math.pow((poss.row - curRow), 2) + Math.pow((poss.col - curCol), 2));
        if (dist < minDist) {
            minDist = dist;
            minDistFort = poss;
        }
        if (!distances[dist]) {
            distances[dist] = poss;
        }
    });

    return (minDistFort.name + " - " + minDistFort.fullRowCol);
};
//
// @Override
// protected void onCreate(Bundle savedInstanceState) {
//     super.onCreate(savedInstanceState);
//     setContentView(R.layout.activity_display_message);
//
//     //Get the Intent that initiated activity - extract string
//     Intent intent = getIntent();
//     String locale = intent.getStringExtra(MainActivity.EXTRA_MESSAGE); //get Locale input
//     String animalIds = intent.getStringExtra(MainActivity.EXTRA_MESSAGE2); //get Animals Input
//
//     boolean needGP = false;
//
//     if(animalIds.contains(",4")){ //case: middle || last item
//         needGP = true; //check ",4" first because "4" is sub-case
//         animalIds = animalIds.replace(",4", "");
//     }
//     else if(animalIds.contains("4,")){ //case: first item
//         needGP = true;
//         animalIds = animalIds.replace("4,", "");
//     }
//     else if(animalIds.contains("4")){ //case: only item
//         needGP = true;
//         animalIds = animalIds.replace("4", "");
//     }//remove 4||,4||4, from string -- not valid animal id
//
//     if(!animalIds.isEmpty()){
//         String res = HasAnimals(animalIds, locale);
//         //Capture the layout's TextView --> Set text to message String
//         TextView textView = findViewById(R.id.textView3);
//         textView.setText("-Closest island-\n" + res);
//     }
//
//     if(needGP){
//         TextView gpView = findViewById(R.id.textViewGP);
//         String gpRes = HasGp(locale);
//         gpView.setText("-Closest fort-\n" + gpRes); //pre-formatted in HasGp()
//     }
// }