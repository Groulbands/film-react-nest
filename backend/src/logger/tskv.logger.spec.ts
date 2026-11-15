import { TskvLogger } from './tskv.logger';

const logger = new TskvLogger();

describe('TskvLogger', () => {
  afterEach(() => jest.restoreAllMocks());

  it('creates flat tab-separated key-value fields', () => {
    const line = logger.formatMessage('log', 'hello', 'FilmsController');
    expect(line).toMatch(/^timestamp=[^\t]+\tlevel=log\tmessage=hello\toptionalParams=/);
    expect(line).not.toContain('\n');
  });

  it('escapes tabs, newlines and backslashes to keep one physical line', () => {
    const line = logger.formatMessage('warn', 'a\tb\nc\\d');
    expect(line).toContain('message=a\\tb\\nc\\\\d');
    expect(line).not.toContain('\n');
  });

  it('converts structured values into string fields', () => {
    expect(logger.formatMessage('debug', { row: 2 })).toContain('message={"row":2}');
  });

  it.each([
    ['log', 'log'], ['error', 'error'], ['warn', 'warn'],
    ['debug', 'debug'], ['verbose', 'debug'], ['fatal', 'error'],
  ] as const)('writes %s to console.%s', (method, target) => {
    const spy = jest.spyOn(console, target).mockImplementation(() => undefined);
    logger[method]('test');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(String(spy.mock.calls[0][0])).toContain(`level=${method}`);
  });
});
