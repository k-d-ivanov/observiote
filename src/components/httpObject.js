import axios from "axios"

let path = ""
if (process.env.NODE_ENV === "production") {
  path = "http://192.168.0.100:8285"
} else {
  path = "http://localhost:8282"
}

export const HTTP = axios.create({
  baseURL: path,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json"
  }
})
// console.log(process.env.NODE_ENV);

/*
http://192.168.0.100:8282/iotpp/rest/user_service
<GetUsersRequest>
    <authValue> c373e03679e0d1a79a946b0ed81690b8366ea9f037c569506303aed56a0cbebb</authValue>
    <!-- <userId>?</userId> optional -->
</GetUsersRequest>

http://192.168.0.100:8282/iotpp/rest/device_service
<GetDevicesRequest>
    <authValue> c373e03679e0d1a79a946b0ed81690b8366ea9f037c569506303aed56a0cbebb</authValue>
    <!-- <deviceId>?</deviceId> optional -->
</GetDevicesRequest>

http://192.168.0.100:8282/iotpp/rest/auth_service
<AuthorizeRequest>
    <username>stlevkov</username>
    <password>c373e01a79a946b0edhnioutr34ijuo34truni4r3j81690b836cbebb</password>
</AuthorizeRequest>
*/
