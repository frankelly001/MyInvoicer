export function toCamelCase(str: string) {
  return str
    .replace(/^(.)/, c => c.toUpperCase())
    .replace(/[-_](.)/g, (_, c) => c.toLowerCase());
}
