import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';

// let imageFile;
interface UploadImageProps {
    imageUrl?: string;
    name: string;
    onImageChange(imagefile: any): void;
}
export const UploadImage = (props: UploadImageProps) => {
    const defaultImage = '/assets/images/placeholder.png';
    const imageName = props.name || 'sfimage'
    const [imageData, setImageData] = useState();
    const [imagePreview, setImagePreview] = useState(defaultImage);

    useEffect(() => {
        if(props.onImageChange && imageData) {
            props.onImageChange(imageData);  
        }
    }, [imageData]);

    const checkImageSize = (file: any) => {
        const fileLimit = 4.0; // MB;
        const fileSize = file.size ? (file.size/1048576) : 0;
        if(fileSize <= fileLimit) {
            return true;
        } else {
            return false;
        }
    }

    const onPhotoChange = (event: any) => {
        if (event?.target?.files[0]) {
            const imageFile = event.target.files[0];
            if(checkImageSize(imageFile)) {
                setImageData(imageFile);
                setImagePreview(URL.createObjectURL(imageFile));
            } else {
                swal({
                    title: "Uploading image file size is large",
                    text: "Please use the not more than 4 mb file size",
                    icon: "warning",
                    dangerMode: true,
                    closeOnClickOutside: true,
                });
            }
        }
    }
    return(
        <div>
            <img className='p-bot-xm ' src={imagePreview} alt={imageName} style={{ width: '100%' }} />
            <input type="file" id={imageName} name={imageName}
                accept="image/*" onChange={onPhotoChange}></input>
        </div>
    )
}