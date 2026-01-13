import { type InsertSubscriber, type Subscriber } from "@shared/schema";

export interface IStorage {
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
}

export class MemoryStorage implements IStorage {
  private subscribers: Subscriber[] = [];
  private nextId = 1;

  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const subscriber: Subscriber = {
      id: this.nextId++,
      email: insertSubscriber.email,
      createdAt: new Date(),
    };
    this.subscribers.push(subscriber);
    return subscriber;
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    return this.subscribers.find(s => s.email === email);
  }
}

export class DatabaseStorage implements IStorage {
  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    // Lazy import to avoid loading db module when not needed
    const { db } = await import("./db");
    const { subscribers } = await import("@shared/schema");
    const [subscriber] = await db
      .insert(subscribers)
      .values(insertSubscriber)
      .returning();
    return subscriber;
  }

  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    const { db } = await import("./db");
    const { subscribers } = await import("@shared/schema");
    const { eq } = await import("drizzle-orm");
    const [subscriber] = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.email, email));
    return subscriber;
  }
}

// Use in-memory storage if no DATABASE_URL is set
export const storage = process.env.DATABASE_URL 
  ? new DatabaseStorage() 
  : new MemoryStorage();
