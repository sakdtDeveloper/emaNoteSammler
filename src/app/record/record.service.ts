import {Injectable} from '@angular/core';
import {Record} from './record.model';
import {
  addDoc,
  collection,
  collectionData, deleteDoc,
  doc,
  docData,
  Firestore,
  orderBy,
  query,
  updateDoc
} from '@angular/fire/firestore';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecordService {

   private isDelete: boolean;
   private isUpdate: boolean;
  private records: Record[];
  //private nextId: number;

  constructor(private firestore: Firestore) {
   /* const recordsJSON: string = localStorage.getItem('records');
    if (recordsJSON) {
      this.records = JSON.parse(recordsJSON);
      this.nextId = parseInt(localStorage.getItem('nextId'),10);
    } else {
      this.records = [];
      this.nextId = 1;

    }*/
  }

  findAll(): Observable<Record[]>{
    const notesRef = collection(this.firestore,'records');
    const recordsRef= query(notesRef,orderBy('moduleName'));
    return collectionData(recordsRef, {idField: 'id'}) as Observable<Record[]>;
  }
  addRecord(record: Record){
    const recordssRef = collection(this.firestore,'records');
    return addDoc(recordssRef, record);
  }

  updateRecord(record: Record){
    const recordDocRef = doc(this.firestore, `records/${record.id}`);
    return updateDoc(recordDocRef,
      {
        moduleNr: record.moduleNr,
        moduleName: record.moduleName,
        crp: record.crp,
        grade: record.grade,
        halfWeighted: record.halfWeighted,
        summerTerm: record.summerTerm,
        year: record.year
      });
  }
  findById(id: string): Observable<Record> {
    const noteDocRef = doc(this.firestore,`records/${id}`);
    return docData(noteDocRef, {idField: 'id'}) as Observable<Record>;

  }
  delete(record: Record){
    const recordDocRef = doc(this.firestore, `records/${record.id}`);
    return deleteDoc(recordDocRef);
  }

  /*persist(record: Record): void {
    record.id = this.nextId++;
    this.records.push(record);
    this.save();
  }*/

  /*findAll(): Record[] {
    return this.records;
  }*/

 /* delete(id): boolean{

   this.isDelete=false;
     this.records.forEach((record,index)=>{
       if(record.id===id){
         this.isDelete=true;
         this.records.splice(index,1);
       }
     });
    // this.save();
    return this.isDelete;
  }*/


 /* findById(id: number): Record {
    return this.records.find(r => r.id === id);

  }*/


 /* update(update: Record): boolean {
    this.isUpdate=false;
    this.records.forEach((record)=>{
      if(update.id===record.id){
        this.isUpdate=true;
        record.moduleNr=update.moduleNr;
        record.moduleName=update.moduleName;
        record.crp=update.crp;
        record.grade=update.grade;
        record.year=update.year;
        record.summerTerm=update.summerTerm;
        record.halfWeighted=update.halfWeighted;
      }
    });
   // this.save();
    return this.isUpdate;
  }*/

 /* private save() {
    localStorage.setItem('records', JSON.stringify(this.records));
    localStorage.setItem('nextId', this.nextId.toString());
  }*/



}
