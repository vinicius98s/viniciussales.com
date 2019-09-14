require('prismjs/themes/prism-tomorrow.css');
require('prismjs/plugins/line-numbers/prism-line-numbers.css');

exports.onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This application has been updated. ` +
      `Reload to display the latest version?`
  );

  if (answer === true) {
    window.location.reload();
  }
};
