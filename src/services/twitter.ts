type TwitterUser = {
  id: number;
  name: string;
  username: string;
};

class Twitter {
  user: TwitterUser;

  constructor(user: TwitterUser) {
    this.user = user;
  }

  /*verify(oauth_token:string, oauth_verifier: string) {

    }*/
}

export default (user: TwitterUser) => new Twitter(user);
export type { Twitter };
