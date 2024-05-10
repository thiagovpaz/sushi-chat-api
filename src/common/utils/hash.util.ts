import * as bcryptjs from 'bcryptjs';

export class Hash {
  static generateHash(text: string) {
    return bcryptjs.hashSync(text);
  }

  static compare(text: string, hash: string) {
    return bcryptjs.compareSync(text, hash);
  }
}
