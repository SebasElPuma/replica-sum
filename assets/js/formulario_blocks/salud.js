window.FormBlocks = window.FormBlocks || {};
window.FormBlocks.salud = `
            <section>
                <div class="href-target" id="salud"></div>
                <h1>
                    <i class="fa-solid fa-notes-medical"></i>Salud
                </h1>
                <form id="formSalud" class="form-horizontal" role="form" novalidate="novalidate">
                    <div class="nice-form-group form-group">
                        <label>¿A qué seguro de salud se encuentra incorporado?</label>
                        <select id="segurosSalud" class="form-control elemento-desactivable" name="codTipSeguro" disabled="">
                            <option value="" selected="">Seleccione Tipo de Seguro</option>
                            <option value="1">EsSalud</option>
                            <option value="2">SIS gratuito</option>
                            <option value="3">SIS independiente</option>
                            <option value="4">Autoseguro</option>
                            <option value="5">Seguro Privado</option>
                            <option value="0">Otros</option>
                        </select>
                    </div>
                    <div class="nice-form-group form-group" id="otrosSeguro" style="display: none;">
                        <label>Especifique el tipo de seguro que tiene:</label>
                        <textarea class="elemento-desactivable form-control" id="otrosSeguroText" name="otrosSeguro" rows="2" disabled=""></textarea>
                    </div>
                    <div class="form-row">
                        <div class="nice-form-group form-group col-md-6">
                            <label>Alergias</label>
                            <textarea class="elemento-desactivable form-control" name="alergias" rows="2" disabled=""></textarea>
                        </div>
                        <div class="nice-form-group form-group col-md-6">
                            <label>Tipo de Sangre</label>
                            <select id="tipoSangre" class="form-control elemento-desactivable" name="codTipSangre" disabled="">
                                <option value="" selected="">Seleccione Tipo de Sangre</option>
                                <option value="1">A+</option>
                                <option value="2">A-</option>
                                <option value="3">B+</option>
                                <option value="4">B-</option>
                                <option value="5">AB+</option>
                                <option value="6">AB-</option>
                                <option value="7">O+</option>
                                <option value="8">O-</option>
                            </select>
                        </div>
                    </div>
                    <div class="nice-form-group form-group">
                        <label>Discapacidad</label>
                        <select id="tipoDiscapacidad" class="form-control elemento-desactivable" name="codTipDiscapacidad" disabled="">
                            <option value="" selected="">Seleccione Tipo de Discapacidad</option>
                            <option value="1">Motora</option>
                            <option value="2">Visual</option>
                            <option value="3">Auditiva</option>
                            <option value="4">Mental</option>
                            <option value="0">Ninguna</option>
                        </select>
                    </div>
                    <div class="nice-form-group form-group" id="infoDiscapacidad" style="display: none;">
                        <label>Especifique el tipo de discapacidad: </label>
                        <textarea class="elemento-desactivable form-control" id="infoDiscapacidadText" name="infoDiscapacidad" rows="2" disabled=""></textarea>
                    </div>
                    <div class="nice-form-group form-group" id="conadisDiv" style="display: none;">
                        <label>CONADIS(ingrese código si tuviese)</label>
                        <div class="nice-form-group form-group">
                            <input pattern="[A-Za-z0-9 .]+" class="elemento-desactivable form-control" id="conadis" name="conadis" disabled="">
                        </div>
                    </div>
                    <div class="mt-3 text-left">
                        <button type="button" id="modificarSalud" class="btn to-reset">
                            <i class="fa-regular fa-pen-to-square"></i>Modificar
                        </button>
                        <button type="button" id="guardarSalud" class="btn toggle-code d-none" disabled="">
                            <i class="fa-regular fa-floppy-disk"></i>Guardar
                        </button>
                    </div>
                </form>
            </section>
`;

