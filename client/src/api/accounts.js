export async function login(email, password) {
  const response = await fetch("/api/accounts/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return await response;
}

export async function logout() {
  const response = await fetch("/api/accounts/logout", {
    method: "POST",
  });

  return await response;
}

export async function me() {
  const response = await fetch("/api/accounts/me");

  return await response;
}
