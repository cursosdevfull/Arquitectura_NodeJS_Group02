interface Express {
  send(): void;
}

interface Express {
  json(): void;
}

const express: Express = {
  send() {
    return "send()";
  },
  json() {
    return "json()";
  },
};
