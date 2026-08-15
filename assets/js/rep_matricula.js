document.addEventListener('DOMContentLoaded', () => {
    let resumenData = localStorage.getItem('sum_resumen_data');
    if (!resumenData) {
        resumenData = window.RESUMEN_DEFAULT_DATA;
    } else {
        try { resumenData = JSON.parse(resumenData); }
        catch(e) { resumenData = window.RESUMEN_DEFAULT_DATA; }
    }

    // Populate student data
    if (resumenData) {
        document.getElementById('lbl-periodo').innerText = resumenData.periodoAcademico;
        const lblSede = document.getElementById('lbl-sede');
        if (lblSede) lblSede.innerText = resumenData.sede || "--";
        document.getElementById('lbl-escuela').innerText = resumenData.escuela;
        document.getElementById('lbl-facultad').innerText = resumenData.facultad;
        document.getElementById('lbl-plan').innerText = resumenData.plan;
        document.getElementById('lbl-especialidad').innerText = resumenData.especialidad;
    }

    // Populate Date
    const now = new Date();
    const pad = n => n.toString().padStart(2, '0');
    document.getElementById('lbl-fecha').innerText = `${pad(now.getDate())}/${pad(now.getMonth()+1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    let repMatData = localStorage.getItem('sum_rep_mat_data');
    if (!repMatData) {
        document.getElementById('alert-container').innerHTML = '<div id="divMensajeMatricula" class="alert text-center font-weight-bolder alert-danger" role="alert" style="margin-bottom: 15px;">NO SE ENCUENTRA MATRICULADO</div>';
        const tbody = document.getElementById('tbodyRepMat');
        if (tbody) tbody.innerHTML = '<tr><td colspan="5" class="text-center">No hay asignaturas registradas</td></tr>';
        
        const btnMod = document.getElementById('btn-modificar');
        if (btnMod) btnMod.style.display = 'none';
        
        return;
    }

    try { repMatData = JSON.parse(repMatData); } catch(e) { return; }
    
    let progData = localStorage.getItem('sum_prog_asig_data');
    if (!progData) {
        progData = window.PROGRAMACION_DEFAULT_DATA;
    } else {
        try { progData = JSON.parse(progData); } catch(e) { progData = window.PROGRAMACION_DEFAULT_DATA; }
    }

    const tbody = document.getElementById('tbodyRepMat');
    const cursos = repMatData.cursos || [];
    
    function getDocente(asignatura, seccion) {
        if (!progData || !progData.planes) return "DOCENTE PRUEBA";
        for (let plan of progData.planes) {
            for (let ciclo of plan.ciclos) {
                for (let c of ciclo.cursos) {
                    if (c.asignatura === asignatura && c.seccion === seccion) {
                        return c.docente === '--' ? "No Registrado" : c.docente;
                    }
                }
            }
        }
        return "DOCENTE ASIGNADO (" + seccion + ")";
    }

    let isEditMode = false;

    function renderTable() {
        tbody.innerHTML = '';
        let totalCreds = 0;
        let count = 0;

        // Sort by cycle to ensure correct grouping
        cursos.sort((a, b) => parseInt(a.ciclo || 0) - parseInt(b.ciclo || 0));

        if (isEditMode) {
            cursos.forEach((curso, index) => {
                const tr = document.createElement('tr');
                const docente = curso.docente || getDocente(curso.asignatura, curso.seccion);
                tr.innerHTML = `
                    <td class="align-middle" contenteditable="true">${curso.ciclo}</td>
                    <td class="align-middle text-left" contenteditable="true">${curso.asignatura}</td>
                    <td class="align-middle" contenteditable="true">${curso.creditos}</td>
                    <td class="align-middle" contenteditable="true">${curso.seccion}</td>
                    <td class="align-middle text-left" contenteditable="true">${docente}</td>
                    <td class="align-middle">
                        <button class="btn btn-danger btn-sm btn-eliminar-curso" data-index="${index}" style="border-radius: 4px;">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
                totalCreds += parseFloat(curso.creditos || 0);
                count++;
            });

            // Añadir fila para nuevo curso
            const trAdd = document.createElement('tr');
            trAdd.innerHTML = `
                <td colspan="6" class="text-center p-0">
                    <button id="btn-add-curso" class="btn btn-light btn-block font-weight-bold text-success" style="border: 2px dashed #2ecc71; background-color: #f8f9fa;">
                        <i class="fa-solid fa-plus"></i> Añadir Asignatura
                    </button>
                </td>
            `;
            tbody.appendChild(trAdd);
        } else {
            let i = 0;
            while (i < cursos.length) {
                let curso = cursos[i];
                let rowspan = 1;
                
                // Count how many consecutive courses have the same cycle
                for (let j = i + 1; j < cursos.length; j++) {
                    if (cursos[j].ciclo === curso.ciclo) {
                        rowspan++;
                    } else {
                        break;
                    }
                }

                // Create the first row for this cycle group
                const tr = document.createElement('tr');
                let cicloHtml = `<span class="badge badge-secondary text-dark" style="font-size: 13px; background-color: #adb5bd; color: #000 !important;">${curso.ciclo}</span>`;
                const docente = curso.docente || getDocente(curso.asignatura, curso.seccion);
                
                tr.innerHTML = `
                    <td class="align-middle" rowspan="${rowspan}">${cicloHtml}</td>
                    <td class="align-middle text-left">${curso.asignatura}</td>
                    <td class="align-middle">${curso.creditos}</td>
                    <td class="align-middle">${curso.seccion}</td>
                    <td class="align-middle text-left">${docente}</td>
                `;
                tbody.appendChild(tr);

                totalCreds += parseFloat(curso.creditos);
                count++;

                // Create the subsequent rows in the same cycle group
                for (let k = i + 1; k < i + rowspan; k++) {
                    let curso_k = cursos[k];
                    const tr_k = document.createElement('tr');
                    const docente_k = curso_k.docente || getDocente(curso_k.asignatura, curso_k.seccion);
                    tr_k.innerHTML = `
                        <td class="align-middle text-left">${curso_k.asignatura}</td>
                        <td class="align-middle">${curso_k.creditos}</td>
                        <td class="align-middle">${curso_k.seccion}</td>
                        <td class="align-middle text-left">${docente_k}</td>
                    `;
                    tbody.appendChild(tr_k);
                    
                    totalCreds += parseFloat(curso_k.creditos);
                    count++;
                }

                i += rowspan;
            }
        }

        document.getElementById('lbl-count').innerText = count;
        document.getElementById('lbl-total').innerText = count;
        document.getElementById('lbl-creditos').innerText = totalCreds;
        document.getElementById('lbl-asignaturas').innerText = count;
    }

    renderTable();

    function saveTableStateToArray() {
        const rows = tbody.querySelectorAll('tr:not(:last-child)');
        cursos.length = 0;
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if(cells.length >= 5) {
                cursos.push({
                    ciclo: cells[0].innerText.trim(),
                    asignatura: cells[1].innerText.trim(),
                    creditos: parseFloat(cells[2].innerText.trim()) || 0,
                    seccion: cells[3].innerText.trim(),
                    docente: cells[4].innerText.trim()
                });
            }
        });
    }

    const btnModificar = document.getElementById('btn-modificar');
    if (btnModificar) {
        btnModificar.addEventListener('click', (e) => {
            isEditMode = !isEditMode;
            if (isEditMode) {
                e.currentTarget.innerHTML = '<i class="fa-solid fa-save"></i> Guardar';
                e.currentTarget.classList.replace('btn-primary', 'btn-success');
                document.getElementById('th-acciones').style.display = '';
                renderTable();
            } else {
                saveTableStateToArray();
                
                if (cursos.length === 0) {
                    localStorage.removeItem('sum_rep_mat_data');
                    localStorage.removeItem('sum_matricula_realizada');
                    location.reload();
                    return;
                }
                
                // save to repMatData and localStorage
                repMatData.cursos = cursos;
                localStorage.setItem('sum_rep_mat_data', JSON.stringify(repMatData));
                
                e.currentTarget.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Modificar';
                e.currentTarget.classList.replace('btn-success', 'btn-primary');
                document.getElementById('th-acciones').style.display = 'none';
                
                renderTable();
            }
        });
    }

    tbody.addEventListener('click', (e) => {
        if (!isEditMode) return;
        
        const btnDelete = e.target.closest('.btn-eliminar-curso');
        if (btnDelete) {
            const idx = parseInt(btnDelete.getAttribute('data-index'));
            saveTableStateToArray();
            cursos.splice(idx, 1);
            renderTable();
            return;
        }
        
        const btnAdd = e.target.closest('#btn-add-curso');
        if (btnAdd) {
            saveTableStateToArray();
            cursos.push({
                ciclo: "1",
                asignatura: "NUEVO CURSO",
                creditos: 3,
                seccion: "A",
                docente: "NUEVO DOCENTE"
            });
            renderTable();
        }
    });
});
