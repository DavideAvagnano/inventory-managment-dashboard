import { db } from "../../lib/db";
import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await db.users.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users" });
  }
};
