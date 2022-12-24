

import { UserData } from "store/models/user";

export type TwitterUser = {
  id: string;
  name: string;
  username: string
}

class Twitter {
  user: UserData;

  constructor(user: UserData) {
    this.user = user;
  }

  /*verify(oauth_token:string, oauth_verifier: string) {

    }*/
}

export default (user: UserData) => new Twitter(user);
export type { Twitter };
