import GetRowNum from './RowNums';

export default class Location {
    row; col;
    rowChar; fullRowCol;
    name;
    chicken; pig; snek;

    constructor(nRow, nCol, nName, nChicken, nPig, nSnek){
        this.rowChar = nRow;
        this.row = GetRowNum(this.rowChar);
        this.col = nCol;
        this.name = nName;
        this.fullRowCol = (this.rowChar + this.col.toString());

        this.chicken = nChicken;
        this.pig = nPig;
        this.snek = nSnek;
    }

    HasAnimal = (animal) => {
        switch(animal) {
              case '1':
                  return this.chicken === true;
              case '2':
                  return this.pig === true;
              case '3':
                  return this.pig === true;
            default: break;
          }
    }
}