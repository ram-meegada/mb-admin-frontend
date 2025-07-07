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
    const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUxOTU2NDIyLCJpYXQiOjE3NTE4NzAwMjIsImp0aSI6IjhlN2IwMDY5ODkwZjQwNzhiOWNlNjA5MmNjNGY0MjhiIiwidXNlcl9pZCI6M30.4FFAAXQe6vWtSovNlKfE1udMlOWUiElu8HSz9Ny1mPk";
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
    } else {
      onFailure(json_response?.message || "Error not handled")
    }

  } catch (err) {
    onFailure(String(err))
  }
};

export default APICall;
