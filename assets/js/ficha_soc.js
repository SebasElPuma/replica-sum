document.addEventListener('DOMContentLoaded', function() {

    function setSelectValue(selectElement, valOrText) {
        if (!selectElement || !valOrText) return;
        
        let matchedOption = Array.from(selectElement.options).find(
            opt => opt.value === valOrText || opt.text.trim().toUpperCase() === valOrText.trim().toUpperCase()
        );
        
        if (matchedOption) {
            selectElement.value = matchedOption.value;
        } else {
            let fallback = Array.from(selectElement.options).find(opt => opt.value === "00" || opt.value === "") || selectElement.options[0];
            if (fallback) {
                selectElement.value = fallback.value;
            }
        }
        
        const rendered = selectElement.nextElementSibling?.querySelector('.select2-selection__rendered');
        if (rendered) {
            rendered.textContent = selectElement.options[selectElement.selectedIndex]?.text || "- - -";
        }
    }

    const contenedorDatos = document.getElementById('contenedor-datos-personales');
    if (contenedorDatos && window.FormBlocks && window.FormBlocks.datosPersonales) {
        contenedorDatos.innerHTML = window.FormBlocks.datosPersonales;
    }

    const contenedorColegio = document.getElementById('contenedor-colegio');
    if (contenedorColegio && window.FormBlocks && window.FormBlocks.colegio) {
        contenedorColegio.innerHTML = window.FormBlocks.colegio;
    }

    const contenedorDependenciaEconomica = document.getElementById('contenedor-dependencia-economica');
    if (contenedorDependenciaEconomica && window.FormBlocks && window.FormBlocks.dependenciaEconomica) {
        contenedorDependenciaEconomica.innerHTML = window.FormBlocks.dependenciaEconomica;
    }

    const contenedorContacto = document.getElementById('contenedor-contacto');
    if (contenedorContacto && window.FormBlocks && window.FormBlocks.contactoEmergencia) {
        contenedorContacto.innerHTML = window.FormBlocks.contactoEmergencia;
    }

    const contenedorSalud = document.getElementById('contenedor-salud');
    if (contenedorSalud && window.FormBlocks && window.FormBlocks.salud) {
        contenedorSalud.innerHTML = window.FormBlocks.salud;
    }

    const contenedorInteresAcademico = document.getElementById('contenedor-interes-academico');
    if (contenedorInteresAcademico && window.FormBlocks && window.FormBlocks.interesAcademico) {
        contenedorInteresAcademico.innerHTML = window.FormBlocks.interesAcademico;
        
        if (window.PLAN_SISTEMAS_DATA) {
            const selectQuest2 = document.getElementById('quest2');
            if (selectQuest2) {
                selectQuest2.innerHTML = '<option value="" selected="">Seleccione Curso</option>';
                for (let ciclo in window.PLAN_SISTEMAS_DATA) {
                    window.PLAN_SISTEMAS_DATA[ciclo].forEach(curso => {
                        const option = document.createElement('option');
                        option.value = curso.Asignatura.split(' - ')[0];
                        option.textContent = curso.Asignatura;
                        selectQuest2.appendChild(option);
                    });
                }
            }
        }
    }
    
    const contenedorFamiliaSalud = document.getElementById('contenedor-familia-salud');
    if (contenedorFamiliaSalud && window.FormBlocks && window.FormBlocks.familiaSalud) {
        contenedorFamiliaSalud.innerHTML = window.FormBlocks.familiaSalud;
    }
    
    const contenedorTransporte = document.getElementById('contenedor-transporte');
    if (contenedorTransporte && window.FormBlocks && window.FormBlocks.transporte) {
        contenedorTransporte.innerHTML = window.FormBlocks.transporte;
    }

    const contenedorRecursosEstudio = document.getElementById('contenedor-recursos-estudio');
    if (contenedorRecursosEstudio && window.FormBlocks && window.FormBlocks.recursosEstudio) {
        contenedorRecursosEstudio.innerHTML = window.FormBlocks.recursosEstudio;
    }

    const contenedorVivienda = document.getElementById('contenedor-vivienda');
    if (contenedorVivienda && window.FormBlocks && window.FormBlocks.datosVivienda) {
        contenedorVivienda.innerHTML = window.FormBlocks.datosVivienda;
    }
    
    const contenedorSituacionEconomica = document.getElementById('contenedor-situacion-economica');
    if (contenedorSituacionEconomica && window.FormBlocks && window.FormBlocks.situacionEconomica) {
        contenedorSituacionEconomica.innerHTML = window.FormBlocks.situacionEconomica;
    }
    
    const contenedorRecreacion = document.getElementById('contenedor-recreacion');
    if (contenedorRecreacion && window.FormBlocks && window.FormBlocks.recreacion) {
        contenedorRecreacion.innerHTML = window.FormBlocks.recreacion;
    }
    
    const contenedorAptitudes = document.getElementById('contenedor-aptitudes');
    if (contenedorAptitudes && window.FormBlocks && window.FormBlocks.aptitudes) {
        contenedorAptitudes.innerHTML = window.FormBlocks.aptitudes;
    }
    
    const contenedorDescargar = document.getElementById('contenedor-descargar');
    if (contenedorDescargar && window.FormBlocks && window.FormBlocks.descargar) {
        contenedorDescargar.innerHTML = window.FormBlocks.descargar;
    }

    let perfilData = window.PERFIL_DEFAULT_DATA;
    try {
        const localData = localStorage.getItem('sum_perfil_data');
        if (localData) {
            perfilData = JSON.parse(localData);
        }
    } catch (e) {
        console.error("Error reading from localStorage", e);
    }

    if (perfilData && perfilData.datos_personales) {
        const dp = perfilData.datos_personales;
        
        // Nombres y Apellidos en el input sin name/id
        const inputs = document.querySelectorAll('#formDatosPersonales input');
        if (inputs.length >= 2) {
            // El primer input suele ser código (podemos sacarlo de academico si existe)
            if (perfilData.academico && perfilData.academico.codigoAlumno) {
                inputs[0].value = perfilData.academico.codigoAlumno;
            }
            const nameInput = document.getElementById('nombreEstudiante') || inputs[1];
            if (nameInput) nameInput.value = dp.apellidos + ", " + dp.nombres;
        }

        // Tipo de Documento
        const tipoDoc = document.getElementById('tiposDocumento');
        if (tipoDoc) {
            setSelectValue(tipoDoc, dp.tipoDocumento);
        }

        // Num Documento
        const numDoc = document.querySelector('input[name="numDocumento"]');
        if (numDoc) numDoc.value = dp.numDocumento;

        // Sexo
        const sexo = document.getElementById('sexos');
        if (sexo) {
            setSelectValue(sexo, dp.sexo);
        }

        // Estado Civil (S = Soltero, C = Casado etc)
        const estadoCivil = document.getElementById('estadosCiviles');
        if (estadoCivil) {
            let ecValue = "S";
            if (dp.estadoCivil.startsWith("Casado")) ecValue = "C";
            if (dp.estadoCivil.startsWith("Divorciado")) ecValue = "D";
            if (dp.estadoCivil.startsWith("Viudo")) ecValue = "V";
            setSelectValue(estadoCivil, ecValue);
        }
        // Etnia (Pueblos Indígenas / Afroperuano / Otro)
        if (dp.idPuebloOpc) {
            const pueblosOpc = document.getElementById('pueblosOpc');
            if (pueblosOpc) setSelectValue(pueblosOpc, dp.idPuebloOpc);
        }
        
        if (dp.idPueblo) {
            const pueblosSelect = document.getElementById('pueblos');
            if (pueblosSelect) setSelectValue(pueblosSelect, dp.idPueblo);
        }
        
        if (dp.otroGrupoEtnico) {
            const otroInput = document.getElementById('otroGrupoEtnico');
            if (otroInput) {
                otroInput.value = dp.otroGrupoEtnico;
                otroInput.title = dp.otroGrupoEtnico;
            }
        }

        // Lengua Materna (Opciones Indígenas)
        if (dp.idLenguaOpc) {
            const lenguasOpc = document.getElementById('lenguasOpc');
            if (lenguasOpc) setSelectValue(lenguasOpc, dp.idLenguaOpc);
        }
        
        if (dp.idLengua) {
            const lenguasSelect = document.getElementById('lenguas');
            if (lenguasSelect) setSelectValue(lenguasSelect, dp.idLengua);
        }
        
        // Religión, Lengua Materna (texto) y Facebook
        if (dp.religion) {
            const relInput = document.querySelector('input[name="religion"]');
            if (relInput) relInput.value = dp.religion;
        }
        
        if (dp.lenguaMaterna) {
            const lenInput = document.querySelector('input[name="lenguaMaterna"]');
            if (lenInput) lenInput.value = dp.lenguaMaterna;
        }
        
        if (perfilData.contacto && perfilData.contacto.cuentaFacebook !== undefined) {
            const fbInput = document.querySelector('input[name="cuentaFacebook"]');
            if (fbInput) fbInput.value = perfilData.contacto.cuentaFacebook;
        }

        // Ubicación Nacimiento

        // Ubicación Nacimiento
        if (dp.lugarNacimiento) {
            const nacPais = document.querySelector('select[name="codPaisNac"]');
            if (nacPais) setSelectValue(nacPais, dp.lugarNacimiento.pais);
            const nacDep = document.querySelector('select[name="codDepartamentoNac"]');
            if (nacDep) setSelectValue(nacDep, dp.lugarNacimiento.departamento);
            const nacProv = document.querySelector('select[name="codProvinciaNac"]');
            if (nacProv) setSelectValue(nacProv, dp.lugarNacimiento.provincia);
            const nacDist = document.querySelector('select[name="codDistritoNac"]');
            if (nacDist) setSelectValue(nacDist, dp.lugarNacimiento.distrito);
        }
        
        // Mapping Contacto info that appears in Datos Personales block
        if (perfilData.contacto) {
            const cont = perfilData.contacto;
            
            // Ubicación Dirección
            if (cont.ubicacionDir) {
                const dirDep = document.querySelector('select[name="codDepartamentoDir"]');
                if (dirDep) setSelectValue(dirDep, cont.ubicacionDir.departamento);
                const dirProv = document.querySelector('select[name="codProvinciaDir"]');
                if (dirProv) setSelectValue(dirProv, cont.ubicacionDir.provincia);
                const dirDist = document.querySelector('select[name="codDistritoDir"]');
                if (dirDist) setSelectValue(dirDist, cont.ubicacionDir.distrito);
            }
            
            // Dirección, Telefono, Celular, Correo
            const dirInput = document.querySelector('input[name="direccion"]');
            if (dirInput) dirInput.value = cont.direccion || '';
            
            const telInput = document.querySelector('input[name="telefono"]');
            if (telInput) telInput.value = cont.telefono || '';
            
            const celInput = document.querySelector('input[name="celular"]');
            if (celInput) celInput.value = cont.celular || '';
            
            const emailInput = document.querySelector('input[name="correoPersonal"]');
            if (emailInput) emailInput.value = cont.correoPersonal || '';
        }

        // Otros campos (Fecha nacimiento, etc)
        const fnInput = document.querySelector('input[name="fechaNacimiento"]');
        if (fnInput) fnInput.value = dp.fechaNacimiento || '';

    }

    if (perfilData && perfilData.academico && perfilData.academico.colegio) {
        const col = perfilData.academico.colegio;

        // Ubicacion (País, Dep, Prov, Dist)
        const selectPais = document.querySelector('select[name="codPaisCol"]');
        if (selectPais && col.ubicacion) setSelectValue(selectPais, col.ubicacion.pais);
        
        const selectDep = document.querySelector('select[name="codDepartamentoCol"]');
        if (selectDep && col.ubicacion) setSelectValue(selectDep, col.ubicacion.departamento);
        
        const selectProv = document.querySelector('select[name="codProvinciaCol"]');
        if (selectProv && col.ubicacion) setSelectValue(selectProv, col.ubicacion.provincia);
        
        const selectDist = document.querySelector('select[name="codDistritoCol"]');
        if (selectDist && col.ubicacion) setSelectValue(selectDist, col.ubicacion.distrito);
        
        const tipoCol = document.querySelector('select[name="codTipoColegio"]');
        if (tipoCol && col.nombre) {
            setSelectValue(tipoCol, col.nombre.toUpperCase());
        }

        const inputsCol = {
            'nombreColegio': col.nombre,
            'pagoMensualCol': col.pagoMensual
        };

        for (const [name, val] of Object.entries(inputsCol)) {
            const el = document.querySelector(`input[name="${name}"]`);
            if (el && val) el.value = val;
        }
        
        const anioCol = document.querySelector('select[name="anioConclusionCol"]');
        if (anioCol) {
            setSelectValue(anioCol, col.anioTermino);
        }

        const prepaUniv = document.querySelector('select[name="codTipoPrepaUniv"]');
        if (prepaUniv && col.tipoPreparacion) {
            setSelectValue(prepaUniv, col.tipoPreparacion);
        }
    }

    if (perfilData && perfilData.dependenciaEconomica) {
        const de = perfilData.dependenciaEconomica;
        const dependePadres = document.querySelector('select[name="codDependencia"]');
        if (dependePadres && de.dependePadres) setSelectValue(dependePadres, de.dependePadres);
        
        const numHijos = document.querySelector('input[name="numHijos"]');
        if (numHijos && de.numHijos !== undefined) numHijos.value = de.numHijos;
        
        const personasVive = document.querySelector('input[name="personasVive"]');
        if (personasVive && de.personasVive !== undefined) personasVive.value = de.personasVive;
        
        if (de.trabajo) {
            const tipTrabajos = document.querySelector('select[name="codTipTrabajo"]');
            if (tipTrabajos && de.trabajo.trabajaActualidad) {
                setSelectValue(tipTrabajos, de.trabajo.trabajaActualidad);
                // Trigger change to display dependent fields
                tipTrabajos.dispatchEvent(new Event('change'));
            }
            
            const traActividad = document.querySelector('input[name="traActividad"]');
            if (traActividad && de.trabajo.actividad !== undefined) traActividad.value = de.trabajo.actividad;
            
            const traTelefono = document.querySelector('input[name="traTelefono"]');
            if (traTelefono && de.trabajo.telefono !== undefined) traTelefono.value = de.trabajo.telefono;
            
            const traLugar = document.querySelector('input[name="traLugar"]');
            if (traLugar && de.trabajo.lugar !== undefined) traLugar.value = de.trabajo.lugar;
        }
    }

    if (perfilData && perfilData.emergencia) {
        const em = perfilData.emergencia;
        
        const mapInput = {
            'emerNombre': em.nombre,
            'emerTelefono': em.telefono,
            'emerCelular': em.celular,
            'emerParentesco': em.parentesco,
            'emerCorreo': em.correo,
            'emerDireccion': em.direccion
        };
        for (const [name, val] of Object.entries(mapInput)) {
            const el = document.querySelector(`input[name="${name}"]`);
            if (el && val !== undefined) el.value = val;
        }
        
        if (em.ubicacion) {
            const selectDep = document.querySelector('select[name="codEmerDirDepartamento"]');
            if (selectDep && em.ubicacion.departamento) setSelectValue(selectDep, em.ubicacion.departamento);
            
            const selectProv = document.querySelector('select[name="codEmerDirProvincia"]');
            if (selectProv && em.ubicacion.provincia) setSelectValue(selectProv, em.ubicacion.provincia);
            
            const selectDist = document.querySelector('select[name="codEmerDirDistrito"]');
            if (selectDist && em.ubicacion.distrito) setSelectValue(selectDist, em.ubicacion.distrito);
        }
        
        if (em.exterior) {
            const extInput = {
                'extNombre': em.exterior.nombre,
                'extTelefono': em.exterior.telefono,
                'extDireccion': em.exterior.direccion
            };
            for (const [name, val] of Object.entries(extInput)) {
                const el = document.querySelector(`input[name="${name}"]`);
                if (el && val !== undefined) el.value = val;
            }
        }
    }

    if (perfilData && perfilData.salud) {
        const sa = perfilData.salud;
        
        const segurosSalud = document.querySelector('select[name="codTipSeguro"]');
        if (segurosSalud) {
            let segVal = "";
            if (Array.isArray(sa.seguros) && sa.seguros.length > 0) {
                const s = sa.seguros[0].toUpperCase();
                if (s.includes('ESSALUD')) segVal = '1';
                else if (s.includes('SIS')) segVal = '2';
                else segVal = '0';
            } else if (typeof sa.seguros === 'string') {
                segVal = sa.seguros;
            }
            setSelectValue(segurosSalud, segVal);
            segurosSalud.dispatchEvent(new Event('change'));
        }
        
        const alergias = document.querySelector('textarea[name="alergias"]');
        if (alergias && sa.alergias) alergias.value = sa.alergias;
        
        const tipoSangre = document.querySelector('select[name="codTipSangre"]');
        if (tipoSangre && sa.tipoSangre) {
            // Mapping O+ to option 7, etc... Just let setSelectValue handle text matching
            setSelectValue(tipoSangre, sa.tipoSangre);
        }
        
        if (sa.discapacidad) {
            const tipoDiscapacidad = document.querySelector('select[name="codTipDiscapacidad"]');
            if (tipoDiscapacidad) {
                setSelectValue(tipoDiscapacidad, sa.discapacidad.tiene ? sa.discapacidad.tipo : '0');
                tipoDiscapacidad.dispatchEvent(new Event('change'));
            }
            const infoDiscapacidadText = document.querySelector('textarea[name="infoDiscapacidad"]');
            if (infoDiscapacidadText && sa.discapacidad.info) infoDiscapacidadText.value = sa.discapacidad.info;
            
            const conadis = document.querySelector('input[name="conadis"]');
            if (conadis && sa.discapacidad.conadis) conadis.value = sa.discapacidad.conadis;
        }
    }

    if (perfilData && perfilData.interesAcademico) {
        const ia = perfilData.interesAcademico;
        const selectQuest1 = document.querySelector('select[name="quest1"]');
        if (selectQuest1 && ia.sienteCarrera) setSelectValue(selectQuest1, ia.sienteCarrera);

        const selectQuest2 = document.querySelector('select[name="quest2"]');
        if (selectQuest2 && ia.cursoDificil) setSelectValue(selectQuest2, ia.cursoDificil);

        const quest3 = document.querySelector('textarea[name="quest3"]');
        if (quest3 && ia.motivoDificil) quest3.value = ia.motivoDificil;

        const selectQuest4 = document.querySelector('select[name="quest4"]');
        if (selectQuest4 && ia.motivadoCarrera) setSelectValue(selectQuest4, ia.motivadoCarrera);

        const selectQuest5 = document.querySelector('select[name="quest5"]');
        if (selectQuest5 && ia.profesoresMotivan) setSelectValue(selectQuest5, ia.profesoresMotivan);

        const quest6 = document.querySelector('textarea[name="quest6"]');
        if (quest6 && ia.areaAgrada) quest6.value = ia.areaAgrada;

        const quest7 = document.querySelector('textarea[name="quest7"]');
        if (quest7 && ia.areaEspecializacion) quest7.value = ia.areaEspecializacion;
    }

    if (perfilData && perfilData.transporte) {
        const tr = perfilData.transporte;
        
        const residenteUniv = document.querySelector('select[name="questA"]');
        if (residenteUniv && tr.residente) setSelectValue(residenteUniv, tr.residente);
        
        const mediosTransporte = document.querySelector('select[name="questB"]');
        if (mediosTransporte && tr.medio) setSelectValue(mediosTransporte, tr.medio);
        
        const tiempoDemora = document.querySelector('input[name="questC"]');
        if (tiempoDemora && tr.tiempo) tiempoDemora.value = tr.tiempo;
    }

    if (perfilData && perfilData.recursosEstudio) {
        const re = perfilData.recursosEstudio;
        
        const transporteRecursos = document.querySelector('select[name="transporte"]');
        if (transporteRecursos && re.transporte) setSelectValue(transporteRecursos, re.transporte);
        
        const accesoInternet = document.querySelector('select[name="internet"]');
        if (accesoInternet && re.internet) setSelectValue(accesoInternet, re.internet);
        
        const accesoBibliotecas = document.querySelector('select[name="biblioteca"]');
        if (accesoBibliotecas && re.biblioteca) setSelectValue(accesoBibliotecas, re.biblioteca);
        
        const alimentacion = document.querySelector('select[name="alimentacion"]');
        if (alimentacion && re.alimentacion) setSelectValue(alimentacion, re.alimentacion);
        
        const becas = document.querySelector('select[name="beca"]');
        if (becas && re.beca) setSelectValue(becas, re.beca);
    }

    if (perfilData && perfilData.datosVivienda) {
        const dv = perfilData.datosVivienda;

        const populateViviendaSelect = (name, val, conditionalId, textName, textVal) => {
            const selectEl = document.querySelector(`select[name="${name}"]`);
            if (selectEl && val) {
                setSelectValue(selectEl, val);
                if (val === '0') {
                    const textContainer = document.getElementById(conditionalId);
                    if (textContainer) textContainer.style.display = 'block';
                    const textArea = document.querySelector(`textarea[name="${textName}"]`);
                    if (textArea) textArea.value = textVal || '';
                }
            }
        };

        populateViviendaSelect('codTenenciaVivienda', dv.codTenenciaVivienda, 'otrosTenVivienda', 'otrosTenVivienda', dv.otrosTenVivienda);
        
        const numHabitacion = document.querySelector('input[name="numHabitacion"]');
        if (numHabitacion && dv.numHabitacion) numHabitacion.value = dv.numHabitacion;
        
        const sisfoh = document.querySelector('select[name="codSisfoh"]');
        if (sisfoh && dv.codSisfoh) setSelectValue(sisfoh, dv.codSisfoh);

        populateViviendaSelect('codTipoVivienda', dv.codTipoVivienda, 'otrosTipVivienda', 'otrosTipVivienda', dv.otrosTipVivienda);
        populateViviendaSelect('codTechoVivienda', dv.codTechoVivienda, 'otrosTipTecho', 'otrosTipTecho', dv.otrosTipTecho);
        populateViviendaSelect('codParedVivienda', dv.codParedVivienda, 'otrosTipPared', 'otrosTipPared', dv.otrosTipPared);
        populateViviendaSelect('codPisoVivienda', dv.codPisoVivienda, 'otrosTipPiso', 'otrosTipPiso', dv.otrosTipPiso);
        populateViviendaSelect('codAguaVivienda', dv.codAguaVivienda, 'otrosTipAgua', 'otrosTipAgua', dv.otrosTipAgua);
        populateViviendaSelect('codDesagueVivienda', dv.codDesagueVivienda, 'otrosTipDesague', 'otrosTipDesague', dv.otrosTipDesague);

        const electricidad = document.querySelector('select[name="electricidad"]');
        if (electricidad && dv.electricidad) setSelectValue(electricidad, dv.electricidad);
        
        const telefono = document.querySelector('select[name="telefono"]');
        if (telefono && dv.telefono) setSelectValue(telefono, dv.telefono);
        
        const cable = document.querySelector('select[name="cable"]');
        if (cable && dv.cable) setSelectValue(cable, dv.cable);
        
        const internetVivienda = document.querySelector('select[name="internetVivienda"]');
        if (internetVivienda && dv.internetVivienda) setSelectValue(internetVivienda, dv.internetVivienda);
        
        const otrosVivienda = document.querySelector('textarea[name="otrosVivienda"]');
        if (otrosVivienda && dv.otrosVivienda) otrosVivienda.value = dv.otrosVivienda;
    }

    if (perfilData && perfilData.situacionEconomica) {
        const se = perfilData.situacionEconomica;
        const setInputValue = (name, value) => {
            const el = document.querySelector(`input[name="${name}"]`);
            if (el && value !== undefined) el.value = value;
        };
        
        setInputValue('ingEstudiante', se.ingEstudiante);
        setInputValue('ingFamilia', se.ingFamilia);
        setInputValue('ingBeca', se.ingBeca);
        setInputValue('ingOtro', se.ingOtro);

        setInputValue('famAlimentacion', se.famAlimentacion);
        setInputValue('famMovilidad', se.famMovilidad);
        setInputValue('famVivienda', se.famVivienda);
        setInputValue('famServicio', se.famServicio);
        setInputValue('famSalud', se.famSalud);
        setInputValue('famEducacion', se.famEducacion);
        setInputValue('famRecreacion', se.famRecreacion);
        setInputValue('famDeuda', se.famDeuda);
        setInputValue('famOtro', se.famOtro);

        setInputValue('estAlimentacion', se.estAlimentacion);
        setInputValue('estMovilidad', se.estMovilidad);
        setInputValue('estVivienda', se.estVivienda);
        setInputValue('estServicio', se.estServicio);
        setInputValue('estSalud', se.estSalud);
        setInputValue('estEducacion', se.estEducacion);
        setInputValue('estRecreacion', se.estRecreacion);
        setInputValue('estDeuda', se.estDeuda);
        setInputValue('estOtro', se.estOtro);
    }

    if (perfilData && perfilData.recreacion) {
        const rec = perfilData.recreacion;
        const setTextareaValue = (name, value) => {
            const el = document.querySelector(`textarea[name="${name}"]`);
            if (el && value !== undefined) el.value = value;
        };
        setTextareaValue('deporte', rec.deporte);
        setTextareaValue('arte', rec.arte);
        setTextareaValue('social', rec.social);
        setTextareaValue('agrupacion', rec.agrupacion);
    }

    if (perfilData && perfilData.aptitudes) {
        const apt = perfilData.aptitudes;
        const checkboxes = document.querySelectorAll('#formAptitudesHabilidad input[type="checkbox"]');
        checkboxes.forEach(cb => {
            const val = apt[cb.name];
            if (val === "SI") {
                cb.checked = true;
            } else {
                cb.checked = false;
            }
        });
    }

    // Inicializar Select2 nativo si está disponible
    if (typeof jQuery !== 'undefined' && $.fn.select2) {
        $('.select2').select2({
            theme: "bootstrap"
        });
    }



    // Habilitar botón Modificar en Datos Personales
    const btnModificarDP = document.getElementById('modificarDatos');
    const btnGuardarDP = document.getElementById('guardarDatos');
    if (btnModificarDP && btnGuardarDP) {
        btnModificarDP.addEventListener('click', function() {
            const form = document.getElementById('formDatosPersonales');
            if (form) {
                const elements = form.querySelectorAll('.elemento-desactivable, input[name="numDocumento"], input[name="fechaNacimiento"]');
                elements.forEach(el => {
                    el.removeAttribute('disabled');
                });
                
                if (typeof jQuery !== 'undefined' && $.fn.select2) {
                    $(form).find('.select2').prop('disabled', false).trigger('change.select2');
                }
                
                const inputOriginal = document.getElementById('nombreEstudiante');
                const contEdit = document.getElementById('contenedorNombreEdit');
                if (inputOriginal && contEdit) {
                    inputOriginal.classList.add('d-none');
                    contEdit.classList.remove('d-none');
                    document.getElementById('editApellidos').value = perfilData.datos_personales.apellidos || '';
                    document.getElementById('editNombres').value = perfilData.datos_personales.nombres || '';
                }
            }
            btnModificarDP.classList.add('d-none');
            btnGuardarDP.classList.remove('d-none');
            btnGuardarDP.removeAttribute('disabled');
        });
        
        btnGuardarDP.addEventListener('click', function() {
            const form = document.getElementById('formDatosPersonales');
            if (form) {
                const elements = form.querySelectorAll('.elemento-desactivable, input[name="numDocumento"], input[name="fechaNacimiento"]');
                elements.forEach(el => {
                    el.setAttribute('disabled', 'true');
                });
                
                if (typeof jQuery !== 'undefined' && $.fn.select2) {
                    $(form).find('.select2').prop('disabled', true).trigger('change.select2');
                }

                if (!perfilData.datos_personales) perfilData.datos_personales = {};
                if (!perfilData.contacto) perfilData.contacto = {};
                if (!perfilData.contacto.ubicacionDir) perfilData.contacto.ubicacionDir = {};
                
                const dp = perfilData.datos_personales;
                const cont = perfilData.contacto;
                
                const safeValue = (selector) => {
                    const el = form.querySelector(selector);
                    return el ? el.value : '';
                };

                const contEdit = document.getElementById('contenedorNombreEdit');
                if (contEdit && !contEdit.classList.contains('d-none')) {
                    const editApellidos = document.getElementById('editApellidos');
                    const editNombres = document.getElementById('editNombres');
                    const inputOriginal = document.getElementById('nombreEstudiante');
                    if (editApellidos && editNombres) {
                        dp.apellidos = editApellidos.value.toUpperCase();
                        dp.nombres = editNombres.value.toUpperCase();
                        if (inputOriginal) {
                            inputOriginal.value = dp.apellidos + ", " + dp.nombres;
                            inputOriginal.classList.remove('d-none');
                        }
                        contEdit.classList.add('d-none');
                    }
                }

                dp.tipoDocumento = safeValue('#tiposDocumento');
                dp.numDocumento = safeValue('input[name="numDocumento"]');
                dp.sexo = safeValue('#sexos');
                
                const ec = safeValue('#estadosCiviles');
                if (ec === 'S') dp.estadoCivil = "Soltero(a)";
                else if (ec === 'C') dp.estadoCivil = "Casado(a)";
                else if (ec === 'D') dp.estadoCivil = "Divorciado(a)";
                else if (ec === 'V') dp.estadoCivil = "Viudo(a)";
                
                dp.fechaNacimiento = safeValue('input[name="fechaNacimiento"]');
                
                if (!dp.lugarNacimiento) dp.lugarNacimiento = {};
                dp.lugarNacimiento.pais = safeValue('select[name="codPaisNac"]');
                dp.lugarNacimiento.departamento = safeValue('select[name="codDepartamentoNac"]');
                dp.lugarNacimiento.provincia = safeValue('select[name="codProvinciaNac"]');
                dp.lugarNacimiento.distrito = safeValue('select[name="codDistritoNac"]');
                
                dp.idPuebloOpc = safeValue('#pueblosOpc');
                dp.idPueblo = safeValue('#pueblos');
                dp.otroGrupoEtnico = safeValue('#otroGrupoEtnico');
                
                dp.idLenguaOpc = safeValue('#lenguasOpc');
                dp.idLengua = safeValue('#lenguas');
                
                cont.ubicacionDir.departamento = safeValue('select[name="codDepartamentoDir"]');
                cont.ubicacionDir.provincia = safeValue('select[name="codProvinciaDir"]');
                cont.ubicacionDir.distrito = safeValue('select[name="codDistritoDir"]');
                cont.direccion = safeValue('input[name="direccion"]');
                cont.telefono = safeValue('input[name="telefono"]');
                cont.celular = safeValue('input[name="celular"]');
                cont.correoPersonal = safeValue('input[name="correoPersonal"]');
                
                dp.religion = safeValue('input[name="religion"]');
                dp.lenguaMaterna = safeValue('input[name="lenguaMaterna"]');
                cont.cuentaFacebook = safeValue('input[name="cuentaFacebook"]');
                
                localStorage.setItem('sum_perfil_data', JSON.stringify(perfilData));
            }
            btnGuardarDP.classList.add('d-none');
            btnModificarDP.classList.remove('d-none');
            
            const btnContainer = btnGuardarDP.parentElement;
            let msg = document.getElementById('saveMsg');
            if (!msg) {
                msg = document.createElement('span');
                msg.id = 'saveMsg';
                msg.style.color = 'green';
                msg.style.marginLeft = '10px';
                btnContainer.appendChild(msg);
            }
            msg.textContent = '¡Guardado correctamente!';
            setTimeout(() => { msg.textContent = ''; }, 3000);
        });
    }

    // Lógica para Dependencia Económica
    const tipTrabajos = document.getElementById('tipTrabajos');
    if (tipTrabajos) {
        tipTrabajos.addEventListener('change', function(e) {
            const val = e.target.value;
            const trabajoActividad = document.getElementById('trabajoActividad');
            const trabajoTelefono = document.getElementById('trabajoTelefono');
            const trabajoLugar = document.getElementById('trabajoLugar');
            
            if (val === 'SMV' || val === 'SNV') {
                if(trabajoActividad) trabajoActividad.style.display = 'block';
                if(trabajoTelefono) trabajoTelefono.style.display = 'block';
                if(trabajoLugar) trabajoLugar.style.display = 'block';
            } else {
                if(trabajoActividad) trabajoActividad.style.display = 'none';
                if(trabajoTelefono) trabajoTelefono.style.display = 'none';
                if(trabajoLugar) trabajoLugar.style.display = 'none';
            }
        });
    }

    const btnModificarDE = document.getElementById('modificarDependenciaEconomica');
    const btnGuardarDE = document.getElementById('guardarDependenciaEconomica');
    if (btnModificarDE && btnGuardarDE) {
        btnModificarDE.addEventListener('click', function() {
            const form = document.getElementById('formDependenciaEconomica');
            if (form) {
                const elements = form.querySelectorAll('.elemento-desactivable');
                elements.forEach(el => {
                    el.removeAttribute('disabled');
                });
                
                if (typeof jQuery !== 'undefined' && $.fn.select2) {
                    $(form).find('.select2').prop('disabled', false).trigger('change.select2');
                }
            }
            btnModificarDE.classList.add('d-none');
            btnGuardarDE.classList.remove('d-none');
            btnGuardarDE.removeAttribute('disabled');
        });
        
        btnGuardarDE.addEventListener('click', function() {
            const form = document.getElementById('formDependenciaEconomica');
            if (form) {
                const elements = form.querySelectorAll('.elemento-desactivable');
                elements.forEach(el => {
                    el.setAttribute('disabled', 'true');
                });
                
                if (typeof jQuery !== 'undefined' && $.fn.select2) {
                    $(form).find('.select2').prop('disabled', true).trigger('change.select2');
                }

                if (!perfilData.dependenciaEconomica) perfilData.dependenciaEconomica = {};
                if (!perfilData.dependenciaEconomica.trabajo) perfilData.dependenciaEconomica.trabajo = {};
                
                const de = perfilData.dependenciaEconomica;
                const safeValue = (selector) => {
                    const el = form.querySelector(selector);
                    return el ? el.value : '';
                };

                de.dependePadres = safeValue('select[name="codDependencia"]');
                de.numHijos = safeValue('input[name="numHijos"]');
                de.personasVive = safeValue('input[name="personasVive"]');
                de.trabajo.trabajaActualidad = safeValue('select[name="codTipTrabajo"]');
                de.trabajo.actividad = safeValue('input[name="traActividad"]');
                de.trabajo.telefono = safeValue('input[name="traTelefono"]');
                de.trabajo.lugar = safeValue('input[name="traLugar"]');
                
                localStorage.setItem('sum_perfil_data', JSON.stringify(perfilData));
            }
            btnGuardarDE.classList.add('d-none');
            btnModificarDE.classList.remove('d-none');
            
            const btnContainer = btnGuardarDE.parentElement;
            let msg = document.getElementById('saveMsgDE');
            if (!msg) {
                msg = document.createElement('span');
                msg.id = 'saveMsgDE';
                msg.style.color = 'green';
                msg.style.marginLeft = '10px';
                btnContainer.appendChild(msg);
            }
            msg.textContent = '¡Guardado correctamente!';
            setTimeout(() => { msg.textContent = ''; }, 3000);
        });
    }

    // Lógica para Colegio de Procedencia
    const btnModificarColegio = document.getElementById('modificarDatosColegio');
    const btnGuardarColegio = document.getElementById('guardarDatosColegio');
    if (btnModificarColegio && btnGuardarColegio) {
        btnModificarColegio.addEventListener('click', function() {
            const form = document.getElementById('formColegioProcedencia');
            if (form) {
                const elements = form.querySelectorAll('.elemento-desactivable');
                elements.forEach(el => {
                    el.removeAttribute('disabled');
                });
                
                if (typeof jQuery !== 'undefined' && $.fn.select2) {
                    $(form).find('.select2').prop('disabled', false).trigger('change.select2');
                }
            }
            btnModificarColegio.classList.add('d-none');
            btnGuardarColegio.classList.remove('d-none');
            btnGuardarColegio.removeAttribute('disabled');
        });
        
        btnGuardarColegio.addEventListener('click', function() {
            const form = document.getElementById('formColegioProcedencia');
            if (form) {
                const elements = form.querySelectorAll('.elemento-desactivable');
                elements.forEach(el => {
                    el.setAttribute('disabled', 'true');
                });
                
                if (typeof jQuery !== 'undefined' && $.fn.select2) {
                    $(form).find('.select2').prop('disabled', true).trigger('change.select2');
                }
                
                if (!perfilData.academico) perfilData.academico = {};
                if (!perfilData.academico.colegio) perfilData.academico.colegio = {};
                if (!perfilData.academico.colegio.ubicacion) perfilData.academico.colegio.ubicacion = {};
                
                const col = perfilData.academico.colegio;
                const safeValue = (selector) => {
                    const el = form.querySelector(selector);
                    return el ? el.value : '';
                };

                col.ubicacion.pais = safeValue('select[name="codPaisCol"]');
                col.ubicacion.departamento = safeValue('select[name="codDepartamentoCol"]');
                col.ubicacion.provincia = safeValue('select[name="codProvinciaCol"]');
                col.ubicacion.distrito = safeValue('select[name="codDistritoCol"]');
                col.tipo = safeValue('select[name="codTipoColegio"]');
                col.nombre = safeValue('input[name="nombreColegio"]');
                col.pagoMensual = safeValue('input[name="pagoMensualCol"]');
                col.anioTermino = safeValue('select[name="anioConclusionCol"]');
                col.tipoPreparacion = safeValue('select[name="codTipoPrepaUniv"]');
                
                localStorage.setItem('sum_perfil_data', JSON.stringify(perfilData));
            }
            btnGuardarColegio.classList.add('d-none');
            btnModificarColegio.classList.remove('d-none');
            
            const btnContainer = btnGuardarColegio.parentElement;
            let msg = document.getElementById('saveMsgColegio');
            if (!msg) {
                msg = document.createElement('span');
                msg.id = 'saveMsgColegio';
                msg.style.color = 'green';
                msg.style.marginLeft = '10px';
                btnContainer.appendChild(msg);
            }
            msg.textContent = '¡Guardado correctamente!';
            setTimeout(() => { msg.textContent = ''; }, 3000);
        });
    }

    // Lógica para Contacto de Emergencia
    const btnModificarContacto = document.getElementById('modificarContactoEmergencia');
    const btnGuardarContacto = document.getElementById('guardarContactoEmergencia');
    if (btnModificarContacto && btnGuardarContacto) {
        btnModificarContacto.addEventListener('click', function() {
            const form = document.getElementById('formContactoEmergencia');
            if (form) {
                const elements = form.querySelectorAll('.elemento-desactivable');
                elements.forEach(el => {
                    el.removeAttribute('disabled');
                });
                
                if (typeof jQuery !== 'undefined' && $.fn.select2) {
                    $(form).find('.select2').prop('disabled', false).trigger('change.select2');
                }
            }
            btnModificarContacto.classList.add('d-none');
            btnGuardarContacto.classList.remove('d-none');
            btnGuardarContacto.removeAttribute('disabled');
        });
        
        btnGuardarContacto.addEventListener('click', function() {
            const form = document.getElementById('formContactoEmergencia');
            if (form) {
                const elements = form.querySelectorAll('.elemento-desactivable');
                elements.forEach(el => {
                    el.setAttribute('disabled', 'true');
                });
                
                if (typeof jQuery !== 'undefined' && $.fn.select2) {
                    $(form).find('.select2').prop('disabled', true).trigger('change.select2');
                }
                
                if (!perfilData.emergencia) perfilData.emergencia = {};
                if (!perfilData.emergencia.ubicacion) perfilData.emergencia.ubicacion = {};
                if (!perfilData.emergencia.exterior) perfilData.emergencia.exterior = {};
                
                const em = perfilData.emergencia;
                const safeValue = (selector) => {
                    const el = form.querySelector(selector);
                    return el ? el.value : '';
                };

                em.nombre = safeValue('input[name="emerNombre"]');
                em.telefono = safeValue('input[name="emerTelefono"]');
                em.celular = safeValue('input[name="emerCelular"]');
                em.parentesco = safeValue('input[name="emerParentesco"]');
                em.correo = safeValue('input[name="emerCorreo"]');
                em.direccion = safeValue('input[name="emerDireccion"]');
                
                em.ubicacion.departamento = safeValue('select[name="codEmerDirDepartamento"]');
                em.ubicacion.provincia = safeValue('select[name="codEmerDirProvincia"]');
                em.ubicacion.distrito = safeValue('select[name="codEmerDirDistrito"]');
                
                em.exterior.nombre = safeValue('input[name="extNombre"]');
                em.exterior.telefono = safeValue('input[name="extTelefono"]');
                em.exterior.direccion = safeValue('input[name="extDireccion"]');
                
                localStorage.setItem('sum_perfil_data', JSON.stringify(perfilData));
            }
            btnGuardarContacto.classList.add('d-none');
            btnModificarContacto.classList.remove('d-none');
            
            const btnContainer = btnGuardarContacto.parentElement;
            let msg = document.getElementById('saveMsgContacto');
            if (!msg) {
                msg = document.createElement('span');
                msg.id = 'saveMsgContacto';
                msg.style.color = 'green';
                msg.style.marginLeft = '10px';
                btnContainer.appendChild(msg);
            }
            msg.textContent = '¡Guardado correctamente!';
            setTimeout(() => { msg.textContent = ''; }, 3000);
        });
    }

    // Lógica para Salud
    const segurosSalud = document.getElementById('segurosSalud');
    if (segurosSalud) {
        segurosSalud.addEventListener('change', function(e) {
            const otrosSeguro = document.getElementById('otrosSeguro');
            if (otrosSeguro) {
                otrosSeguro.style.display = e.target.value === '0' ? 'block' : 'none';
            }
        });
    }

    const tipoDiscapacidad = document.getElementById('tipoDiscapacidad');
    if (tipoDiscapacidad) {
        tipoDiscapacidad.addEventListener('change', function(e) {
            const infoDiscapacidad = document.getElementById('infoDiscapacidad');
            const conadisDiv = document.getElementById('conadisDiv');
            const show = e.target.value !== '0' && e.target.value !== '';
            if (infoDiscapacidad) infoDiscapacidad.style.display = show ? 'block' : 'none';
            if (conadisDiv) conadisDiv.style.display = show ? 'block' : 'none';
        });
    }

    const btnModificarSalud = document.getElementById('modificarSalud');
    const btnGuardarSalud = document.getElementById('guardarSalud');
    if (btnModificarSalud && btnGuardarSalud) {
        btnModificarSalud.addEventListener('click', function() {
            const form = document.getElementById('formSalud');
            if (form) {
                const elements = form.querySelectorAll('.elemento-desactivable');
                elements.forEach(el => el.removeAttribute('disabled'));
                if (typeof jQuery !== 'undefined' && $.fn.select2) {
                    $(form).find('.select2').prop('disabled', false).trigger('change.select2');
                }
            }
            btnModificarSalud.classList.add('d-none');
            btnGuardarSalud.classList.remove('d-none');
            btnGuardarSalud.removeAttribute('disabled');
        });
        
        btnGuardarSalud.addEventListener('click', function() {
            const form = document.getElementById('formSalud');
            if (form) {
                const elements = form.querySelectorAll('.elemento-desactivable');
                elements.forEach(el => el.setAttribute('disabled', 'true'));
                if (typeof jQuery !== 'undefined' && $.fn.select2) {
                    $(form).find('.select2').prop('disabled', true).trigger('change.select2');
                }
                
                if (!perfilData.salud) perfilData.salud = {};
                if (!perfilData.salud.discapacidad) perfilData.salud.discapacidad = {};
                
                const sa = perfilData.salud;
                const safeValue = (selector) => {
                    const el = form.querySelector(selector);
                    return el ? el.value : '';
                };

                const segVal = safeValue('select[name="codTipSeguro"]');
                sa.seguros = [segVal];
                if (segVal === '0') {
                    sa.otrosSeguro = safeValue('textarea[name="otrosSeguro"]');
                }
                
                sa.alergias = safeValue('textarea[name="alergias"]');
                
                const selectSangre = form.querySelector('select[name="codTipSangre"]');
                if (selectSangre && selectSangre.options[selectSangre.selectedIndex]) {
                    sa.tipoSangre = selectSangre.options[selectSangre.selectedIndex].text;
                }
                
                const discVal = safeValue('select[name="codTipDiscapacidad"]');
                sa.discapacidad.tiene = (discVal !== '0' && discVal !== '');
                sa.discapacidad.tipo = discVal;
                if (sa.discapacidad.tiene) {
                    sa.discapacidad.info = safeValue('textarea[name="infoDiscapacidad"]');
                    sa.discapacidad.conadis = safeValue('input[name="conadis"]');
                } else {
                    sa.discapacidad.info = "";
                    sa.discapacidad.conadis = "";
                }
                
                localStorage.setItem('sum_perfil_data', JSON.stringify(perfilData));
            }
            btnGuardarSalud.classList.add('d-none');
            btnModificarSalud.classList.remove('d-none');
            
            const btnContainer = btnGuardarSalud.parentElement;
            let msg = document.getElementById('saveMsgSalud');
            if (!msg) {
                msg = document.createElement('span');
                msg.id = 'saveMsgSalud';
                msg.style.color = 'green';
                msg.style.marginLeft = '10px';
                btnContainer.appendChild(msg);
            }
            msg.textContent = '¡Guardado correctamente!';
            setTimeout(() => { msg.textContent = ''; }, 3000);
        });
    }

    // Lógica para Interés Académico
    const btnModificarInteres = document.getElementById('modificarInteresAcademico');
    const btnGuardarInteres = document.getElementById('guardarInteresAcademico');
    if (btnModificarInteres && btnGuardarInteres) {
        btnModificarInteres.addEventListener('click', function() {
            const form = document.getElementById('formInteresAcademico');
            if (form) {
                const elements = form.querySelectorAll('.elemento-desactivable');
                elements.forEach(el => el.removeAttribute('disabled'));
                if (typeof jQuery !== 'undefined' && $.fn.select2) {
                    $(form).find('.select2').prop('disabled', false).trigger('change.select2');
                }
            }
            btnModificarInteres.classList.add('d-none');
            btnGuardarInteres.classList.remove('d-none');
            btnGuardarInteres.removeAttribute('disabled');
        });

        btnGuardarInteres.addEventListener('click', function() {
            const form = document.getElementById('formInteresAcademico');
            if (form) {
                const elements = form.querySelectorAll('.elemento-desactivable');
                elements.forEach(el => el.setAttribute('disabled', 'true'));
                if (typeof jQuery !== 'undefined' && $.fn.select2) {
                    $(form).find('.select2').prop('disabled', true).trigger('change.select2');
                }

                if (!perfilData.interesAcademico) perfilData.interesAcademico = {};

                const ia = perfilData.interesAcademico;
                const safeValue = (selector) => {
                    const el = form.querySelector(selector);
                    return el ? el.value : '';
                };

                ia.sienteCarrera = safeValue('select[name="quest1"]');
                ia.cursoDificil = safeValue('select[name="quest2"]');
                ia.motivoDificil = safeValue('textarea[name="quest3"]');
                ia.motivadoCarrera = safeValue('select[name="quest4"]');
                ia.profesoresMotivan = safeValue('select[name="quest5"]');
                ia.areaAgrada = safeValue('textarea[name="quest6"]');
                ia.areaEspecializacion = safeValue('textarea[name="quest7"]');

                localStorage.setItem('sum_perfil_data', JSON.stringify(perfilData));
            }
            btnGuardarInteres.classList.add('d-none');
            btnModificarInteres.classList.remove('d-none');

            const btnContainer = btnGuardarInteres.parentElement;
            let msg = document.getElementById('saveMsgInteres');
            if (!msg) {
                msg = document.createElement('span');
                msg.id = 'saveMsgInteres';
                msg.style.color = 'green';
                msg.style.marginLeft = '10px';
                btnContainer.appendChild(msg);
            }
            msg.textContent = '¡Guardado correctamente!';
            setTimeout(() => { msg.textContent = ''; }, 3000);
        });
    }

    // Lógica para Transporte
    const btnModificarTransporte = document.getElementById('modificarTransporte');
    const btnGuardarTransporte = document.getElementById('guardarTransporte');
    if (btnModificarTransporte && btnGuardarTransporte) {
        btnModificarTransporte.addEventListener('click', function() {
            const form = document.getElementById('formTransporte');
            if (form) {
                const elements = form.querySelectorAll('.elemento-desactivable');
                elements.forEach(el => el.removeAttribute('disabled'));
                if (typeof jQuery !== 'undefined' && $.fn.select2) {
                    $(form).find('.select2').prop('disabled', false).trigger('change.select2');
                }
            }
            btnModificarTransporte.classList.add('d-none');
            btnGuardarTransporte.classList.remove('d-none');
            btnGuardarTransporte.removeAttribute('disabled');
        });

        btnGuardarTransporte.addEventListener('click', function() {
            const form = document.getElementById('formTransporte');
            if (form) {
                const elements = form.querySelectorAll('.elemento-desactivable');
                elements.forEach(el => el.setAttribute('disabled', 'true'));
                if (typeof jQuery !== 'undefined' && $.fn.select2) {
                    $(form).find('.select2').prop('disabled', true).trigger('change.select2');
                }

                if (!perfilData.transporte) perfilData.transporte = {};

                const tr = perfilData.transporte;
                const safeValue = (selector) => {
                    const el = form.querySelector(selector);
                    return el ? el.value : '';
                };

                tr.residente = safeValue('select[name="questA"]');
                tr.medio = safeValue('select[name="questB"]');
                tr.tiempo = safeValue('input[name="questC"]');

                localStorage.setItem('sum_perfil_data', JSON.stringify(perfilData));
            }
            btnGuardarTransporte.classList.add('d-none');
            btnModificarTransporte.classList.remove('d-none');

            const btnContainer = btnGuardarTransporte.parentElement;
            let msg = document.getElementById('saveMsgTransporte');
            if (!msg) {
                msg = document.createElement('span');
                msg.id = 'saveMsgTransporte';
                msg.style.color = 'green';
                msg.style.marginLeft = '10px';
                btnContainer.appendChild(msg);
            }
            msg.textContent = '¡Guardado correctamente!';
            setTimeout(() => { msg.textContent = ''; }, 3000);
        });
    }

    // Lógica para Recursos de Estudio
    const btnModificarRecursosEstudio = document.getElementById('modificarRecursosEstudio');
    const btnGuardarRecursosEstudio = document.getElementById('guardarRecursosEstudio');
    if (btnModificarRecursosEstudio && btnGuardarRecursosEstudio) {
        btnModificarRecursosEstudio.addEventListener('click', function() {
            const form = document.getElementById('formRecursosEstudio');
            if (form) {
                const elements = form.querySelectorAll('.elemento-desactivable');
                elements.forEach(el => el.removeAttribute('disabled'));
                if (typeof jQuery !== 'undefined' && $.fn.select2) {
                    $(form).find('.select2').prop('disabled', false).trigger('change.select2');
                }
            }
            btnModificarRecursosEstudio.classList.add('d-none');
            btnGuardarRecursosEstudio.classList.remove('d-none');
            btnGuardarRecursosEstudio.removeAttribute('disabled');
        });

        btnGuardarRecursosEstudio.addEventListener('click', function() {
            const form = document.getElementById('formRecursosEstudio');
            if (form) {
                const elements = form.querySelectorAll('.elemento-desactivable');
                elements.forEach(el => el.setAttribute('disabled', 'true'));
                if (typeof jQuery !== 'undefined' && $.fn.select2) {
                    $(form).find('.select2').prop('disabled', true).trigger('change.select2');
                }

                if (!perfilData.recursosEstudio) perfilData.recursosEstudio = {};

                const re = perfilData.recursosEstudio;
                const safeValue = (selector) => {
                    const el = form.querySelector(selector);
                    return el ? el.value : '';
                };

                re.transporte = safeValue('select[name="transporte"]');
                re.internet = safeValue('select[name="internet"]');
                re.biblioteca = safeValue('select[name="biblioteca"]');
                re.alimentacion = safeValue('select[name="alimentacion"]');
                re.beca = safeValue('select[name="beca"]');

                localStorage.setItem('sum_perfil_data', JSON.stringify(perfilData));
            }
            btnGuardarRecursosEstudio.classList.add('d-none');
            btnModificarRecursosEstudio.classList.remove('d-none');

            const btnContainer = btnGuardarRecursosEstudio.parentElement;
            let msg = document.getElementById('saveMsgRecursosEstudio');
            if (!msg) {
                msg = document.createElement('span');
                msg.id = 'saveMsgRecursosEstudio';
                msg.style.color = 'green';
                msg.style.marginLeft = '10px';
                btnContainer.appendChild(msg);
            }
            msg.textContent = '¡Guardado correctamente!';
            setTimeout(() => { msg.textContent = ''; }, 3000);
        });
    }

    // Lógica para Datos Vivienda
    const bindViviendaSelectEvent = (selectName, conditionalId) => {
        const select = document.querySelector(`select[name="${selectName}"]`);
        if (select) {
            select.addEventListener('change', function() {
                const container = document.getElementById(conditionalId);
                if (container) {
                    if (select.value === '0') {
                        container.style.display = 'block';
                    } else {
                        container.style.display = 'none';
                        const textarea = container.querySelector('textarea');
                        if (textarea) textarea.value = '';
                    }
                }
            });
        }
    };

    bindViviendaSelectEvent('codTenenciaVivienda', 'otrosTenVivienda');
    bindViviendaSelectEvent('codTipoVivienda', 'otrosTipVivienda');
    bindViviendaSelectEvent('codTechoVivienda', 'otrosTipTecho');
    bindViviendaSelectEvent('codParedVivienda', 'otrosTipPared');
    bindViviendaSelectEvent('codPisoVivienda', 'otrosTipPiso');
    bindViviendaSelectEvent('codAguaVivienda', 'otrosTipAgua');
    bindViviendaSelectEvent('codDesagueVivienda', 'otrosTipDesague');

    const btnModificarDatosVivienda = document.getElementById('modificarDatosVivienda');
    const btnGuardarDatosVivienda = document.getElementById('guardarDatosVivienda');
    if (btnModificarDatosVivienda && btnGuardarDatosVivienda) {
        btnModificarDatosVivienda.addEventListener('click', function() {
            const form = document.getElementById('formDatosVivienda');
            if (form) {
                const elements = form.querySelectorAll('.elemento-desactivable');
                elements.forEach(el => el.removeAttribute('disabled'));
                if (typeof jQuery !== 'undefined' && $.fn.select2) {
                    $(form).find('.select2').prop('disabled', false).trigger('change.select2');
                }
            }
            btnModificarDatosVivienda.classList.add('d-none');
            btnGuardarDatosVivienda.classList.remove('d-none');
            btnGuardarDatosVivienda.removeAttribute('disabled');
        });

        btnGuardarDatosVivienda.addEventListener('click', function() {
            const form = document.getElementById('formDatosVivienda');
            if (form) {
                const elements = form.querySelectorAll('.elemento-desactivable');
                elements.forEach(el => el.setAttribute('disabled', 'true'));
                if (typeof jQuery !== 'undefined' && $.fn.select2) {
                    $(form).find('.select2').prop('disabled', true).trigger('change.select2');
                }

                if (!perfilData.datosVivienda) perfilData.datosVivienda = {};

                const dv = perfilData.datosVivienda;
                const safeValue = (selector) => {
                    const el = form.querySelector(selector);
                    return el ? el.value : '';
                };

                dv.codTenenciaVivienda = safeValue('select[name="codTenenciaVivienda"]');
                dv.otrosTenVivienda = dv.codTenenciaVivienda === '0' ? safeValue('textarea[name="otrosTenVivienda"]') : '';
                dv.numHabitacion = safeValue('input[name="numHabitacion"]');
                dv.codSisfoh = safeValue('select[name="codSisfoh"]');
                dv.codTipoVivienda = safeValue('select[name="codTipoVivienda"]');
                dv.otrosTipVivienda = dv.codTipoVivienda === '0' ? safeValue('textarea[name="otrosTipVivienda"]') : '';
                dv.codTechoVivienda = safeValue('select[name="codTechoVivienda"]');
                dv.otrosTipTecho = dv.codTechoVivienda === '0' ? safeValue('textarea[name="otrosTipTecho"]') : '';
                dv.codParedVivienda = safeValue('select[name="codParedVivienda"]');
                dv.otrosTipPared = dv.codParedVivienda === '0' ? safeValue('textarea[name="otrosTipPared"]') : '';
                dv.codPisoVivienda = safeValue('select[name="codPisoVivienda"]');
                dv.otrosTipPiso = dv.codPisoVivienda === '0' ? safeValue('textarea[name="otrosTipPiso"]') : '';
                dv.codAguaVivienda = safeValue('select[name="codAguaVivienda"]');
                dv.otrosTipAgua = dv.codAguaVivienda === '0' ? safeValue('textarea[name="otrosTipAgua"]') : '';
                dv.codDesagueVivienda = safeValue('select[name="codDesagueVivienda"]');
                dv.otrosTipDesague = dv.codDesagueVivienda === '0' ? safeValue('textarea[name="otrosTipDesague"]') : '';
                dv.electricidad = safeValue('select[name="electricidad"]');
                dv.telefono = safeValue('select[name="telefono"]');
                dv.cable = safeValue('select[name="cable"]');
                dv.internetVivienda = safeValue('select[name="internetVivienda"]');
                dv.otrosVivienda = safeValue('textarea[name="otrosVivienda"]');

                localStorage.setItem('sum_perfil_data', JSON.stringify(perfilData));
            }
            btnGuardarDatosVivienda.classList.add('d-none');
            btnModificarDatosVivienda.classList.remove('d-none');

            const btnContainer = btnGuardarDatosVivienda.parentElement;
            let msg = document.getElementById('saveMsgDatosVivienda');
            if (!msg) {
                msg = document.createElement('span');
                msg.id = 'saveMsgDatosVivienda';
                msg.style.color = 'green';
                msg.style.marginLeft = '10px';
                btnContainer.appendChild(msg);
            }
            msg.textContent = '¡Guardado correctamente!';
            setTimeout(() => { msg.textContent = ''; }, 3000);
        });
    }

    // Lógica para Situación Económica
    const btnModificarSituacionEconomica = document.getElementById('modificarSituacionEconomica');
    const btnGuardarSituacionEconomica = document.getElementById('guardarSituacionEconomica');
    if (btnModificarSituacionEconomica && btnGuardarSituacionEconomica) {
        btnModificarSituacionEconomica.addEventListener('click', function() {
            const form = document.getElementById('formSituacionEconomica');
            if (form) {
                const elements = form.querySelectorAll('.elemento-desactivable');
                elements.forEach(el => el.removeAttribute('disabled'));
            }
            btnModificarSituacionEconomica.classList.add('d-none');
            btnGuardarSituacionEconomica.classList.remove('d-none');
            btnGuardarSituacionEconomica.removeAttribute('disabled');
        });

        btnGuardarSituacionEconomica.addEventListener('click', function() {
            const form = document.getElementById('formSituacionEconomica');
            if (form) {
                const elements = form.querySelectorAll('.elemento-desactivable');
                elements.forEach(el => el.setAttribute('disabled', 'true'));

                if (!perfilData.situacionEconomica) perfilData.situacionEconomica = {};

                const se = perfilData.situacionEconomica;
                const safeValue = (name) => {
                    const el = form.querySelector(`input[name="${name}"]`);
                    return el ? el.value : '';
                };

                se.ingEstudiante = safeValue('ingEstudiante');
                se.ingFamilia = safeValue('ingFamilia');
                se.ingBeca = safeValue('ingBeca');
                se.ingOtro = safeValue('ingOtro');

                se.famAlimentacion = safeValue('famAlimentacion');
                se.famMovilidad = safeValue('famMovilidad');
                se.famVivienda = safeValue('famVivienda');
                se.famServicio = safeValue('famServicio');
                se.famSalud = safeValue('famSalud');
                se.famEducacion = safeValue('famEducacion');
                se.famRecreacion = safeValue('famRecreacion');
                se.famDeuda = safeValue('famDeuda');
                se.famOtro = safeValue('famOtro');

                se.estAlimentacion = safeValue('estAlimentacion');
                se.estMovilidad = safeValue('estMovilidad');
                se.estVivienda = safeValue('estVivienda');
                se.estServicio = safeValue('estServicio');
                se.estSalud = safeValue('estSalud');
                se.estEducacion = safeValue('estEducacion');
                se.estRecreacion = safeValue('estRecreacion');
                se.estDeuda = safeValue('estDeuda');
                se.estOtro = safeValue('estOtro');

                localStorage.setItem('sum_perfil_data', JSON.stringify(perfilData));
            }
            btnGuardarSituacionEconomica.classList.add('d-none');
            btnModificarSituacionEconomica.classList.remove('d-none');

            const btnContainer = btnGuardarSituacionEconomica.parentElement;
            let msg = document.getElementById('saveMsgSituacionEconomica');
            if (!msg) {
                msg = document.createElement('span');
                msg.id = 'saveMsgSituacionEconomica';
                msg.style.color = 'green';
                msg.style.marginLeft = '10px';
                btnContainer.appendChild(msg);
            }
            msg.textContent = '¡Guardado correctamente!';
            setTimeout(() => { msg.textContent = ''; }, 3000);
        });
    }

    // Lógica para Recreación
    const btnModificarRecreacion = document.getElementById('modificarRecreacion');
    const btnGuardarRecreacion = document.getElementById('guardarRecreacion');
    if (btnModificarRecreacion && btnGuardarRecreacion) {
        btnModificarRecreacion.addEventListener('click', function() {
            const form = document.getElementById('formRecreacion');
            if (form) {
                const elements = form.querySelectorAll('.elemento-desactivable');
                elements.forEach(el => el.removeAttribute('disabled'));
            }
            btnModificarRecreacion.classList.add('d-none');
            btnGuardarRecreacion.classList.remove('d-none');
            btnGuardarRecreacion.removeAttribute('disabled');
        });

        btnGuardarRecreacion.addEventListener('click', function() {
            const form = document.getElementById('formRecreacion');
            if (form) {
                const elements = form.querySelectorAll('.elemento-desactivable');
                elements.forEach(el => el.setAttribute('disabled', 'true'));

                if (!perfilData.recreacion) perfilData.recreacion = {};

                const rec = perfilData.recreacion;
                const safeValue = (name) => {
                    const el = form.querySelector(`textarea[name="${name}"]`);
                    return el ? el.value : '';
                };

                rec.deporte = safeValue('deporte');
                rec.arte = safeValue('arte');
                rec.social = safeValue('social');
                rec.agrupacion = safeValue('agrupacion');

                localStorage.setItem('sum_perfil_data', JSON.stringify(perfilData));
            }
            btnGuardarRecreacion.classList.add('d-none');
            btnModificarRecreacion.classList.remove('d-none');

            const btnContainer = btnGuardarRecreacion.parentElement;
            let msg = document.getElementById('saveMsgRecreacion');
            if (!msg) {
                msg = document.createElement('span');
                msg.id = 'saveMsgRecreacion';
                msg.style.color = 'green';
                msg.style.marginLeft = '10px';
                btnContainer.appendChild(msg);
            }
            msg.textContent = '¡Guardado correctamente!';
            setTimeout(() => { msg.textContent = ''; }, 3000);
        });
    }

    // Lógica para Familia y Salud
    const gridFamilia = document.getElementById('familia-grid');
    if (gridFamilia) {
        window.renderFamiliaCards = function() {
            gridFamilia.innerHTML = '';
            
            if (!perfilData.familia) perfilData.familia = [];
            
            perfilData.familia.forEach((fam, index) => {
                let initial = fam.nombre ? fam.nombre.charAt(0).toUpperCase() : '?';
                let card = document.createElement('div');
                card.className = 'family-card';
                card.innerHTML = `
                    <div class="family-actions">
                        <button type="button" class="family-btn edit" onclick="window.editarFamilia(${index})" title="Editar"><i class="fa-solid fa-pen"></i></button>
                        <button type="button" class="family-btn delete" onclick="window.eliminarFamilia(${index})" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
                    </div>
                    <div class="family-card-header">
                        <div class="family-avatar">${initial}</div>
                        <div>
                            <h3 class="family-name">${fam.nombre || 'Sin nombre'}</h3>
                            <span class="family-relation">${fam.parentesco || '-'}</span>
                        </div>
                    </div>
                    <div class="family-details">
                        <p><span>Edad:</span> <strong>${fam.edad || '-'}</strong></p>
                        <p><span>Ocupación:</span> <strong>${fam.ocupacion || '-'}</strong></p>
                        <p><span>Aporte:</span> <strong>S/. ${fam.aporteEconomico || '0'}</strong></p>
                    </div>
                `;
                gridFamilia.appendChild(card);
            });
            
            let addCard = document.createElement('button');
            addCard.className = 'family-card family-card-add';
            addCard.type = 'button';
            addCard.onclick = window.abrirModalFamilia;
            addCard.innerHTML = `
                <i class="fa-solid fa-plus"></i>
                <span style="font-weight: 600; font-size: 1.1rem;">Añadir Familiar</span>
            `;
            gridFamilia.appendChild(addCard);
        };
        
        const modalFamilia = document.getElementById('familiaModal');
        const formModal = document.getElementById('formFamiliaModal');
        
        window.abrirModalFamilia = function() {
            formModal.reset();
            document.getElementById('familiaIndex').value = '-1';
            document.getElementById('modalFamiliaTitle').textContent = 'Añadir Familiar';
            modalFamilia.classList.add('active');
        };
        
        window.cerrarModalFamilia = function() {
            modalFamilia.classList.remove('active');
        };
        
        window.editarFamilia = function(index) {
            let fam = perfilData.familia[index];
            if(!fam) return;
            
            document.getElementById('familiaIndex').value = index;
            document.getElementById('modalFamiliaTitle').textContent = 'Editar Familiar';
            
            document.getElementById('famNombre').value = fam.nombre || '';
            document.getElementById('famParentesco').value = fam.parentesco || '';
            document.getElementById('famEdad').value = fam.edad || '';
            document.getElementById('famGrado').value = fam.grado || '';
            document.getElementById('famOcupacion').value = fam.ocupacion || '';
            document.getElementById('famCondicion').value = fam.condicionLaboral || '';
            document.getElementById('famAporte').value = fam.aporteEconomico || '';
            document.getElementById('famEnfermedad').value = fam.enfermedad || '';
            document.getElementById('famDiscapacidad').value = fam.discapacidad || '';
            
            modalFamilia.classList.add('active');
        };
        
        window.eliminarFamilia = function(index) {
            perfilData.familia.splice(index, 1);
            localStorage.setItem('sum_perfil_data', JSON.stringify(perfilData));
            window.renderFamiliaCards();
        };
        
        document.getElementById('btnCerrarModalFamilia').addEventListener('click', window.cerrarModalFamilia);
        document.getElementById('btnCancelarModalFamilia').addEventListener('click', window.cerrarModalFamilia);
        
        formModal.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let index = parseInt(document.getElementById('familiaIndex').value);
            
            let fam = {
                nombre: document.getElementById('famNombre').value,
                parentesco: document.getElementById('famParentesco').value,
                edad: document.getElementById('famEdad').value,
                grado: document.getElementById('famGrado').value,
                ocupacion: document.getElementById('famOcupacion').value,
                condicionLaboral: document.getElementById('famCondicion').value,
                aporteEconomico: document.getElementById('famAporte').value,
                enfermedad: document.getElementById('famEnfermedad').value,
                discapacidad: document.getElementById('famDiscapacidad').value
            };
            
            if(!perfilData.familia) perfilData.familia = [];
            
            if(index >= 0) {
                perfilData.familia[index] = fam;
            } else {
                perfilData.familia.push(fam);
            }
            
            localStorage.setItem('sum_perfil_data', JSON.stringify(perfilData));
            window.renderFamiliaCards();
            window.cerrarModalFamilia();
        });
        
        // Initial render
        window.renderFamiliaCards();
    }

    // Lógica para Aptitudes
    const btnModificarAptitudes = document.getElementById('modificarAptitudesHabilidad');
    const btnGuardarAptitudes = document.getElementById('guardarAptitudesHabilidad');
    if (btnModificarAptitudes && btnGuardarAptitudes) {
        btnModificarAptitudes.addEventListener('click', function() {
            const form = document.getElementById('formAptitudesHabilidad');
            if (form) {
                const elements = form.querySelectorAll('.elemento-desactivable');
                elements.forEach(el => el.removeAttribute('disabled'));
            }
            btnModificarAptitudes.classList.add('d-none');
            btnGuardarAptitudes.classList.remove('d-none');
            btnGuardarAptitudes.removeAttribute('disabled');
        });

        btnGuardarAptitudes.addEventListener('click', function() {
            const form = document.getElementById('formAptitudesHabilidad');
            if (form) {
                const elements = form.querySelectorAll('.elemento-desactivable');
                elements.forEach(el => el.setAttribute('disabled', 'true'));

                if (!perfilData.aptitudes) perfilData.aptitudes = {};

                const apt = perfilData.aptitudes;
                
                // Checkboxes
                const checkboxes = form.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(cb => {
                    apt[cb.name] = cb.checked ? "SI" : "NO";
                });
                
                // Textareas
                const textareas = form.querySelectorAll('textarea');
                textareas.forEach(ta => {
                    apt[ta.name] = ta.value;
                });

                localStorage.setItem('sum_perfil_data', JSON.stringify(perfilData));
            }
            btnGuardarAptitudes.classList.add('d-none');
            btnModificarAptitudes.classList.remove('d-none');

            const btnContainer = btnGuardarAptitudes.parentElement;
            let msg = document.getElementById('saveMsgAptitudes');
            if (!msg) {
                msg = document.createElement('span');
                msg.id = 'saveMsgAptitudes';
                msg.style.color = 'green';
                msg.style.marginLeft = '10px';
                btnContainer.appendChild(msg);
            }
            msg.textContent = '¡Guardado correctamente!';
            setTimeout(() => { msg.textContent = ''; }, 3000);
        });
    }

    // Interceptar clics en el menú lateral para un scroll perfecto
    document.querySelectorAll('.demo-page-navigation a').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    e.preventDefault();
                    // Si son las últimas secciones, alineamos al fondo (end) para no generar espacio vacío extra
                    if (targetId === '#descargar' || targetId === '#aptitudesHabilidad' || targetId === '#recreacion') {
                        if (targetEl.parentElement) {
                            targetEl.parentElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
                        }
                    } else {
                        // Para las demás, alineamos arriba normalmente
                        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
});