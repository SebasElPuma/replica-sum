window.FormBlocks = window.FormBlocks || {};
window.FormBlocks.contactoEmergencia = `
            <section>
                <div class="href-target" id="contacto"></div>
                <h1>
                    <i class="fa-regular fa-address-book"></i>Contacto de Emergencia
                </h1>
                <form id="formContactoEmergencia" class="form-horizontal" role="form" novalidate="novalidate">
                    <p>En caso de emergencia, comunicarse con...</p>
                    <div class="nice-form-group form-group">
                        <label>Nombres y Apellidos</label>
                        <input pattern="[A-Za-z0-9 .]+" class="elemento-desactivable" name="emerNombre" disabled="">
                    </div>
                    <div class="form-row">
                        <div class="nice-form-group form-group col-md-6">
                            <label>Teléfono Fijo</label>
                            <input pattern="[0-9 ]+" class="elemento-desactivable" name="emerTelefono" disabled="">
                        </div>
                        <div class="nice-form-group form-group col-md-6">
                            <label>Teléfono Móvil</label>
                            <input pattern="[0-9 +]+" class="elemento-desactivable" name="emerCelular" disabled="">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="nice-form-group form-group col-md-6">
                            <label>Parentesco</label>
                            <input class="elemento-desactivable" name="emerParentesco" disabled="">
                        </div>
                        <div class="nice-form-group form-group col-md-6">
                            <label>Correo Personal</label>
                            <input class="elemento-desactivable" name="emerCorreo" disabled="">
                        </div>
                    </div>
                    <fieldset class="well2">
                        <legend class="well-legend2">Dirección</legend>
                        <div class="form-row">
                            <div class="nice-form-group form-group col-md-6">
                                <label>Departamento</label>
                                <select id="departamentosEmer" class="form-control elemento-desactivable" name="codEmerDirDepartamento" disabled="">
                                    <option value="" selected="">Seleccione Departamento</option>
${window.FormBlocks.opcionesDepartamento}</select>
                            </div>
                            <div class="nice-form-group form-group col-md-6">
                                <label>Provincia</label>
                                <select id="provinciasEmer" class="form-control elemento-desactivable" name="codEmerDirProvincia" disabled="">
                                    <option value="" selected="">Seleccione Provincia</option>
${window.FormBlocks.opcionesProvincia}</select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="nice-form-group form-group col-md-6">
                                <label>Distrito</label>
                                <select id="distritosEmer" class="form-control elemento-desactivable" name="codEmerDirDistrito" disabled="">
                                    <option value="" selected="">Seleccione Distrito</option>
${window.FormBlocks.opcionesDistrito}</select>
                            </div>
                        </div>
                        <div class="nice-form-group form-group">
                            <label>Dirección</label>
                            <input pattern="[A-Za-z0-9 .]+" class="elemento-desactivable" name="emerDireccion" disabled="">
                        </div>
                    </fieldset>
                    <fieldset class="well2">
                        <legend class="well-legend2">Familia del exterior (si tuviera):</legend>
                        <div class="form-row">
                            <div class="nice-form-group form-group col-md-6">
                                <label>Nombre del Exterior</label>
                                <input pattern="[A-Za-z0-9 .]+" class="elemento-desactivable" name="extNombre" disabled="">
                            </div>
                            <div class="nice-form-group form-group col-md-6">
                                <label>Teléfono del Exterior</label>
                                <input pattern="[A-Za-z0-9 .]+" class="elemento-desactivable" name="extTelefono" disabled="">
                            </div>
                        </div>
                        <div class="nice-form-group form-group">
                            <label>Dirección del Exterior</label>
                            <input pattern="[A-Za-z0-9 .]+" class="elemento-desactivable" name="extDireccion" disabled="">
                        </div>
                    </fieldset>
                    <div class="mt-3 text-left">
                        <button type="button" id="modificarContactoEmergencia" class="btn to-reset">
                            <i class="fa-regular fa-pen-to-square"></i>Modificar
                        </button>
                        <button type="button" id="guardarContactoEmergencia" class="btn toggle-code d-none" disabled="">
                            <i class="fa-regular fa-floppy-disk"></i>Guardar
                        </button>
                    </div>
                </form>
            </section>
`;

