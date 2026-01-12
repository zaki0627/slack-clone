import { WorkspaceUser } from "../../workspace-users/workspace-user.entity";

export class User {
  id!: string;
  name!: string;
  email!: string;
  thumnaiUrl?: string;
  workspaceUsers?: WorkspaceUser[];
  constructor(data: User) {
    Object.assign(this, data);
    this.workspaceUsers = data.workspaceUsers?.map(
      (worksopaceUser) => new WorkspaceUser(worksopaceUser)
    );
  }

  get iconUrl() {
    return (
      this.thumnaiUrl ||
      "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
    );
  }
}
