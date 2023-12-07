import React, { useEffect, useState } from 'react';

import '../assets/css/images.css'

import settings from '../config'
import { IconX } from '@tabler/icons-react';
import { useParams } from 'react-router-dom';

function Images() {

    const { token } = useParams();

    const [ code, setCode ] = useState('');
    const [ texto, setTexto ] = useState('');

    const [ selectedImages, setSelectedImages] = useState([]);
    const [ imagePreviews, setImagePreviews] = useState([]);

    const [ isMessage, setIsMessage] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);

    const handleImageChange = async (e) => {
        const files = e.target.files;

        // Filtra solo los archivos de imagen
        const imageFiles = Array.from(files).filter((file) =>
            file.type.startsWith('image/')
        );

        // Almacena los archivos seleccionados
        setSelectedImages(imageFiles);

        // Convierte las imágenes a WebP y genera vistas previas
        const previews = await Promise.all(
            imageFiles.map(async (file) => {
                const previewUrl = await convertToWebP(file);
                return (
                    <img key={file.name} src={previewUrl} alt={file.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                );
            })
        );

        // Actualiza las vistas previas en el estado
        setImagePreviews(previews);
    };

    const convertToWebP = async (file) => {
        const image = new Image();
        const reader = new FileReader();

        // Cargar la imagen en el objeto Image
        await new Promise((resolve) => {
            reader.onload = () => {
                image.onload = resolve;
                image.src = reader.result;
            };
            reader.readAsDataURL(file);
        });

        // Crear un canvas y convertir la imagen a WebP
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);

        const webpData = canvas.toDataURL('image/webp');
        return webpData;
    };

    const handleUploadImages = async () => {

        setIsLoading(true);

        const formData = new FormData();
    
        // Agrega las imágenes al formulario
        selectedImages.forEach((file, index) => {
            const randomCode = `${code}_${index}_${Math.floor(
                Math.random() * 10000
            )}`;
            formData.append(`images[]`, file, `${randomCode}.webp`);
        });
    
        // Agrega el código al formulario
        formData.append('code', code);
    
        fetch(`${settings.API}/plays/photos.php`, {
            method: 'POST',
            body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                setIsMessage(data.message);
                setCode('');
                setSelectedImages([]);
            } else {
                setIsMessage(data.message);
            }
        })
        .catch((error) => {
            console.log('Error: ' + error);
        })
        .finally(() => {
            setIsLoading(false);
        })
    };

    const handleRemoveImage = (index) => {
        // Crea una copia del estado de las imágenes seleccionadas
        const updatedImages = [...selectedImages];

        // Elimina la imagen correspondiente al índice
        updatedImages.splice(index, 1);

        // Actualiza el estado con las imágenes actualizadas
        setSelectedImages(updatedImages);

        // Convierte las imágenes a WebP y genera vistas previas
        const previews = updatedImages.map(async (file) => {
            const previewUrl = await convertToWebP(file);
            return (
                <img key={file.name} src={previewUrl} alt={file.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
            );
        });

        // Actualiza las vistas previas en el estado
        setImagePreviews(previews);
    };

    const handleUpdateTexto = () => {

        setIsLoading(true);

        const formData = new FormData();
        
        formData.append('code', code);
        formData.append('description', texto);

        fetch(`${settings.API}/plays/d.php`, {
            method: 'POST',
            body: formData
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                setCode('');
                setTexto('');
                setIsMessage(data.message);
            } else {
                setIsMessage(data.message);
            }
        })
        .catch((error) => {
            setIsMessage(error)
        })
        .finally(() => {
            setIsLoading(false);
        });

    }

    useEffect(() => {
        const clase = document.getElementById('root');
        clase.classList.add('__7xusab1');

        return () => {
            clase.classList.remove('__7xusab1');
        }
    }, []);

    return (

        <>

            {token === 'image' && (
                <div className='__form'>

                    {isMessage !== '' && (
                        <div className='__form-group'>
                            <h4>{isMessage}</h4>
                        </div>
                    )}
                    <div className='__form-group'>
                        <input type='text' value={code} placeholder='Ingresa en code' onChange={(e) => setCode(e.target.value)} />
                    </div>

                    <div className='__form-group'>
                        <input type="file" accept="image/*" multiple onChange={handleImageChange}/>
                    </div>
                    <div className='__form-group'>
                        <button className='__btn' onClick={handleUploadImages}>{isLoading ? 'Subiendo...' : 'Subir imagenes'}</button>
                    </div>
                    <div className='__preview-images'>
                        {imagePreviews.map((preview, index) => (
                            <>
                                <div key={index} className='__preview-image'>
                                    {preview}
                                    <span className='__btn-close' onClick={() => handleRemoveImage(index)}><IconX/></span>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            )}
            {token === 'text' && (
                <div className='__form'>

                    {isMessage !== '' && (
                        <div className='__form-group'>
                            <h4>{isMessage}</h4>
                        </div>
                    )}
                    <div className='__form-group'>
                        <input type='text' value={code} placeholder='Ingresa en code' onChange={(e) => setCode(e.target.value)} />
                    </div>

                    <div className='__form-group'>
                        <textarea className='__text-entry' value={texto} placeholder='Ingresa una descripción' onChange={(e) => setTexto(e.target.value)} />
                    </div>
                    <div className='__form-group'>
                        <button className='__btn' onClick={handleUpdateTexto}>{isLoading ? 'Actualizando...' : 'Actualizar'}</button>
                    </div>
                </div>
            )}

        </>

    );
}

export default Images;
