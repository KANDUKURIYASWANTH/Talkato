export const checkAudio = (file) => {
    let err = ""
    if(!file) return err = "File does not exist."

    if(file.size > 10*1024 * 1024)
    err = "The largest image size is 10mb."
    
    return err;
};

export const audioUpload = async (audios) => {
    let audArr = [];
    for(const item of audios){
        console.log(item)
        const formData = new FormData()

        formData.append("file", item)
        
        formData.append("upload_preset", "iwciwj3l")
        formData.append("cloud_name", "dq3ucyivu")

        const res = await fetch("https://api.cloudinary.com/v1_1/dq3ucyivu/upload", {
            method: "POST",
            body: formData
        })
        
        const data = await res.json()
        audArr.push({public_id: data.public_id, url: data.secure_url})
    }
    return audArr;
}