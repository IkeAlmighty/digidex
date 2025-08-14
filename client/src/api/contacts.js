export async function addContact(contact) {
  return await fetch("/api/contacts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  });
}

export async function importContacts(newContacts) {
  const responses = [];
  for (let contact of newContacts) {
    responses.push(await addContact(contact));
  }

  return responses;
}

export async function deleteContact(id) {
  return await fetch(`/api/contacts/${id}`, { method: "DELETE" });
}

export async function updateContact(updatedData) {
  return await fetch(`/api/contacts/${updatedData._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
}

export async function getContacts() {
  return await fetch("/api/contacts");
}
