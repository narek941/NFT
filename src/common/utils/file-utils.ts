export const getBase64 = (file) => {
  return new Promise<string>((resolve) => {
    let baseURL: string | ArrayBuffer = '';
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (reader.result) baseURL = reader.result;
      resolve(String(baseURL));
    };
  });
};
