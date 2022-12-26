import React, { useEffect } from "react";

//import axios from "axios";
import { withServices } from "hocs/withServices";

const TwitterAuth = withServices(() => {
  useEffect(() => {
    (async () => {
      /*const instance = axios.create({
        baseURL: "http://localhost:3100",
      });
      const params = new URLSearchParams(location.search.replace("?", ""));
      const verifier = params.get("oauth_verifier");
     /* const credentials = await instance.get(
        `/twitterCallback?oauth_verifier=${verifier}`
      );*/
    })();
  }, []);

  return <div></div>;
});

export default TwitterAuth;
