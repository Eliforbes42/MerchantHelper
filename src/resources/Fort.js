import GetRowNum from './RowNums';

export default class Fort
{
    constructor( nRow,  nCol,  nName)
    {
        this.rowChar = nRow;
        this.row = GetRowNum(this.rowChar);
        this.col = nCol;
        this.name = nName;
        this.fullRowCol = (this.rowChar.toString() + this.col.toString());
    }
}