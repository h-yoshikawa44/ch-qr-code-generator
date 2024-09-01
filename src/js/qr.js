import '../css/reset.css';
import '../css/base.css';
import '../css/qr.css';

import QRCode from 'qrcode';

// アラート表示時に CSS が適用されてない状態を避けるために、DOMContentLoaded でなく load にしている
window.addEventListener('load', () => {
  const href = window.location.href;
  const url = new URL(href);
  const query = new URLSearchParams(url.search);

  const inputUrl = query.get('url');

  try {
    const targetUrl = new URL(inputUrl);
    QRCode.toCanvas(
      document.getElementById('qr-preview'),
      targetUrl.href,
      { errorCorrectionLevel: 'M', width: 248, margin: 0 },
      (error) => {
        if (error) {
          console.error(error);
          window.alert('QR code generation failed.');
        }
      },
    );
  } catch (e) {
    console.error(e);
    window.alert(
      'Because a value not in URL format was entered, QR code generation is skipped and the user is returned to the top screen.',
    );
    window.location.href = '/';
  }
});
