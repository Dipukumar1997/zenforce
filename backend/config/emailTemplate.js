export const PASSWORD_RESET_TEMPLATE =`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Email Verification</title>

    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body
    style="
      margin: 0;
      font-family: 'Poppins', sans-serif;
      background: #ffffff;
      font-size: 14px;
    "
  >
    <div
      style="
        max-width: 680px;
        margin: 0 auto;
        padding: 45px 30px 60px;
        background: #f4f7ff;
        background-image: url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner);
        background-repeat: no-repeat;
        background-size: 800px 452px;
        background-position: top center;
        font-size: 14px;
        color: #434343;
      "
    >
      <header>
        <table style="width: 100%;">
          <tbody>
            <tr style="height: 0;">
              <td>
                <img
                  alt=""
                  src="https://i.ibb.co/nSzHMwY/DALL-E-2025-03-18-00-02-40-A-futuristic-and-minimalist-logo-for-a-company-named-Zen-Force-The-design.webp"
                  height="60px"
                  style="border-radius: 10px;" 
                />
              </td>
              <td style="text-align: right;">
                <span
                  id="current-date"
                  style="font-size: 16px; line-height: 30px; color: #ffffff;"
                ></span>
              </td>
            </tr>
          </tbody>
        </table>
      </header>

      <main>
        <div
          style="
            margin: 0;
            margin-top: 70px;
            padding: 92px 30px 115px;
            background: linear-gradient(to bottom right, rgba(255, 255, 255, 0.8), rgba(240, 240, 240, 0.8)), url('https://example.com/your-background-image.jpg');
            background-size: cover;
            border-radius: 30px;
            text-align: center;
          "
        >
          <div style="width: 100%; max-width: 489px; margin: 0 auto;">
            <h2
              style="
                margin: 0;
                font-size: 20px;
                font-weight: 600;
                color: #1f1f1f;
              "
            >
              Verify Your Email Address
            </h2>
           
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-size: 16px;
                font-weight: 500;
              "
            >
              Hey {{Name}},
            </p>
            <div
              style="
                margin: 20px 0;
                padding: 10px;
                background-color: #e0f7fa;
                border-radius: 8px;
                color: #00796b;
                font-weight: 500;
              "
            >
              You are one step away from verifying your email: <strong>{{email}}</strong>
            </div>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-weight: 500;
                letter-spacing: 0.56px;
              "
            >
              Thank you for signing up with Zen Force! Verify your email using this OTP or click the button to verify.
            </p>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-weight: 500;
                letter-spacing: 0.56px;
              "
            >
              Your OTP: <strong style="color: #1f1f1f;">{{otp}}</strong>
            </p>
            <p
              style="
                margin: 0;
                margin-top: 60px;
              "
            >
              <a
                href="{verification_link}"
                style="
                  display: inline-block;
                  padding: 12px 25px;
                  background: #499fb6;
                  color: #ffffff;
                  font-weight: 600;
                  text-decoration: none;
                  border-radius: 8px;
                "
              >
                Verify Email
              </a>
            </p>
          </div>
        </div>

        <p
          style="
            max-width: 400px;
            margin: 0 auto;
            margin-top: 90px;
            text-align: center;
            font-weight: 500;
            color: #8c8c8c;
          "
        >
          Need help? Ask at
          <a
            href="mailto:dk95074450@gmail.com"
            style="color: #499fb6; text-decoration: none;"
            >dk95074450@gmail.com</a
          >
          or visit our
          <a
            href=""
            target="_blank"
            style="color: #499fb6; text-decoration: none;"
            >Help Center</a
          >
        </p>
      </main>

      <footer
        style="
          width: 100%;
          max-width: 490px;
          margin: 20px auto 0;
          text-align: center;
          border-top: 1px solid #e6ebf1;
        "
      >
        <p
          style="
            margin: 0;
            margin-top: 40px;
            font-size: 16px;
            font-weight: 600;
            color: #434343;
          "
        >
          zen force 
        </p>
        <p style="margin: 0; margin-top: 8px; color: #434343;">
          Updated soon
        </p>
        <div style="margin: 0; margin-top: 16px;">
          <a href="" target="_blank" style="display: inline-block;">
            <img
              width="36px"
              alt="Facebook"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook"
            />
          </a>
          <a
            href=""
            target="_blank"
            style="display: inline-block; margin-left: 8px;"
          >
            <img
              width="36px"
              alt="Instagram"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram"
            /></a>
          <a
            href=""
            target="_blank"
            style="display: inline-block; margin-left: 8px;"
          >
            <img
              width="36px"
              alt="Twitter"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter"
            />
          </a>
          <a
            href=""
            target="_blank"
            style="display: inline-block; margin-left: 8px;"
          >
            <img
              width="36px"
              alt="Youtube"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube"
            /></a>
        </div>
        <p style="margin: 0; margin-top: 16px; color: #434343;">
          Copyright © 2025 Company. All rights reserved.
        </p>
      </footer>
    </div>

    <script>
      // Function to format the date
      function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      }

      // Get the current date
      const currentDate = new Date();
      // Set the formatted date in the span
      document.getElementById('current-date').textContent = formatDate(currentDate);
    </script>
  </body>
</html>
`

export const EMAIL_VERIFY_TEMPLATE=`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Email Verification</title>

    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body
    style="
      margin: 0;
      font-family: 'Poppins', sans-serif;
      background: #ffffff;
      font-size: 14px;
    "
  >
    <div
      style="
        max-width: 680px;
        margin: 0 auto;
        padding: 45px 30px 60px;
        background: #f4f7ff;
        background-image: url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner);
        background-repeat: no-repeat;
        background-size: 800px 452px;
        background-position: top center;
        font-size: 14px;
        color: #434343;
      "
    >
      <header>
        <table style="width: 100%;">
          <tbody>
            <tr style="height: 0;">
              <td>
                <img
                  alt=""
                  src="https://i.ibb.co/nSzHMwY/DALL-E-2025-03-18-00-02-40-A-futuristic-and-minimalist-logo-for-a-company-named-Zen-Force-The-design.webp"
                  height="60px"
                  style="border-radius: 10px;" 
                />
              </td>
              <td style="text-align: right;">
                <span
                  id="current-date"
                  style="font-size: 16px; line-height: 30px; color: #ffffff;"
                ></span>
              </td>
            </tr>
          </tbody>
        </table>
      </header>

      <main>
        <div
          style="
            margin: 0;
            margin-top: 70px;
            padding: 92px 30px 115px;
            background: linear-gradient(to bottom right, rgba(255, 255, 255, 0.8), rgba(240, 240, 240, 0.8)), url('https://example.com/your-background-image.jpg');
            background-size: cover;
            border-radius: 30px;
            text-align: center;
          "
        >
          <div style="width: 100%; max-width: 489px; margin: 0 auto;">
            <h2
              style="
                margin: 0;
                font-size: 20px;
                font-weight: 600;
                color: #1f1f1f;
              "
            >
              Verify Your Email Address
            </h2>
           
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-size: 16px;
                font-weight: 500;
              "
            >
              Hey User,
            </p>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-weight: 500;
                letter-spacing: 0.56px;
              "
            >
              Thank you for signing up with Zen Force! Verify your email using this {{otp}} or click the button to verify.
            </p>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-weight: 500;
                letter-spacing: 0.56px;
              "
            >
              Your OTP: <strong style="color: #1f1f1f;">{otp}</strong>
            </p>
            <p
              style="
                margin: 0;
                margin-top: 60px;
              "
            >
              <a
                href="{verification_link}"
                style="
                  display: inline-block;
                  padding: 12px 25px;
                  background: #499fb6;
                  color: #ffffff;
                  font-weight: 600;
                  text-decoration: none;
                  border-radius: 8px;
                "
              >
                Verify Email
              </a>
            </p>
          </div>
        </div>

        <p
          style="
            max-width: 400px;
            margin: 0 auto;
            margin-top: 90px;
            text-align: center;
            font-weight: 500;
            color: #8c8c8c;
          "
        >
          Need help? Ask at
          <a
            href="mailto:dk95074450@gmail.com"
            style="color: #499fb6; text-decoration: none;"
            >dk95074450@gmail.com</a
          >
          or visit our
          <a
            href=""
            target="_blank"
            style="color: #499fb6; text-decoration: none;"
            >Help Center</a
          >
        </p>
      </main>

      <footer
        style="
          width: 100%;
          max-width: 490px;
          margin: 20px auto 0;
          text-align: center;
          border-top: 1px solid #e6ebf1;
        "
      >
        <p
          style="
            margin: 0;
            margin-top: 40px;
            font-size: 16px;
            font-weight: 600;
            color: #434343;
          "
        >
          zen force 
        </p>
        <p style="margin: 0; margin-top: 8px; color: #434343;">
          Updated soon
        </p>
        <div style="margin: 0; margin-top: 16px;">
          <a href="" target="_blank" style="display: inline-block;">
            <img
              width="36px"
              alt="Facebook"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook"
            />
          </a>
          <a
            href=""
            target="_blank"
            style="display: inline-block; margin-left: 8px;"
          >
            <img
              width="36px"
              alt="Instagram"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram"
            /></a>
          <a
            href=""
            target="_blank"
            style="display: inline-block; margin-left: 8px;"
          >
            <img
              width="36px"
              alt="Twitter"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter"
            />
          </a>
          <a
            href=""
            target="_blank"
            style="display: inline-block; margin-left: 8px;"
          >
            <img
              width="36px"
              alt="Youtube"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube"
            /></a>
        </div>
        <p style="margin: 0; margin-top: 16px; color: #434343;">
          Copyright © 2025 Company. All rights reserved.
        </p>
      </footer>
    </div>

    <script>
      // Function to format the date
      function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      }

      // Get the current date
      const currentDate = new Date();
      // Set the formatted date in the span
      document.getElementById('current-date').textContent = formatDate(currentDate);
    </script>
  </body>
</html>`