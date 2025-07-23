import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { folder: string } }
) {
  try {
    const { folder } = params;
    
    // Try multiple possible paths for better compatibility
    const possiblePaths = [
      path.join(process.cwd(), "public/videos", folder),
      path.join(process.cwd(), "public", "videos", folder),
      path.join("/app/public/videos", folder),
      path.join("/app/public", "videos", folder)
    ];
    
    let videosDir: string | null = null;
    let files: string[] = [];
    
    // Try each path until we find one that works
    for (const tryPath of possiblePaths) {
      try {
        await fs.access(tryPath);
        files = await fs.readdir(tryPath);
        videosDir = tryPath;
        console.log(`Successfully accessed directory: ${tryPath}`);
        break;
      } catch (error) {
        console.log(`Failed to access: ${tryPath}`);
        continue;
      }
    }
    
    if (!videosDir) {
      // Log diagnostic information
      console.error("Failed to find video directory for folder:", folder);
      console.error("Current working directory:", process.cwd());
      
      try {
        const publicDir = path.join(process.cwd(), "public");
        const publicContents = await fs.readdir(publicDir);
        console.error("Public directory contents:", publicContents);
      } catch (e) {
        console.error("Cannot read public directory");
      }
      
      throw new Error(`Video directory not found for folder: ${folder}`);
    }
    
    const videoFile = files.find(file => file.endsWith(".mp4"));
    const gridImage = files.find(file => file.includes("_grid_4xN.jpg"));
    const thumbImage = files.find(file => file.includes("_thumb.jpg"));
    const metadataFile = files.find(file => file.includes("_metadata.json"));
    const annotationsFile = files.find(file => file === "grid_annotations.json");

    let metadata = null;
    let annotations = null;

    if (metadataFile && videosDir) {
      const metadataPath = path.join(videosDir, metadataFile);
      const metadataContent = await fs.readFile(metadataPath, "utf-8");
      metadata = JSON.parse(metadataContent);
    }

    if (annotationsFile && videosDir) {
      const annotationsPath = path.join(videosDir, annotationsFile);
      const annotationsContent = await fs.readFile(annotationsPath, "utf-8");
      annotations = JSON.parse(annotationsContent);
    }

    return NextResponse.json({
      videoFile,
      gridImage,
      thumbImage,
      metadata,
      annotations,
    });
  } catch (error) {
    console.error("Error reading video files:", error);
    return NextResponse.json(
      { error: "Failed to read video files" },
      { status: 500 }
    );
  }
}