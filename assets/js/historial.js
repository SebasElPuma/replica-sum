document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'sum_historial_data';
    
    // Check if we have data in localStorage
    let storedData = localStorage.getItem(STORAGE_KEY);
    
    if (storedData) {
        try {
            let parsed = JSON.parse(storedData);
            if (!parsed || !parsed.resumen || !parsed.periodos) throw new Error("Invalid format");
            renderData(parsed);
        } catch(e) {
            console.error("Invalid localStorage data, clearing...", e);
            localStorage.removeItem(STORAGE_KEY);
            if (window.HISTORIAL_DEFAULT_DATA) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(window.HISTORIAL_DEFAULT_DATA));
                renderData(window.HISTORIAL_DEFAULT_DATA);
            }
        }
    } else {
        if (window.HISTORIAL_DEFAULT_DATA) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(window.HISTORIAL_DEFAULT_DATA));
            renderData(window.HISTORIAL_DEFAULT_DATA);
        } else {
            console.error("No se pudo cargar los datos por defecto. Asegúrate de que historial_default.js esté cargado.");
        }
    }

    // Button event listeners
    document.getElementById('btn-modificar').addEventListener('click', toggleEditMode);
    document.getElementById('btn-descargar').addEventListener('click', () => {
        descargarPDF();
    });
    document.getElementById('btn-importar').addEventListener('click', () => {
        document.getElementById('file-importar').click();
    });

    document.getElementById('file-importar').addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            // Set worker
            pdfjsLib.GlobalWorkerOptions.workerSrc = '../../assets/js/lib/pdf.worker.min.js';

            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
            
            let fullText = "";
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                const pageText = content.items.map(item => item.str.trim()).filter(s => s).join(" ");
                fullText += " " + pageText;
            }

            // Extract periodos and cursos
            let parts = fullText.split(/Periodo Acad.mico /i);
            let periodos = [];
            
            // Regex for course extraction
            const regexCursos = /(\d+)\s+(\d{4})\s+([A-Z]+)\s+(.+?)\s+(\d+|[A-Za-z]+)\s+([\d\.]+)\s+(\d+)\s+([A-Z]\s*-\s*[A-Z0-9]+)/g;

            for (let i = 1; i < parts.length; i++) {
                let part = parts[i];
                let matchHeader = part.match(/^([\d\-]+)/);
                if (!matchHeader) continue;
                
                let nombrePeriodo = "PERIODO ACADÉMICO " + matchHeader[1];
                let cursos = [];
                let match;
                
                while((match = regexCursos.exec(part)) !== null) {
                    cursos.push({
                        ciclo: match[1],
                        plan: match[2],
                        tipo: match[3],
                        asignatura: match[4].trim(),
                        calificacion: match[5],
                        creditos: match[6],
                        seccion: match[7],
                        acta: match[8].replace(/\s+/g, '') // optionally clean up spaces
                    });
                }
                
                if (cursos.length > 0) {
                    periodos.push({
                        nombre: nombrePeriodo,
                        cursos: cursos
                    });
                }
            }

            if (periodos.length === 0) {
                alert("No se detectaron cursos en el PDF. Asegúrate de que sea un reporte válido.");
                return;
            }

            // Create new data state
            let newData = {
                resumen: {
                    creditos_requeridos: 213.0,
                    creditos_aprobados: 0,
                    obligatorios: 0,
                    especialidad: 0,
                    electivos_generales: 0,
                    electivos_especialidad: 0,
                    optativos: 0,
                    alternativos: 0,
                    otra_especialidad: 0,
                    mas_de_una_vez: 0,
                    otros: 0,
                    creditos_faltantes: 0,
                    promedio_ponderado: 0
                },
                periodos: periodos
            };

            // Recalculate summary from courses
            newData = recalcularResumen(newData);

            // Replace existing data completely as requested by the user
            localStorage.setItem('sum_historial_data', JSON.stringify(newData));
            
            // Re-render
            renderData(newData);
            
            // End edit mode if active
            if (isEditMode) toggleEditMode();
            
            // Clear input so it can trigger change again on same file
            e.target.value = '';

        } catch (error) {
            console.error(error);
            alert("Hubo un error al procesar el archivo PDF: " + error.message);
        }
    });
    
    document.getElementById('btn-reestablecer').addEventListener('click', () => {
        if (window.HISTORIAL_DEFAULT_DATA) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(window.HISTORIAL_DEFAULT_DATA));
            renderData(window.HISTORIAL_DEFAULT_DATA);
            
            // If in edit mode, end it cleanly
            if (isEditMode) {
                toggleEditMode();
            }
        }
    });
});

let isEditMode = false;

function renderData(data) {
    renderChart(data);
    // 1. Render Summary
    const res = data.resumen;
    document.getElementById('spCredTotal').textContent = res.creditos_requeridos;
    document.getElementById('spCredAprob').textContent = res.creditos_aprobados;
    document.getElementById('spCredObli').textContent = res.obligatorios;
    document.getElementById('spCredEsp').textContent = res.especialidad;
    document.getElementById('spCredEle').textContent = res.electivos_generales;
    document.getElementById('spCredEleEsp').textContent = res.electivos_especialidad;
    document.getElementById('spCredOpt').textContent = res.optativos;
    document.getElementById('spCredAlt').textContent = res.alternativos;
    document.getElementById('spCredOtraEsp').textContent = res.otra_especialidad;
    document.getElementById('spCredDup').textContent = res.mas_de_una_vez;
    document.getElementById('spCredOtros').textContent = res.otros;
    document.getElementById('spCredFaltante').textContent = res.creditos_faltantes;
    document.getElementById('spPromedio').textContent = res.promedio_ponderado;
    
    // 2. Render Table
    const tbody = document.querySelector('#tablaHistorial tbody');
    tbody.innerHTML = '';
    
    let totalCursos = 0;
    
    data.periodos.forEach((periodo, pIndex) => {
        // Add Period header
        const periodRow = document.createElement('tr');
        periodRow.innerHTML = `
            <td class="text-center" colspan="${isEditMode ? '9' : '8'}" style="background: rgba(101, 88, 211, 0.15); color: rgb(101, 88, 211); font-weight: bolder; text-align: left; padding: 8px;">
                <span ${isEditMode ? `contenteditable="true" class="edit-period" data-pindex="${pIndex}" style="border-bottom: 1px dashed #6558d3; padding: 2px;"` : ''}>${periodo.nombre}</span>
                ${isEditMode ? `<button class="btn btn-sm btn-danger float-right ml-2 btn-del-period" data-pindex="${pIndex}"><i class="fa-solid fa-trash"></i></button>` : ''}
                ${isEditMode ? `<button class="btn btn-sm btn-success float-right btn-add-curso" data-pindex="${pIndex}"><i class="fa-solid fa-plus"></i> Añadir Curso</button>` : ''}
            </td>
        `;
        tbody.appendChild(periodRow);
        
        // Add courses
        periodo.cursos.forEach((curso, cIndex) => {
            totalCursos++;
            const row = document.createElement('tr');
            
            // Format grade with badge
            const grade = parseFloat(curso.calificacion);
            const badgeClass = isNaN(grade) ? 'label-primary' : (grade <= 10 ? 'label-danger' : 'label-primary');
            const califHtml = `<span class="${badgeClass}">${curso.calificacion}</span>`;
            
            let html = '';
            if (isEditMode) {
                const editAttrs = `contenteditable="true" class="edit-curso" data-pindex="${pIndex}" data-cindex="${cIndex}" style="border-bottom: 1px dashed #ccc; outline: none; display: inline-block; min-width: 20px;"`;
                html = `
                    <td class="text-center"><span ${editAttrs} data-field="ciclo">${curso.ciclo}</span></td>
                    <td class="text-center"><span ${editAttrs} data-field="plan">${curso.plan}</span></td>
                    <td class="text-center"><span ${editAttrs} data-field="tipo">${curso.tipo}</span></td>
                    <td class="text-left"><span ${editAttrs} data-field="asignatura">${curso.asignatura}</span></td>
                    <td class="text-center"><span ${editAttrs} data-field="calificacion">${curso.calificacion}</span></td>
                    <td class="text-center"><span ${editAttrs} data-field="creditos">${curso.creditos}</span></td>
                    <td class="text-center"><span ${editAttrs} data-field="seccion">${curso.seccion}</span></td>
                    <td class="text-center"><span ${editAttrs} data-field="acta">${curso.acta}</span></td>
                `;
            } else {
                html = `
                    <td class="text-center">${curso.ciclo}</td>
                    <td class="text-center">${curso.plan}</td>
                    <td class="text-center">${curso.tipo}</td>
                    <td class="text-left">${curso.asignatura}</td>
                    <td class="text-center">${califHtml}</td>
                    <td class="text-center">${curso.creditos}</td>
                    <td class="text-center">${curso.seccion}</td>
                    <td class="text-center">${curso.acta}</td>
                `;
            }

            if (isEditMode) {
                html += `<td class="text-center"><button class="btn btn-sm btn-danger btn-del-curso" data-pindex="${pIndex}" data-cindex="${cIndex}"><i class="fa-solid fa-xmark"></i></button></td>`;
            }

            row.innerHTML = html;
            tbody.appendChild(row);
        });
    });

    if (isEditMode) {
        const addPeriodRow = document.createElement('tr');
        addPeriodRow.innerHTML = `<td class="text-center" colspan="9"><button class="btn btn-success" id="btn-add-period"><i class="fa-solid fa-plus"></i> Añadir Nuevo Periodo</button></td>`;
        tbody.appendChild(addPeriodRow);
    }
    
    // Update footer info
    document.getElementById('tablaHistorial_info').textContent = `Mostrando 1 - ${totalCursos} de ${totalCursos} registros`;

    if (isEditMode) {
        attachEditListeners();
        
        // Listeners for contenteditable
        document.querySelectorAll('.edit-period').forEach(el => {
            el.addEventListener('blur', (e) => {
                const pIndex = e.currentTarget.getAttribute('data-pindex');
                let data = JSON.parse(localStorage.getItem('sum_historial_data'));
                data.periodos[pIndex].nombre = e.currentTarget.textContent;
                data = recalcularResumen(data);
            localStorage.setItem('sum_historial_data', JSON.stringify(data));
            });
        });
        
        document.querySelectorAll('.edit-curso').forEach(el => {
            el.addEventListener('blur', (e) => {
                const pIndex = e.currentTarget.getAttribute('data-pindex');
                const cIndex = e.currentTarget.getAttribute('data-cindex');
                const field = e.currentTarget.getAttribute('data-field');
                let data = JSON.parse(localStorage.getItem('sum_historial_data'));
                data.periodos[pIndex].cursos[cIndex][field] = e.currentTarget.textContent;
                data = recalcularResumen(data);
            localStorage.setItem('sum_historial_data', JSON.stringify(data));
            });
        });
    }
}

function attachEditListeners() {
    document.querySelectorAll('.btn-del-curso').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const pIndex = e.currentTarget.getAttribute('data-pindex');
            const cIndex = e.currentTarget.getAttribute('data-cindex');
            let data = JSON.parse(localStorage.getItem('sum_historial_data'));
            data.periodos[pIndex].cursos.splice(cIndex, 1);
            data = recalcularResumen(data);
            localStorage.setItem('sum_historial_data', JSON.stringify(data));
            renderData(data);
        });
    });

    document.querySelectorAll('.btn-del-period').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const pIndex = e.currentTarget.getAttribute('data-pindex');
            let data = JSON.parse(localStorage.getItem('sum_historial_data'));
            data.periodos.splice(pIndex, 1);
            data = recalcularResumen(data);
            localStorage.setItem('sum_historial_data', JSON.stringify(data));
            renderData(data);
        });
    });

    document.querySelectorAll('.btn-add-curso').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const pIndex = e.currentTarget.getAttribute('data-pindex');
            let data = JSON.parse(localStorage.getItem('sum_historial_data'));
            data.periodos[pIndex].cursos.push({
                ciclo: "X", plan: "2023", tipo: "O", asignatura: "NUEVO CURSO",
                calificacion: "14", creditos: "4", seccion: "1", acta: "P - 2026..."
            });
            data = recalcularResumen(data);
            localStorage.setItem('sum_historial_data', JSON.stringify(data));
            renderData(data);
        });
    });

    const btnAddPeriod = document.getElementById('btn-add-period');
    if (btnAddPeriod) {
        btnAddPeriod.addEventListener('click', () => {
            let data = JSON.parse(localStorage.getItem('sum_historial_data'));
            data.periodos.push({
                nombre: "PERIODO ACADÉMICO NUEVO",
                cursos: []
            });
            data = recalcularResumen(data);
            localStorage.setItem('sum_historial_data', JSON.stringify(data));
            renderData(data);
        });
    }
}

function toggleEditMode() {
    isEditMode = !isEditMode;
    const btn = document.getElementById('btn-modificar');
    if (isEditMode) {
        btn.innerHTML = '<i class="fa-solid fa-save"></i> Guardar';
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-success');
        // Add header column for actions
        const theadRow = document.querySelector('#tablaHistorial thead tr');
        if (!document.getElementById('th-acciones')) {
            const th = document.createElement('th');
            th.id = 'th-acciones';
            th.className = 'text-center';
            th.textContent = 'Acciones';
            theadRow.appendChild(th);
        }
    } else {
        btn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Modificar';
        btn.classList.remove('btn-success');
        btn.classList.add('btn-primary');
        // Remove header column for actions
        const th = document.getElementById('th-acciones');
        if (th) th.remove();
    }
    
    let storedData = localStorage.getItem('sum_historial_data');
    if (storedData) renderData(JSON.parse(storedData));
}

function recalcularResumen(data) {
    let aprobados = 0;
    let total_creditos = 0;
    let suma_ponderada = 0;
    let obligatorios = 0;
    let electivos = 0;

    data.periodos.forEach(p => {
        p.cursos.forEach(c => {
            const cred = parseFloat(c.creditos);
            const cal = parseFloat(c.calificacion);
            const tipo = (c.tipo || "").toUpperCase().trim();
            
            if (!isNaN(cred) && !isNaN(cal)) {
                if (cal >= 11) {
                    aprobados += cred;
                    if (tipo === 'O') obligatorios += cred;
                    else if (tipo === 'E') electivos += cred;
                }
                total_creditos += cred;
                suma_ponderada += (cal * cred);
            }
        });
    });

    const promedio = total_creditos > 0 ? (suma_ponderada / total_creditos) : 0;
    const requeridos = parseFloat(data.resumen.creditos_requeridos) || 213;

    data.resumen.creditos_aprobados = aprobados;
    data.resumen.obligatorios = obligatorios;
    data.resumen.electivos_generales = electivos;
    data.resumen.creditos_faltantes = requeridos - aprobados;
    data.resumen.promedio_ponderado = promedio.toFixed(3);
    
    return data;
}


function descargarPDF() {
    let data = JSON.parse(localStorage.getItem('sum_historial_data'));
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4'
    });

    const logos = window.LOGOS_BASE64 || {};
    
    // Add Escudo left
    if (logos.escudo) {
        doc.addImage(logos.escudo, 'PNG', 40, 30, 50, 65);
    }
    // Add SUM logo right
    if (logos.logo_sum) {
        doc.addImage(logos.logo_sum, 'PNG', 460, 40, 90, 40);
    }
    
    // Header Texts
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("UNIVERSIDAD NACIONAL MAYOR DE SAN MARCOS", 300, 50, { align: 'center' });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Universidad del Perú. Decana de América.", 300, 65, { align: 'center' });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("SISTEMA ÚNICO DE MATRÍCULA", 300, 80, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text("REPORTE DE HISTORIAL ACADÉMICO", 300, 120, { align: 'center' });
    
    // Profile Data (Fetch from localStorage or window.PERFIL_DEFAULT_DATA if available)
    let p_data = localStorage.getItem('sum_perfil_data');
    if (p_data) {
        try { p_data = JSON.parse(p_data); } catch(e) { p_data = window.PERFIL_DEFAULT_DATA || {}; }
    } else {
        p_data = window.PERFIL_DEFAULT_DATA || {};
    }
    const p = p_data.datos_personales || {};
    const p_acad = p_data.academico || {};

    let r_data = window.RESUMEN_DEFAULT_DATA || {};
    try {
        const localRes = localStorage.getItem('sum_resumen_data');
        if (localRes) r_data = JSON.parse(localRes);
    } catch(e) {}
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    let startY = 145;
    
    doc.text("Código de Matrícula", 40, startY); doc.setFont("helvetica", "normal"); doc.text(":  " + (p_acad && p_acad.codigoAlumno ? p_acad.codigoAlumno : "-"), 170, startY); startY += 13;
    const nombres = (p.nombres ? p.nombres + " " + p.apellidos : "VARGAS QUISPE SEBASTIAN ALEXANDRE");
    doc.setFont("helvetica", "bold"); doc.text("Nombres y Apellidos", 40, startY); doc.setFont("helvetica", "normal"); doc.text(":  " + nombres, 170, startY); startY += 13;
    doc.setFont("helvetica", "bold"); doc.text("Facultad", 40, startY); doc.setFont("helvetica", "normal"); doc.text(":  " + (r_data.facultad || "20 - INGENIERÍA DE SISTEMAS E INFORMÁTICA"), 170, startY); startY += 13;
    doc.setFont("helvetica", "bold"); doc.text("Escuela", 40, startY); doc.setFont("helvetica", "normal"); doc.text(":  " + (r_data.escuela || "1 - E.P. De Ingeniería De Sistemas"), 170, startY); startY += 13;
    doc.setFont("helvetica", "bold"); doc.text("Especialidad", 40, startY); doc.setFont("helvetica", "normal"); doc.text(":  " + (r_data.especialidad || "0 - Estudios Generales"), 170, startY); startY += 13;
    doc.setFont("helvetica", "bold"); doc.text("Plan", 40, startY); doc.setFont("helvetica", "normal"); doc.text(":  " + (r_data.plan || "2023 - Plan De Estudios 2023"), 170, startY); startY += 13;
    const today = new Date();
    doc.setFont("helvetica", "bold"); doc.text("Fecha Impresión", 40, startY); doc.setFont("helvetica", "normal"); doc.text(":  " + today.toLocaleString(), 170, startY);
    
    let currentY = startY + 25;

    // Loop Periodos
    data.periodos.forEach(periodo => {
        // check page break before header
        if (currentY > 730) {
            doc.addPage();
            currentY = 40;
        }
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.text(periodo.nombre, 40, currentY);
        
        let body = [];
        periodo.cursos.forEach(c => {
            body.push([c.ciclo, c.plan, c.tipo, c.asignatura, c.calificacion, c.creditos, c.seccion, c.acta]);
        });
        
        doc.autoTable({
            startY: currentY + 5,
            head: [['Ciclo', 'Plan', 'Tipo', 'Asignatura', 'Calif.', 'Créd.', 'Sec.', 'Acta']],
            body: body,
            theme: 'grid',
            headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], fontStyle: 'bold', halign: 'center' },
            bodyStyles: { textColor: [0, 0, 0] },
            columnStyles: {
                0: { halign: 'center', cellWidth: 35 },
                1: { halign: 'center', cellWidth: 35 },
                2: { halign: 'center', cellWidth: 30 },
                3: { cellWidth: 'auto' },
                4: { halign: 'center', cellWidth: 35 },
                5: { halign: 'center', cellWidth: 35 },
                6: { halign: 'center', cellWidth: 35 },
                7: { halign: 'center', cellWidth: 130 }
            },
            styles: { fontSize: 8, cellPadding: 3 }
        });
        currentY = doc.lastAutoTable.finalY + 20;
    });

    // Summary table
    if (currentY > 600) {
        doc.addPage();
        currentY = 40;
    }
    
    const res = data.resumen;
    doc.autoTable({
        startY: currentY,
        head: [[ { content: 'Resumen de Créditos Aprobados', colSpan: 2, styles: { halign: 'center', fillColor: [200, 200, 200] } } ]],
        body: [
            ['Creditaje Requerido para Egresar', res.creditos_requeridos],
            ['Creditaje Aprobado', res.creditos_aprobados],
            ['Obligatorios', res.obligatorios],
            ['De Especialidad', res.especialidad],
            ['Electivos Generales', res.electivos_generales],
            ['Electivos de Especialidad', res.electivos_especialidad],
            ['Optativos', res.optativos],
            ['Alternativos', res.alternativos],
            ['De Otra Especialidad', res.otra_especialidad],
            ['Más de una vez', res.mas_de_una_vez],
            ['Otros', res.otros],
            ['Creditaje Faltante', res.creditos_faltantes],
            ['Promedio Ponderado', res.promedio_ponderado]
        ],
        theme: 'grid',
        headStyles: { textColor: [0, 0, 0], fontStyle: 'bold' },
        bodyStyles: { textColor: [0, 0, 0] },
        styles: { fontSize: 9, cellPadding: 3 },
        margin: { left: 160 },
        tableWidth: 270
    });
    
    // Add page footer for all pages
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(7);
        doc.setFont("helvetica", "normal");
        // Line separator
        doc.setDrawColor(0);
        doc.setLineWidth(0.5);
        doc.line(40, 800, 550, 800);
        
        doc.setFont("helvetica", "bold");
        doc.text('Documento Simulado | Réplica Educativa del Sistema Único de Matrícula', 40, 812);
        doc.setFont("helvetica", "normal");
        doc.text('Este documento carece de valor oficial. Ha sido generado localmente con fines de simulación.', 40, 822);
        doc.text('Página ' + i, 520, 817);
    }
    
    doc.save('Historial_Academico.pdf');
}


let historialChart = null;

function renderChart(data) {
    if (!data || !data.periodos || typeof ApexCharts === 'undefined') return;
    
    let chartData = [];
    let categories = [];
    
    data.periodos.forEach(p => {
        let nombre = p.nombre.replace("PERIODO ACADÉMICO ", "").trim();
        // Ignore summer courses ending in "- 0" or "-0"
        if (nombre.endsWith("- 0") || nombre.endsWith("-0")) return;
        
        let sumCreditos = 0;
        let sumPonderada = 0;
        
        p.cursos.forEach(c => {
            const cred = parseFloat(c.creditos);
            const cal = parseFloat(c.calificacion);
            if (!isNaN(cred) && !isNaN(cal)) {
                sumCreditos += cred;
                sumPonderada += (cal * cred);
            }
        });
        
        let prom = sumCreditos > 0 ? (sumPonderada / sumCreditos) : 0;
        
        categories.push(nombre);
        chartData.push(parseFloat(prom.toFixed(3)));
    });
    
    let minVal = Math.min(...chartData);
    let maxVal = Math.max(...chartData);
    
    // Add some padding to min and max for better visualization
    let yMin = Math.max(0, Math.floor(minVal) - 2);
    let yMax = Math.min(20, Math.ceil(maxVal) + 2);
    
    const options = {
        series: [{
            name: 'Promedios',
            style:{
                fontWeight: 'bold',
            },
            data: chartData
        }],
        title: {
            text: 'Gráfico comparativo entre Periodo Académico y Promedio',
            align: 'left',
            style: {
                fontWeight: 'bold',
                fontSize: '14px',
                color: '#333'
            }
        },
        chart: {
            type: 'area',
            height: 415,
            fontFamily: 'Helvetica, Arial, sans-serif',
            toolbar: {
                show: true,
                tools: {
                    download: true,
                    selection: false,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: false
                }
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }
        },
        colors: ['#00BFFF'], // Light Blue
        dataLabels: {
            enabled: false // Hide static labels on lines
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.4,
                opacityTo: 0.05,
                stops: [0, 90, 100]
            }
        },
        xaxis: {
            categories: categories,
            title: {
                text: 'Periodo Académico',
                style: {
                    color: '#6c757d',
                    fontWeight: 500
                }
            },
            labels: {
                style: {
                    colors: '#6c757d',
                }
            }
        },
        yaxis: {
            title: {
                text: 'Promedio Ponderado',
                style: {
                    color: '#6c757d',
                    fontWeight: 500,
                }
            },
            labels: {
                style: {
                    colors: '#6c757d',
                }
            },
            min: yMin,
            max: yMax,
            forceNiceScale: true
        },
        tooltip: {
            theme: 'light',
            y: {
                formatter: function (val) {
                    return val.toFixed(3);
                }
            }
        },
        markers: {
            size: 5,
            colors: ['#fff'],
            strokeColors: '#00BFFF',
            strokeWidth: 2,
            hover: {
                size: 7
            }
        }
    };
    
    if (historialChart) {
        historialChart.updateOptions(options);
    } else {
        const chartEl = document.querySelector("#chart");
        if(chartEl) {
            historialChart = new ApexCharts(chartEl, options);
            historialChart.render();
        }
    }
}
