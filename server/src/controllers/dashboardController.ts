import { db } from "../../lib/db";
import { Request, Response } from "express";

export const getDashboardMetrics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const popularProducts = await db.products.findMany({
      take: 15,
      orderBy: {
        stockQuantity: "desc",
      },
    });

    const salesSummary = await db.salesSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });

    const purchaseSummary = await db.purchaseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });

    const expenseSummary = await db.expenseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });

    const expenseByCategorySummaryRaw = await db.expenseByCategory.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
      (item) => ({
        ...item,
        amount: item.amount.toString(),
      })
    );

    res.json({
      popularProducts,
      salesSummary,
      purchaseSummary,
      expenseSummary,
      expenseByCategorySummary,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving dashboard metrics" });
  }
};
