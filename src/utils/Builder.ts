export class ObjectBuilder {
  private lines: string[] = [];
  private indent = '    ';
  private level = 0;

  private pad(): string {
    return this.indent.repeat(this.level);
  }

  objectHeader(isExport: boolean, kind: 'const' | 'let' | 'var', name: string) {
    const prefix = isExport ? 'export ' : '';
    this.lines.push(`${prefix}${kind} ${name} = {`);
    this.level++;
  }

  startObject(key?: string, comment?: string) {
    const line = key
      ? `${this.pad()}${key}: {${comment ? ` // ${comment}` : ''}`
      : `${this.pad()}{${comment ? ` // ${comment}` : ''}`;
    this.lines.push(line);
    this.level++;
  }

  endObject() {
    this.level--;
    this.lines.push(`${this.pad()}},`);
  }

  startArray(key: string, comment?: string) {
    this.lines.push(`${this.pad()}${key}: [${comment ? ` // ${comment}` : ''}`);
    this.level++;
  }

  endArray() {
    this.level--;
    this.lines.push(`${this.pad()}],`);
  }

  addComment(comment: string) {
    this.lines.push(`${this.pad()}//${comment}`);
  }

  addProperty(key: string, value: string | number | boolean, comment?: string) {
    let val: string | number | boolean;

    if (typeof value === 'string') {
      val = `"${value}"`;
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      val = value;
    } else {
      throw new Error('Unsupported value type');
    }

    this.lines.push(
      `${this.pad()}${key}: ${val},${comment ? ` // ${comment}` : ''}`
    );
  }

  addInlineObject(obj: Record<string, string>, comment?: string) {
    const entries = Object.entries(obj)
      .map(([k, v]) => `${k}: "${v}"`)
      .join(', ');
    this.lines.push(
      `${this.pad()}{ ${entries} },${comment ? ` // ${comment}` : ''}`
    );
  }

  newLine() {
    this.lines.push('');
  }

  build(): string {
    this.level--;
    this.lines.push(`}`);
    return this.lines.join('\n');
  }
}
