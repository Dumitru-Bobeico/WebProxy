import { Client } from "cassandra-driver";
import dotenv from "dotenv";

dotenv.config();

export const cassandraClient = new Client({
  contactPoints: [process.env.CASSANDRA_HOST || "127.0.0.1"],
  localDataCenter: "datacenter1",
});

// Updated connect function
export async function connectCassandra() {
  await cassandraClient.connect();
  console.log("Connected to Cassandra");

  // Initialize keyspace if it doesn't exist
  await cassandraClient.execute(`
    CREATE KEYSPACE IF NOT EXISTS userdb
    WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
  `);

  // Switch to the keyspace
  cassandraClient.keyspace = "userdb";

  // Initialize users table if it doesn't exist
  await cassandraClient.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY,
      name text,
      email text
    );
  `);

  console.log("✅ Keyspace and table ensured");
}
