import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IndiaComponent } from './india.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('IndiaComponent', () => {
  let component: IndiaComponent;
  let fixture: ComponentFixture<IndiaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IndiaComponent ],
      imports:[HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
