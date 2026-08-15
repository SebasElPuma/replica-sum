let allCursos = [];
let asistenciaData = {};
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
    
    // 2. Cargar Asignaturas desde Matrícula
    let matriculaData = localStorage.getItem('sum_rep_mat_data');
    if (matriculaData) {
        try { 
            let parsed = JSON.parse(matriculaData);
            if (parsed && parsed.cursos) allCursos = parsed.cursos;
        } catch(e) {}
    }

    // 3. Cargar datos guardados de asistencia
    let storedAsist = localStorage.getItem('sum_asistencia_data');
    if (storedAsist) {
        try {
            asistenciaData = JSON.parse(storedAsist);
        } catch(e) {
            asistenciaData = {};
        }
    } else {
        asistenciaData = {};
    }

    renderTable();

    const btnModificar = document.getElementById('btn-modificar');
    if (btnModificar) {
        btnModificar.addEventListener('click', (e) => {
            isEditMode = !isEditMode;
            
            if (isEditMode) {
                e.currentTarget.innerHTML = '<i class="fa-solid fa-save"></i> Guardar';
                e.currentTarget.classList.replace('btn-primary', 'btn-success');
                // En modo edición no es necesario botón de acción por fila según los requerimientos, pero agregaremos una clase si se necesita
                renderTable();
            } else {
                e.currentTarget.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Modificar';
                e.currentTarget.classList.replace('btn-success', 'btn-primary');
                
                // Extraer datos de la tabla antes de guardar
                saveTableState();
                
                // Guardar en localStorage
                localStorage.setItem('sum_asistencia_data', JSON.stringify(asistenciaData));
                renderTable();
            }
        });
    }
});

function calculatePercentages(clases, p, t, f) {
    let totalAsist = p + t; // Total es solo puntual + tardanza
    
    if (clases === 0) {
        return { pPct: '0.00', tPct: '0.00', fPct: '0.00', totalAsist: 0, totalPct: '0.00' };
    }

    return {
        pPct: ((p / clases) * 100).toFixed(2),
        tPct: ((t / clases) * 100).toFixed(2),
        fPct: ((f / clases) * 100).toFixed(2),
        totalAsist: totalAsist,
        totalPct: ((totalAsist / clases) * 100).toFixed(2)
    };
}

function getProgressBar(pct, type) {
    let colorClass = 'bg-primary';
    if (type === 'P') colorClass = 'bg-success';
    if (type === 'T') colorClass = 'bg-warning';
    if (type === 'F') colorClass = 'bg-danger';
    if (type === 'Total') {
        colorClass = parseFloat(pct) >= 70 ? 'bg-success' : 'bg-danger';
    }
    
    let displayPct = parseFloat(pct).toFixed(2);
    let barWidth = displayPct > 0 ? displayPct : 0;
    // Texto siempre negro
    let textColor = '#000';
    
    return `<div class="progress" style="height: 18px; background-color: #e9ecef; position: relative; border-radius: 4px; min-width: 50px; display: flex; align-items: center; justify-content: center;">
                <div class="progress-bar progress-bar-striped progress-bar-animated ${colorClass}" role="progressbar" style="position: absolute; left: 0; top: 0; height: 100%; width: ${barWidth}%;" aria-valuenow="${barWidth}" aria-valuemin="0" aria-valuemax="100"></div>
                <span style="position: relative; z-index: 2; font-size: 11px; font-weight: bold; color: ${textColor}; line-height: 1;">${displayPct}%</span>
            </div>`;
}

function renderTable() {
    const tbody = document.querySelector('#tablaAsistencia tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    const btnMod = document.getElementById('btn-modificar');
    if (btnMod) btnMod.style.display = allCursos.length > 0 ? '' : 'none';

    if (allCursos.length === 0) {
        document.getElementById('tablaAsistencia_info').innerText = "Mostrando 0 registros";
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="12" class="text-center font-weight-bold p-4" style="color: #dc3545;">No se encontraron registros</td>`;
        tbody.appendChild(tr);
        return;
    }

    allCursos.forEach((curso, index) => {
        const tr = document.createElement('tr');
        tr.className = index % 2 === 0 ? 'odd' : 'even';
        
        let cData = asistenciaData[curso.asignatura] || { clases: 0, p: 0, t: 0, f: 0 };
        
        let calcs = calculatePercentages(cData.clases, cData.p, cData.t, cData.f);
        
        let editAttrs = isEditMode ? 'contenteditable="true" style="background-color: #fff3cd; border: 1px solid #ffeeba; outline: none; cursor: text;"' : '';
        let cellClass = isEditMode ? 'nota-input font-weight-bold' : '';

        tr.innerHTML = `
            <td class="text-left">${curso.asignatura}</td>
            <td class="text-center">${curso.seccion || ''}</td>
            <td class="text-center align-middle ${cellClass}" ${editAttrs} data-index="${index}" data-field="clases">${cData.clases}</td>
            <td class="text-center align-middle ${cellClass}" ${editAttrs} data-index="${index}" data-field="p">${cData.p}</td>
            <td class="text-center align-middle" id="pPct-${index}">${getProgressBar(calcs.pPct, 'P')}</td>
            <td class="text-center align-middle ${cellClass}" ${editAttrs} data-index="${index}" data-field="t">${cData.t}</td>
            <td class="text-center align-middle" id="tPct-${index}">${getProgressBar(calcs.tPct, 'T')}</td>
            <td class="text-center align-middle ${cellClass}" ${editAttrs} data-index="${index}" data-field="f">${cData.f}</td>
            <td class="text-center align-middle" id="fPct-${index}">${getProgressBar(calcs.fPct, 'F')}</td>
            <td class="text-center align-middle font-weight-bold" id="totalAsist-${index}">${calcs.totalAsist}</td>
            <td class="text-center align-middle font-weight-bold" id="totalPct-${index}">${getProgressBar(calcs.totalPct, 'Total')}</td>
            <td class="d-none"></td>
        `;
        
        tbody.appendChild(tr);
    });

    if (isEditMode) {
        attachEditListeners();
    }

    document.getElementById('tablaAsistencia_info').innerText = `Mostrando ${allCursos.length} registros`;
}

function saveTableState() {
    const tbody = document.querySelector('#tablaAsistencia tbody');
    if (!tbody) return;

    allCursos.forEach((curso, index) => {
        let tr = tbody.children[index];
        if (!tr) return;
        
        let clasesNode = tr.querySelector(`[data-field="clases"]`);
        let pNode = tr.querySelector(`[data-field="p"]`);
        let tNode = tr.querySelector(`[data-field="t"]`);
        let fNode = tr.querySelector(`[data-field="f"]`);
        
        if (clasesNode && pNode && tNode && fNode) {
            let clases = parseInt(clasesNode.textContent) || 0;
            let p = parseInt(pNode.textContent) || 0;
            let t = parseInt(tNode.textContent) || 0;
            let f = parseInt(fNode.textContent) || 0;

            // Restricción: N° Puntual + N° Tardanza + N° Faltas <= # Clases
            if (p + t + f > clases) {
                alert(`Error en "${curso.asignatura}": La suma de Puntual, Tardanza y Faltas (${p + t + f}) no puede exceder el número total de clases (${clases}). Se han restablecido los valores.`);
                // Restablecer a los valores previamente guardados
                let cData = asistenciaData[curso.asignatura] || { clases: 0, p: 0, t: 0, f: 0 };
                clases = cData.clases;
                p = cData.p;
                t = cData.t;
                f = cData.f;
            }

            asistenciaData[curso.asignatura] = { clases, p, t, f };
        }
    });
}

function attachEditListeners() {
    const tbody = document.querySelector('#tablaAsistencia tbody');
    
    // Evitar salto de línea y limpiar caracteres no numéricos
    tbody.addEventListener('keydown', (e) => {
        if (e.target.classList.contains('nota-input')) {
            if (e.key === 'Enter') {
                e.preventDefault();
                e.target.blur();
            }
        }
    });

    tbody.addEventListener('input', (e) => {
        if (e.target.classList.contains('nota-input')) {
            let text = e.target.textContent;
            let clean = text.replace(/[^0-9]/g, '');
            
            if (text !== clean) {
                e.target.textContent = clean;
                try {
                    let range = document.createRange();
                    let sel = window.getSelection();
                    range.selectNodeContents(e.target);
                    range.collapse(false);
                    sel.removeAllRanges();
                    sel.addRange(range);
                } catch(err) {}
            }
            
            // Auto recalcular visualmente
            let index = e.target.getAttribute('data-index');
            let tr = e.target.closest('tr');
            
            let cClases = parseInt(tr.querySelector(`[data-field="clases"]`).textContent) || 0;
            let cP = parseInt(tr.querySelector(`[data-field="p"]`).textContent) || 0;
            let cT = parseInt(tr.querySelector(`[data-field="t"]`).textContent) || 0;
            let cF = parseInt(tr.querySelector(`[data-field="f"]`).textContent) || 0;
            
            let calcs = calculatePercentages(cClases, cP, cT, cF);
            
            let tdPPct = document.getElementById(`pPct-${index}`);
            let tdTPct = document.getElementById(`tPct-${index}`);
            let tdFPct = document.getElementById(`fPct-${index}`);
            let tdTotalAsist = document.getElementById(`totalAsist-${index}`);
            let tdTotalPct = document.getElementById(`totalPct-${index}`);
            
            if (tdPPct) tdPPct.innerHTML = getProgressBar(calcs.pPct, 'P');
            if (tdTPct) tdTPct.innerHTML = getProgressBar(calcs.tPct, 'T');
            if (tdFPct) tdFPct.innerHTML = getProgressBar(calcs.fPct, 'F');
            if (tdTotalAsist) tdTotalAsist.textContent = calcs.totalAsist;
            if (tdTotalPct) {
                tdTotalPct.innerHTML = getProgressBar(calcs.totalPct, 'Total');
            }
            
            // Feedback visual rápido si excede el límite
            if (cP + cT + cF > cClases && cClases > 0) {
                e.target.style.color = 'red';
            } else {
                tr.querySelectorAll('.nota-input').forEach(el => el.style.color = '');
            }
        }
    });
}
