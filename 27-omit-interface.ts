interface ParametersRequest {
  headers: string;
  body: string;
}

function handler(
  parameters: Omit<ParametersRequest, "body"> & { body: { name: string } }
) {
  console.log(parameters);
}

const evento = {
  headers: "authorization: bearer abcde",
  body: '{"name": "Alfredo"}',
};

console.log(evento);

const parameters = { headers: evento.headers, body: JSON.parse(evento.body) };

handler(parameters);
