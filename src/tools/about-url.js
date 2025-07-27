
/**
 * 判断是否是 json
 * @param str
 * @returns {boolean}
 */
export const isJSON = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return typeof JSON.parse(str) === "object";
};

/**
 * 使用正则获取 url 中的参数
 * 这里不能使用 location.search hash 模式下获取不到参数
 * @param url
 * @returns {{}}
 */
export const getAllQueryParams = (url) => {
  const queryParams = {};
  const regex = /[?&]([^=#&]+)=([^&#]*)/g;
  let match;

  while ((match = regex.exec(url)) !== null) {
    queryParams[decodeURIComponent(match[1])] = decodeURIComponent(decodeURIComponent(match[2]));
  }

  return queryParams;
};

/**
 * 获取当前页面的参数，并对 json 参数进行转码
 * @returns {{}|null}
 */
export const getDataFromUrl = () => {
  const urlData = getAllQueryParams(location.href);
  const urlDataKeys = Object.keys(urlData);
  if (!urlDataKeys.length) {
    return null;
  }
  const resultObj = {};
  Object.keys(urlData)?.forEach((key) => {
    if (isJSON(urlData[key])) {
      resultObj[key] = JSON.parse(urlData[key]);
    } else {
      resultObj[key] = urlData[key];
    }
  });
  return resultObj;
};
