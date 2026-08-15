let allCursos = [];
let isEditMode = false;

document.addEventListener('DOMContentLoaded', () => {
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
    
    // Cargar datos de matrícula para las evaluaciones
    let matriculaData = localStorage.getItem('sum_rep_mat_data');
    if (matriculaData) {
        try { 
            let parsed = JSON.parse(matriculaData);
            if (parsed && parsed.cursos) allCursos = parsed.cursos;
        } catch(e) {}
    }

    // Ordenar por ciclo para agrupar correctamente
    allCursos.sort((a, b) => parseInt(a.ciclo || 0) - parseInt(b.ciclo || 0));
    
    renderTable();

    const btnModificar = document.getElementById('btn-modificar-notas');
    if (btnModificar) {
        btnModificar.addEventListener('click', (e) => {
            isEditMode = !isEditMode;
            
            if (isEditMode) {
                e.currentTarget.innerHTML = '<i class="fa-solid fa-save"></i> Guardar';
                e.currentTarget.classList.replace('btn-primary', 'btn-success');
                renderTable();
            } else {
                saveTableStateToArray();
                let matData = localStorage.getItem('sum_rep_mat_data');
                if (matData) {
                    try {
                        let parsed = JSON.parse(matData);
                        parsed.cursos = allCursos;
                        let jsonString = JSON.stringify(parsed);
                        localStorage.setItem('sum_rep_mat_data', jsonString);
                    } catch(err){
                        console.error("Error al guardar en localStorage:", err);
                    }
                }
                e.currentTarget.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Modificar';
                e.currentTarget.classList.replace('btn-success', 'btn-primary');
                renderTable();
            }
        });
    }

    const tbody = document.querySelector('#tablaEvaluaciones tbody');
    if (tbody) {
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
                
                if (clean !== '') {
                    let val = parseInt(clean, 10);
                    if (val > 20) clean = '20';
                    else clean = val.toString();
                }

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
            }
        });
    }
});

function saveTableStateToArray() {
    const tbody = document.querySelector('#tablaEvaluaciones tbody');
    if (!tbody) {
        return;
    }
    const inputs = tbody.querySelectorAll('.nota-input');
    
    inputs.forEach(input => {
        const index = parseInt(input.getAttribute('data-index'));
        const key = input.getAttribute('data-key');
        let rawText = input.textContent;
        let val = rawText.replace(/[^0-9]/g, '').trim();
        
        if (!allCursos[index].notas) {
            allCursos[index].notas = {};
        }
        
        if (val === '-' || val === '') {
            allCursos[index].notas[key] = null;
        } else {
            let num = parseFloat(val);
            let finalVal = isNaN(num) ? null : num;
            allCursos[index].notas[key] = finalVal;
        }
    });
}

function renderTable() {
    const tbody = document.querySelector('#tablaEvaluaciones tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    const btnMod = document.getElementById('btn-modificar-notas');
    const btnCerrar = document.getElementById('btn-cerrar-semestre');
    if (btnMod) btnMod.style.display = allCursos.length > 0 ? '' : 'none';
    if (btnCerrar) btnCerrar.style.display = allCursos.length > 0 ? '' : 'none';
    
    if (allCursos.length === 0) {
        document.getElementById('tablaEvaluaciones_info').innerText = "Mostrando 0 registros";
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="5" class="text-center font-weight-bold p-4" style="color: #dc3545;">NO EXISTEN REGISTROS DE EVALUACIONES, NO SE HA EFECTUADO MATRÍCULA</td>`;
        tbody.appendChild(tr);
        return;
    }

    const evaluaciones = [
        "Examen Parcial",
        "Ev. Continua",
        "Examen Final",
        "Promedio Final"
    ];

    let currentCiclo = null;

    allCursos.forEach((curso, index) => {
        const isFirstOfCiclo = curso.ciclo !== currentCiclo;
        
        let countCicloCourses = 0;
        if (isFirstOfCiclo) {
            countCicloCourses = allCursos.filter(c => c.ciclo === curso.ciclo).length;
            currentCiclo = curso.ciclo;
        }

        for (let i = 0; i < evaluaciones.length; i++) {
            const tr = document.createElement('tr');
            tr.className = index % 2 === 0 ? 'odd' : 'even';
            
            if (isFirstOfCiclo && i === 0) {
                const rowspan = countCicloCourses * 4;
                tr.innerHTML += `<td class="text-center align-middle" rowspan="${rowspan}"><span class="label-dark">${curso.ciclo}</span></td>`;
            }

            if (i === 0) {
                tr.innerHTML += `<td class="text-left align-middle" rowspan="4">${curso.asignatura}</td>`;
            }

            let evalStyle = '';
            let val = '';
            let key = '';

            if (evaluaciones[i] === "Promedio Final") {
                evalStyle = 'font-weight: bold; background-color: #f4f6f9';
                key = 'pf';
                let ep = parseFloat(curso.notas?.ep);
                let ec = parseFloat(curso.notas?.ec);
                let ef = parseFloat(curso.notas?.ef);
                if (!isNaN(ep) && !isNaN(ec) && !isNaN(ef)) {
                    val = Math.round(0.3 * ep + 0.4 * ec + 0.3 * ef);
                }
            } else if (i === 0) {
                key = 'ep';
                val = curso.notas?.ep ?? '';
            } else if (i === 1) {
                key = 'ec';
                val = curso.notas?.ec ?? '';
            } else if (i === 2) {
                key = 'ef';
                val = curso.notas?.ef ?? '';
            }

            tr.innerHTML += `<td class="text-left" style="${evalStyle}">${evaluaciones[i]}</td>`;

            let tdEdit = (isEditMode && i < 3) ? 'contenteditable="true"' : '';
            let valStyle = evalStyle;
            let tdClass = "text-center font-weight-bold";
            if (isEditMode && i < 3) {
                valStyle += ' background-color: #fff3cd; border: 1px solid #ffeeba; cursor: text; outline: none;';
                tdClass += ' nota-input';
            }

            let displayVal = val;
            let isEditableField = (isEditMode && i < 3);
            if (!isEditableField && val !== '') {
                const grade = parseFloat(val);
                const badgeClass = isNaN(grade) ? 'label-primary' : (grade <= 10 ? 'label-danger' : 'label-primary');
                displayVal = `<span class="${badgeClass}">${val}</span>`;
            }

            tr.innerHTML += `<td class="${tdClass}" style="${valStyle}" ${tdEdit} data-index="${index}" data-key="${key}">${displayVal}</td>`;

            if (i === 0) {
                tr.innerHTML += `<td class="text-center align-middle" rowspan="4" style="font-size: 11.5px; color: #5a5a5a; font-weight: 600;">0.3*EP + 0.4*EC + 0.3*EF</td>`;
            }

            tbody.appendChild(tr);
        }
    });

    document.getElementById('tablaEvaluaciones_info').innerText = `Mostrando 1 - ${allCursos.length} asignaturas matriculadas`;
}
