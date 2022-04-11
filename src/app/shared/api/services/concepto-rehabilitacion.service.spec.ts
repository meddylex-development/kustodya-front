import { TestBed } from '@angular/core/testing';

import { ConceptoRehabilitacionService } from './concepto-rehabilitacion.service';

describe('ConceptoRehabilitacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConceptoRehabilitacionService = TestBed.get(ConceptoRehabilitacionService);
    expect(service).toBeTruthy();
  });
});
