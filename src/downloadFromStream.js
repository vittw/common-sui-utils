/**
 * 通过二进制流下载文件
 * 
 * @since 0.1.0
 * @param { Object } response xhr 响应结果(需要从响应头获取文件名)
 * @param { string } [fileName] 自定义下载文件名, 传入该参数则不再从响应头解析文件名
 * @returns { Promise }
 */
export default function downloadFromStream(response, fileName) {
  return response.blob().then(blob => {
    let filename = fileName || 'download.txt';

    if (!fileName) {
      const disposition = response.headers.get('Content-Disposition') || response.headers.get('content-disposition');
      // 获取名称
      if (disposition) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(disposition);

        if (matches !== null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '');
        }
      }
    }

    if (window.navigator.msSaveOrOpenBlob) {
      // Microsoft Edge and Microsoft Internet Explorer 10-11
      window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      const a = document.createElement('a');
      const url = window.URL.createObjectURL(blob);

      a.href = url;
      document.body.appendChild(a); //firfox need append the creation a link to body

      if (navigator.userAgent.indexOf('Firefox') > 0) {
        a.download = decodeURIComponent(escape(filename));
      } else {
        a.download = decodeURI(filename);
      }

      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  });
}
