import {Record} from './record.model';

export class Statistic{

  recordCount=0;
  hwCount=0;
  sumCrp=0;
  crpToEnd=180;
  averageGrade=0;
  sumGewichteteNote=0;
  sumGewichteteCrp=0;


  constructor(public records: Record[]) {

    this.init(records);
    this.average(records);

  }

  init(records: Record[]){

    this.recordCount=records.length;
    for (const record of records){
      if(record.halfWeighted){
        this.hwCount++;
      }
      if(record.crp !==0){
        this.sumCrp+=record.crp;
        this.crpToEnd-=record.crp;
      }
    }

  }
  average(records: Record[]) {

    for (const record of records) {
      this.sumGewichteteNote += record.halfWeighted ? ((record.grade * record.crp) / 2) : (record.grade * record.crp);
      this.sumGewichteteCrp += record.halfWeighted ? (record.crp / 2) : record.crp;
    }
   this.averageGrade= (this.sumGewichteteCrp !== 0) ? Math.round((this.sumGewichteteNote/this.sumGewichteteCrp)):0;
  }


  display(): string{

 let statisticText = `Anzahl Module: ${this.recordCount} <br/>`;
 statisticText += `50%-Leistungen: ${this.hwCount} <br/>`;
 statisticText += `Summe Crp: ${this.sumCrp} <br/>`;
 statisticText += `Crp bis Ziel: ${this.crpToEnd} <br/>`;
 statisticText += `Durchschnitt: ${this.averageGrade}%`;

 return statisticText;
  }
}
