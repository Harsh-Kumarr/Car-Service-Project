// ============================================
// Shared wrapper for all email templates
// ============================================
const emailWrapper = (content) => `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>AutoAI</title>
</head>
<body style="margin:0; padding:0; background-color:#f0f2f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; -webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f2f5; padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px; width:100%; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.06);">
          
          <!-- HEADER -->
          <tr>
            <td style="background: linear-gradient(135deg, #0A0F1C 0%, #1e293b 100%); padding:32px 40px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:24px; font-weight:800; letter-spacing:-0.5px;">
                AutoAI
              </h1>
              <p style="margin:6px 0 0; color:#94a3b8; font-size:13px; font-weight:500;">
                Smart Automotive Care
              </p>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td style="padding:40px;">
              ${content}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:24px 40px; background-color:#f8fafc; border-top:1px solid #e2e8f0; text-align:center;">
              <p style="margin:0 0 6px; color:#64748b; font-size:12px;">
                This is an automated email from AutoAI. Please do not reply.
              </p>
              <p style="margin:0; color:#94a3b8; font-size:11px;">
                &copy; ${new Date().getFullYear()} AutoAI &mdash; Punjab, India
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// ============================================
// OTP Verification Email
// ============================================
export const otpTemplate = (otp) =>
  emailWrapper(`
    <h2 style="margin:0 0 8px; color:#0f172a; font-size:22px; font-weight:700;">
      Verify Your Email
    </h2>
    <p style="margin:0 0 24px; color:#64748b; font-size:15px; line-height:1.6;">
      Hello, use the verification code below to complete your sign-up. This code expires in <strong>10 minutes</strong>.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <div style="display:inline-block; background-color:#0f172a; color:#ffffff; font-size:32px; font-weight:800; letter-spacing:8px; padding:18px 40px; border-radius:12px;">
            ${otp}
          </div>
        </td>
      </tr>
    </table>

    <p style="margin:24px 0 0; color:#94a3b8; font-size:13px; line-height:1.5;">
      If you did not create an account, no further action is required. You can safely ignore this email.
    </p>
  `);

// ============================================
// Booking Accepted Email
// ============================================
export const bookingAcceptedTemplate = (name) =>
  emailWrapper(`
    <h2 style="margin:0 0 8px; color:#0f172a; font-size:22px; font-weight:700;">
      Booking Confirmed
    </h2>
    <p style="margin:0 0 24px; color:#64748b; font-size:15px; line-height:1.6;">
      Hello <strong>${name}</strong>, great news! Your service booking has been accepted by our team.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="background-color:#f0fdf4; border:1px solid #bbf7d0; border-radius:12px; padding:20px; text-align:center;">
          <p style="margin:0; color:#16a34a; font-size:16px; font-weight:700;">
            Status: Accepted
          </p>
          <p style="margin:8px 0 0; color:#4ade80; font-size:13px;">
            A mechanic will be assigned shortly.
          </p>
        </td>
      </tr>
    </table>

    <p style="margin:24px 0 0; color:#64748b; font-size:14px; line-height:1.6;">
      You can track the progress of your booking from your dashboard. We will notify you when a mechanic is assigned.
    </p>
  `);

// ============================================
// Service Completed Email
// ============================================
export const serviceCompletedTemplate = (name) =>
  emailWrapper(`
    <h2 style="margin:0 0 8px; color:#0f172a; font-size:22px; font-weight:700;">
      Service Completed
    </h2>
    <p style="margin:0 0 24px; color:#64748b; font-size:15px; line-height:1.6;">
      Hello <strong>${name}</strong>, your vehicle service has been completed successfully!
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="background-color:#eff6ff; border:1px solid #bfdbfe; border-radius:12px; padding:20px; text-align:center;">
          <p style="margin:0; color:#2563eb; font-size:16px; font-weight:700;">
            Your vehicle is ready for pickup
          </p>
          <p style="margin:8px 0 0; color:#60a5fa; font-size:13px;">
            Visit your dashboard to view the full service report.
          </p>
        </td>
      </tr>
    </table>

    <p style="margin:24px 0 0; color:#64748b; font-size:14px; line-height:1.6;">
      Thank you for choosing AutoAI. We hope you had a great experience!
    </p>
  `);

// ============================================
// Payment Success Email
// ============================================
export const paymentSuccessTemplate = (amount) =>
  emailWrapper(`
    <h2 style="margin:0 0 8px; color:#0f172a; font-size:22px; font-weight:700;">
      Payment Received
    </h2>
    <p style="margin:0 0 24px; color:#64748b; font-size:15px; line-height:1.6;">
      Your payment has been processed successfully. Here are the details:
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="background-color:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:24px; text-align:center;">
          <p style="margin:0; color:#94a3b8; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:1px;">
            Amount Paid
          </p>
          <p style="margin:8px 0 0; color:#0f172a; font-size:36px; font-weight:800;">
            &#8377;${amount}
          </p>
        </td>
      </tr>
    </table>

    <p style="margin:24px 0 0; color:#64748b; font-size:14px; line-height:1.6;">
      A payment confirmation has been recorded on your account. You can view your invoice from the dashboard.
    </p>
  `);

// ============================================
// Booking Rejected Email
// ============================================
export const bookingRejectedTemplate = (name) =>
  emailWrapper(`
    <h2 style="margin:0 0 8px; color:#0f172a; font-size:22px; font-weight:700;">
      Booking Declined
    </h2>
    <p style="margin:0 0 24px; color:#64748b; font-size:15px; line-height:1.6;">
      Hello <strong>${name}</strong>, we regret to inform you that your service booking could not be accepted at this time.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="background-color:#fef2f2; border:1px solid #fecaca; border-radius:12px; padding:20px; text-align:center;">
          <p style="margin:0; color:#dc2626; font-size:16px; font-weight:700;">
            Status: Declined
          </p>
          <p style="margin:8px 0 0; color:#f87171; font-size:13px;">
            Please try again or contact our support team.
          </p>
        </td>
      </tr>
    </table>

    <p style="margin:24px 0 0; color:#64748b; font-size:14px; line-height:1.6;">
      If you believe this was a mistake, please reach out to us at <strong>support@autoai.com</strong> and we'll be happy to help.
    </p>
  `);