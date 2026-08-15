document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar Datos del Estudiante
    let resumenData = localStorage.getItem('sum_resumen_data');
    if (!resumenData) {
        resumenData = window.RESUMEN_DEFAULT_DATA;
    } else {
        try { resumenData = JSON.parse(resumenData); }
        catch(e) { resumenData = window.RESUMEN_DEFAULT_DATA; }
    }

    const mapId = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val || '--';
    };

    if (resumenData) {
        mapId('lbl-periodo', resumenData.periodoAcademico);
        mapId('lbl-sede', resumenData.sede);
        mapId('lbl-facultad', resumenData.facultad);
        mapId('lbl-escuela', resumenData.escuela);
        mapId('lbl-especialidad', resumenData.especialidad);
        mapId('lbl-plan', resumenData.plan);
    }

    // 2. Lógica de Mis Tutorías
    let tutoriasData = [];
    const storedTutorias = localStorage.getItem('sum_tutorias_data');
    if (storedTutorias) {
        try {
            tutoriasData = JSON.parse(storedTutorias);
        } catch(e) {
            tutoriasData = [];
        }
    }

    let isEditMode = false;
    const btnModificar = document.getElementById('btn-modificar');
    const theadTr = document.querySelector('#tablaTutorias thead tr');

    function renderTable() {
        const tbody = document.querySelector('#tablaTutorias tbody');
        if (!tbody) return;
        tbody.innerHTML = '';
        
        let existingTh = theadTr.querySelector('.th-accion');
        
        if (isEditMode) {
            if (!existingTh) {
                const th = document.createElement('th');
                th.className = 'text-center align-middle th-accion';
                th.style.width = '10%';
                th.textContent = 'Acción';
                theadTr.appendChild(th);
            }
        } else {
            if (existingTh) {
                theadTr.removeChild(existingTh);
            }
        }

        if (tutoriasData.length === 0 && !isEditMode) {
            document.getElementById('tablaTutorias_info').innerText = "Mostrando 0 registros";
            const tr = document.createElement('tr');
            tr.innerHTML = `<td colspan="5" class="text-center font-weight-bold p-4" style="color: #dc3545;">No se encontraron registros</td>`;
            tbody.appendChild(tr);
            return;
        }

        tutoriasData.forEach((item, index) => {
            const tr = document.createElement('tr');
            tr.className = index % 2 === 0 ? 'odd' : 'even';
            
            if (isEditMode) {
                tr.innerHTML = `
                    <td class="text-left"><input type="text" class="form-control form-control-sm dt-docente" value="${item.docente || ''}" placeholder="Docente"></td>
                    <td class="text-left"><input type="text" class="form-control form-control-sm dt-asignatura" value="${item.asignatura || ''}" placeholder="Asignatura"></td>
                    <td class="text-center"><input type="text" class="form-control form-control-sm dt-resolucion" value="${item.resolucion || ''}" placeholder="N° Res."></td>
                    <td class="text-center"><input type="text" class="form-control form-control-sm dt-fecha" value="${item.fecha || ''}" placeholder="DD/MM/AAAA"></td>
                    <td class="text-left"><input type="text" class="form-control form-control-sm dt-observacion" value="${item.observacion || ''}" placeholder="Observación"></td>
                    <td class="text-center align-middle">
                        <button class="btn btn-sm btn-danger btn-eliminar" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
                    </td>
                `;
            } else {
                tr.innerHTML = `
                    <td class="text-left">${item.docente || ''}</td>
                    <td class="text-left">${item.asignatura || ''}</td>
                    <td class="text-center">${item.resolucion || ''}</td>
                    <td class="text-center">${item.fecha || ''}</td>
                    <td class="text-left">${item.observacion || ''}</td>
                `;
            }
            tbody.appendChild(tr);
        });
        
        if (isEditMode) {
            const trAdd = document.createElement('tr');
              trAdd.innerHTML = `
                  <td colspan="6" class="text-center p-0">
                      <button class="btn btn-light btn-block font-weight-bold text-success" style="border: 2px dashed #2ecc71; background-color: #f8f9fa;" id="btn-add-row"><i class="fa-solid fa-plus"></i> Añadir Fila</button>
                  </td>
              `;
            tbody.appendChild(trAdd);
            
            document.getElementById('btn-add-row').addEventListener('click', () => {
                saveTableState();
                tutoriasData.push({ docente: '', asignatura: '', resolucion: '', fecha: '', observacion: '' });
                renderTable();
            });

            document.querySelectorAll('.btn-eliminar').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = e.currentTarget.getAttribute('data-index');
                    saveTableState();
                    tutoriasData.splice(idx, 1);
                    renderTable();
                });
            });
        }

        document.getElementById('tablaTutorias_info').innerText = `Mostrando ${tutoriasData.length} registros`;
    }

    function saveTableState() {
        if (!isEditMode) return;
        const tbody = document.querySelector('#tablaTutorias tbody');
        if (!tbody) return;
        
        const rows = tbody.querySelectorAll('tr:not(:last-child)'); // exclude the Add Row tr
        tutoriasData = [];
        
        rows.forEach(tr => {
            const iDocente = tr.querySelector('.dt-docente');
            if (!iDocente) return;
            
            tutoriasData.push({
                docente: iDocente.value.trim(),
                asignatura: tr.querySelector('.dt-asignatura').value.trim(),
                resolucion: tr.querySelector('.dt-resolucion').value.trim(),
                fecha: tr.querySelector('.dt-fecha').value.trim(),
                observacion: tr.querySelector('.dt-observacion').value.trim()
            });
        });
    }

    if (btnModificar) {
        btnModificar.addEventListener('click', () => {
            if (isEditMode) {
                // Guardar
                saveTableState();
                localStorage.setItem('sum_tutorias_data', JSON.stringify(tutoriasData));
                isEditMode = false;
                btnModificar.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Modificar';
                btnModificar.classList.replace('btn-success', 'btn-primary');
            } else {
                // Entrar a edición
                isEditMode = true;
                btnModificar.innerHTML = '<i class="fa-solid fa-save"></i> Guardar';
                btnModificar.classList.replace('btn-primary', 'btn-success');
            }
            renderTable();
        });
    }

    // Inicializar
    renderTable();
});
