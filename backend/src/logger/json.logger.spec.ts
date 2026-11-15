import { JsonLogger } from './json.logger';

const logger = new JsonLogger();

describe('JsonLogger', () => {
  afterEach(() => jest.restoreAllMocks());

  it('serializes message, level and optional params to valid JSON', () => {
    const result = JSON.parse(logger.formatMessage('log', 'hello', 'FilmsController', { id: 4 }));
    expect(result).toEqual(expect.objectContaining({
      timestamp: expect.any(String), level: 'log', message: 'hello',
      optionalParams: ['FilmsController', { id: 4 }],
    }));
  });

  it('serializes errors and circular objects', () => {
    const circular: { self?: unknown } = {};
    circular.self = circular;
    const result = JSON.parse(logger.formatMessage('error', new Error('oops'), circular));
    expect(result.message.message).toBe('oops');
    expect(result.optionalParams[0].self).toBe('[Circular]');
  });

  it.each([
    ['log', 'log'], ['error', 'error'], ['warn', 'warn'],
    ['debug', 'debug'], ['verbose', 'debug'], ['fatal', 'error'],
  ] as const)('writes %s to console.%s', (method, target) => {
    const spy = jest.spyOn(console, target).mockImplementation(() => undefined);
    logger[method]('test', 'Context');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(JSON.parse(String(spy.mock.calls[0][0])).level).toBe(method);
  });
});
