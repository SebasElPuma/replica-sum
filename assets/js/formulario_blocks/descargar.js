window.FormBlocks = window.FormBlocks || {};
window.FormBlocks.descargar = `
            <section style="margin-bottom: 0 !important; padding-bottom: 30px;">
                <div class="href-target" id="descargar"></div>
                <h1>
                    <i class="fa-solid fa-download"></i>Descargar Formulario
                </h1>
                <button type="button" id="descargarPdf" class="btn btn-danger" onclick="generarFichaPDF()">
                    <i class="fa-regular fa-file-pdf"></i> Descargar en PDF
                </button>
            </section>
`;

window.generarFichaPDF = function() {
    if (!window.jspdf) {
        alert("La librería jsPDF no está cargada.");
        return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    let y = 20;
    const margenIzquierdo = 20;
    const anchoPagina = doc.internal.pageSize.width;
    
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Ficha Socioeconómica", anchoPagina / 2, y, { align: "center" });
    y += 15;
    
    doc.setFontSize(10);
    
    const secciones = document.querySelectorAll('section');
    secciones.forEach(sec => {
        const tituloEl = sec.querySelector('h1');
        if (tituloEl && !tituloEl.textContent.includes('Descargar Formulario')) {
            const titulo = tituloEl.textContent.trim();
            
            if (y > 270) {
                doc.addPage();
                y = 20;
            }
            
            doc.setFont("helvetica", "bold");
            doc.text(titulo, margenIzquierdo, y);
            y += 8;
            
            doc.setFont("helvetica", "normal");
            
            const grupos = sec.querySelectorAll('.nice-form-group, .form-group');
            grupos.forEach(grupo => {
                const labelEl = grupo.querySelector('label');
                const inputEl = grupo.querySelector('input, select, textarea');
                
                if (labelEl && inputEl) {
                    const label = labelEl.textContent.trim().replace('*', '');
                    let valor = "";
                    
                    if (inputEl.tagName.toLowerCase() === 'select') {
                        const option = inputEl.options[inputEl.selectedIndex];
                        valor = option ? option.text : "";
                    } else {
                        valor = inputEl.value;
                    }
                    
                    if (!valor || valor.trim() === "") valor = "No especificado";
                    
                    const texto = label + ": " + valor;
                    const lineas = doc.splitTextToSize(texto, anchoPagina - 40);
                    
                    if (y + (lineas.length * 5) > 280) {
                        doc.addPage();
                        y = 20;
                    }
                    
                    doc.text(lineas, margenIzquierdo + 5, y);
                    y += (lineas.length * 6);
                }
            });
            y += 5;
        }
    });
    
    doc.save("Ficha_Socioeconomica.pdf");
};
