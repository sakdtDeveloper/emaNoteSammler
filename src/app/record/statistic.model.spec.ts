import {Statistic} from './statistic.model';
import {Record} from './record.model';

describe('Statistic', () => {
  const statsNoRecords = new Statistic([]);

  const records = [
    new Record(1, 'CS1013', 'Objektorientierte Programmierung', 6, 73, true, true, 2016),
    new Record(2, 'MN1007', 'Diskrete Mathematik', 6, 81, true, false, 2016),
  ];

  const stats2Records = new Statistic(Array.from(records));

  records.push(
      new Record(3, 'CS1019', 'Compilerbau', 6, 81, false, false, 2017),
      new Record(4, 'CS1020', 'Datenbanksysteme', 6, 92, false, false, 2017)
  );

  const stats4Records = new Statistic(Array.from(records));

  it('should create an instance', () => {
    expect(statsNoRecords).toBeTruthy();
    expect(stats2Records).toBeTruthy();
    expect(stats4Records).toBeTruthy();
  });

  it('counts all records', () => {
    expect(statsNoRecords.recordCount).toBe(0);
    expect(stats2Records.recordCount).toBe(2);
    expect(stats4Records.recordCount).toBe(4);
  });

  it('counts half weighted records', () => {
    expect(statsNoRecords.hwCount).toBe(0);
    expect(stats2Records.hwCount).toBe(2);
    expect(stats4Records.hwCount).toBe(2);
  });

  it('sums up credit points', () => {
    expect(statsNoRecords.sumCrp).toBe(0);
    expect(stats2Records.sumCrp).toBe(12);
    expect(stats4Records.sumCrp).toBe(24);
  });

  it('calculates missing credit points to graduation', () => {
    expect(statsNoRecords.crpToEnd).toBe(180);
    expect(stats2Records.crpToEnd).toBe(168);
    expect(stats4Records.crpToEnd).toBe(156);
  });

  it('calculates average grade', () => {
    expect(statsNoRecords.averageGrade).toBe(0);
    expect(stats2Records.averageGrade).toBe(77);
    expect(stats4Records.averageGrade).toBe(83);
  });

});
