document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'sum_prog_asig_data';
    
    // Check if we have data in localStorage
    let storedData = localStorage.getItem(STORAGE_KEY);
    let currentData = null;
    
    if (storedData) {
        try {
            currentData = JSON.parse(storedData);
            if (!currentData || !currentData.planes) throw new Error("Invalid format");
        } catch(e) {
            console.error("Invalid localStorage data, clearing...", e);
            localStorage.removeItem(STORAGE_KEY);
            currentData = window.PROGRAMACION_DEFAULT_DATA;
        }
    } else {
        currentData = window.PROGRAMACION_DEFAULT_DATA;
        if (currentData) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
        } else {
            console.error("No se pudo cargar los datos por defecto. Asegúrate de que programacion_default.js esté cargado.");
        }
    }

    if(currentData) {
        // Load central resumen data
        let resumenData = localStorage.getItem('sum_resumen_data');
        if (!resumenData) {
            resumenData = window.RESUMEN_DEFAULT_DATA;
        } else {
            try { resumenData = JSON.parse(resumenData); }
            catch(e) { resumenData = window.RESUMEN_DEFAULT_DATA; }
        }
        currentData.resumen = resumenData;
        
        initPage(currentData);
    }

    // Button event listeners
    document.getElementById('btn-modificar').addEventListener('click', toggleEditMode);
    document.getElementById('btn-descargar').addEventListener('click', () => {
        descargarPDF(currentData);
    });
    document.getElementById('btn-reestablecer').addEventListener('click', () => {
        localStorage.removeItem(STORAGE_KEY);
        
        // Clonar los datos por defecto para no mutar el objeto original en memoria
        let currentData = JSON.parse(JSON.stringify(window.PROGRAMACION_DEFAULT_DATA));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
        
        // Cargar el resumen
        let resumenData = localStorage.getItem('sum_resumen_data');
        if (!resumenData) {
            resumenData = window.RESUMEN_DEFAULT_DATA;
        } else {
            try { resumenData = JSON.parse(resumenData); }
            catch(e) { resumenData = window.RESUMEN_DEFAULT_DATA; }
        }
        currentData.resumen = resumenData;
        
        // Apagar el modo edición si estaba encendido
        if (isEditMode) {
            toggleEditMode();
        }
        
        // Inicializar la tabla de nuevo
        initPage(currentData);
    });
});

let isEditMode = false;
let globalData = null;
let sortableInstance = null;

function initPage(data) {
    globalData = data;
    const res = data.resumen;
    
    // Llenar resumen
    document.getElementById('lbl-periodo').textContent = res.periodoAcademico;
    const lblSede = document.getElementById('lbl-sede');
    if (lblSede) lblSede.textContent = res.sede || "--";
    document.getElementById('lbl-facultad').textContent = res.facultad;
    document.getElementById('lbl-escuela').textContent = res.escuela;
    document.getElementById('lbl-especialidad').textContent = res.especialidad;
    document.getElementById('lbl-plan').textContent = res.plan;
    
    renderTable();
}

function renderTable() {
    const tbody = document.querySelector('#tablaProg tbody');
    tbody.innerHTML = '';
    
    // Asumimos que solo cargamos el primer plan (o el default) ya que se quitaron los selectores
    const plan = globalData.planes[0];
    if (!plan) return;
    
    let totalCursos = 0;
    
    plan.ciclos.forEach((ciclo) => {
        // Cabecera del Ciclo
        const rowHeader = document.createElement('tr');
        rowHeader.className = 'ciclo-header no-drag';
        rowHeader.dataset.cicloId = ciclo.id;
        if (isEditMode) {
            rowHeader.innerHTML = `
                <td class="text-center" colspan="7" style="background: rgba(101, 88, 211, 0.15); color: rgb(101, 88, 211); font-weight: bolder; text-align: center; padding: 8px;">
                    <span contenteditable="true" class="edit-ciclo-nombre" data-ciclo="${ciclo.id}" style="border-bottom: 1px dashed #ccc; outline: none;">${ciclo.nombre}</span>
                    <button class="btn btn-sm btn-danger btn-del-ciclo float-end" data-ciclo="${ciclo.id}" style="float: right;"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
        } else {
            rowHeader.innerHTML = `
                <td class="text-center" colspan="7" style="background: rgba(101, 88, 211, 0.15); color: rgb(101, 88, 211); font-weight: bolder; text-align: center; padding: 8px;">
                    ${ciclo.nombre}
                </td>
            `;
        }
        tbody.appendChild(rowHeader);

        ciclo.cursos.forEach((curso, cIndex) => {
            totalCursos++;
            const row = document.createElement('tr');
            row.className = 'curso-row';
            row.dataset.cicloId = ciclo.id;
            row.dataset.cindex = cIndex;
            if (isEditMode) row.style.cursor = 'grab';
            
            let html = '';
            if (isEditMode) {
                const editAttrs = `contenteditable="true" class="edit-curso" data-ciclo="${ciclo.id}" data-cindex="${cIndex}" style="border-bottom: 1px dashed #ccc; outline: none; display: inline-block; min-width: 20px; white-space: pre-wrap;"`;
                html = `
                    <td class="text-left"><span ${editAttrs} data-field="asignatura">${curso.asignatura}</span></td>
                    <td class="text-center"><span ${editAttrs} data-field="creditos">${curso.creditos.toFixed(1)}</span></td>
                    <td class="text-center"><span ${editAttrs} data-field="seccion">${curso.seccion}</span></td>
                    <td class="text-left"><span ${editAttrs} data-field="docente">${curso.docente}</span></td>
                    <td class="text-center"><span ${editAttrs} data-field="tope">${curso.tope}</span></td>
                    <td class="text-center"><span ${editAttrs} data-field="matriculados">${curso.matriculados}</span></td>
                `;
            } else {
                html = `
                    <td class="text-left">${curso.asignatura}</td>
                    <td class="text-center">${curso.creditos.toFixed(1)}</td>
                    <td class="text-center">${curso.seccion}</td>
                    <td class="text-left">${curso.docente}</td>
                    <td class="text-center">${curso.tope}</td>
                    <td class="text-center">${curso.matriculados}</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-warning mostrarHorarios" data-ciclo="${ciclo.id}" data-cindex="${cIndex}">
                            <i class="fas fa-calendar-alt"></i>
                        </button>
                    </td>
                `;
            }

            if (isEditMode) {
                html += `<td class="text-center"><button class="btn btn-sm btn-danger btn-del-curso" data-ciclo="${ciclo.id}" data-cindex="${cIndex}"><i class="fa-solid fa-xmark"></i></button></td>`;
            }

            row.innerHTML = html;
            tbody.appendChild(row);
        });

        if (isEditMode) {
            const addRow = document.createElement('tr');
            addRow.className = 'add-curso-row no-drag';
            addRow.dataset.cicloId = ciclo.id;
            addRow.innerHTML = `<td class="text-center" colspan="7"><button class="btn btn-success btn-sm btn-add-curso" data-ciclo="${ciclo.id}"><i class="fa-solid fa-plus"></i> Añadir Curso al ${ciclo.nombre}</button></td>`;
            tbody.appendChild(addRow);
        }
    });

    if (isEditMode) {
        const addCicloRow = document.createElement('tr');
        addCicloRow.className = 'add-ciclo-row no-drag';
        addCicloRow.innerHTML = `<td class="text-center" colspan="7"><button class="btn btn-success btn-sm btn-add-ciclo" style="width: 100%;"><i class="fa-solid fa-folder-plus"></i> Añadir Nuevo Ciclo</button></td>`;
        tbody.appendChild(addCicloRow);

        const thHorarios = document.getElementById('th-horarios');
        if(thHorarios) thHorarios.style.display = 'none';

        if(!document.getElementById('th-acc')) {
            const el = document.createElement('th');
            el.id = 'th-acc';
            el.className = 'text-center';
            el.style.width = '180px';
            el.textContent = 'Acción';
            document.querySelector('#tablaProg thead tr').appendChild(el);
        }
    } else {
        const thHorarios = document.getElementById('th-horarios');
        if(thHorarios) thHorarios.style.display = '';

        const thAcc = document.getElementById('th-acc');
        if(thAcc) thAcc.remove();
    }
    
    document.getElementById('tablaProg_info').textContent = `Mostrando 1 - ${totalCursos} de ${totalCursos} registros`;

    // Attach listener to all mostrarHorarios buttons
    document.querySelectorAll('.mostrarHorarios').forEach(btn => {
        btn.addEventListener('click', function() {
            const cicloId = this.getAttribute('data-ciclo');
            const cIndex = this.getAttribute('data-cindex');
            const ciclo = plan.ciclos.find(c => c.id === cicloId);
            if(ciclo && ciclo.cursos[cIndex]) {
                abrirModalHorarios(ciclo.cursos[cIndex]);
            }
        });
    });

    if (isEditMode) {
        attachEditListeners();
        
        if (!sortableInstance) {
            if (typeof Sortable !== 'undefined') {
                sortableInstance = Sortable.create(tbody, {
                    animation: 150,
                    draggable: '.curso-row',
                    filter: '.no-drag',
                    handle: '.curso-row',
                    onEnd: function (evt) {
                        actualizarOrdenCursosDesdeDOM();
                    }
                });
            } else {
                console.warn('SortableJS no está cargado');
            }
        }
    } else {
        if (sortableInstance) {
            sortableInstance.destroy();
            sortableInstance = null;
        }
    }
}

function actualizarOrdenCursosDesdeDOM() {
    const plan = globalData.planes[0];
    const tbody = document.querySelector('#tablaProg tbody');
    const rows = tbody.children;
    
    const oldCiclosMap = {};
    plan.ciclos.forEach(c => {
        oldCiclosMap[c.id] = c;
        c._oldCursos = [...c.cursos];
        c.cursos = [];
    });
    
    let currentCicloId = null;
    
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        
        if (row.classList.contains('ciclo-header')) {
            currentCicloId = row.dataset.cicloId;
        } else if (row.classList.contains('curso-row')) {
            if (!currentCicloId && plan.ciclos.length > 0) {
                currentCicloId = plan.ciclos[0].id;
            }
            
            const oldCicloId = row.dataset.cicloId;
            const oldCIndex = parseInt(row.dataset.cindex);
            
            const oldCiclo = oldCiclosMap[oldCicloId];
            if (oldCiclo && oldCiclo._oldCursos[oldCIndex]) {
                const cursoObj = oldCiclo._oldCursos[oldCIndex];
                if (currentCicloId && oldCiclosMap[currentCicloId]) {
                    oldCiclosMap[currentCicloId].cursos.push(cursoObj);
                }
            }
        }
    }
    
    plan.ciclos.forEach(c => delete c._oldCursos);
    renderTable();
}

function toggleEditMode() {
    isEditMode = !isEditMode;
    const btn = document.getElementById('btn-modificar');

    if (isEditMode) {
        btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Guardar';
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-success');
        btn.style.setProperty('background-color', '#28a745', 'important');
        btn.style.setProperty('border-color', '#28a745', 'important');
    } else {
        btn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Modificar';
        btn.classList.remove('btn-success');
        btn.classList.add('btn-primary');
        btn.style.setProperty('background-color', '#6558d3', 'important');
        btn.style.setProperty('border-color', '#6558d3', 'important');
        
        // Save logic
        localStorage.setItem('sum_prog_asig_data', JSON.stringify({ planes: globalData.planes }));
    }
    renderTable();
}

function attachEditListeners() {
    const plan = globalData.planes[0];

    // Edit fields
    document.querySelectorAll('.edit-curso').forEach(el => {
        el.addEventListener('blur', function() {
            const cicloId = this.getAttribute('data-ciclo');
            const cIndex = this.getAttribute('data-cindex');
            const field = this.getAttribute('data-field');
            let val = this.innerText.trim();
            
            if(field === 'creditos') val = parseFloat(val) || 0;
            else if(field === 'tope' || field === 'matriculados') val = parseInt(val) || 0;
            
            const ciclo = plan.ciclos.find(c => c.id === cicloId);
            if(ciclo) ciclo.cursos[cIndex][field] = val;
        });
    });

    // Delete course
    document.querySelectorAll('.btn-del-curso').forEach(btn => {
        btn.addEventListener('click', function() {
            const cicloId = this.getAttribute('data-ciclo');
            const cIndex = this.getAttribute('data-cindex');
            
            const ciclo = plan.ciclos.find(c => c.id === cicloId);
            if(ciclo) {
                ciclo.cursos.splice(cIndex, 1);
                renderTable();
            }
        });
    });

    // Add course
    document.querySelectorAll('.btn-add-curso').forEach(btn => {
        btn.addEventListener('click', function() {
            const cicloId = this.getAttribute('data-ciclo');
            const ciclo = plan.ciclos.find(c => c.id === cicloId);
            
            if(ciclo) {
                ciclo.cursos.push({
                    asignatura: "NUEVO CURSO",
                    creditos: 3.0,
                    seccion: "1",
                    docente: "--",
                    tope: 40,
                    matriculados: 0,
                    aula: "--",
                    horarios: "--"
                });
                renderTable();
            }
        });
    });

    // Rename cycle
    document.querySelectorAll('.edit-ciclo-nombre').forEach(el => {
        el.addEventListener('blur', function() {
            const cicloId = this.getAttribute('data-ciclo');
            const val = this.innerText.trim();
            const ciclo = plan.ciclos.find(c => c.id === cicloId);
            if(ciclo) ciclo.nombre = val;
        });
    });

    // Delete cycle
    document.querySelectorAll('.btn-del-ciclo').forEach(btn => {
        btn.addEventListener('click', function() {
            const cicloId = this.getAttribute('data-ciclo');
            plan.ciclos = plan.ciclos.filter(c => c.id !== cicloId);
            renderTable();
        });
    });

    // Add cycle
    document.querySelectorAll('.btn-add-ciclo').forEach(btn => {
        btn.addEventListener('click', function() {
            const newId = 'ciclo-' + Date.now();
            plan.ciclos.push({
                id: newId,
                nombre: "NUEVO CICLO",
                cursos: []
            });
            renderTable();
        });
    });
}

function abrirModalHorarios(curso) {
    let horariosArray = [];
    if (typeof curso.horarios === 'string') {
        const lineas = curso.horarios.split('\n');
        lineas.forEach((line, index) => {
            if (!line.trim()) return;
            const partes = line.trim().split(' ');
            const dia = partes[0];
            const horas = partes.slice(1).join(' ');
            horariosArray.push({
                horario: index + 1,
                dia: dia,
                horas: horas,
                aula: curso.aula || '--',
                tipo: index === 0 ? 'Teoría' : 'Práctica'
            });
        });
    } else if (Array.isArray(curso.horarios)) {
        horariosArray = curso.horarios;
    }

    let tbodyHtml = '';
    horariosArray.forEach((h, i) => {
        tbodyHtml += `
            <tr>
                <td>${h.horario || i + 1}</td>
                <td>${h.dia}</td>
                <td>${h.horas}</td>
                <td>${h.aula}</td>
                <td>${h.tipo}</td>
            </tr>
        `;
    });

    if(horariosArray.length === 0) {
        tbodyHtml = `<tr><td colspan="5">No hay horarios registrados.</td></tr>`;
    }

    const modalHtml = `
    <div class="modal fade" id="horariosModal" tabindex="-1" role="dialog" aria-hidden="true" style="background: rgba(0,0,0,0.5);">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content" style="border-radius: 8px;">
                <div class="modal-header" style="background-color: #8c9cc1; color: white; border-top-left-radius: 8px; border-top-right-radius: 8px; padding: 10px 15px;">
                    <h5 class="modal-title" style="font-size: 15px; margin: 0;">Horarios</h5>
                    <button type="button" class="close text-white" aria-label="Close" style="opacity: 1;" onclick="cerrarModalHorarios()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" style="padding: 15px;">
                    <table class="table table-bordered text-center table-sm" style="font-size: 13px; color: #666;">
                        <thead>
                            <tr style="background-color: #f4f6fb; color: #5b678c;">
                                <th>Horario</th>
                                <th>Día</th>
                                <th>Horas de clase</th>
                                <th>Aula</th>
                                <th>Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tbodyHtml}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    `;

    const existing = document.getElementById('horariosModal');
    if (existing) existing.remove();

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modalEl = document.getElementById('horariosModal');
    
    // Vanilla JS show
    modalEl.classList.add('show');
    modalEl.style.display = 'block';
}

window.cerrarModalHorarios = function() {
    const modalEl = document.getElementById('horariosModal');
    if (modalEl) {
        modalEl.classList.remove('show');
        modalEl.style.display = 'none';
        modalEl.remove();
    }
}

function descargarPDF(data) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text("UNIVERSIDAD NACIONAL MAYOR DE SAN MARCOS", 105, 20, { align: "center" });
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text("Universidad del Perú. Decana de América.", 105, 26, { align: "center" });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text("SISTEMA ÚNICO DE MATRÍCULA", 105, 33, { align: "center" });
    
    doc.text("REPORTE DE PROGRAMACIÓN DE ASIGNATURAS", 105, 45, { align: "center" });
    
    // Images
    if (window.base64UnmsmLogo) {
        doc.addImage(window.base64UnmsmLogo, 'PNG', 15, 10, 20, 25);
    }
    if (window.base64SumLogo) {
        doc.addImage(window.base64SumLogo, 'PNG', 160, 10, 35, 15);
    }

    // Student Info
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    let startY = 60;
    const lh = 5; // line height
    const res = data.resumen;
    
    let perfilData = localStorage.getItem('sum_perfil_data');
    if (perfilData) {
        try { perfilData = JSON.parse(perfilData); } catch(e) { perfilData = window.PERFIL_DEFAULT_DATA; }
    } else {
        perfilData = window.PERFIL_DEFAULT_DATA;
    }
    const codMat = perfilData?.academico?.codigoAlumno || "--";
    const nomApe = (perfilData?.datos_personales?.apellidos || "") + " " + (perfilData?.datos_personales?.nombres || "");

    doc.text("Código de Matrícula", 20, startY); doc.setFont('helvetica', 'normal'); doc.text(": " + codMat, 60, startY); startY += lh; doc.setFont('helvetica', 'bold');
    doc.text("Nombres y Apellidos", 20, startY); doc.setFont('helvetica', 'normal'); doc.text(": " + nomApe, 60, startY); startY += lh; doc.setFont('helvetica', 'bold');
    doc.text("Facultad", 20, startY); doc.setFont('helvetica', 'normal'); doc.text(": " + res.facultad, 60, startY); startY += lh; doc.setFont('helvetica', 'bold');
    doc.text("Escuela", 20, startY); doc.setFont('helvetica', 'normal'); doc.text(": " + res.escuela, 60, startY); startY += lh; doc.setFont('helvetica', 'bold');
    doc.text("Especialidad", 20, startY); doc.setFont('helvetica', 'normal'); doc.text(": " + res.especialidad, 60, startY); startY += lh; doc.setFont('helvetica', 'bold');
    doc.text("Plan", 20, startY); doc.setFont('helvetica', 'normal'); doc.text(": " + res.plan, 60, startY); startY += lh; doc.setFont('helvetica', 'bold');
    doc.text("Periodo Académico", 20, startY); doc.setFont('helvetica', 'normal'); doc.text(": " + res.periodoAcademico, 60, startY); startY += lh; doc.setFont('helvetica', 'bold');
    doc.text("Fecha Impresión", 20, startY); doc.setFont('helvetica', 'normal'); doc.text(": " + new Date().toLocaleString(), 60, startY); startY += lh + 5;
    
    // Cycle tables
    const plan = data.planes[0];
    if (!plan) return;

    plan.ciclos.forEach((ciclo) => {
        doc.setFont('helvetica', 'bold');
        doc.text(ciclo.nombre, 15, startY);
        startY += 2;

        const tableData = ciclo.cursos.map(c => [
            c.asignatura,
            c.creditos.toFixed(1),
            c.seccion,
            c.docente,
            c.tope,
            c.matriculados,
            c.aula,
            c.horarios
        ]);

        doc.autoTable({
            startY: startY,
            head: [['Asignatura', 'Créd.', 'Sec.', 'Docente', 'Tope', 'Matri.', 'Aula', 'Horas Clase']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [220, 220, 220], textColor: [0, 0, 0], fontSize: 8, halign: 'center', cellPadding: 1 },
            bodyStyles: { fontSize: 8, cellPadding: 1 },
            columnStyles: {
                0: { halign: 'left', cellWidth: 50 },
                1: { halign: 'center', cellWidth: 10 },
                2: { halign: 'center', cellWidth: 10 },
                3: { halign: 'left', cellWidth: 40 },
                4: { halign: 'center', cellWidth: 10 },
                5: { halign: 'center', cellWidth: 10 },
                6: { halign: 'center', cellWidth: 15 },
                7: { halign: 'center', cellWidth: 35 }
            },
            margin: { left: 15, right: 15 },
            didParseCell: function(data) {
                if(data.section === 'body' && data.column.index === 7) {
                    // Replace newlines or handle spacing for horarios
                }
            }
        });

        startY = doc.lastAutoTable.finalY + 10;
        
        // Pagination logic if startY gets too close to the bottom
        if (startY > 270) {
            doc.addPage();
            startY = 20;
        }
    });
    // Agregar pie de página en todas las páginas
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(7);
        doc.setFont("helvetica", "normal");
        doc.setDrawColor(0);
        doc.setLineWidth(0.2);
        doc.line(15, 283, 195, 283);
        
        doc.setFont("helvetica", "bold");
        doc.text('Documento Simulado | Réplica Educativa del Sistema Único de Matrícula', 15, 287);
        doc.setFont("helvetica", "normal");
        doc.text('Este documento carece de valor oficial. Ha sido generado localmente con fines de simulación.', 15, 291);
        doc.text('Página ' + i, 185, 287);
    }

    doc.save("Reporte_Programacion_Asignaturas.pdf");
}
