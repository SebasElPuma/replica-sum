document.addEventListener('DOMContentLoaded', () => {
    const isEnrolled = localStorage.getItem('sum_matricula_realizada') === 'true';

    const divMensajeMatricula = document.getElementById('divMensajeMatricula');
    const divMensaje = document.getElementById('divMensaje');
    const divBotonMatricula = document.getElementById('divBotonMatricula');
    const spFechaSistema = document.getElementById('spFechaSistema');
    
    let resumenData = localStorage.getItem('sum_resumen_data');
    if (!resumenData) {
        resumenData = window.RESUMEN_DEFAULT_DATA;
    } else {
        try { resumenData = JSON.parse(resumenData); }
        catch(e) { resumenData = window.RESUMEN_DEFAULT_DATA; }
    }
    
    const lblPeriodo = document.getElementById('lbl-periodo');
    if (lblPeriodo && resumenData && resumenData.periodoAcademico) {
        lblPeriodo.innerText = resumenData.periodoAcademico;
    }

    function updateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        const secs = String(now.getSeconds()).padStart(2, '0');
        if(spFechaSistema) spFechaSistema.innerText = `${year}-${month}-${day} ${hours}:${mins}:${secs}`;
    }
    
    updateTime();
    setInterval(updateTime, 1000);

    if (isEnrolled) {
        divMensajeMatricula.innerText = "MATRICULA INTERNET INHABILITADA";
        divMensajeMatricula.className = "alert text-center font-weight-bolder alert-danger";
        divMensaje.style.display = 'block';
        divBotonMatricula.innerHTML = '';
    } else {
        divMensajeMatricula.innerText = "MATRICULA INTERNET HABILITADA";
        divMensajeMatricula.className = "alert text-center font-weight-bolder alert-success";
        divMensaje.style.display = 'none';
        
        divBotonMatricula.innerHTML = `<button id="btn-iniciar" class="btn btn-primary btn-lg" style="background-color: #6558d3; border-color: #6558d3;">Iniciar Matrícula</button>`;
        
        document.getElementById('btn-iniciar').addEventListener('click', () => {
            // Redirige a la futura página de simulación
            window.location.href = 'simulacion.html';
        });
    }
});
