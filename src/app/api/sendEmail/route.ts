import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  // 创建一个 nodemailer transporter
  let transporter = nodemailer.createTransport({
    host: "smtp.feishu.cn",
    port: 465,
    secure: true, // 使用 SSL
    auth: {
      user: "noreply@pandalla.ai", // 替换为您的飞书邮箱
      pass: "kKgS3tNReRTL3RQC" // 您的 IMAP/SMTP 密码
    },
  });

  try {
    // 发送邮件
    await transporter.sendMail({
      from: '"您的网站" <noreply@pandalla.ai>', // 替换为您的飞书邮箱
      to: "jiaxicui446@gmail.com", // 替换为接收者的邮箱
      subject: `来自 ${name} 的新消息`,
      text: `
        姓名: ${name}
        邮箱: ${email}
        消息: ${message}
      `,
    });

    return NextResponse.json({ message: '邮件发送成功' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: '邮件发送失败' }, { status: 500 });
  }
}