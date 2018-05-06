import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlurtifyComponent } from './plurtify.component';

describe('PlurtifyComponent', () => {
  let component: PlurtifyComponent;
  let fixture: ComponentFixture<PlurtifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlurtifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlurtifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
