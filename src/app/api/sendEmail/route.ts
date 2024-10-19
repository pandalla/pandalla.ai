import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Excel from 'exceljs';

export async function POST(req: Request) {
  const { name, email, company, job, message } = await req.json();

  let transporter = nodemailer.createTransport({
    host: "smtp.feishu.cn",
    port: 465,
    secure: true,
    auth: {
      user: "noreply@pandalla.ai",
      pass: "kKgS3tNReRTL3RQC"
    },
  });

  // 创建 Excel 文件
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');

  worksheet.columns = [
    { header: 'Key', key: 'key', width: 15 },
    { header: 'Value', key: 'value', width: 30 }
  ];

  worksheet.addRows([
    { key: 'Name', value: name },
    { key: 'Email', value: email },
    { key: 'Company', value: company },
    { key: 'Job Title', value: job },
    { key: 'Message', value: message }
  ]);

  // 生成文件名
  const currentDate = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `${company}_${job}_${name}_${email}_${currentDate}.xlsx`;

  // 将 Excel 文件转换为 Buffer
  const buffer = await workbook.xlsx.writeBuffer();

  try {
    await transporter.sendMail({
      from: '"Pandalla.AI" <noreply@pandalla.ai>',
      to: "jiaxicui446@gmail.com",
      subject: `New Synthetic Data Inquiry from ${name} at ${company} via Pandalla.ai`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; font-size: 16px;">
          <h1 style="color: #4a4a4a; border-bottom: 2px solid #4a4a4a; padding-bottom: 10px;">New Synthetic Data Inquiry from Pandalla.ai</h1>
          <p style="color: #666;">A new inquiry about synthetic data has been received through Pandalla.ai. Details are as follows:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <th style="text-align: left; padding: 12px; background-color: #f0f0f0; border: 1px solid #ddd; font-size: 18px;">Name:</th>
              <td style="padding: 12px; border: 1px solid #ddd; font-size: 18px;">${name}</td>
            </tr>
            <tr>
              <th style="text-align: left; padding: 12px; background-color: #f0f0f0; border: 1px solid #ddd; font-size: 18px;">Email:</th>
              <td style="padding: 12px; border: 1px solid #ddd; font-size: 18px;">${email}</td>
            </tr>
            <tr>
              <th style="text-align: left; padding: 12px; background-color: #f0f0f0; border: 1px solid #ddd; font-size: 18px;">Company:</th>
              <td style="padding: 12px; border: 1px solid #ddd; font-size: 18px;">${company}</td>
            </tr>
            <tr>
              <th style="text-align: left; padding: 12px; background-color: #f0f0f0; border: 1px solid #ddd; font-size: 18px;">Job Title:</th>
              <td style="padding: 12px; border: 1px solid #ddd; font-size: 18px;">${job || 'Not provided'}</td>
            </tr>
            <tr>
              <th style="text-align: left; padding: 12px; background-color: #f0f0f0; border: 1px solid #ddd; font-size: 18px;">Message:</th>
              <td style="padding: 12px; border: 1px solid #ddd; font-size: 18px;">${message}</td>
            </tr>
          </table>
          <p style="color: #666; margin-top: 20px; font-size: 18px;">Please respond to this synthetic data inquiry as soon as possible.</p>
        </div>
      `,
      attachments: [
        {
          filename: fileName,
          content: buffer,
          contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
      ]
    });

    return NextResponse.json({ message: 'Email sent successfully', timeout: 3000 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to send email', timeout: 3000 }, { status: 500 });
  }
}