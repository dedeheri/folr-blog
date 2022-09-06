import api from "../../api/base";
import config from "../../api/config";

function user() {
  return api.get("api/v1/auth/user/", config.headerJSON);
}

export default { user };
