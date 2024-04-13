import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleRegisterComponent } from './people-register.component';

describe('PeopleRegisterComponent', () => {
  let component: PeopleRegisterComponent;
  let fixture: ComponentFixture<PeopleRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeopleRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
