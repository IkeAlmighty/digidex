export async function login(email, password) {
  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return response;
}

export async function logout() {
  const response = await fetch("/api/users/logout", {
    method: "POST",
  });

  return response;
}

export async function me() {
  return await fetch("/api/users/me");
}

export async function signup(username, email, password) {
  return await fetch("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });
}
