import {Component, OnInit, ViewChild} from '@angular/core';
import {Record} from '../record.model';
import {Statistic} from '../statistic.model';
import {Router} from '@angular/router';
import {AlertController, IonSearchbar} from '@ionic/angular';
import {RecordService} from '../record.service';
import {Share} from '@capacitor/share';


@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.page.html',
  styleUrls: ['./record-list.page.scss'],
})
export class RecordListPage implements OnInit{

  @ViewChild('autofocus',{static: false}) searchbar: IonSearchbar;
  records: Record[] = [];
  filteredRecords: Record[] =[];
  statistic: Statistic;
  searchBarActivated: boolean;
  filter: string;
  message: string;
  average: number;


  constructor(private router: Router, private alertCtrl: AlertController, private recordService: RecordService) {
    this.recordService.findAll().subscribe(res =>{
      console.log(res);
      this.records=res;
      this.searchBarActivated = false;
      this.filter='';

      this.message='';
      this.showMess();
      this.statistic= new Statistic(this.records);
      this.average=this.statistic.averageGrade;
      this.ionViewWillEnter();
      this.filteredRecords = this.records;

    });
  }

  ngOnInit(): void {



  }



  createRecord(): void{
    this.router.navigate(['record-detail']);
  }

  editRecord(record) {
    this.router.navigate(['record-detail', {id: record.id}]);
  }
  async showStats(){
    this.statistic= new Statistic(this.records);
    const alert = await this.alertCtrl.create({
      header: 'Statistik',
      message: this.statistic.display(),
      buttons:[
        {
          text:'SCHLIESSEN',
          handler:()=>{ }
        }
      ]
    });
    await alert.present();
  }



 /* deleteRecord(id: number) {
    this.recordService.delete(id);
  }*/
  async deleteRecord(record: Record) {
    await this.recordService.delete(record);
    await this.router.navigate(['record-list']);

  }

  shareRecords() {

    let text='';
    for (const record of this.records){
      text += `${record.moduleName} ${record.grade}% \n`;
    }
    const msgText = `Hallo Papa,\n wollte Dir mal wieder meine Noten schicken:\n${text}\nBin übrigens im Moment etwas knapp bei Kasse :)`;

 Share.canShare().then(canShare => {
   if (canShare.value) {
     Share.share({
       title: 'Meine Studienleistungen',
       text: msgText,
       dialogTitle: 'Leistungen teilen'
     }).then((v) => console.log('ok:', v))
       .catch(err => console.log(err));
   } else {
     console.log('Error: Sharing not available!');
   }
 });
  }

  search(): void {
    if(this.filter===''){
      this.filteredRecords =this.records;
    }else{
      this.filteredRecords = this.records.filter((record) =>
        record.moduleName.toLowerCase().includes(this.filter.toLocaleLowerCase()) ||
        record.moduleNr.toLowerCase().includes(this.filter.toLocaleLowerCase())
      );
    }

  }


  cancelSearch() {

    this.searchBarActivated= !this.searchBarActivated;
    if(this.searchBarActivated===true){
      this.ionViewWillEnter();
    }
  }




  ionViewWillEnter() {
    setTimeout(() => this.searchbar.setFocus(), 300);
  }

 showMess(): boolean{
    if(this.records.length===0){
      this.message='Du hast noch keine Leistungen eingetragen 😥';
      return true;
    }
    else if(this.filteredRecords.length ===0 && this.records.length!==0) {
       if(this.searchBarActivated === true){
         this.message='Kein Ergebnis gefunden 😰';
         return true;
       }

    }
    else{
      return false;
    }


 }
}
