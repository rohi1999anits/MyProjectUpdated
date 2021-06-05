import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChinaComponent } from './china.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ChinaComponent', () => {
  let component: ChinaComponent;
  let fixture: ComponentFixture<ChinaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChinaComponent ],
      imports:[HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
