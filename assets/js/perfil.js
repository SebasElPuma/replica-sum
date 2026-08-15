document.addEventListener('DOMContentLoaded', function() {
    // Accordion Logic
    const labels = document.querySelectorAll(".accordion-item__label");
    const tabs = document.querySelectorAll(".accordion-tab");

    function toggleShow(e) {
        const target = e.currentTarget;
        const item = target.classList.contains("accordion-tab") ? target : target.parentElement;
        const group = item.dataset.actabGroup;
        const id = item.dataset.actabId;

        tabs.forEach(function(tab) {
            if (tab.dataset.actabGroup === group) {
                if (tab.dataset.actabId === id) {
                    tab.classList.add("accordion-active");
                } else {
                    tab.classList.remove("accordion-active");
                }
            }
        });

        labels.forEach(function(label) {
            const tabItem = label.parentElement;
            if (tabItem.dataset.actabGroup === group) {
                if (tabItem.dataset.actabId === id) {
                    tabItem.classList.add("accordion-active");
                } else {
                    tabItem.classList.remove("accordion-active");
                }
            }
        });
    }

    labels.forEach(function(label) {
        label.addEventListener("click", toggleShow);
    });

    tabs.forEach(function(tab) {
        tab.addEventListener("click", toggleShow);
    });

    // Fetch and populate profile data
    let perfilData = window.PERFIL_DEFAULT_DATA;
    try {
        const localData = localStorage.getItem('sum_perfil_data');
        if (localData) {
            perfilData = JSON.parse(localData);
        }
    } catch (e) {
        console.error("Error reading from localStorage", e);
    }
    
    if (perfilData) {
        const perfil = perfilData;

            // Header bindings
            const spCodigoTop = document.getElementById("spCodigoTop");
            if (spCodigoTop) spCodigoTop.textContent = perfil.academico.codigoAlumno;
            
            const spPromedioTop = document.getElementById("spPromedioTop");
            if (spPromedioTop) spPromedioTop.textContent = perfil.academico.promedio;
            
            document.getElementById("spDni").textContent = perfil.datos_personales.tipoDocumento + " - " + perfil.datos_personales.numDocumento;
            document.getElementById("spEstadoCivil").textContent = perfil.datos_personales.estadoCivil;
            document.getElementById("spSexo").textContent = perfil.datos_personales.sexo === "M" ? "Masculino" : "Femenino";
            
            const fotoEl = document.getElementById("foto");
            // La foto ahora es manejada globalmente por dashboard.js y foto_default.js
            // para soportar persistencia local y Base64.
            
            document.getElementById("spFechaNac").textContent = perfil.datos_personales.fechaNacimiento;
            document.getElementById("spLugarNac").textContent = perfil.datos_personales.lugarNacimiento.departamento + " / " + perfil.datos_personales.lugarNacimiento.provincia + " / " + perfil.datos_personales.lugarNacimiento.distrito;
            
            document.getElementById("spTelefono").textContent = perfil.contacto.telefono;
            document.getElementById("spCelular").textContent = perfil.contacto.celular;
            document.getElementById("spCorreoInst").textContent = perfil.contacto.correoInstitucional;
            document.getElementById("spCorreoPers").textContent = perfil.contacto.correoPersonal;
            document.getElementById("spDomicilio").textContent = perfil.contacto.ubicacionDir.departamento + " / " + perfil.contacto.ubicacionDir.provincia + " / " + perfil.contacto.ubicacionDir.distrito;
            document.getElementById("spDireccion").textContent = perfil.contacto.direccion;

            document.getElementById("spAnioIngreso").textContent = perfil.academico.anioIngreso;
            document.getElementById("spModIngreso").textContent = perfil.academico.codTipoIngreso + " - " + perfil.academico.desTipoIngreso;
            document.getElementById("spColeProc").textContent = perfil.academico.colegio.nombre;
            document.getElementById("spAnioEstudio").textContent = perfil.academico.anioEstudio;
            
            let resumenData = window.RESUMEN_DEFAULT_DATA;
            try {
                const localRes = localStorage.getItem('sum_resumen_data');
                if (localRes) {
                    resumenData = JSON.parse(localRes);
                }
            } catch (e) {
                console.error("Error reading resumen from localStorage", e);
            }

            // New academic fields
            const spFacultad = document.getElementById("spFacultad");
            if(spFacultad) spFacultad.textContent = resumenData.facultad;
            
            const spEscuela = document.getElementById("spEscuela");
            if(spEscuela) spEscuela.textContent = resumenData.escuela;
            
            const spEspecialidad = document.getElementById("spEspecialidad");
            if(spEspecialidad) spEspecialidad.textContent = resumenData.especialidad;
            
            const spPlanEstudios = document.getElementById("spPlanEstudios");
            if(spPlanEstudios) spPlanEstudios.textContent = resumenData.plan;
            
            const spPromedio = document.getElementById("spPromedio");
            spPromedio.textContent = perfil.academico.promedio;
            if (parseFloat(perfil.academico.promedio) < 10.5) {
                spPromedio.classList.add("label-danger");
            } else {
                spPromedio.classList.add("label-primary");
            }
            
            const spSituacion = document.getElementById("spSituacion");
            spSituacion.textContent = perfil.academico.situAcademica;
            if (perfil.academico.situAcademica === "Regular") {
                spSituacion.classList.add("label-success");
            } else {
                spSituacion.classList.add("label-danger");
            }
            
            const spPermanencia = document.getElementById("spPermanencia");
            spPermanencia.textContent = perfil.academico.permanencia;
            switch (perfil.academico.permanencia) {
                case "Egresado": spPermanencia.classList.add("label-primary"); break;
                case "Inactivo": spPermanencia.classList.add("label-danger"); break;
                case "Activo": spPermanencia.classList.add("label-success"); break;
                default: spPermanencia.classList.add("label-default");
            }
            
            document.getElementById("spSemUltMat").textContent = resumenData.periodoAcademico;
            const spPromUltMat = document.getElementById("spPromUltMat");
            spPromUltMat.textContent = perfil.academico.promUltMat;
            if (parseFloat(perfil.academico.promUltMat) < 10.5) {
                spPromUltMat.classList.add("label-danger");
            } else {
                spPromUltMat.classList.add("label-success");
            }
        }

    const btnDescargar = document.getElementById("btnDescargar");
    if (btnDescargar) {
        btnDescargar.addEventListener("click", function(e) {
            e.preventDefault();
        });
    }
});