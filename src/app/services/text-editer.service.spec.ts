import { TestBed } from '@angular/core/testing';

import { TextEditerService } from './text-editer.service';

describe('TextEditerService', () => {
  let service: TextEditerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextEditerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
