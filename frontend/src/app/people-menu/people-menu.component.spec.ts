import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleMenuComponent } from './people-menu.component';

describe('PeopleMenuComponent', () => {
  let component: PeopleMenuComponent;
  let fixture: ComponentFixture<PeopleMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeopleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
