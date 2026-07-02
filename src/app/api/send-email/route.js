import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { emailId, firstName, lastName, applicationNumber, course, applicationFor } = await request.json();

    if (!emailId) {
      return NextResponse.json({ success: false, error: 'Email ID is required.' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not defined in environment variables.');
      return NextResponse.json({ success: false, error: 'Email service configuration missing.' }, { status: 500 });
    }

    const currentDate = new Date();
    const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}-${currentDate.toLocaleString('en-US', { month: 'short' })}-${currentDate.getFullYear()}`;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Badruka Admissions <admissions@gkeliteinfo.com>',
        to: [emailId],
        subject: `Application Submitted Successfully - ${applicationNumber}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
            <div style="background-color: #007bff; color: white; text-align: center; padding: 15px; border-radius: 6px 6px 0 0; font-size: 20px; font-weight: bold;">
              BADRUKA ADMISSIONS
            </div>
            <div style="padding: 20px; color: #334155; line-height: 1.6;">
              <p>Dear <strong>${firstName} ${lastName}</strong>,</p>
              <p>Thank you for submitting your application. We are pleased to inform you that your application has been received successfully.</p>
              
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 15px; margin: 20px 0;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 6px 0; font-weight: bold; color: #64748b; width: 40%;">Application Ref No:</td>
                    <td style="padding: 6px 0; font-weight: bold; color: #0f172a;">${applicationNumber}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: bold; color: #64748b;">Level of Study:</td>
                    <td style="padding: 6px 0; color: #334155;">${applicationFor}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: bold; color: #64748b;">Course / Branch:</td>
                    <td style="padding: 6px 0; color: #334155;">${course}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: bold; color: #64748b;">Submission Date:</td>
                    <td style="padding: 6px 0; color: #334155;">${formattedDate}</td>
                  </tr>
                </table>
              </div>

              <p><strong>Next Steps:</strong></p>
              <ol style="padding-left: 20px;">
                <li>Please use your <strong>Application Ref No</strong> to complete the registration fee payment if not already done.</li>
                <li>You can search for your application status using the "Pay / View" portal on our website.</li>
                <li>Our admissions team will review your submitted documents and get back to you shortly.</li>
              </ol>
              
              <p>If you have any questions or require support, please contact us at <a href="mailto:helpdesk@badruka.com" style="color: #007bff; text-decoration: none;">helpdesk@badruka.com</a>.</p>
              
              <p style="margin-top: 30px;">Best regards,<br/><strong>Admissions Office</strong><br/>GK Elite / Badruka Group</p>
            </div>
            <div style="text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; margin-top: 20px;">
              This is an automated notification. Please do not reply directly to this email.
            </div>
          </div>
        `
      }),
    });

    const resData = await response.json();
    if (!response.ok) {
      console.error('Resend API response error:', resData);
      return NextResponse.json({ success: false, error: resData.message || 'Error sending email via Resend' }, { status: response.status });
    }

    return NextResponse.json({ success: true, data: resData });
  } catch (error) {
    console.error('Send email route exception:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
