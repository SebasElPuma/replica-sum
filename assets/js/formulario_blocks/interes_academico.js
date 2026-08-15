window.FormBlocks = window.FormBlocks || {};
window.FormBlocks.interesAcademico = `
            <section>
                <div class="href-target" id="interesAcademico"></div>
                <h1>
                    <i class="fa-regular fa-rectangle-list"></i>Interés Académico
                </h1>
                <form id="formInteresAcademico" class="form-horizontal" role="form" novalidate="novalidate">
                    <div class="nice-form-group form-group">
                        <label>¿Cómo se siente en la carrera?</label>
                        <select id="quest1" class="form-control elemento-desactivable" name="quest1" disabled="">
                            <option value="" selected="">Seleccione Opción</option>
                            <option value="MI">Muy Insatisfecho</option>
                            <option value="I">Insatisfecho</option>
                            <option value="MS">Muy Satisfecho</option>
                            <option value="S">Satisfecho</option>
                        </select>
                    </div>
                    <div class="form-row">
                        <div class="nice-form-group form-group col-md-6">
                            <label>¿Qué curso fue el más difícil y por qué?</label>
                            <select id="quest2" class="form-control elemento-desactivable" name="quest2" disabled="">
                                <option value="" selected="">Seleccione Curso</option>
                            </select>
                        </div>
                        <div class="nice-form-group form-group col-md-6">
                            <label>Motivo</label>
                            <textarea class="elemento-desactivable form-control" name="quest3" rows="2" disabled=""></textarea>
                        </div>
                    </div>
                    <div class="nice-form-group form-group col-md-6">
                        <input id="quest2_1" class="elemento-desactivable form-control" name="quest2_1" style="display: none;" disabled="">
                    </div>
                    <div class="form-row">
                        <div class="nice-form-group form-group col-md-6">
                            <label>¿Se siente motivado con la carrera?</label>
                            <select id="quest4" class="form-control elemento-desactivable" name="quest4" disabled="">
                                <option value="" selected="">Seleccione Opción</option>
                                <option value="SI">Si</option>
                                <option value="NO">No</option>
                            </select>
                        </div>
                        <div class="nice-form-group form-group col-md-6">
                            <label>¿Siente que los profesores motivan a seguir estudiando?</label>
                            <select id="quest5" class="form-control elemento-desactivable" name="quest5" disabled="">
                                <option value="" selected="">Seleccione Opción</option>
                                <option value="SI">Si</option>
                                <option value="NO">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="nice-form-group form-group col-md-6">
                            <label>¿Qué área de cursos le agrada más?</label>
                            <textarea class="elemento-desactivable form-control" name="quest6" rows="2" disabled=""></textarea>
                        </div>
                        <div class="nice-form-group form-group col-md-6">
                            <label>¿En qué área le gustaría especializarse?</label>
                            <textarea class="elemento-desactivable form-control" name="quest7" rows="2" disabled=""></textarea>
                        </div>
                    </div>
                    <div class="mt-3 text-left">
                        <button type="button" id="modificarInteresAcademico" class="btn to-reset">
                            <i class="fa-regular fa-pen-to-square"></i>Modificar
                        </button>
                        <button type="button" id="guardarInteresAcademico" class="btn toggle-code d-none" disabled="">
                            <i class="fa-regular fa-floppy-disk"></i>Guardar
                        </button>
                    </div>
                </form>
            </section>
`;

