document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'sum_rep_premat_data';
    
    let storedData = localStorage.getItem(STORAGE_KEY);
    let currentData = null;
    
    if (storedData) {
        try {
            currentData = JSON.parse(storedData);
            if (!currentData || !currentData.cursos) throw new Error("Invalid format");
        } catch(e) {
            console.error("Invalid localStorage data, clearing...", e);
            localStorage.removeItem(STORAGE_KEY);
            currentData = window.REP_PREMAT_DEFAULT_DATA;
        }
    } else {
        currentData = window.REP_PREMAT_DEFAULT_DATA;
        if (currentData) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
        } else {
            console.error("No se pudo cargar los datos por defecto.");
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

    document.getElementById('btn-modificar').addEventListener('click', toggleEditMode);
    document.getElementById('btn-descargar').addEventListener('click', descargarPDF);
    document.getElementById('btn-reestablecer').addEventListener('click', () => {
        localStorage.removeItem(STORAGE_KEY);
        globalData.cursos = JSON.parse(JSON.stringify(window.REP_PREMAT_DEFAULT_DATA.cursos));
        
        if (isEditMode) {
            isEditMode = false;
            const btn = document.getElementById('btn-modificar');
            btn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Modificar';
            btn.classList.remove('btn-success');
            btn.classList.add('btn-primary');
            btn.style.backgroundColor = '#6558d3';
            btn.style.borderColor = '#6558d3';
            const thDel = document.getElementById('th-delete');
            if (thDel) thDel.remove();
        }

        renderTable();
        showAlert("Datos restablecidos a los valores por defecto.", "success");
    });
    
    document.getElementById('btn-importar').addEventListener('click', () => {
        document.getElementById('file-importar').click();
    });

    document.getElementById('file-importar').addEventListener('change', procesarPDF);
});

let isEditMode = false;
let globalData = null;

function initPage(data) {
    globalData = data;
    const res = data.resumen;
    
    document.getElementById('lbl-periodo').innerText = res.periodoAcademico;
    const lblSede = document.getElementById('lbl-sede');
    if (lblSede) lblSede.innerText = res.sede || "--";
    document.getElementById('lbl-facultad').innerText = res.facultad;
    document.getElementById('lbl-escuela').innerText = res.escuela;
    document.getElementById('lbl-especialidad').innerText = res.especialidad;
    document.getElementById('lbl-plan').innerText = res.plan;
    
    renderTable();
}

function renderTable() {
    const tbody = document.querySelector('#tablaPrematricula tbody');
    tbody.innerHTML = '';
    
    let totalCursos = globalData.cursos.length;
    
    if(totalCursos === 0 && !isEditMode) {
        document.getElementById('msj').classList.remove('d-none');
        document.querySelector('.table-responsive').style.display = 'none';
        document.getElementById('tablaPrematricula_info').innerText = "Mostrando 0 registros";
        return;
    } else {
        if(totalCursos === 0) {
            document.getElementById('msj').classList.remove('d-none');
        } else {
            document.getElementById('msj').classList.add('d-none');
        }
        document.querySelector('.table-responsive').style.display = 'block';
    }
    
    // Agrupar por Plan
    let currentPlan = null;
    let currentCiclo = null;
    
    globalData.cursos.forEach((curso, index) => {
        const tr = document.createElement('tr');
        tr.className = index % 2 === 0 ? 'odd' : 'even';
        
        const isFirstOfPlan = curso.plan !== currentPlan;
        const isFirstOfCiclo = curso.ciclo !== currentCiclo || isFirstOfPlan;
        
        const editAttrs = isEditMode ? 'contenteditable="true" style="border-bottom: 1px dashed #000; cursor: text;"' : '';

        if (isEditMode) {
            tr.innerHTML += `<td class="text-center"><span ${editAttrs} data-field="plan">${curso.plan}</span></td>`;
            tr.innerHTML += `<td class="text-center"><span class="label-dark" ${editAttrs} data-field="ciclo">${curso.ciclo}</span></td>`;
        } else {
            if (isFirstOfPlan) {
                const countPlan = globalData.cursos.filter(c => c.plan === curso.plan).length;
                tr.innerHTML += `<td class="text-center" rowspan="${countPlan}">${curso.plan}</td>`;
                currentPlan = curso.plan;
            } else {
                tr.innerHTML += `<td class="text-center" style="display: none;">${curso.plan}</td>`;
            }
            
            if (isFirstOfCiclo) {
                const countCiclo = globalData.cursos.filter(c => c.plan === curso.plan && c.ciclo === curso.ciclo).length;
                tr.innerHTML += `<td class="text-center" rowspan="${countCiclo}"><span class="label-dark">${curso.ciclo}</span></td>`;
                currentCiclo = curso.ciclo;
            } else {
                tr.innerHTML += `<td class="text-center" style="display: none;"><span class="label-dark">${curso.ciclo}</span></td>`;
            }
        }
        
        tr.innerHTML += `
            <td class="text-left"><span ${editAttrs} data-field="asignatura">${curso.asignatura}</span></td>
            <td class="text-center"><span ${editAttrs} data-field="creditos">${curso.creditos}</span></td>
            <td class="text-center"><span ${editAttrs} data-field="nroRep">${curso.nroRep}</span></td>
            <td class="text-center"><span ${editAttrs} data-field="nroMatEquiv">${curso.nroMatEquiv}</span></td>
            <td class="text-center"><span ${editAttrs} data-field="nroRepTotal">${curso.nroRepTotal}</span></td>
            <td class="text-center"><span ${editAttrs} data-field="etapa">${curso.etapa}</span></td>
        `;
        
        if(isEditMode) {
            tr.innerHTML += `
                <td class="text-center" style="width: 50px;">
                    <button class="btn btn-danger btn-sm btn-del-curso"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
        }
        
        tbody.appendChild(tr);
        
        if (isEditMode) {
            const spans = tr.querySelectorAll('span[contenteditable="true"]');
            spans.forEach(span => {
                span.addEventListener('blur', function() {
                    const field = this.getAttribute('data-field');
                    let val = this.innerText.trim();
                    if(field === 'creditos') val = parseFloat(val) || 0;
                    if(field === 'nroRep' || field === 'nroMatEquiv' || field === 'nroRepTotal') val = parseInt(val) || 0;
                    curso[field] = val;
                });
            });
            
            const btnDel = tr.querySelector('.btn-del-curso');
            if (btnDel) {
                btnDel.addEventListener('click', function() {
                    globalData.cursos.splice(index, 1);
                    renderTable();
                });
            }
        }
    });
    
    if (isEditMode) {
        const addTr = document.createElement('tr');
        addTr.innerHTML = `
            <td colspan="9" class="text-center p-0">
                <button id="btn-add-curso" class="btn btn-light btn-block font-weight-bold text-success" style="border: 2px dashed #2ecc71; background-color: #f8f9fa;"><i class="fa-solid fa-plus"></i> Añadir Curso</button>
            </td>
        `;
        tbody.appendChild(addTr);
        
        document.getElementById('btn-add-curso').addEventListener('click', () => {
            const lastPlan = globalData.cursos.length > 0 ? globalData.cursos[globalData.cursos.length - 1].plan : "2023";
            const lastCiclo = globalData.cursos.length > 0 ? globalData.cursos[globalData.cursos.length - 1].ciclo : "1";
            
            globalData.cursos.push({
                plan: lastPlan,
                ciclo: lastCiclo,
                asignatura: "NUEVO CURSO",
                creditos: 3.0,
                nroRep: 0,
                nroMatEquiv: 0,
                nroRepTotal: 0,
                etapa: "M"
            });
            renderTable();
        });
    }
    
    if (totalCursos === 0) {
        document.getElementById('tablaPrematricula_info').innerText = "Mostrando 0 registros";
    } else {
        document.getElementById('tablaPrematricula_info').innerText = `Mostrando 1 - ${totalCursos} de ${totalCursos} registros`;
    }
}

function toggleEditMode() {
    isEditMode = !isEditMode;
    const btn = document.getElementById('btn-modificar');
    
    if (isEditMode) {
        btn.innerHTML = '<i class="fa-solid fa-save"></i> Guardar';
        btn.classList.remove('btn-primary');
        btn.style.backgroundColor = '#28a745';
        btn.style.borderColor = '#28a745';
        
        const thead = document.querySelector('#tablaPrematricula thead tr');
        if(!document.getElementById('th-delete')) {
            const th = document.createElement('th');
            th.id = 'th-delete';
            th.className = "text-center";
            th.style.width = "50px";
            th.innerText = "Acción";
            thead.appendChild(th);
        }
        
    } else {
        btn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Modificar';
        btn.classList.add('btn-primary');
        btn.style.backgroundColor = '#6558d3';
        btn.style.borderColor = '#6558d3';
        
        const thDel = document.getElementById('th-delete');
        if(thDel) thDel.remove();
        
        globalData.cursos.sort((a, b) => {
            const planA = String(a.plan || "");
            const planB = String(b.plan || "");
            if (planA !== planB) return planA.localeCompare(planB);
            
            const cicloA = parseInt(a.ciclo) || 0;
            const cicloB = parseInt(b.ciclo) || 0;
            return cicloA - cicloB;
        });

        localStorage.setItem('sum_rep_premat_data', JSON.stringify({ cursos: globalData.cursos }));
    }
    
    renderTable();
}

async function procesarPDF(e) {
    const file = e.target.files[0];
    if (!file) return;

    try {
        if(typeof pdfjsLib === 'undefined') {
            alert("Librería PDF.js no cargada.");
            return;
        }

        pdfjsLib.GlobalWorkerOptions.workerSrc = '../../assets/js/lib/pdf.worker.min.js';

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

        // Definición de columnas con rangos X fijos derivados del análisis
        // real de PDFs generados por SUM UNMSM. Cada columna tiene un rango
        // [xMin, xMax) que cubre la posición X de los items que le pertenecen.
        // "numeric: true" une fragmentos SIN espacio (códigos/números).
        // "numeric: false" une fragmentos CON espacio (texto).
        const COLUMNAS = [
            { key: "plan",        xMin: 25,  xMax: 55,  numeric: true  },
            { key: "ciclo",       xMin: 55,  xMax: 78,  numeric: true  },
            { key: "codigo",      xMin: 78,  xMax: 130, numeric: true  },
            { key: "asignatura",  xMin: 130, xMax: 340, numeric: false },
            { key: "creditos",    xMin: 340, xMax: 380, numeric: true  },
            { key: "nroRep",      xMin: 380, xMax: 425, numeric: true  },
            { key: "nroMatEquiv", xMin: 425, xMax: 465, numeric: true  },
            { key: "nroRepTotal", xMin: 465, xMax: 505, numeric: true  },
            { key: "seccElegida", xMin: 505, xMax: 540, numeric: false },
            { key: "etapa",       xMin: 540, xMax: 600, numeric: false }
        ];
        const TOLERANCIA_Y = 3;
        // Y por debajo del cual no hay datos de tabla (pie de página, QR)
        const Y_MIN_TABLA = 70;
        let nuevosCursos = [];

        // Asigna un item a su columna por posición X
        const columnaDe = (x) => {
            for (let i = 0; i < COLUMNAS.length; i++) {
                if (x >= COLUMNAS[i].xMin && x < COLUMNAS[i].xMax) return i;
            }
            return -1; // fuera de rango → descartar
        };

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();

            // Extraer tabla de cursos
            // Obtener todos los items de texto con posición
            const puntos = content.items
                .map((it) => ({
                    texto: it.str.trim(),
                    x: it.transform[4],
                    y: it.transform[5],
                }))
                .filter((p) => p.texto.length > 0 && p.y > Y_MIN_TABLA);

            // Agrupar en líneas visuales por Y (con tolerancia)
            puntos.sort((a, b) => b.y - a.y || a.x - b.x);
            const lineas = [];
            for (const p of puntos) {
                let linea = lineas.find((l) => Math.abs(l.y - p.y) <= TOLERANCIA_Y);
                if (!linea) {
                    linea = { y: p.y, items: [] };
                    lineas.push(linea);
                }
                linea.items.push(p);
            }
            lineas.sort((a, b) => b.y - a.y);

            // Encontrar dónde empieza la tabla: buscar la línea con "Plan"
            // en la zona de encabezado (puede estar fragmentado en varias líneas Y)
            const idxEncabezado = lineas.findIndex((l) =>
                l.items.some((p) => p.texto === "Plan" && p.x < 55)
            );
            if (idxEncabezado === -1) continue;

            // Los datos empiezan después de la zona de encabezado.
            // El encabezado puede ocupar varias líneas Y (fragmentado),
            // así que buscamos la primera línea que tiene un valor de 4 dígitos
            // en la columna Plan como inicio real de datos.
            const lineasPostHeader = lineas.slice(idxEncabezado);
            let filaActual = null;

            const cerrarFila = (filaAct) => {
                const fila = {};
                for (const col of COLUMNAS) {
                    fila[col.key] = filaAct[col.key].join(col.numeric ? "" : " ").trim();
                }

                // Solo crear curso si tiene al menos código o asignatura
                if (!fila.codigo && !fila.asignatura) return null;
                
                return {
                    plan: fila.plan,
                    ciclo: fila.ciclo,
                    asignatura: fila.codigo + " - " + fila.asignatura,
                    creditos: parseFloat(fila.creditos) || 0,
                    nroRep: parseInt(fila.nroRep) || 0,
                    nroMatEquiv: parseInt(fila.nroMatEquiv) || 0,
                    nroRepTotal: parseInt(fila.nroRepTotal) || 0,
                    etapa: fila.etapa || 'M'
                };
            };

            for (const linea of lineasPostHeader) {
                // Filtrar textos de pie de página y otros elementos no-tabla
                const textosCombinados = linea.items.map(it => it.texto).join(' ');
                if (/Página|Documento Verificable|Escanee|código QR/i.test(textosCombinados)) continue;

                // Detectar si esta línea inicia una nueva fila de datos:
                // debe tener un item con 4 dígitos (año) en la zona X del Plan
                const itemPlan = linea.items.find(it =>
                    it.x >= COLUMNAS[0].xMin && it.x < COLUMNAS[0].xMax &&
                    /^\d{4}$/.test(it.texto)
                );
                const esNuevaFila = !!itemPlan;

                if (esNuevaFila) {
                    // Cerrar fila anterior si existe
                    if (filaActual) {
                        const curso = cerrarFila(filaActual);
                        if (curso) nuevosCursos.push(curso);
                    }
                    // Iniciar nueva fila con arrays vacíos para cada columna
                    filaActual = COLUMNAS.reduce((acc, c) => ({ ...acc, [c.key]: [] }), {});
                }
                if (!filaActual) continue;

                // Asignar cada item a su columna por posición X
                for (const item of linea.items) {
                    const idxCol = columnaDe(item.x);
                    if (idxCol >= 0) {
                        filaActual[COLUMNAS[idxCol].key].push(item.texto);
                    }
                }
            }
            // Cerrar última fila
            if (filaActual) {
                const curso = cerrarFila(filaActual);
                if (curso) nuevosCursos.push(curso);
            }
        }

        if (nuevosCursos.length > 0) {
            nuevosCursos.sort((a, b) => parseInt(a.ciclo) - parseInt(b.ciclo));

            globalData.cursos = nuevosCursos;
            localStorage.setItem('sum_rep_premat_data', JSON.stringify({ cursos: nuevosCursos }));
            renderTable();

            showAlert("PDF importado exitosamente.", "success");
        } else {
            showAlert("No se detectó ningún curso de pre-matrícula en el documento. Asegúrate de usar el 'Reporte de Pre-Matrícula' original.", "danger");
        }

    } catch (e) {
        console.error("Error al procesar el PDF:", e);
        showAlert("Ocurrió un error al leer el PDF. Revisa la consola para más detalles.", "danger");
    } finally {
        if (event.target) event.target.value = '';
    }
}

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

function descargarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });

    const logos = window.LOGOS_BASE64 || {};
    if (logos.escudo) doc.addImage(logos.escudo, 'PNG', 40, 30, 50, 65);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Sistema Único de Matrícula", 100, 50);
    doc.setFontSize(14);
    doc.text("Reporte de Pre-Matrícula", 100, 70);
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    const res = globalData.resumen;
    let y = 120;
    doc.text(`Periodo Académico: ${res.periodoAcademico}`, 40, y);
    doc.text(`Plan de Estudios: ${res.plan}`, 400, y);
    y += 15;
    doc.text(`Facultad: ${res.facultad}`, 40, y);
    doc.text(`Programa: ${res.escuela}`, 400, y);
    y += 15;
    doc.text(`Especialidad: ${res.especialidad}`, 40, y);
    
    let tableData = [];
    globalData.cursos.forEach(c => {
        tableData.push([
            c.plan, c.ciclo, c.asignatura, c.creditos, c.nroRep, c.nroMatEquiv, c.nroRepTotal, c.etapa
        ]);
    });

    doc.autoTable({
        startY: 180,
        head: [['Plan', 'Ciclo', 'Asignatura', 'Créditos', 'Nro. Rep', 'Mat. Equiv.', 'Rep. Total', 'Etapa']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185], fontSize: 8, halign: 'center' },
        bodyStyles: { fontSize: 7, halign: 'center' },
        columnStyles: {
            2: { halign: 'left' }
        }
    });

    doc.save('Reporte_Prematricula.pdf');
}
