export class Workspace {
  id!: string;
  name!: string;
  constructor(data: Workspace) {
    Object.assign(this, data);
  }
}
