window.FormBlocks = window.FormBlocks || {};
window.FormBlocks.recursosEstudio = `
            <section>
                <div class="href-target" id="recursosEstudio"></div>
                <h1>
                    <i class="fa-regular fa-lightbulb"></i>Recursos Estudio
                </h1>
                <form id="formRecursosEstudio" class="form-horizontal" role="form" novalidate="novalidate">
                    <p>¿Con qué recursos cuenta para realizar sus estudios?</p>
                    <div class="form-row">
                        <div class="nice-form-group form-group col-md-6">
                            <label>Transporte</label>
                            <select id="transportes" class="form-control elemento-desactivable" name="transporte" disabled="">
                                <option value="" selected="">Seleccione Opción</option>
                                <option value="SI">Si</option>
                                <option value="NO">No</option>
                            </select>
                        </div>
                        <div class="nice-form-group form-group col-md-6">
                            <label>Acceso a Internet</label>
                            <select id="accesoInternet" class="form-control elemento-desactivable" name="internet" disabled="">
                                <option value="" selected="">Seleccione Opción</option>
                                <option value="SI">Si</option>
                                <option value="NO">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="nice-form-group form-group col-md-6">
                            <label>Acceso a Bibliotecas</label>
                            <select id="accesoBibliotecas" class="form-control elemento-desactivable" name="biblioteca" disabled="">
                                <option value="" selected="">Seleccione Opción</option>
                                <option value="SI">Si</option>
                                <option value="NO">No</option>
                            </select>
                        </div>
                        <div class="nice-form-group form-group col-md-6">
                            <label>Alimentación</label>
                            <select id="alimentacion" class="form-control elemento-desactivable" name="alimentacion" disabled="">
                                <option value="" selected="">Seleccione Opción</option>
                                <option value="SI">Si</option>
                                <option value="NO">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="nice-form-group form-group col-md-6">
                            <label>¿Pertenece a algún programa de Becas? ¿Cúal?</label>
                            <select id="becas" class="form-control elemento-desactivable" name="beca" disabled="">
                                <option value="" selected="">Seleccione Beca</option>
                                <option value="BE18">Beca 18</option>
                                <option value="BECO">Beca Continuidad de Estudios</option>
                                <option value="BEDE">Beca Deporte y Talento Escolar</option>
                                <option value="BEES">Beca Especial para Situaciones Especiales</option>
                                <option value="BEIN">Beca Inclusión para Carreras Universitarias o Profesionales Técnicas</option>
                                <option value="BEPE">Beca Permanencia</option>
                                <option value="NO">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="mt-3 text-left">
                        <button type="button" id="modificarRecursosEstudio" class="btn to-reset">
                            <i class="fa-regular fa-pen-to-square"></i>Modificar
                        </button>
                        <button type="button" id="guardarRecursosEstudio" class="btn toggle-code d-none" disabled="">
                            <i class="fa-regular fa-floppy-disk"></i>Guardar
                        </button>
                    </div>
                </form>
            </section>
`;

