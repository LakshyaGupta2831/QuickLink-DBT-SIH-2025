import connectdb from "./db.js";
import User from "../models/userModel.js";
import { config } from "dotenv";
config();

console.log("MONGO_URI from seed.js:", process.env.MONGO_URI);

await connectdb();

const dummyUserData = [
  {
    email: "sahil.22311046@viit.ac.in",
    password: "password123",
    state: "Maharashtra",
    category: "OBC",
    isSeeded: false,
    checkCount: 2,
    lastCheckedAt: "2025-11-10T10:20:00Z",
  },
  {
    email: "gupta.22311576@viit.ac.in",
    password: "password123",
    state: "Maharashtra",
    category: "OBC",
    isSeeded: true,
    checkCount: 2,
    lastCheckedAt: "2025-11-10T10:20:00Z",
  },
];

// const dummyUserData = [
//   {
//     email: "user1@example.com",
//     password: "password123",
//     state: "Uttar Pradesh",
//     category: "OBC",
//     isSeeded: true,
//     checkCount: 2,
//     lastCheckedAt: "2025-11-10T10:20:00Z",
//   },
//   {
//     email: "user2@example.com",
//     password: "password123",
//     state: "Madhya Pradesh",
//     category: "SC",
//     isSeeded: false,
//     checkCount: 1,
//     lastCheckedAt: "2025-11-08T09:00:00Z",
//   },
//   {
//     email: "user3@example.com",
//     password: "password123",
//     state: "Gujarat",
//     category: "General",
//     isSeeded: true,
//     checkCount: 4,
//     lastCheckedAt: "2025-11-14T14:12:00Z",
//   },
//   {
//     email: "user4@example.com",
//     password: "password123",
//     state: "Maharashtra",
//     category: "ST",
//     isSeeded: false,
//     checkCount: 3,
//     lastCheckedAt: "2025-11-12T16:45:00Z",
//   },
//   {
//     email: "user5@example.com",
//     password: "password123",
//     state: "Rajasthan",
//     category: "OBC",
//     isSeeded: true,
//     checkCount: 5,
//     lastCheckedAt: "2025-11-09T11:30:00Z",
//   },
//   {
//     email: "user6@example.com",
//     password: "password123",
//     state: "Uttar Pradesh",
//     category: "General",
//     isSeeded: false,
//     checkCount: 0,
//     lastCheckedAt: "2025-11-13T08:22:00Z",
//   },
//   {
//     email: "user7@example.com",
//     password: "password123",
//     state: "Madhya Pradesh",
//     category: "ST",
//     isSeeded: true,
//     checkCount: 2,
//     lastCheckedAt: "2025-11-10T12:50:00Z",
//   },
//   {
//     email: "user8@example.com",
//     password: "password123",
//     state: "Gujarat",
//     category: "SC",
//     isSeeded: false,
//     checkCount: 1,
//     lastCheckedAt: "2025-11-05T17:10:00Z",
//   },
//   {
//     email: "user9@example.com",
//     password: "password123",
//     state: "Maharashtra",
//     category: "OBC",
//     isSeeded: true,
//     checkCount: 3,
//     lastCheckedAt: "2025-11-16T19:40:00Z",
//   },
//   {
//     email: "user10@example.com",
//     password: "password123",
//     state: "Rajasthan",
//     category: "General",
//     isSeeded: true,
//     checkCount: 2,
//     lastCheckedAt: "2025-11-15T13:14:00Z",
//   },
//   {
//     email: "user11@example.com",
//     password: "password123",
//     state: "Uttar Pradesh",
//     category: "SC",
//     isSeeded: false,
//     checkCount: 0,
//     lastCheckedAt: "2025-11-09T08:10:00Z",
//   },
//   {
//     email: "user12@example.com",
//     password: "password123",
//     state: "Madhya Pradesh",
//     category: "General",
//     isSeeded: true,
//     checkCount: 4,
//     lastCheckedAt: "2025-11-14T10:18:00Z",
//   },
//   {
//     email: "user13@example.com",
//     password: "password123",
//     state: "Gujarat",
//     category: "ST",
//     isSeeded: false,
//     checkCount: 1,
//     lastCheckedAt: "2025-11-11T11:40:00Z",
//   },
//   {
//     email: "user14@example.com",
//     password: "password123",
//     state: "Maharashtra",
//     category: "SC",
//     isSeeded: true,
//     checkCount: 5,
//     lastCheckedAt: "2025-11-13T12:12:00Z",
//   },
//   {
//     email: "user15@example.com",
//     password: "password123",
//     state: "Rajasthan",
//     category: "OBC",
//     isSeeded: false,
//     checkCount: 3,
//     lastCheckedAt: "2025-11-07T09:25:00Z",
//   },
//   {
//     email: "user16@example.com",
//     password: "password123",
//     state: "Uttar Pradesh",
//     category: "ST",
//     isSeeded: true,
//     checkCount: 2,
//     lastCheckedAt: "2025-11-06T14:50:00Z",
//   },
//   {
//     email: "user17@example.com",
//     password: "password123",
//     state: "Madhya Pradesh",
//     category: "OBC",
//     isSeeded: false,
//     checkCount: 1,
//     lastCheckedAt: "2025-11-04T16:40:00Z",
//   },
//   {
//     email: "user18@example.com",
//     password: "password123",
//     state: "Gujarat",
//     category: "General",
//     isSeeded: true,
//     checkCount: 4,
//     lastCheckedAt: "2025-11-12T13:33:00Z",
//   },
//   {
//     email: "user19@example.com",
//     password: "password123",
//     state: "Maharashtra",
//     category: "General",
//     isSeeded: false,
//     checkCount: 0,
//     lastCheckedAt: "2025-11-09T10:40:00Z",
//   },
//   {
//     email: "user20@example.com",
//     password: "password123",
//     state: "Rajasthan",
//     category: "SC",
//     isSeeded: true,
//     checkCount: 3,
//     lastCheckedAt: "2025-11-11T18:20:00Z",
//   },
// ];

const addUserData = async () => {
  try {
    const inserted = await User.insertMany(dummyUserData);
    console.log(`✅ ${inserted.length} data entries added successfully.`);
  } catch (error) {
    console.log("❌ Error adding data:", error);
  }
};

// Delete all data
const deleteUserData = async () => {
  try {
    await User.deleteMany({});
    console.log("✅ All data deleted successfully.");
  } catch (error) {
    console.error("❌ Error deleting mapped data:", error);
  }
};

// Example runner
const run = async () => {
  await addUserData();
  // await deleteUserData();
  process.exit(0); // Exit process once done
};

run();
