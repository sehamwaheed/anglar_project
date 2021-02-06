import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostIdComponent } from './create-post-id.component';

describe('CreatePostIdComponent', () => {
  let component: CreatePostIdComponent;
  let fixture: ComponentFixture<CreatePostIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePostIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
