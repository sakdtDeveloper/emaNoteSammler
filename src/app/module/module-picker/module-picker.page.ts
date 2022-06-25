import {Component, OnInit, ViewChild} from '@angular/core';
import {Module} from '../module.model';
import {IonSearchbar, ModalController, NavController} from '@ionic/angular';
import {ModuleService} from '../module.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-module-picker',
  templateUrl: './module-picker.page.html',
  styleUrls: ['./module-picker.page.scss'],
})
export class ModulePickerPage implements OnInit {

  @ViewChild('autofocus',{static: false}) searchbar: IonSearchbar;
  searchbarVisible: boolean;
  modules: Module[] = [];
  filteredModules: Module[] = [];
  filter: string;




  constructor(public modalController: ModalController,
              private moduleService: ModuleService,
              private router: Router
              ) {

  }

  ngOnInit() {
    this.modules = this.moduleService.findAll();
    this.filteredModules = this.modules;
    setInterval(()=>this.moduleService.load(),86400000);
    this.searchbarVisible=false;
    this.filter='';

      this.ionViewWillEnter();


  }

  doSearch() {
    this.filteredModules = this.modules.filter((module) =>
      module.name.toLowerCase().includes(this.filter.toLocaleLowerCase()));

  }

  cancelSearch() {
    this.searchbarVisible= !this.searchbarVisible;
    if(this.searchbarVisible===true){
      this.ionViewWillEnter();
    }
  }




  abbrechen() {
    this.modalController.dismiss();
    this.router.navigate(['record-list']);
  }

  ueberspringen() {

     this.modalController.dismiss(this.modules[0]);

  }

  ionViewWillEnter() {
    setTimeout(() => this.searchbar.setFocus(), 300);
  }
}
