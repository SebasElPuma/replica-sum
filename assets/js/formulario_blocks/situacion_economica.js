window.FormBlocks = window.FormBlocks || {};
window.FormBlocks.situacionEconomica = `
            <section>
                <div class="href-target" id="situacionEconomica"></div>
                <h1>
                    <i class="fa-regular fa-lightbulb"></i>Situación Económica
                </h1>
                <p>Todos los siguientes datos, en soles: </p>
                <form id="formSituacionEconomica" class="form-horizontal" role="form" novalidate="novalidate">
                    <div class="form-row">
                        <div class="nice-form-group form-group col-md-6">
                            <label>Ingresos del Estudiante</label>
                            <input pattern="[A-Za-z0-9 .]+" class="elemento-desactivable form-control" name="ingEstudiante" disabled="">
                        </div>
                        <div class="nice-form-group form-group col-md-6">
                            <label>Ingresos de la Familia</label>
                            <input pattern="[A-Za-z0-9 .]+" class="elemento-desactivable form-control" name="ingFamilia" disabled="">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="nice-form-group form-group col-md-6">
                            <label>Ingresos por Beca</label>
                            <input pattern="[A-Za-z0-9 .]+" class="elemento-desactivable form-control" name="ingBeca" disabled="">
                        </div>
                        <div class="nice-form-group form-group col-md-6">
                            <label>Otros Ingresos</label>
                            <input pattern="[A-Za-z0-9 .]+" class="elemento-desactivable form-control" name="ingOtro" disabled="">
                        </div>
                    </div>
                    <fieldset class="well2">
                        <legend class="well-legend2">Gastos de la Familia</legend>
                        <div class="form-row">
                            <div class="nice-form-group form-group col-md-4">
                                <label>Alimentación</label>
                                <input pattern="[A-Za-z0-9 .]+" class="elemento-desactivable form-control" name="famAlimentacion" disabled="">
                            </div>
                            <div class="nice-form-group form-group col-md-4">
                                <label>Movilidad</label>
                                <input pattern="[A-Za-z0-9 .]+" class="elemento-desactivable form-control" name="famMovilidad" disabled="">
                            </div>
                            <div class="nice-form-group form-group col-md-4">
                                <label>Vivienda</label>
                                <input pattern="[A-Za-z0-9 .]+" class="elemento-desactivable form-control" name="famVivienda" disabled="">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="nice-form-group form-group col-md-4">
                                <label>Servicio</label>
                                <input pattern="[A-Za-z0-9 .]+" class="elemento-desactivable form-control" name="famServicio" disabled="">
                            </div>
                            <div class="nice-form-group form-group col-md-4">
                                <label>Salud</label>
                                <input pattern="[A-Za-z0-9 .]+" class="elemento-desactivable form-control" name="famSalud" disabled="">
                            </div>
                            <div class="nice-form-group form-group col-md-4">
                                <label>Educación</label>
                                <input pattern="[A-Za-z0-9 .]+" class="elemento-desactivable form-control" name="famEducacion" disabled="">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="nice-form-group form-group col-md-4">
                                <label>Recreación</label>
                                <input pattern="[A-Za-z0-9 .]+" class="elemento-desactivable form-control" name="famRecreacion" disabled="">
                            </div>
                            <div class="nice-form-group form-group col-md-4">
                                <label>Deuda</label>
                                <input pattern="[A-Za-z0-9 .]+" class="elemento-desactivable form-control" name="famDeuda" disabled="">
                            </div>
                            <div class="nice-form-group form-group col-md-4">
                                <label>Otro</label>
                                <input pattern="[A-Za-z0-9 .]+" class="elemento-desactivable form-control" name="famOtro" disabled="">
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="well2">
                        <legend class="well-legend2">Gastos del Estudiante</legend>
                        <div class="form-row">
                            <div class="nice-form-group form-group col-md-4">
                                <label>Alimentación</label>
                                <input pattern="[A-Za-z0-9 .]+" class="elemento-desactivable form-control" name="estAlimentacion" disabled="">
                            </div>
                            <div class="nice-form-group form-group col-md-4">
                                <label>Movilidad</label>
                                <input pattern="[A-Za-z0-9 .]+" class="elemento-desactivable form-control" name="estMovilidad" disabled="">
                            </div>
                            <div class="nice-form-group form-group col-md-4">
                                <label>Vivienda</label>
                                <input pattern="[A-Za-z0-9 .]+" class="elemento-desactivable form-control" name="estVivienda" disabled="">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="nice-form-group form-group col-md-4">
                                <label>Servicio</label>
                                <input pattern="[A-Za-z0-9 .]+" class="elemento-desactivable form-control" name="estServicio" disabled="">
                            </div>
                            <div class="nice-form-group form-group col-md-4">
                                <label>Salud</label>
                                <input pattern="[A-Za-z0-9 .]+" class="elemento-desactivable form-control" name="estSalud" disabled="">
                            </div>
                            <div class="nice-form-group form-group col-md-4">
                                <label>Educación</label>
                                <input pattern="[A-Za-z0-9 .]+" class="elemento-desactivable form-control" name="estEducacion" disabled="">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="nice-form-group form-group col-md-4">
                                <label>Recreación</label>
                                <input pattern="[A-Za-z0-9 .]+" class="elemento-desactivable form-control" name="estRecreacion" disabled="">
                            </div>
                            <div class="nice-form-group form-group col-md-4">
                                <label>Deuda</label>
                                <input pattern="[A-Za-z0-9 .]+" class="elemento-desactivable form-control" name="estDeuda" disabled="">
                            </div>
                            <div class="nice-form-group form-group col-md-4">
                                <label>Otro</label>
                                <input pattern="[A-Za-z0-9 .]+" class="elemento-desactivable form-control" name="estOtro" disabled="">
                            </div>
                        </div>
                    </fieldset>
                    <div class="mt-3 text-left">
                        <button type="button" id="modificarSituacionEconomica" class="btn to-reset">
                            <i class="fa-regular fa-pen-to-square"></i>Modificar
                        </button>
                        <button type="button" id="guardarSituacionEconomica" class="btn toggle-code d-none" disabled="">
                            <i class="fa-regular fa-floppy-disk"></i>Guardar
                        </button>
                    </div>
                </form>
            </section>
`;

