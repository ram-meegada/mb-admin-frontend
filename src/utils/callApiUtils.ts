import { REFRESH_TOKEN_ENDPOINT } from "./endpoints";

type Props = {
  method: string;
  Accept: string;
  endPoint: string;
  onFailure: (message: string) => void;
  navigate: (path: string) => void;
  contentType?: string;
  formData?: any;
  accessToken: string | null;
  setAccessToken: (token: string) => void
};

const APICall = async ({
  method,
  Accept,
  endPoint,
  onFailure,
  navigate,
  contentType,
  formData,
  accessToken,
  setAccessToken
}: Props) => {
  try {

    const BEARER_TOKEN = accessToken;

    let json_response = null;
    const options: any = {
      method: method,
      credentials: "include",
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        Accept: Accept,
      },
    };

    if (formData) {
      options.body = JSON.stringify(formData);
    }

    if (contentType) {
      options.headers["Content-Type"] = contentType;
    }
    
    const response = await fetch(endPoint, options);    
    json_response = await response.json();

    if (response.status === 401) {
      const refresh_response = await handleRefreshToken()

      if (refresh_response[0] == 401) {
        navigate("/");
        return
      }
      else if (refresh_response[0] === 200) {
        setAccessToken(refresh_response[1])
        return await APICall({
            method,
            Accept,
            endPoint,
            onFailure,
            navigate,
            contentType,
            formData,
            accessToken: refresh_response[1],
            setAccessToken
          })
      }
      else {
        onFailure("Something went wrong")
        return {status: 500}
      }
    } else if (response.status === 400) {
      onFailure(json_response?.message || "Something went wrong")
      return {status: 400}
    } else if ([200, 201].includes(response.status)) {
      const res = {...json_response, status: response.status}
      return res
    } else if (response.status === 500) {
      onFailure(json_response?.message || "Internal server error")
      return {status: 500}
    } else if (response.status === 405) {
      onFailure(json_response?.detail)
      return {status: 405}
    } else {
      onFailure(json_response?.message || "Error not handled")
      return {status: 500}
    }

  } catch (err) {
    onFailure(String(err))
    return {status: 500}
  }
};


const handleRefreshToken = async () => {
  const response = await fetch(REFRESH_TOKEN_ENDPOINT, {
    method: "POST",
    credentials: 'include'
  })

  if (response.ok) {
    const api_reponse = await response.json()    
    return [200, api_reponse.access]
  }
  else {
    return [401, ]
  }

}

export default APICall;
