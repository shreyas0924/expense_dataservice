import { z } from 'zod';

export const ExpenseSchema = z.object({
    amount: z.string().optional().describe("Expense made on the transaction"),
    merchant: z.string().optional().describe("Merchant name whom the transaction has been made"),
    currency: z.string().optional().describe("Currency of the transaction"),
});

export type Expense = z.infer<typeof ExpenseSchema>;

export class ExpenseClass {
    amount?: string;
    merchant?: string;
    currency?: string;

    constructor(data: Partial<Expense>) {
        this.amount = data.amount;
        this.merchant = data.merchant;
        this.currency = data.currency;
    }

    serialize() {
        return {
            amount: this.amount,
            merchant: this.merchant,
            currency: this.currency,
        };
    }
}
