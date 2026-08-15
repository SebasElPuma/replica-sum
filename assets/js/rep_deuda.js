let allDeudas = [];
let isEditMode = false;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar Datos del Estudiante (resumen_data)
    let resumenData = localStorage.getItem('sum_resumen_data');
    if (!resumenData) {
        resumenData = window.RESUMEN_DEFAULT_DATA;
    } else {
        try { resumenData = JSON.parse(resumenData); }
        catch(e) { resumenData = window.RESUMEN_DEFAULT_DATA; }
    }

    if (resumenData) {
        const lblPeriodo = document.getElementById('lbl-periodo');
        if (lblPeriodo) lblPeriodo.innerText = resumenData.periodoAcademico || "--";
        
        const lblSede = document.getElementById('lbl-sede');
        if (lblSede) lblSede.innerText = resumenData.sede || "--";
        
        const lblFacultad = document.getElementById('lbl-facultad');
        if (lblFacultad) lblFacultad.innerText = resumenData.facultad || "--";
        
        const lblEscuela = document.getElementById('lbl-escuela');
        if (lblEscuela) lblEscuela.innerText = resumenData.escuela || "--";
        
        const lblEspecialidad = document.getElementById('lbl-especialidad');
        if (lblEspecialidad) lblEspecialidad.innerText = resumenData.especialidad || "--";
        
        const lblPlan = document.getElementById('lbl-plan');
        if (lblPlan) lblPlan.innerText = resumenData.plan || "--";
    }
    
    // 2. Cargar datos de deudas
    let deudaData = localStorage.getItem('sum_rep_deuda_data');
    if (deudaData) {
        try { 
            let parsed = JSON.parse(deudaData);
            if (Array.isArray(parsed)) allDeudas = parsed;
        } catch(e) {
            allDeudas = [];
        }
    } else {
        allDeudas = [];
    }

    renderTable();

    const btnModificar = document.getElementById('btn-modificar');
    if (btnModificar) {
        btnModificar.addEventListener('click', (e) => {
            isEditMode = !isEditMode;
            
            if (isEditMode) {
                e.currentTarget.innerHTML = '<i class="fa-solid fa-save"></i> Guardar';
                e.currentTarget.classList.replace('btn-primary', 'btn-success');
                // Agregar encabezado para acciones si no existe
                const theadRow = document.querySelector('#tablaDeudas thead tr');
                if (!document.getElementById('th-acciones')) {
                    const th = document.createElement('th');
                    th.id = 'th-acciones';
                    th.className = 'text-center';
                    th.textContent = 'Acciones';
                    theadRow.appendChild(th);
                }
                renderTable();
            } else {
                e.currentTarget.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Modificar';
                e.currentTarget.classList.replace('btn-success', 'btn-primary');
                
                // Remover encabezado de acciones
                const th = document.getElementById('th-acciones');
                if (th) th.remove();

                // Guardar en localStorage
                localStorage.setItem('sum_rep_deuda_data', JSON.stringify(allDeudas));
                renderTable();
            }
        });
    }
});

function renderTable() {
    const tbody = document.querySelector('#tablaDeudas tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    if (allDeudas.length === 0 && !isEditMode) {
        document.getElementById('tablaDeudas_info').innerText = "Mostrando 0 registros";
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="6" class="text-center font-weight-bold p-4" style="color: #dc3545;">No se encontraron registros</td>`;
        tbody.appendChild(tr);
        return;
    }

    allDeudas.forEach((deuda, index) => {
        const tr = document.createElement('tr');
        tr.className = index % 2 === 0 ? 'odd' : 'even';
        
        if (isEditMode) {
            const editAttrs = `contenteditable="true" class="edit-deuda" data-index="${index}" style="border-bottom: 1px dashed #ccc; outline: none; display: inline-block; min-width: 50px;"`;
            tr.innerHTML = `
                <td class="text-center align-middle"><span ${editAttrs} data-field="fechaRegistro">${deuda.fechaRegistro || ''}</span></td>
                <td class="text-center align-middle"><span ${editAttrs} data-field="periodo">${deuda.periodo || ''}</span></td>
                <td class="text-center align-middle"><span ${editAttrs} data-field="concepto">${deuda.concepto || ''}</span></td>
                <td class="text-center align-middle"><span ${editAttrs} data-field="montoInicial">${deuda.montoInicial || ''}</span></td>
                <td class="text-center align-middle"><span ${editAttrs} data-field="montoFinal">${deuda.montoFinal || ''}</span></td>
                <td class="text-center align-middle"><span ${editAttrs} data-field="observacion">${deuda.observacion || ''}</span></td>
                <td class="text-center align-middle"><button class="btn btn-sm btn-danger btn-del-deuda" data-index="${index}"><i class="fa-solid fa-xmark"></i></button></td>
            `;
        } else {
            tr.innerHTML = `
                <td class="text-center align-middle">${deuda.fechaRegistro || ''}</td>
                <td class="text-center align-middle">${deuda.periodo || ''}</td>
                <td class="text-center align-middle">${deuda.concepto || ''}</td>
                <td class="text-center align-middle">${deuda.montoInicial || ''}</td>
                <td class="text-center align-middle">${deuda.montoFinal || ''}</td>
                <td class="text-center align-middle">${deuda.observacion || ''}</td>
            `;
        }
        tbody.appendChild(tr);
    });

    if (isEditMode) {
        const addRow = document.createElement('tr');
        addRow.innerHTML = `<td class="text-center p-0" colspan="7"><button class="btn btn-light btn-block font-weight-bold text-success" style="border: 2px dashed #2ecc71; background-color: #f8f9fa;" id="btn-add-deuda"><i class="fa-solid fa-plus"></i> Añadir Registro</button></td>`;
        tbody.appendChild(addRow);
        attachEditListeners();
    }

    document.getElementById('tablaDeudas_info').innerText = `Mostrando ${allDeudas.length} registros`;
}

function attachEditListeners() {
    // Escuchar cambios de contenido
    document.querySelectorAll('.edit-deuda').forEach(el => {
        el.addEventListener('blur', (e) => {
            const index = e.currentTarget.getAttribute('data-index');
            const field = e.currentTarget.getAttribute('data-field');
            allDeudas[index][field] = e.currentTarget.textContent;
        });
    });

    // Botones de borrar
    document.querySelectorAll('.btn-del-deuda').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.currentTarget.getAttribute('data-index');
            allDeudas.splice(index, 1);
            renderTable();
        });
    });

    // Botón de añadir
    const btnAdd = document.getElementById('btn-add-deuda');
    if (btnAdd) {
        btnAdd.addEventListener('click', () => {
            const today = new Date();
            const dateStr = today.toISOString().split('T')[0];
            allDeudas.push({
                fechaRegistro: dateStr,
                periodo: "2026-I",
                concepto: "Nuevo Concepto",
                montoInicial: "0.00",
                montoFinal: "0.00",
                observacion: ""
            });
            renderTable();
        });
    }
}
