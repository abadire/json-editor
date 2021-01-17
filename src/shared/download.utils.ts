function download(filename: string, text: string) {
  const element = document.createElement('a');
  element.setAttribute('href', text);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export function downloadCsv(filename: string, json: string) {
  const obj = JSON.parse(json);
  const columns = Object.keys(obj[0]);

  let contents = `${columns.join(',')}\r\n`;
  contents += obj.map((entry) => Object.values(entry).join(',')).join('\r\n');

  download(filename, `data:text/csv;charset=utf-8,${encodeURI(contents)}`);
}

export function downloadJson(filename: string, json: string) {
  download(filename, `data:text/json;charset=utf-8,${encodeURI(json)}`);
}
