/** Normalizes objects and native errors without leaking circular references. */
export function safeStringify(value: unknown): string {
  const seen = new WeakSet<object>();
  try {
    return JSON.stringify(value, (_key, item: unknown) => {
      if (typeof item === 'bigint') return item.toString();
      if (item instanceof Error) {
        return { name: item.name, message: item.message, stack: item.stack };
      }
      if (item !== null && typeof item === 'object') {
        if (seen.has(item)) return '[Circular]';
        seen.add(item);
      }
      return item;
    }) ?? String(value);
  } catch {
    return String(value);
  }
}

export function stringifyValue(value: unknown): string {
  return typeof value === 'string' ? value : safeStringify(value);
}
