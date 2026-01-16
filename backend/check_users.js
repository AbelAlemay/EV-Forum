import dbConnection from "./src/config/db.js";

async function checkUsers() {
  try {
    const [rows] = await dbConnection.execute("SELECT * FROM users");
    console.log("Users count:", rows.length);
    if (rows.length > 0) {
      console.log("First user:", rows[0]);
    } else {
      console.log("No users found.");
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
    process.exit();
  }
}

checkUsers();
