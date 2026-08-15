document.addEventListener('DOMContentLoaded', () => {
    const fotoContainer = document.getElementById('foto-container');
    const fotoUpload = document.getElementById('foto-upload');
    const fotoImg = document.getElementById('foto');

    // Cargar imagen existente desde LocalStorage en esta vista
    const savedPic = localStorage.getItem('sum_profile_pic');
    if (savedPic && fotoImg) {
        fotoImg.src = savedPic;
    }

    const btnUpload = document.getElementById('btn-upload-foto');
    const btnDelete = document.getElementById('btn-delete-foto');

    if (fotoContainer && fotoUpload) {
        if (btnUpload) {
            btnUpload.addEventListener('click', (e) => {
                e.stopPropagation();
                fotoUpload.click();
            });
        }

        if (btnDelete) {
            btnDelete.addEventListener('click', (e) => {
                e.stopPropagation();
                localStorage.removeItem('sum_profile_pic');
                const defaultPic = typeof FOTO_DEFAULT_B64 !== 'undefined' ? FOTO_DEFAULT_B64 : '';
                if (fotoImg) fotoImg.src = defaultPic;
                document.querySelectorAll('.profile-image').forEach(img => {
                    img.src = defaultPic;
                });
            });
        }

        fotoUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = new Image();
                    img.onload = () => {
                        // Crear canvas para comprimir
                        const canvas = document.createElement('canvas');
                        const MAX_WIDTH = 400;
                        const MAX_HEIGHT = 480;
                        let width = img.width;
                        let height = img.height;

                        // Calcular nueva proporcion
                        if (width > height) {
                            if (width > MAX_WIDTH) {
                                height *= MAX_WIDTH / width;
                                width = MAX_WIDTH;
                            }
                        } else {
                            if (height > MAX_HEIGHT) {
                                width *= MAX_HEIGHT / height;
                                height = MAX_HEIGHT;
                            }
                        }

                        canvas.width = width;
                        canvas.height = height;

                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, height);

                        // Exportar a base64 (JPEG a 80% de calidad para ahorrar espacio)
                        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);

                        // Guardar y aplicar
                        try {
                            localStorage.setItem('sum_profile_pic', dataUrl);
                            
                            // Actualizar la foto principal
                            if (fotoImg) fotoImg.src = dataUrl;
                            
                            // Actualizar avatares globales si existen en este DOM
                            document.querySelectorAll('.profile-image').forEach(el => {
                                el.src = dataUrl;
                            });
                        } catch (err) {
                            alert("La imagen es demasiado pesada para guardarse en el almacenamiento local de tu navegador. Por favor intenta con una más pequeña.");
                            console.error("Error saving profile pic to localStorage", err);
                        }
                    };
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
});
