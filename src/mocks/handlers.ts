import { http, HttpResponse } from "msw";

// Mocking database
const users = [
  { username: "hello@edited.com", password: "hello123", allowed: true },
  { username: "user@example.com", password: "password123", allowed: true },
  { username: "a.yordanow67@gmail.com", password: "pass1234", allowed: true },
];

export const handlers = [
  http.post("/login", async ({ request }) => {
    const body = (await request.json()) as {
      username: string;
      password: string;
    };
    const { username, password } = body;

    const user = users.find(
      (user) => user.username === username && user.password === password,
    );

    if (!user) {
      return HttpResponse.json(
        { message: "Invalid credentials." },
        { status: 401 },
      );
    }

    return HttpResponse.json(
      { username: user.username, message: "Login successful" },
      { status: 200 },
    );
  }),
];
