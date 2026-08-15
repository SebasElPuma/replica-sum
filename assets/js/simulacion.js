document.addEventListener('DOMContentLoaded', () => {
    let preMatData = localStorage.getItem('sum_rep_premat_data');
    if (!preMatData) {
        preMatData = window.REP_PREMAT_DEFAULT_DATA;
    } else {
        try { preMatData = JSON.parse(preMatData); } 
        catch(e) { preMatData = window.REP_PREMAT_DEFAULT_DATA; }
    }

    let progData = localStorage.getItem('sum_prog_asig_data');
    if (!progData) {
        progData = window.PROGRAMACION_DEFAULT_DATA;
    } else {
        try { progData = JSON.parse(progData); } 
        catch(e) { progData = window.PROGRAMACION_DEFAULT_DATA; }
    }

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
        document.getElementById('lbl-escuela').innerText = resumenData.escuela;
        document.getElementById('lbl-facultad').innerText = resumenData.facultad;
        document.getElementById('lbl-plan').innerText = resumenData.plan;
        document.getElementById('lbl-especialidad').innerText = resumenData.especialidad;
        document.getElementById('lbl-sede').innerText = resumenData.sede || 'Ciudad Universitaria';
    }

    const tbody = document.getElementById('tbodySimulacion');
    const cursos = preMatData && preMatData.cursos ? preMatData.cursos : [];
    let selectedSections = {}; // track selected sections: { index: seccion_id }

    // Render table
    function renderTable() {
        tbody.innerHTML = '';

        cursos.forEach((curso, index) => {

            const row = document.createElement('tr');
            
            const selected = selectedSections[index] ? `<span class="label-primary" style="padding: 4px 8px; font-size: 13px;">${selectedSections[index]}</span>` : '-';

            row.innerHTML = `
                <td class="align-middle"><span class="badge badge-secondary" style="font-size: 13px; background-color: #adb5bd; color: #000;">${curso.ciclo}</span></td>
                <td class="align-middle">${curso.etapa === 'M' ? 'O - Obligatorio' : 'E - Electivo'}</td>
                <td class="align-middle text-left" style="font-size: 13px;">${curso.asignatura}</td>
                <td class="align-middle">${curso.creditos}</td>
                <td class="align-middle font-weight-bold" id="seccion-elegida-${index}">${selected}</td>
                <td class="align-middle">
                    <button class="btn btn-warning btn-sm btn-elegir" data-index="${index}" style="background-color: #ffc107; border-color: #ffc107; border-radius: 4px;">
                        <i class="fa-solid fa-hand-pointer text-dark"></i>
                    </button>
                    ${selectedSections[index] ? `
                    <button class="btn btn-danger btn-sm btn-quitar ml-1" data-index="${index}" style="border-radius: 4px;">
                        <i class="fa-solid fa-trash text-white"></i>
                    </button>
                    ` : ''}
                </td>
            `;
            tbody.appendChild(row);
        });
        
        updateStats();
    }

    renderTable();

    let currentSelectingIndex = null;

    // Ensure modal is a direct child of body to avoid CSS transform/z-index issues
    const modalEl = document.getElementById('modalSecciones');
    if (modalEl) {
        document.body.appendChild(modalEl);
    }

    // Modal Logic
    document.body.addEventListener('click', (e) => {
        const btnQuitar = e.target.closest('.btn-quitar');
        if (btnQuitar) {
            const idx = parseInt(btnQuitar.getAttribute('data-index'));
            delete selectedSections[idx];
            renderTable();
            return;
        }

        const btn = e.target.closest('.btn-elegir');
        if (btn) {
            console.log('Botón elegir sección clickeado. data-index:', btn.getAttribute('data-index'));
            try {
            currentSelectingIndex = parseInt(btn.getAttribute('data-index'));
            const curso = cursos[currentSelectingIndex];
            
            document.getElementById('modal-curso-nombre').innerText = curso.asignatura;
            
            const tbodySecciones = document.getElementById('tbodySecciones');
            tbodySecciones.innerHTML = '';

            // Find sections in progData
            let foundSections = [];
            if (progData && progData.planes) {
                progData.planes.forEach(plan => {
                    plan.ciclos.forEach(ciclo => {
                        ciclo.cursos.forEach(c => {
                            if (c.asignatura === curso.asignatura) {
                                foundSections.push(c);
                            }
                        });
                    });
                });
            }

            // Mock some sections if none found
            if (foundSections.length === 0) {
                const numSec = Math.floor(Math.random() * 3) + 1;
                for (let i = 1; i <= numSec; i++) {
                    const vac = Math.floor(Math.random() * 45) + 1;
                    const matric = Math.floor(Math.random() * vac);
                    foundSections.push({
                        seccion: i.toString(),
                        horarios: "LUNES 08:00 - 10:00\nMIERCOLES 08:00 - 10:00",
                        aula: "101",
                        docente: "DOCENTE PRUEBA " + i,
                        matriculados: (i===1) ? 45 : matric, // force one full for testing
                        tope: (i===1) ? 45 : vac
                    });
                }
            }

            foundSections.forEach((sec, idx) => {
                const tr = document.createElement('tr');
                const isFull = sec.matriculados >= sec.tope;
                
                let selectedHtml = isFull 
                    ? `<span class="badge badge-warning" style="background-color: #ffc107; color: #212529; font-size: 13px; padding: 5px 10px;">Sección llena</span>`
                    : `<input type="radio" name="radio-seccion" value="${sec.seccion}" ${selectedSections[currentSelectingIndex] === sec.seccion ? 'checked' : ''} style="transform: scale(1.5);">`;

                tr.innerHTML = `
                    <td class="align-middle text-left" style="white-space: pre-line; font-size: 12px;">${sec.horarios}</td>
                      <td class="align-middle">
                        <span class="label-primary" style="padding: 4px 8px; font-size: 13px;">${sec.seccion}</span>
                      </td>
                    <td class="align-middle">${sec.aula}</td>
                    <td class="align-middle text-left" style="font-size: 12px;">${sec.docente}</td>
                    <td class="align-middle">${sec.matriculados} / ${sec.tope}</td>
                    <td class="align-middle" style="font-size: 12px;">2100 - FACULTAD DE CIENCIAS ECONÓMICAS</td>
                    <td class="align-middle">${selectedHtml}</td>
                `;
                tbodySecciones.appendChild(tr);
            });

            const modalEl = document.getElementById('modalSecciones');
            if (modalEl) {
                console.log('Mostrando modal', modalEl);
                modalEl.style.display = 'block';
                modalEl.style.background = 'rgba(0,0,0,0.5)';
                modalEl.removeAttribute('aria-hidden');
                setTimeout(() => modalEl.classList.add('show'), 10);
                document.getElementById('btn-aceptar-seccion').disabled = !selectedSections[currentSelectingIndex];
            } else {
                console.error('No se encontró modalSecciones en el DOM');
            }
            } catch (err) {
                console.error('Error al abrir modal:', err);
                alert('Error al abrir modal: ' + err.message);
            }
        }
    });

    document.getElementById('btn-aceptar-seccion').addEventListener('click', () => {
        const radio = document.querySelector('input[name="radio-seccion"]:checked');
        if (radio) {
            selectedSections[currentSelectingIndex] = radio.value;
            renderTable();
            const modalEl = document.getElementById('modalSecciones');
            modalEl.classList.remove('show');
            setTimeout(() => modalEl.style.display = 'none', 150);
        } else {
            alert('Por favor seleccione una sección.');
        }
    });

    function updateStats() {
        let creds = 0;
        let asigs = 0;
        cursos.forEach((curso, idx) => {
            if (selectedSections[idx]) {
                creds += parseFloat(curso.creditos);
                asigs++;
            }
        });
        document.getElementById('lbl-creditos-matriculados').innerText = creds;
        document.getElementById('lbl-asignaturas-matriculadas').innerText = asigs;
    }

    
    document.getElementById('btn-ejecutar').addEventListener('click', () => {
        let totalCreditos = parseFloat(document.getElementById('lbl-creditos-matriculados').innerText);
        if (totalCreditos < 12) {
            Swal.fire({
                backdrop: 'rgba(0,0,0,0.5)',
                heightAuto: false,
                title: 'Aviso',
                text: 'No puede ejecutar la matrícula con menos de 12 créditos.',
                icon: 'error',
                confirmButtonColor: '#2ecc71',
                confirmButtonText: '<span style="font-weight: bold;">ACEPTAR</span>'
            });
            return;
        }

        Swal.fire({
            backdrop: 'rgba(0,0,0,0.5)',
            heightAuto: false,
            title: '<h3 style="font-weight: bold; color: #333;">Aviso</h3>',
            html: '<p style="color: #666; font-size: 15px;">Revise cuidadosamente las asignaturas seleccionadas. ¿Está seguro de ejecutar la matrícula?</p>',
            iconHtml: '<i class="fa-solid fa-triangle-exclamation icon-alerta-animado" style="color: #b3b3b3; font-size: 60px;"></i>',
            customClass: { icon: 'border-0' },
            showCancelButton: true,
            confirmButtonColor: '#2ecc71',
            cancelButtonColor: '#d3d3d3',
            confirmButtonText: '<span style="font-weight: bold;">EJECUTAR</span>',
            cancelButtonText: '<span style="font-weight: bold; color: #333;">CANCELAR</span>',
            reverseButtons: false
        }).then((result) => {
            if (result.isConfirmed) {
                let mp = document.getElementById('modalProgreso');
                if(mp) {
                    // Eliminamos temporalmente la transición de entrada para que el fondo oscuro asuma
                    // inmediatamente y tape la salida del aviso, evitando el parpadeo blanco.
                    mp.style.transition = 'none';
                    mp.style.display = 'block';
                    mp.style.background = 'rgba(0,0,0,0.5)';
                    mp.classList.add('show');
                    
                    setTimeout(() => {
                        mp.style.transition = ''; // Restauramos transición para su salida
                    }, 100);
                }
                let bar = document.getElementById('progreso-bar');
                let width = 0;
                let interval = setInterval(() => {
                    width += 10;
                    bar.style.width = width + '%';
                    if (width >= 100) {
                        clearInterval(interval);
                        setTimeout(() => {
                            let mp = document.getElementById('modalProgreso');
                            if(mp) {
                                mp.classList.remove('show');
                                setTimeout(() => mp.style.display = 'none', 150);
                            }
                            
                            // Remove any backdrop
                            document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
                            document.body.classList.remove('modal-open');

                            Swal.fire({
                                backdrop: 'rgba(0,0,0,0.5)',
                                heightAuto: false,
                                title: '<h3 style="font-weight: bold; color: #333;">Aviso</h3>',
                                html: '<p style="color: #666; font-size: 15px; font-weight: bold;">La Matrícula se registró exitosamente. Lo estamos redireccionando a su reporte de matrícula.</p>',
                                iconHtml: '<i class="fa-solid fa-thumbs-up" style="color: #2ecc71; font-size: 60px;"></i>',
                                customClass: { icon: 'border-0' },
                                showConfirmButton: true,
                                confirmButtonColor: '#f8f9fa',
                                confirmButtonText: '<span style="font-weight: bold; color: #6c757d;">REDIRECCIONANDO...</span>',
                                allowOutsideClick: false,
                                didOpen: () => {
                                    Swal.showLoading();
                                    
                                    // Guardar estado matriculado
                                    localStorage.setItem('sum_matricula_realizada', 'true');

                                    // Generar data para reporte de matricula
                                    let repMatData = {
                                        cursos: []
                                    };
                                    cursos.forEach((curso, idx) => {
                                        if (selectedSections[idx]) {
                                            repMatData.cursos.push({
                                                ciclo: curso.ciclo,
                                                asignatura: curso.asignatura,
                                                creditos: curso.creditos,
                                                seccion: selectedSections[idx]
                                            });
                                        }
                                    });
                                    localStorage.setItem('sum_rep_mat_data', JSON.stringify(repMatData));

                                    setTimeout(() => {
                                        window.location.href = '../reportes/rep_matricula.html';
                                    }, 2000);
                                }
                            });
                        }, 500);
                    }
                }, 200);
            }
        });
    });

    // Manual modal close logic
    document.querySelectorAll('[data-dismiss="modal"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalEl = document.getElementById('modalSecciones');
            if (modalEl) {
                modalEl.classList.remove('show');
                setTimeout(() => modalEl.style.display = 'none', 150);
            }
        });
    });
});

document.body.addEventListener('change', (e) => {
    if (e.target.name === 'radio-seccion') {
        const btn = document.getElementById('btn-aceptar-seccion');
        if (btn) btn.disabled = false;
    }
});
