import * as schema from '@/db/schema';
import { db } from '@/db/turso';
import { desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
      const categories = await db.select().from(schema.categories).orderBy(desc(schema.categories.id));
  
      return NextResponse.json({ success: true, categories });
    } catch (error) {
      return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
  }