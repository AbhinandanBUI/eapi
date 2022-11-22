import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingSalaryComponent } from './working-salary.component';

describe('WorkingSalaryComponent', () => {
  let component: WorkingSalaryComponent;
  let fixture: ComponentFixture<WorkingSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkingSalaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkingSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
