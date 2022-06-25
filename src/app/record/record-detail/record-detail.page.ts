import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInput, ModalController, NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {RecordService} from '../record.service';
import {Record} from '../record.model';
import {ModulePickerPage} from '../../module/module-picker/module-picker.page';



@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.page.html',
  styleUrls: ['./record-detail.page.scss'],
})
export class RecordDetailPage implements OnInit {


  @ViewChild('moduleNr')
  private moduleNrRef: IonInput;

  isEditMode = false;
  pageTitle: string;
 record=new Record();
  years: number[] = [];
  errors: Map<string, string> = new Map<string, string>();


  constructor(private route: ActivatedRoute,
              private recordService: RecordService,
              private navCtrl: NavController,
              private modalController: ModalController,
              private router: Router
              ) { }

  ngOnInit() {

    const recordId= this.route.snapshot.paramMap.get('id');
    if(recordId) {
      this.isEditMode = true;
      //Object.assign(this.record, this.recordService.findById(recordId));
      this.recordService.findById(recordId).subscribe( res => {
          this.record = res;
        }
      );
      this.pageTitle = 'Leistung bearbeiten';
    }else {
      this.record.year = new Date().getFullYear();
      this.pageTitle = 'Leistung erstellen';
      this.selectModule();
      this.record.halfWeighted=false;
      this.record.summerTerm=false;
    }
    this.initYears();

  }
  async selectModule() {
    const modal = await this.modalController.create({
      component: ModulePickerPage
    });
    await modal.present();
    const result = await modal.onDidDismiss();

    this.record.moduleName=result.data.name;
    this.record.moduleNr=result.data.nr;
    this.record.crp=result.data.crp;
  }

  ionViewDidEnter() {
    if (!this.isEditMode) {
      this.moduleNrRef.setFocus();
    }
  }



  save() {
    this.errors.clear();
    if (!this.record.moduleNr) {
      this.errors.set('moduleNr', 'Modulnummer darf nicht leer sein!');
    }
    if (!this.record.moduleName) {
      this.errors.set('moduleName', 'Modulname darf nicht leer sein!');
    }
    if (typeof this.record.crp === 'undefined') {
      this.errors.set('crp', 'Creditpoints darf nicht leer sein!');
    }
    if (typeof this.record.grade === 'undefined') {
      this.errors.set('grade', 'Note darf nicht leer sein!');
    }


    if (this.errors.size === 0) {
      if (this.isEditMode) {
        this.recordService.updateRecord(this.record).then(r =>  this.navCtrl.pop() );
      } else {
        this.recordService.addRecord({
          moduleNr: this.record.moduleNr,
          moduleName: this.record.moduleName,
          crp: this.record.crp,
          grade: this.record.grade,
          halfWeighted: this.record.halfWeighted,
          summerTerm: this.record.summerTerm,
          year: this.record.year
        }).then(r =>  this.navCtrl.pop());
      }
    }

  }

  async deleteRecord() {
     await this.recordService.delete(this.record);
       await this.router.navigate(['record-list']);

  }

  private initYears() {
     for(let i=0; i<5;i++){
       this.years.push(new Date().getFullYear() -i);
     }
  }



}
