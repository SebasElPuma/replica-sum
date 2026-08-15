window.FormBlocks = window.FormBlocks || {};
window.FormBlocks.datosVivienda = `
            <section>
                <div class="href-target" id="datosVivienda"></div>
                <h1>
                    <i class="fa-regular fa-lightbulb"></i>Datos Vivienda
                </h1>
                <form id="formDatosVivienda" class="form-horizontal" role="form" novalidate="novalidate">
                    <div class="nice-form-group form-group">
                        <label>Tenencia de la Vivienda</label>
                        <select id="tenenciaVivienda" class="form-control elemento-desactivable" name="codTenenciaVivienda" disabled="">
                            <option value="" selected="">Seleccione la Tenencia de la Vivienda</option>
                            <option value="1">Propia cancelada</option>
                            <option value="2">Propia por cancelar</option>
                            <option value="3">Alquilada</option>
                            <option value="4">Alojado/becario</option>
                            <option value="0">Otro</option>
                        </select>
                    </div>
                    <div class="nice-form-group form-group" id="otrosTenVivienda" style="display: none;">
                        <label>Especifique su tipo de vivienda: </label>
                        <textarea class="elemento-desactivable form-control" id="otrosTenViviendaText" name="otrosTenVivienda" rows="2" disabled=""></textarea>
                    </div>
                    <div class="form-row">
                        <div class="nice-form-group form-group col-md-6">
                            <label>Número de habitaciones exclusivas para dormitorios</label>
                            <input class="elemento-desactivable form-control" name="numHabitacion" disabled="">
                        </div>
                        <div class="nice-form-group form-group col-md-6">
                            <label>SISFOH</label>
                            <select id="sisfoh" class="form-control elemento-desactivable" name="codSisfoh" disabled="">
                                <option value="" selected="">Seleccione la Calificación SISFOH</option>
                                <option value="1">Pobre</option>
                                <option value="2">No pobre</option>
                                <option value="3">Pobre extremo</option>
                                <option value="0">Ninguna</option>
                            </select>
                        </div>
                    </div>
                    <div class="nice-form-group form-group">
                        <label>Tipo de Vivienda</label>
                        <select id="tipoVivienda" class="form-control elemento-desactivable" name="codTipoVivienda" disabled="">
                            <option value="" selected="">Seleccione el Tipo de Vivienda</option>
                            <option value="1">Casa independiente</option>
                            <option value="2">Dpto. en edificio</option>
                            <option value="3">Vivienda en quinta</option>
                            <option value="4">Cuarto/habitación</option>
                            <option value="0">Otro</option>
                        </select>
                    </div>
                    <div class="nice-form-group form-group" id="otrosTipVivienda" style="display: none;">
                        <label>Especifique su tipo de vivienda: </label>
                        <textarea class="elemento-desactivable form-control" id="otrosTipViviendaText" name="otrosTipVivienda" rows="2" disabled=""></textarea>
                    </div>
                    <div class="nice-form-group form-group">
                        <label>Tipo de Techo</label>
                        <select id="techoVivienda" class="form-control elemento-desactivable" name="codTechoVivienda" disabled="">
                            <option value="" selected="">Seleccione el Tipo de Techo</option>
                            <option value="1">Concreto</option>
                            <option value="2">Calamina/eternit</option>
                            <option value="3">Madera/estera</option>
                            <option value="0">Otro</option>
                        </select>
                    </div>
                    <div class="nice-form-group form-group" id="otrosTipTecho" style="display: none;">
                        <label>Especifique su tipo de techo: </label>
                        <textarea class="elemento-desactivable form-control" id="otrosTipTechoText" name="otrosTipTecho" rows="2" disabled=""></textarea>
                    </div>
                    <div class="nice-form-group form-group">
                        <label>Tipo de Pared</label>
                        <select id="paredVivienda" class="form-control elemento-desactivable" name="codParedVivienda" disabled="">
                            <option value="" selected="">Seleccione el Tipo de Pared</option>
                            <option value="1">Ladrillo revestido</option>
                            <option value="2">Ladrillo no revestido</option>
                            <option value="3">Madera/drywall</option>
                            <option value="4">Adobe/estera</option>
                            <option value="0">Otro</option>
                        </select>
                    </div>
                    <div class="nice-form-group form-group" id="otrosTipPared" style="display: none;">
                        <label>Especifique su tipo de pared: </label>
                        <textarea class="elemento-desactivable form-control" id="otrosTipParedText" name="otrosTipPared" rows="2" disabled=""></textarea>
                    </div>
                    <div class="nice-form-group form-group">
                        <label>Tipo de Piso</label>
                        <select id="pisoVivienda" class="form-control elemento-desactivable" name="codPisoVivienda" disabled="">
                            <option value="" selected="">Seleccione el Tipo de Piso</option>
                            <option value="1">Parquet</option>
                            <option value="2">Loseta/vinilico</option>
                            <option value="3">Cemento</option>
                            <option value="4">Tierra</option>
                            <option value="0">Otro</option>
                        </select>
                    </div>
                    <div class="nice-form-group form-group" id="otrosTipPiso" style="display: none;">
                        <label>Especifique su tipo de piso: </label>
                        <textarea class="elemento-desactivable form-control" id="otrosTipPisoText" name="otrosTipPiso" rows="2" disabled=""></textarea>
                    </div>
                    <div class="nice-form-group form-group">
                        <label>Abastecimiento de Agua</label>
                        <select id="aguaVivienda" class="form-control elemento-desactivable" name="codAguaVivienda" disabled="">
                            <option value="" selected="">Seleccione el Tipo de Abastecimiento de Agua</option>
                            <option value="1">Conexión Domiciliaria</option>
                            <option value="2">Pozo</option>
                            <option value="3">Pilón</option>
                            <option value="4">Por cisterna</option>
                            <option value="0">Otro</option>
                        </select>
                    </div>
                    <div class="nice-form-group form-group" id="otrosTipAgua" style="display: none;">
                        <label>Especifique su tipo de abastecimiento de agua: </label>
                        <textarea class="elemento-desactivable form-control" id="otrosTipAguaText" name="otrosTipAgua" rows="2" disabled=""></textarea>
                    </div>
                    <div class="nice-form-group form-group">
                        <label>Tipo de Desagüe</label>
                        <select id="desagueVivienda" class="form-control elemento-desactivable" name="codDesagueVivienda" disabled="">
                             <option value="" selected="">Seleccione el Tipo de Desagüe</option>
                             <option value="1">Conexión a red</option>
                             <option value="2">Letrina/silo</option>
                             <option value="3">Ninguno</option>
                             <option value="0">Otro</option>
                        </select>
                    </div>
                    <div class="nice-form-group form-group" id="otrosTipDesague" style="display: none;">
                        <label>Especifique su tipo de desagüe: </label>
                        <textarea class="elemento-desactivable form-control" id="otrosTipDesagueText" name="otrosTipDesague" rows="2" disabled=""></textarea>
                    </div>
                    <div class="form-row">
                        <div class="nice-form-group form-group col-md-6">
                            <label>Electricidad</label>
                            <select id="electricidad" class="form-control elemento-desactivable" name="electricidad" disabled="">
                                <option value="" selected="">Seleccione Opción</option>
                                <option value="SI">Sí</option>
                                <option value="NO">No</option>
                            </select>
                        </div>
                        <div class="nice-form-group form-group col-md-6">
                            <label>Telefono</label>
                            <select id="telefono" class="form-control elemento-desactivable" name="telefono" disabled="">
                                <option value="" selected="">Seleccione Opción</option>
                                <option value="SI">Sí</option>
                                <option value="NO">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="nice-form-group form-group col-md-6">
                            <label>Cable</label>
                            <select id="cable" class="form-control elemento-desactivable" name="cable" disabled="">
                                <option value="" selected="">Seleccione Opción</option>
                                <option value="SI">Sí</option>
                                <option value="NO">No</option>
                            </select>
                        </div>
                        <div class="nice-form-group form-group col-md-6">
                            <label>Internet</label>
                            <select id="internetVivienda" class="form-control elemento-desactivable" name="internetVivienda" disabled="">
                                <option value="" selected="">Seleccione Opción</option>
                                <option value="SI">Sí</option>
                                <option value="NO">No</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="nice-form-group form-group col-md-12">
                            <label>Otros servicios con los que cuente</label>
                            <textarea class="elemento-desactivable form-control" name="otrosVivienda" rows="2" disabled=""></textarea>
                        </div>
                    </div>
                    <div class="mt-3 text-left">
                        <button type="button" id="modificarDatosVivienda" class="btn to-reset">
                            <i class="fa-regular fa-pen-to-square"></i>Modificar
                        </button>
                        <button type="button" id="guardarDatosVivienda" class="btn toggle-code d-none" disabled="">
                            <i class="fa-regular fa-floppy-disk"></i>Guardar
                        </button>
                    </div>
                </form>
            </section>
`;

