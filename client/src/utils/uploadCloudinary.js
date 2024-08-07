const upload_preset = 'resume';
const cloud_name = 'dzmvr0wr1';

const uploadFileToCloudinary = async (file) => {
  const uploadData = new FormData();
  uploadData.append('file', file);
  uploadData.append('upload_preset', upload_preset);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/raw/upload`, {
    method: 'POST',
    body: uploadData,
  });

  const data = await res.json();
  return data;
};

export default uploadFileToCloudinary;
