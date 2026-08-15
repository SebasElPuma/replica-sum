window.FormBlocks = window.FormBlocks || {};
window.FormBlocks.transporte = `
            <section>
                <div class="href-target" id="transporte"></div>
                <h1>
                    <i class="fa-solid fa-car"></i>Transporte
                </h1>
                <form id="formTransporte" class="form-horizontal" role="form" novalidate="novalidate">
                    <div class="form-row">
                        <div class="nice-form-group form-group col-md-6">
                            <label>¿Es residente en la vivienda universitaria?</label>
                            <select id="residenteUniv" class="form-control elemento-desactivable" name="questA" disabled="">
                                <option value="" selected="">Seleccione Opción</option>
                                <option value="SI">Si</option>
                                <option value="NO">No</option>
                            </select>
                        </div>
                        <div class="nice-form-group form-group col-md-6">
                            <label>Medio de transporte hacia la Universidad</label>
                            <select id="mediosTransporte" class="form-control elemento-desactivable" name="questB" disabled="">
                                <option value="" selected="">Seleccione Opción</option>
                                <option value="TPU">Transporte Público</option>
                                <option value="AUT">Automóvil</option>
                                <option value="CAM">Caminando</option>
                                <option value="BIC">Bicicleta</option>
                                <option value="OT">Otro</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="nice-form-group form-group col-md-6">
                            <label>¿Cuánto tiempo te demoras en llegar a la Universidad?(mins)</label>
                            <input pattern="[A-Za-z0-9 .]+" class="elemento-desactivable form-control" name="questC" disabled="">
                        </div>
                    </div>
                    <div class="mt-3 text-left">
                        <button type="button" id="modificarTransporte" class="btn to-reset">
                            <i class="fa-regular fa-pen-to-square"></i>Modificar
                        </button>
                        <button type="button" id="guardarTransporte" class="btn toggle-code d-none" disabled="">
                            <i class="fa-regular fa-floppy-disk"></i>Guardar
                        </button>
                    </div>
                </form>
            </section>
`;

