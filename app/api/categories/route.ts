// Import necessary modules
import slugify from 'slugify';
import * as schema from '@/db/schema';
import { db } from '@/db/turso';
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { desc } from 'drizzle-orm';

// Define a zod schema to validate the incoming request
const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

// POST route handler for creating a new category
export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body
    const body = await req.json();

    // Validate the request data using zod
    const validatedData = categorySchema.parse(body);

    // Generate the slug from the category name using slugify
    const slug = slugify(validatedData.name, { lower: true });

    // Insert the category into the database
    const insertedCategory = await db.insert(schema.categories).values({
      name: validatedData.name,
      slug,
    }).returning();

    // Respond with the newly created category
    return NextResponse.json({ success: true, category: insertedCategory });
  } catch (error) {
    // Handle validation errors and other exceptions
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }

    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

// GET route handler for fetching all categories 
export async function GET() {
  try {
    // Fetch all categories from the database
    const categories = await db.select().from(schema.categories).orderBy(desc(schema.categories.id));

    // Return the categories wrapped in an object
    return NextResponse.json({ success: true, categories });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
