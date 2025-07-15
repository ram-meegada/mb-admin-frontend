type Props = {
  method: string;
  Accept: string;
  endPoint: string;
  onFailure: (message: string) => void;
  navigate: (path: string) => void;
  contentType?: string;
  formData?: any;
};

const APICall = async ({
  method,
  Accept,
  endPoint,
  onFailure,
  navigate,
  contentType,
  formData,
}: Props) => {
  try {
    const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUyNjgxNDAyLCJpYXQiOjE3NTI1OTUwMDIsImp0aSI6ImVhMDMzZWUxZDU1YTQxMzBiMzE1MGNkNjBiM2NhNWE3IiwidXNlcl9pZCI6M30.Q4WeOzwmuNpDqZy4Ekebfpg36OihIY_zK4EoOMdiqXg";
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
      navigate("/");
    } else if (response.status === 400) {
      onFailure(json_response?.message || "Something went wrong")
    } else if ([200, 201].includes(response.status)) {
      return json_response.data
    } else if (response.status === 500) {
      onFailure(json_response?.message || "Internal server error")
    } else if (response.status === 405) {
      onFailure(json_response?.detail)
    } else {
      onFailure(json_response?.message || "Error not handled")
    }

  } catch (err) {
    onFailure(String(err))
  }
};

export default APICall;
