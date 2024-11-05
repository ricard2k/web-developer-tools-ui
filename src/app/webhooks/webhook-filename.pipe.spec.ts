import { WebhookFilenamePipe } from './webhook-filename.pipe';

describe('WebhookFilenamePipe', () => {
  it('create an instance', () => {
    const pipe = new WebhookFilenamePipe();
    expect(pipe).toBeTruthy();
  });
});
