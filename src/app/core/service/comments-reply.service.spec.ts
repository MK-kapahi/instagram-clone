import { TestBed } from '@angular/core/testing';

import { CommentsReplyService } from './comments-reply.service';

describe('CommentsReplyService', () => {
  let service: CommentsReplyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentsReplyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
