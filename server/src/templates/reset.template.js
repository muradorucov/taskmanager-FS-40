function resetPasswordTemplate({ fullName, resetLink }) {

  return `<!doctype html>
<html lang="az">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Şifrə sıfırlama</title>
  <style>
    /* Inline-friendly, email client compatible basic styles */
    body {
      margin: 0;
      padding: 0;
      background-color: #f5f7fb;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial;
      color: #111827;
    }
    .container {
      width: 100%;
      max-width: 680px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 6px 18px rgba(16,24,40,0.06);
    }
    .header {
      background: linear-gradient(90deg,#0074BD 0%, #005fa0 100%);
      padding: 22px;
      text-align: left;
      color: #ffffff;
    }
    .brand {
      font-size: 20px;
      font-weight: 700;
    }
    .content {
      padding: 28px;
    }
    .greeting {
      font-size: 18px;
      margin-bottom: 8px;
      font-weight: 600;
    }
    .text {
      font-size: 15px;
      line-height: 1.5;
      margin-bottom: 18px;
      color: #374151;
    }
    .btn-wrap {
      text-align: center;
      margin: 18px 0;
    }
    .btn {
      display: inline-block;
      text-decoration: none;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 600;
      border: 1px solid #0074BD;
      background: #0074BD;
      color: #ffffff !important;
    }
    .muted {
      font-size: 13px;
      color: #6b7280;
      margin-top: 8px;
    }
    .warning {
      background: #fffbeb;
      border-left: 4px solid #f59e0b;
      padding: 12px;
      border-radius: 6px;
      font-size: 14px;
      color: #92400e;
      margin: 18px 0;
    }
    .footer {
      padding: 18px 28px;
      font-size: 13px;
      color: #6b7280;
      border-top: 1px solid #eef2f7;
      background: #fbfdff;
    }
    .small {
      font-size: 12px;
      color: #9ca3af;
    }
    a.copy-link {
      word-break: break-all;
      color: #0074BD;
      text-decoration: none;
    }

    /* Responsive adjustments */
    @media only screen and (max-width: 480px) {
      .content { padding: 18px; }
      .header { padding: 16px; }
      .brand { font-size: 18px; }
      .greeting { font-size: 17px; }
    }
  </style>
</head>
<body>
  <!-- Preview text (email clients show this next to subject) -->
  <div style="display:none;max-height:0px;overflow:hidden;">Şifrə sıfırlama tələbi alındı — linki istifadə edərək şifrənizi dəyişə bilərsiniz.</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fb;padding:18px 12px;">
    <tr>
      <td align="center">
        <div class="container" role="article" aria-roledescription="email">
          <div class="header">
            <div class="brand">Task Manager</div>
          </div>

          <div class="content">
            <div class="greeting">Salam ${fullName},</div>

            <div class="text">
              Bizə şifrə sıfırlama tələbi göndərdiniz. Aşağıdakı düyməni basaraq yeni şifrənizi yaratmaq üçün davam edə bilərsiniz.
            </div>

            <div class="btn-wrap">
              <a href="${resetLink}" class="btn" target="_blank" rel="noopener noreferrer">Şifrəni sıfırla</a>
            </div>

            <div class="text small">
              Linkin etibarlılığı: <strong>15 dəqiqə</strong>. <br/>
              Əgər düymə işləmirsə, aşağıdakı linki kopyalayıb brauzerinizə yapışdırın:
            </div>

            <div class="text">
              <a href="${resetLink}" class="copy-link" target="_blank" rel="noopener noreferrer">${resetLink}</a>
            </div>

            <div class="warning" role="note" aria-label="security notice">
              Əgər bu sorğunu siz göndərməmisinizsə — hesabınızın təhlükəsizliyi üçün bunu bizə bildirin və hesab şifrənizi dəyişin. Əlavə olaraq, bu sorğu avtomatik olaraq ləğv ediləcək; əgər qeyri-adi fəaliyyət görsəniz, bizimlə əlaqə saxlayın: <a href="mailto:support@itbtechno.az" class="copy-link">support@itbtechno.az</a>.
            </div>

            <div class="text muted">
              Təhlükəsizlik üçün:
              <ul style="margin:8px 0 0 18px;padding:0;">
                <li>Heç kimə şifrənizi və ya bu linki paylaşmayın.</li>
                <li>Link yalnız bir dəfə istifadə oluna və müəyyən müddət sonra etibarsız olacaq.</li>
              </ul>
            </div>
          </div>

          <div class="footer">
            <div><strong>Task Manager</strong></div>
            <div class="small">Nizami kucesi 55 · Bakı · Azərbaycan</div>
            <div style="margin-top:8px;" class="small">Bu e-poçt hesabınıza bağlı xidmət ilə əlaqədardır. Hesabla bağlı sualınız varsa, <a href="mailto:support@itbtechno.az" class="copy-link">support@itbtechno.az</a> ünvanına yazın.</div>
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
`
}


module.exports = resetPasswordTemplate;