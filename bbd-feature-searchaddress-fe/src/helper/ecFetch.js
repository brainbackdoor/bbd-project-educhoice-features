// TODO: 추후 설정 필요
// const url = __DEV__
//   ? "http://localhost:8000/test"
//   : "http://localhost:8000/test2";

const getParams = method => ({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  method
});

const ecFetch = (url, method, obj) => {
  const body = JSON.stringify(obj);
  const params = Object.assign({}, getParams(method), { body });

  return fetch(url, params)
    .then(rawResponse => rawResponse.json())
    .then(response => {
      if (response.errors) throw new Error(response.errors[0].message);
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export default ecFetch;
