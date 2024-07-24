import { TestBed } from '@angular/core/testing';
import { ManagerUsersComponent } from './manager-users.component';  

describe('ManagerUsersComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerUsersComponent],  
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ManagerUsersComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
