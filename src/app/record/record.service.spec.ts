import {RecordService} from './record.service';
import {Record} from './record.model';

describe('RecordService', () => {
  const recordService = new RecordService();

  const testRecords = [
    new Record(null, 'TEST-NR', 'TEST-NAME', 3, 73, true, true, 2015),
    new Record(null, 'TEST-NR', 'TEST-NAME', 6, 81, true, false, 2016),
    new Record(null, 'TEST-NR', 'TEST-NAME', 9, 56, false, true, 2017),
    new Record(null, 'TEST-NR', 'TEST-NAME', 9, 66, false, false, 2018),
  ];
  const insertTestData = () => testRecords.forEach(r => recordService.persist(r));
  const getRecordIds = () => recordService.findAll().map(r => r.id);
  const getMaxId = () => getRecordIds().reduce((max, val) => val > max ? val : max, 0);

  beforeEach(() => {
    // clear test data
    getRecordIds().forEach(id => recordService.delete(id));
  });

  it('should create an instance', () => {
    expect(recordService).toBeTruthy();
  });

  it('persists records', () => {
    testRecords.forEach(r => recordService.persist(r));
    expect(recordService.findAll().length).toBe(testRecords.length);
  });

  it('finds all records', () => {
    expect(recordService.findAll().length).toBe(0);
    insertTestData();
    expect(recordService.findAll().length).toBe(testRecords.length);
  });

  it('finds records by id', () => {
    insertTestData();
    getRecordIds().forEach(id => {
      const record = recordService.findById(id);
      expect(record.id).toBe(id);
    });
  });

  it('doesn\'t find a record by unknown id', () => {
    expect(recordService.findById(getMaxId() + 1)).toBeFalsy();
    insertTestData();
    expect(recordService.findById(getMaxId() + 1)).toBeFalsy();
  });

  it('updates records', () => {
    insertTestData();
    recordService.findAll()
        .forEach((r, idx) => {
          const update = new Record();
          update.id = r.id;
          update.moduleNr = 'TEST UPDATE ' + idx;
          update.moduleName = 'TEST UPDATE ' + idx;
          update.crp = 15;
          update.grade = 50;
          update.year = 2000 + idx;

          expect(recordService.update(update)).toBeTrue();

          const record = recordService.findById(r.id);
          Object.keys(record).forEach(key => expect(record[key]).toBe(update[key]));
        });
  });

  it('doesn\'t update unknown record', () => {
    const update = new Record(getMaxId() + 1);
    expect(recordService.update(update)).toBeFalse();
    insertTestData();
    const update2 = new Record(getMaxId() + 1);
    expect(recordService.update(update2)).toBeFalse();
  });

  it('deletes records', () => {
    insertTestData();
    let currentLength = recordService.findAll().length;
    getRecordIds().forEach(id => {
      recordService.delete(id);
      expect(recordService.findAll().length).toBe(--currentLength);
    });
  });

  it('doesn\'t delete a record by unknown id', () => {
    expect(recordService.delete(getMaxId() + 1)).toBeFalse();
    insertTestData();
    expect(recordService.delete(getMaxId() + 1)).toBeFalse();
  });

});
