import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { emailId, formType, draftId, resumeUrl } = await request.json();

    if (!emailId || !draftId) {
      return NextResponse.json({ success: false, error: 'Email ID and Draft ID are required.' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not defined in environment variables.');
      return NextResponse.json({ success: false, error: 'Email service configuration missing.' }, { status: 500 });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Badruka Admissions <admissions@gkeliteinfo.com>',
        to: [emailId],
        subject: `Resume your Application - Badruka Admissions`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
            <div style="background-color: #007bff; color: white; text-align: center; padding: 15px; border-radius: 6px 6px 0 0; font-size: 20px; font-weight: bold;">
              BADRUKA ADMISSIONS
            </div>
            <div style="padding: 20px; color: #334155; line-height: 1.6;">
              <p>Dear Applicant,</p>
              <p>You have successfully saved your <strong>${formType.replace('_', ' ')}</strong> application as a draft.</p>
              
              <p>You can resume your application at any time using the link below:</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resumeUrl}" style="background-color: #28a745; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">Resume Application</a>
              </div>

              <p>If the button above does not work, you can copy and paste the following link into your browser:</p>
              <p style="word-break: break-all; color: #007bff;">
                <a href="${resumeUrl}">${resumeUrl}</a>
              </p>
              
              <p><strong>Note:</strong> Any files (like Profile Image or Certificates) you selected previously were not saved in the draft. You will need to upload them again when you submit the final application.</p>
              
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
    console.error('Send draft email route exception:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
