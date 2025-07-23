import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string; idx: string } }
) {
  try {
    const { type, idx } = params;
    
    // Validate type
    if (!['math', 'code'].includes(type)) {
      return NextResponse.json(
        { error: "Invalid type. Must be 'math' or 'code'" },
        { status: 400 }
      );
    }

    // Validate idx
    const targetIdx = parseInt(idx);
    if (isNaN(targetIdx)) {
      return NextResponse.json(
        { error: "Invalid index. Must be a number" },
        { status: 400 }
      );
    }

    // Try multiple possible paths for better compatibility
    const possiblePaths = [
      path.join(process.cwd(), "public/text_data", `${type}_sample.jsonl`),
      path.join(process.cwd(), "public", "text_data", `${type}_sample.jsonl`),
      path.join("/app/public/text_data", `${type}_sample.jsonl`),
      path.join("/app/public", "text_data", `${type}_sample.jsonl`)
    ];
    
    let filePath: string | null = null;
    
    // Try each path until we find one that works
    for (const tryPath of possiblePaths) {
      try {
        await fs.access(tryPath);
        filePath = tryPath;
        console.log(`Successfully accessed file: ${tryPath}`);
        break;
      } catch (error) {
        console.log(`Failed to access: ${tryPath}`);
        continue;
      }
    }
    
    if (!filePath) {
      console.error("Failed to find text data file for type:", type);
      return NextResponse.json(
        { error: `Text data file not found for type: ${type}` },
        { status: 404 }
      );
    }

    const fileContent = await fs.readFile(filePath, "utf-8");
    const lines = fileContent.trim().split('\n').filter(line => line.trim());
    
    // Find the item with matching idx
    let foundItem = null;
    for (const line of lines) {
      try {
        const item = JSON.parse(line);
        if (item.idx === targetIdx) {
          foundItem = item;
          break;
        }
      } catch (error) {
        console.error("Failed to parse line:", line);
        continue;
      }
    }

    if (!foundItem) {
      return NextResponse.json(
        { error: `Item with index ${targetIdx} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(foundItem);
  } catch (error) {
    console.error("Error reading text file:", error);
    return NextResponse.json(
      { error: "Failed to read text file" },
      { status: 500 }
    );
  }
}