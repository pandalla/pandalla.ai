import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const { path: filePath } = params;
    const fullPath = path.join(process.cwd(), "public/videos", ...filePath);

    if (!fs.existsSync(fullPath)) {
      return new NextResponse("File not found", { status: 404 });
    }

    const stat = fs.statSync(fullPath);
    if (!stat.isFile()) {
      return new NextResponse("Not a file", { status: 400 });
    }

    const ext = path.extname(fullPath).toLowerCase();
    
    let contentType = "application/octet-stream";
    
    switch (ext) {
      case ".mp4":
        contentType = "video/mp4";
        break;
      case ".jpg":
      case ".jpeg":
        contentType = "image/jpeg";
        break;
      case ".png":
        contentType = "image/png";
        break;
      case ".json":
        contentType = "application/json";
        break;
    }

    // Handle Range requests for video files (enables seeking)
    const range = request.headers.get("range");
    
    if (range && ext === ".mp4") {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
      const chunksize = (end - start) + 1;
      
      const fileStream = fs.createReadStream(fullPath, { start, end });
      const buffer = [];
      
      for await (const chunk of fileStream) {
        buffer.push(chunk);
      }
      
      const videoChunk = Buffer.concat(buffer);
      
      return new NextResponse(videoChunk, {
        status: 206,
        headers: {
          "Content-Range": `bytes ${start}-${end}/${stat.size}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunksize.toString(),
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000",
        },
      });
    }

    // Regular file serving
    const file = fs.readFileSync(fullPath);

    return new NextResponse(file, {
      headers: {
        "Content-Type": contentType,
        "Content-Length": stat.size.toString(),
        "Accept-Ranges": ext === ".mp4" ? "bytes" : "none",
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (error) {
    console.error("Error serving static file:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}