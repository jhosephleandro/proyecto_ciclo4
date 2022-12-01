import { isUndefined } from "util";
import axios from "axios";
import Cookies from "universal-cookie";
import app from "../../app.json";                 // Importamos el {APIHOST} para que este pueda ser utilizado en el componente de ¡¡¡helper!!!

const cookies = new Cookies();
const { APIHOST } = app;

export function calculaExtracionSesion() {
  const now = new Date().getTime();
  const newDate = now + 60 * 30 * 1000;
  return new Date(newDate);
}

export function getSession() {
  return isUndefined(cookies.get("_s")) ? false : cookies.get("_s");
}
function renovarSesion() {
  const sesion = getSession();
  if (!sesion) window.location.href = "/login";

  cookies.set("_s", sesion, {
    path: "/",
    expires: calculaExtracionSesion(),
  });
  return sesion;
}

export const request = {
  get: function (services) {
    let token = renovarSesion();
    return axios.get(`${APIHOST}${services}`,  {
      headers: {
        Authorization: `Bearer ${token}`,            // Aqui se toma el token de seguridad generado y se carga automaticamente en (Authorization) para dejar iniciada la sesión.
      },
    });
  },
  post: function (services, data) {
    let token = renovarSesion();
    return axios.post(`${APIHOST}${services}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,            // Aqui se toma el token de seguridad generado y se carga automaticamente en (Authorization) para dejar iniciada la sesión.
      },
    });
  },
  put: function(services, data) {
    let token = renovarSesion();
    return axios.put(`${APIHOST}${services}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  delete: function(services) {
    let token = renovarSesion();
    return axios.delete(`${APIHOST}${services}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  
};
