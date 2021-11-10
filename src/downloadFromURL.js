/**
 * 通过 URL 下载文件<br>
 * https 协议下请保证待下载链接是https协议
 *
 * @since 0.1.0
 * @param { string } url 待下载的 url 链接
 * @param { string } [fileName] 自定义下载文件名
 * @returns { void }
 * @example
 * 
 * downloadFromURL('https://xxx.oss-cn.aliyuncs.com/online/download.xlsx');
 */
export default function downloadFromURL(url, fileName) {
  const a = document.createElement('a');

  a.href = url;
  a.download = fileName || url.substr(url.lastIndexOf('/') + 1);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
