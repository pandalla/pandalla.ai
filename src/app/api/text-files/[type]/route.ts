import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  try {
    const { type } = params;
    
    // Validate type
    if (!['math', 'code'].includes(type)) {
      return NextResponse.json(
        { error: "Invalid type. Must be 'math' or 'code'" },
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
      console.error("Current working directory:", process.cwd());
      
      return NextResponse.json(
        { error: `Text data file not found for type: ${type}` },
        { status: 404 }
      );
    }

    const fileContent = await fs.readFile(filePath, "utf-8");
    const lines = fileContent.trim().split('\n').filter(line => line.trim());
    
    // Parse each line as JSON
    const allData = lines.map(line => {
      try {
        return JSON.parse(line);
      } catch (error) {
        console.error("Failed to parse line:", line);
        return null;
      }
    }).filter(item => item !== null);

    // Get pagination parameters
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    // Paginate data
    const paginatedData = allData.slice(offset, offset + limit);
    
    return NextResponse.json({
      data: paginatedData,
      pagination: {
        page,
        limit,
        total: allData.length,
        totalPages: Math.ceil(allData.length / limit),
        hasNext: offset + limit < allData.length,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error("Error reading text files:", error);
    return NextResponse.json(
      { error: "Failed to read text files" },
      { status: 500 }
    );
  }
}