window.FormBlocks = window.FormBlocks || {};
window.FormBlocks.recreacion = `
            <section>
                <div class="href-target" id="recreacion"></div>
                <h1>
                    <i class="fa-regular fa-lightbulb"></i>Recreación
                </h1>
                <form id="formRecreacion" class="form-horizontal" role="form" novalidate="novalidate">
                    <div class="form-row">
                        <div class="nice-form-group form-group col-md-6">
                            <label>¿Qué deportes practicas?</label>
                            <textarea class="elemento-desactivable form-control" name="deporte" rows="2" disabled=""></textarea>
                        </div>
                        <div class="nice-form-group form-group col-md-6">
                            <label>¿Qué actividades artísticas practicas?</label>
                            <textarea class="elemento-desactivable form-control" name="arte" rows="2" disabled=""></textarea>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="nice-form-group form-group col-md-6">
                            <label>¿Qué actividades sociales practicas?</label>
                            <textarea class="elemento-desactivable form-control" name="social" rows="2" disabled=""></textarea>
                        </div>
                        <div class="nice-form-group form-group col-md-6">
                            <label>¿En qué agrupación artística, cultural, deportiva, religiosa, política, etc. participas?</label>
                            <textarea class="elemento-desactivable form-control" name="agrupacion" rows="2" disabled=""></textarea>
                        </div>
                    </div>
                    <div class="mt-3 text-left">
                        <button type="button" id="modificarRecreacion" class="btn to-reset">
                            <i class="fa-regular fa-pen-to-square"></i>Modificar
                        </button>
                        <button type="button" id="guardarRecreacion" class="btn toggle-code d-none" disabled="">
                            <i class="fa-regular fa-floppy-disk"></i>Guardar
                        </button>
                    </div>
                </form>
            </section>
`;

