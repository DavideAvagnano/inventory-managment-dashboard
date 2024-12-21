import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

// Create a Prisma client instance to interact with the database
const prisma = new PrismaClient();

/**
 * Function to delete all data from the specified tables.
 * @param orderedFileNames - Array of JSON file names determining the tables to clear.
 *
 * 1. For each file, the corresponding Prisma model name is derived.
 * 2. Uses the model name to access the Prisma client and clear the associated table using deleteMany().
 * 3. Logs errors if a model is not found.
 */
async function deleteAllData(orderedFileNames: string[]) {
  const modelNames = orderedFileNames.map((fileName) => {
    const modelName = path.basename(fileName, path.extname(fileName));
    return modelName.charAt(0).toUpperCase() + modelName.slice(1);
  });

  for (const modelName of modelNames) {
    const model: any = prisma[modelName as keyof typeof prisma];
    if (model) {
      await model.deleteMany({});
      console.log(`Cleared data from ${modelName}`);
    } else {
      console.error(
        `Model ${modelName} not found. Please ensure the model name is correctly specified.`
      );
    }
  }
}

/**
 * Main function to seed data into the database.
 *
 * 1. Defines the path to the seedData folder containing the JSON files.
 * 2. Specifies the order of JSON files to process.
 * 3. Calls deleteAllData() to clear database tables.
 * 4. For each JSON file:
 *    - Reads data from the file.
 *    - Determines the corresponding Prisma model.
 *    - Inserts data into the database using the create() method.
 */
async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  // Ordered list of JSON files to process
  const orderedFileNames = [
    "products.json",
    "expenseSummary.json",
    "sales.json",
    "salesSummary.json",
    "purchases.json",
    "purchaseSummary.json",
    "users.json",
    "expenses.json",
    "expenseByCategory.json",
  ];

  // Step 1: Clear database tables
  await deleteAllData(orderedFileNames);

  // Step 2: Insert data into the database
  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const modelName = path.basename(fileName, path.extname(fileName));
    const model: any = prisma[modelName as keyof typeof prisma];

    if (!model) {
      console.error(`No Prisma model matches the file name: ${fileName}`);
      continue;
    }

    for (const data of jsonData) {
      await model.create({
        data,
      });
    }

    console.log(`Seeded ${modelName} with data from ${fileName}`);
  }
}

// Start the main script and handle errors
main()
  .catch((e) => {
    console.error(e); // Log any errors during execution
  })
  .finally(async () => {
    await prisma.$disconnect(); // Close the Prisma connection
  });
