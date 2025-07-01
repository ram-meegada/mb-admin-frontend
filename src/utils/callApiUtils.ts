import { useNavigate } from "react-router-dom";


type Props = {
  method: string;
  Accept: string;
  endPoint: string;
  contentType?: string;
  formData?: any;
  showToast?: boolean;
};

const APICall = async ({
  method,
  Accept,
  endPoint,
  contentType,
  formData,
  showToast,
}: Props) => {
  try {
    const navigate = useNavigate();
    const BEARER_TOKEN = "";

    let json_response = null;
    const options: any = {
      method: method,
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
      navigate("Login");
    } else if (response.status === 400) {

    } else if ([200, 201].includes(response.status)) {
      if (showToast) {
      }
    } else if (response.status === 500) {

    } else {
    }
    return json_response.data;
  } catch (err) {
    return null;
  }
};

export default APICall;
