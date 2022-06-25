import {Injectable} from '@angular/core';
import {Module} from './module.model';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ModuleService {



  static modulesUrl = 'https://ema-data.firebaseio.com/modules.json';


  modules: Module[];
  constructor(private http: HttpClient) {
    const modulesJSON = localStorage.getItem('modules');
    if (modulesJSON) {
      this.modules = JSON.parse(modulesJSON);
    } else {
      // init storage with test data
      this.modules = [];
      // nr, name, crp
      this.modules.push(new Module('CS1017', 'Algorithmen und Datenstrukturen', 6));

 this.save();
    }
  }
  findAll(): Module[] {
    return this.modules;
  }
  load() {

    const modulesLastModified = localStorage.getItem('modulesLastModified');
    this.http.get<Module[]>(ModuleService.modulesUrl, {
      observe: 'response',


      headers: modulesLastModified ? {'if-Modified-Since': modulesLastModified} : {}
    }).toPromise().then(
      (response: HttpResponse<Module[]>) => {
        const newModules = response.body;

        if(this.equals(this.modules,newModules)){
          console.log('no update necessary');
        }
        else{

          this.modules.splice(0, this.modules.length, ...newModules);
          localStorage.setItem('modulesLastModified', response.headers.get('Last-Modified'));

          this.save();
          console.log('modules updated');
        }
      }
      ,
      (error: HttpErrorResponse) => {

       console.log(error.status === 0,'No network, SOP, etc.' )  ;//

        console.log(error.status === 304,'modules.json not modified' )  ;//
      }
    );
  }
  private save(): void {
    localStorage.setItem('modules', JSON.stringify(this.modules));
  }

  private equals(a: Module[],b: Module[]){
    return JSON.stringify(a) === JSON.stringify(b);
  }

}
