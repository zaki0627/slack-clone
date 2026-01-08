export class User {
  id!: string;
  name!: string;
  email!: string;
  thumnaiUrl?: string;
  constructor(data: User) {
    Object.assign(this, data);
  }
}
