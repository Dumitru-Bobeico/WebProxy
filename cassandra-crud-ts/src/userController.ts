import { cassandraClient } from "./cassandraClient";
import { v4 as uuidv4 } from "uuid";
import { User } from "./types";

// CREATE
export async function createUser(name: string, email: string) {
  const id = uuidv4();
  await cassandraClient.execute(
    "INSERT INTO users (id, name, email) VALUES (?, ?, ?)",
    [id, name, email],
    { prepare: true }
  );
  return { id, name, email };
}

// READ ALL
export async function getUsers(): Promise<User[]> {
  const result = await cassandraClient.execute("SELECT * FROM users");
  return result.rows.map((row) => ({
    id: row.id.toString(),
    name: row.name,
    email: row.email,
  }));
}

// UPDATE
export async function updateUser(id: string, name: string, email: string) {
  await cassandraClient.execute(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    [name, email, id],
    { prepare: true }
  );
  return { id, name, email };
}

// DELETE
export async function deleteUser(id: string) {
  await cassandraClient.execute("DELETE FROM users WHERE id = ?", [id], {
    prepare: true,
  });
  return { message: "User deleted" };
}
