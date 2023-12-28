import * as bcrypt from 'bcrypt';

export function hash(data: string): string {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(data, salt);
}

export function compare(raw: string, hash: string): boolean {
  return bcrypt.compareSync(raw, hash);
}
