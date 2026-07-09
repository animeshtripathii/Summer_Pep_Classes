import { useEffect, useRef, useState } from 'react';

function UseRef() {
    const imageFileInputRef = useRef(null);
    const imageNameRef = useRef(null);
    const currentObjectUrlRef = useRef('');

    const [imageSrc, setImageSrc] = useState('');
    const [imageName, setImageName] = useState('');

    const revokeCurrentObjectUrl = () => {
        if (currentObjectUrlRef.current) {
            URL.revokeObjectURL(currentObjectUrlRef.current);
            currentObjectUrlRef.current = '';
        }
    };

    useEffect(() => {
        return () => {
            revokeCurrentObjectUrl();
        };
    }, []);

    const handleSetImage = () => {
        const file = imageFileInputRef.current?.files?.[0];

        if (!file) {
            return;
        }

        revokeCurrentObjectUrl();
        const objectUrl = URL.createObjectURL(file);
        currentObjectUrlRef.current = objectUrl;

        setImageSrc(objectUrl);
        setImageName(file.name);
    };

    const handleRemoveImageName = () => {
        setImageName('');
        if (imageNameRef.current) {
            imageNameRef.current.textContent = '';
        }
    };

    const handleRemoveImage = () => {
        revokeCurrentObjectUrl();
        setImageSrc('');
        setImageName('');
        if (imageFileInputRef.current) {
            imageFileInputRef.current.value = '';
        }
    };

    return (
        <div>
            <h2>Image Preview (useRef)</h2>

            <div>
                <label htmlFor="image-file">Image File</label>
                <br />
                <input
                    id="image-file"
                    type="file"
                    accept="image/*"
                    ref={imageFileInputRef}
                />
            </div>

            <div>
                <button type="button" onClick={handleSetImage}>Set Image</button>
                <button type="button" onClick={handleRemoveImage}>Remove Image</button>
                <button type="button" onClick={handleRemoveImageName}>Remove Image Name</button>
            </div>

            <div>
                {imageSrc ? (
                    <img src={imageSrc} alt={imageName || 'Preview'} width="260" />
                ) : (
                    <p>No image selected</p>
                )}
                <p ref={imageNameRef}>{imageName}</p>
            </div>
        </div>
    );
}

export default UseRef;