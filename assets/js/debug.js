document.addEventListener('DOMContentLoaded', () => {
    const selector = document.getElementById('data-selector');
    const editor = document.getElementById('json-editor');
    const btnSave = document.getElementById('btn-save');
    const btnReset = document.getElementById('btn-reset');
    const alertContainer = document.getElementById('alert-container');

    let originalJSON = '';

    const STORAGE_KEYS = {
        perfil: 'sum_perfil_data',
        historial: 'sum_historial_data',
        programacion: 'sum_prog_asig_data',
        prematricula: 'sum_rep_premat_data',
        resumen: 'sum_resumen_data'
    };

    const DEFAULT_DATA = {
        perfil: window.PERFIL_DEFAULT_DATA,
        historial: window.HISTORIAL_DEFAULT_DATA,
        programacion: window.PROGRAMACION_DEFAULT_DATA,
        prematricula: window.REP_PREMAT_DEFAULT_DATA,
        resumen: window.RESUMEN_DEFAULT_DATA
    };

    function showAlert(message, type) {
        // Remover alerta anterior si existe
        const existing = document.getElementById('float-alert');
        if (existing) existing.remove();

        // Crear el nuevo contenedor de la notificación
        const notify = document.createElement('div');
        notify.id = 'float-alert';
        notify.className = `alert alert-${type} shadow`;
        notify.style.cssText = "display: inline-block; margin: 0px auto; position: fixed; transition: opacity 0.5s ease-in-out; z-index: 9999; top: 20px; right: 20px; min-width: 300px; max-width: 450px;";
        
        let icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle';
        let title = type === 'success' ? 'Éxito' : 'Aviso';

        notify.innerHTML = `
            <button type="button" aria-hidden="true" class="close" style="background:none; border:none; float:right; font-size: 1.2rem; font-weight: bold; margin-left: 15px; cursor: pointer; color: inherit; opacity: 0.7;">&times;</button>
            <span data-notify="icon" class="fa ${icon}"></span> 
            <span data-notify="title"><strong>${title}: </strong></span> 
            <span data-notify="message">${message}</span>
        `;
        
        document.body.appendChild(notify);
        
        // Manejar el botón de cerrar manual
        notify.querySelector('.close').addEventListener('click', () => {
            notify.style.opacity = '0';
            setTimeout(() => notify.remove(), 500);
        });
        
        // Desaparecer automáticamente después de 4 segundos
        setTimeout(() => {
            if (document.body.contains(notify)) {
                notify.style.opacity = '0';
                setTimeout(() => notify.remove(), 500);
            }
        }, 4000);
    }

    function loadData() {
        const type = selector.value;
        const key = STORAGE_KEYS[type];
        const stored = localStorage.getItem(key);

        let dataToDisplay;
        if (stored) {
            try {
                dataToDisplay = JSON.parse(stored);
            } catch (e) {
                console.error("Invalid JSON in localStorage", e);
                dataToDisplay = DEFAULT_DATA[type];
            }
        } else {
            dataToDisplay = DEFAULT_DATA[type];
        }

        if (dataToDisplay) {
            editor.value = JSON.stringify(dataToDisplay, null, 4);
        } else {
            editor.value = '{"error": "No se encontraron datos por defecto para ' + type + '"}';
        }
        
        originalJSON = editor.value;
        btnSave.disabled = true;
    }

    editor.addEventListener('input', () => {
        btnSave.disabled = editor.value === originalJSON;
    });

    selector.addEventListener('change', loadData);

    btnSave.addEventListener('click', () => {
        const type = selector.value;
        const key = STORAGE_KEYS[type];
        const text = editor.value;

        try {
            const parsed = JSON.parse(text);
            localStorage.setItem(key, JSON.stringify(parsed));
            showAlert(`Los datos de ${type} se han guardado correctamente en localStorage.`, 'success');
            
            originalJSON = editor.value;
            btnSave.disabled = true;
        } catch (e) {
            showAlert(`Error al guardar: El JSON no es válido. Verifica el formato. Detalle: ${e.message}`, 'danger');
        }
    });

    btnReset.addEventListener('click', () => {
        const type = selector.value;
        const key = STORAGE_KEYS[type];
        localStorage.removeItem(key);
        loadData();
        showAlert(`Los datos de ${type} han sido restaurados a sus valores por defecto.`, 'success');
    });

    const btnBorrarMatricula = document.getElementById('btn-borrar-matricula');
    if (btnBorrarMatricula) {
        btnBorrarMatricula.addEventListener('click', () => {
            localStorage.removeItem('sum_matricula_realizada');
            localStorage.removeItem('sum_rep_mat_data');
            showAlert(`El estado de la matrícula ha sido borrado. La página de Matrícula vía Internet vuelve a estar habilitada.`, 'success');
        });
    }

    // Initial load
    loadData();
});
