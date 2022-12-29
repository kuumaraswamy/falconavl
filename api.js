import axios from "axios";
const apiAuth = axios.create({
  baseURL: "https://demo.darsa.ai"
});

const requestHandler = async (request) => {
  let token = "dfb837d130f7be4990846b6e2ab8d7a18c87de5a";
  request.headers["Authorization"] = "Token " + token;
  return request;
};

apiAuth.interceptors.request.use(async (request) => requestHandler(request));

export default apiAuth;

//     apiAuth.get("/api/facility/").then((res) => {​​
//      console.log(res.data);
//    }​​);
