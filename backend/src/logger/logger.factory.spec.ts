import { DevLogger } from './dev.logger';
import { JsonLogger } from './json.logger';
import { TskvLogger } from './tskv.logger';
import { createLogger } from './logger.factory';

describe('createLogger', () => {
  it('uses human-readable logger by default', () => expect(createLogger()).toBeInstanceOf(DevLogger));
  it('selects JSON', () => expect(createLogger('json')).toBeInstanceOf(JsonLogger));
  it('selects TSKV', () => expect(createLogger('tskv')).toBeInstanceOf(TskvLogger));
  it('rejects invalid format', () => expect(() => createLogger('xml')).toThrow('LOGGER_FORMAT'));
});
