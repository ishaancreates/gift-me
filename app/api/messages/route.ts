import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongo";
import { INITIAL_MESSAGES, BirthdayMessage } from "@/app/data/wishlist";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection<BirthdayMessage>("messages");

    let messages = await collection.find({}).sort({ _id: -1 }).toArray();

    // Seed database with default initial messages if empty
    if (messages.length === 0) {
      await collection.insertMany(INITIAL_MESSAGES as any);
      messages = await collection.find({}).sort({ _id: -1 }).toArray();
    }

    // Clean up MongoDB _id field for JSON serialization if needed
    const formattedMessages: BirthdayMessage[] = messages.map((doc) => ({
      id: doc.id || doc._id.toString(),
      name: doc.name,
      message: doc.message,
      timestamp: doc.timestamp || "Just now",
      rotation: doc.rotation ?? (Math.random() - 0.5) * 5,
    }));

    return NextResponse.json(formattedMessages);
  } catch (error) {
    console.error("Failed to fetch messages from MongoDB:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, message } = body;

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required" },
        { status: 400 }
      );
    }

    const newMessage: BirthdayMessage = {
      id: `msg-${Date.now()}`,
      name: name.trim(),
      message: message.trim(),
      timestamp: "Just now",
      rotation: (Math.random() - 0.5) * 5,
    };

    const { db } = await connectToDatabase();
    const collection = db.collection("messages");

    await collection.insertOne(newMessage);

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error("Failed to post message to MongoDB:", error);
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Message ID is required" },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const collection = db.collection("messages");

    await collection.deleteOne({ id: id });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete message from MongoDB:", error);
    return NextResponse.json(
      { error: "Failed to delete message" },
      { status: 500 }
    );
  }
}
