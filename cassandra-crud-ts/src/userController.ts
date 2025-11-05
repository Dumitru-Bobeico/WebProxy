import { cassandraClient } from "./cassandraClient";
import { redisClient } from "./redisClient";
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

  // Invalidate cache
  await redisClient.del("users:all");

  return { id, name, email };
}

// READ ALL with caching
export async function getUsers(): Promise<User[]> {
  const cacheKey = "users:all";

  // Try fetching from Redis
  const cached = await redisClient.get(cacheKey);
  if (cached) {
    console.log("Cache hit");
    return JSON.parse(cached);
  }

  console.log("Cache miss, querying Cassandra");
  const result = await cassandraClient.execute("SELECT * FROM users");
  const users = result.rows.map((row) => ({
    id: row.id.toString(),
    name: row.name,
    email: row.email,
  }));

  // Cache for 10 seconds
  await redisClient.setEx(cacheKey, 60, JSON.stringify(users));

  return users;
}

// UPDATE
export async function updateUser(id: string, name: string, email: string) {
  await cassandraClient.execute(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    [name, email, id],
    { prepare: true }
  );

  // Invalidate cache
  await redisClient.del("users:all");

  return { id, name, email };
}

// DELETE
export async function deleteUser(id: string) {
  await cassandraClient.execute("DELETE FROM users WHERE id = ?", [id], {
    prepare: true,
  });

  // Invalidate cache
  await redisClient.del("users:all");

  return { message: "User deleted" };
}
