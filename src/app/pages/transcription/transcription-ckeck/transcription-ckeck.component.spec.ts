  import { async, ComponentFixture, TestBed } from '@angular/core/testing';

  import { TranscriptionCkeckComponent } from './transcription-ckeck.component';
  
  describe('TranscriptionCkeckComponent', () => {
    let component: TranscriptionCkeckComponent;
    let fixture: ComponentFixture<TranscriptionCkeckComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ TranscriptionCkeckComponent ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(TranscriptionCkeckComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
  