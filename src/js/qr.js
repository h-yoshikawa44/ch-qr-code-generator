/* globals HTMLAnchorElement */

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

  const qrPreview = document.getElementById('qr-preview');
  const qrDownloadLinkButton = document.getElementById(
    'qr-download-link-button',
  );

  try {
    const targetUrl = new URL(inputUrl);
    QRCode.toCanvas(
      qrPreview,
      targetUrl.href,
      { errorCorrectionLevel: 'M', width: 248, margin: 0 },
      (error) => {
        if (error) {
          console.error(error);
          window.alert('QR code generation failed.');
        }
      },
    );
    // QR コード画像データ URL をダウンロードリンクボタンの a タグにセット
    QRCode.toDataURL(
      qrPreview,
      targetUrl.href,
      {
        errorCorrectionLevel: 'M',
        type: 'image/webp',
        width: 248,
        margin: 0,
      },
      (error, url) => {
        if (error) {
          console.error(error);
          return;
        }

        if (qrDownloadLinkButton instanceof HTMLAnchorElement) {
          qrDownloadLinkButton.href = url;
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
