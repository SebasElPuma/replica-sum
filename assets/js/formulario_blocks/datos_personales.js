window.FormBlocks = window.FormBlocks || {};
window.FormBlocks.datosPersonales = `
				<section>
					<div class="href-target" id="datos"></div>
					<h1>
						<i class="fa-regular fa-circle-user"></i>Datos Personales
					</h1>
					<form id="formDatosPersonales" class="form-horizontal" role="form" novalidate="novalidate">
						<div class="form-row">
							<div class="nice-form-group form-group col-md-6">
								<label>Código de Estudiante*</label>
								<input class="form-control elemento-desactivable" name="codigoAlumno" disabled="">
							</div>
							<div class="nice-form-group form-group col-md-6">
								<label>Nombre de Estudiante*</label>
								<input class="form-control" name="nombreEstudiante" id="nombreEstudiante" disabled="">
								<div id="contenedorNombreEdit" class="d-none" style="display: flex; gap: 10px;">
									<div style="flex: 1; position: relative;">
										<span style="position: absolute; top: 6px; left: 12px; font-size: 11px; color: #999; pointer-events: none;">Apellidos</span>
										<input class="form-control" id="editApellidos" style="padding-top: 20px; padding-bottom: 4px; height: 45px;" placeholder="">
									</div>
									<div style="flex: 1; position: relative;">
										<span style="position: absolute; top: 6px; left: 12px; font-size: 11px; color: #999; pointer-events: none;">Nombres</span>
										<input class="form-control" id="editNombres" style="padding-top: 20px; padding-bottom: 4px; height: 45px;" placeholder="">
									</div>
								</div>
							</div>
						</div>
						<div class="form-row">
							<div class="nice-form-group form-group col-md-6">
								<label>Tipo de Doc. de Identidad*</label>
								<select id="tiposDocumento" class="form-control elemento-desactivable" name="codTipoDocumento" disabled="" data-select2-id="select2-data-tiposDocumento">
									<option value="" selected="">Seleccione Tipo de Documento</option>
${window.FormBlocks.opcionesTipoDoc}</select>
							</div>
							<div class="nice-form-group form-group col-md-6">
								<label>Número de Doc. de Identidad*</label>
								<input name="numDocumento" disabled="">
							</div>
						</div>
						<div class="form-row">
							<div class="nice-form-group form-group col-md-6">
								<label>Fecha de Nacimiento*</label>
								<input type="date" class="elemento-desactivable" name="fechaNacimiento" id="fechaNacimiento" required="" aria-required="true" disabled="">
							</div>
							<div class="nice-form-group form-group col-md-6">
								<label>Sexo*</label>
								<select id="sexos" class="form-control elemento-desactivable" name="codSexo" required="" data-select2-id="select2-data-sexos" aria-required="true" disabled="">
									<option value="" selected="">Seleccione Sexo</option>
${window.FormBlocks.opcionesSexo}</select>
							</div>
						</div>
						<div class="form-row">
							<div class="nice-form-group form-group col-md-6">
								<label>Estado Civil*</label>
								<select id="estadosCiviles" class="form-control elemento-desactivable" name="codEstadoCivil" required="" data-select2-id="select2-data-estadosCiviles" aria-required="true" disabled="">
									<option value="" selected="">Seleccione Estado Civil</option>
${window.FormBlocks.opcionesEstadoCivil}</select>
							</div>
						</div>
                        <fieldset class="well2">
                            <legend class="well-legend2">Lugar de Nacimiento</legend>
                            <div class="form-row">
								<div class="nice-form-group form-group col-md-6">
									<label>País*</label>
									<select id="paisesNac" class="form-control elemento-desactivable" name="codPaisNac" required="" data-select2-id="select2-data-paisesNac" aria-required="true" disabled="">
										<option value=\"\" selected=\"\">Seleccione País</option>
${window.FormBlocks.opcionesPais}</select>
								</div>
								<div class="nice-form-group form-group col-md-6">
									<label>Departamento*</label>
									<select id="departamentosNac" class="form-control elemento-desactivable" name="codDepartamentoNac" required="" data-select2-id="select2-data-departamentosNac" aria-required="true" disabled="">
										<option value=\"\" selected=\"\">Seleccione Departamento</option>
${window.FormBlocks.opcionesDepartamento}</select>
								</div>
                            </div>
                            <div class="form-row">
                                <div class="nice-form-group form-group col-md-6">
                                    <label>Provincia*</label>
									<select id="provinciasNac" class="form-control elemento-desactivable" name="codProvinciaNac" required="" data-select2-id="select2-data-provinciasNac" aria-required="true" disabled="">
										<option value=\"\" selected=\"\">Seleccione Provincia</option>
${window.FormBlocks.opcionesProvincia}</select>
                                </div>
                                <div class="nice-form-group form-group col-md-6">
                                    <label>Distrito*</label>
									<select id="distritosNac" class="form-control elemento-desactivable" name="codDistritoNac" required="" data-select2-id="select2-data-distritosNac" aria-required="true" disabled="">
										<option value=\"\" selected=\"\">Seleccione Distrito</option>
${window.FormBlocks.opcionesDistrito}</select>
									<span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                </div>
                            </div>
                        </fieldset>
						<fieldset class="well2">
							<legend class="well-legend2">Información Étnica</legend>
							<div class="form-row">
								<div class="nice-form-group form-group col-md-6">
									<label>POR SUS COSTUMBRES Y ANTEPASADOS SE SIENTE PARTE DE:</label>
									<select id="pueblosOpc" class="form-control elemento-desactivable" name="idPuebloOpc" required="" data-select2-id="select2-data-pueblosOpc" aria-required="true" disabled="">
										<option value="" selected="">Seleccione Opción</option>
${window.FormBlocks.opcionesEtniaOpc}</select>
								</div>
								<div id="pueblosContainer" class="nice-form-group form-group col-md-6">
									<label>Pueblo Indígena</label>
									<select id="pueblos" class="form-control elemento-desactivable" name="idPueblo" data-select2-id="select2-data-pueblos" aria-required="true" disabled="">
										<option value="" selected="">Seleccione Pueblo Indígena</option>
${window.FormBlocks.opcionesPueblosIndigenas}</select>
								</div>
							</div>
							<div class="form-row">
								<div class="nice-form-group form-group col-md-6">
									<label>HABLA ALGUNA LENGUA INDIGENA U ORIGINARIA:</label>
									<select id="lenguasOpc" class="form-control elemento-desactivable" name="idLenguaOpc" required="" data-select2-id="select2-data-lenguasOpc" aria-required="true" disabled="">
										<option value="" selected="">Seleccione Opción</option>
${window.FormBlocks.opcionesLenguaOpc}</select>
								</div>
								<div class="nice-form-group form-group col-md-6">
									<label>Lengua</label>
									<select id="lenguas" class="form-control elemento-desactivable" name="idLengua" data-select2-id="select2-data-lenguas" aria-required="true" disabled="">
										<option value="" selected="">Seleccione Lengua Indígena</option>
${window.FormBlocks.opcionesLenguas}</select>
								</div>
								<div id="otroGrupoEtnicoContainer" class="nice-form-group form-group col-md-6">
									<label>Especifique el grupo étnico:</label>
									<input type="text" id="otroGrupoEtnico" name="otroGrupoEtnico" class="form-control elemento-desactivable" maxlength="100" required="" aria-required="true" disabled="">
								</div>
							</div>
						</fieldset>
                        <fieldset class="well2">
                            <legend class="well-legend2">Dirección</legend>
                            <div class="form-row">
                                <div class="nice-form-group form-group col-md-6">
                                    <label>Departamento*</label>
									<select id="departamentosDir" class="form-control elemento-desactivable" name="codDepartamentoDir" required="" data-select2-id="select2-data-departamentosDir" aria-required="true" disabled="">
										<option value=\"\" selected=\"\">Seleccione Departamento</option>
${window.FormBlocks.opcionesDepartamento}</select>
                                </div>
                                <div class="nice-form-group form-group col-md-6">
                                    <label>Provincia*</label>
									<select id="provinciasDir" class="form-control elemento-desactivable" name="codProvinciaDir" required="" data-select2-id="select2-data-provinciasDir" aria-required="true" disabled="">
										<option value=\"\" selected=\"\">Seleccione Provincia</option>
${window.FormBlocks.opcionesProvincia}</select>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="nice-form-group form-group col-md-6">
                                    <label>Distrito*</label>
									<select id="distritosDir" class="form-control elemento-desactivable" name="codDistritoDir" required="" data-select2-id="select2-data-distritosDir" aria-required="true" disabled="">
										<option value=\"\" selected=\"\">Seleccione Distrito</option>
${window.FormBlocks.opcionesDistrito}</select>
                                </div>
                            </div>
                            <div class="nice-form-group form-group">
                                <label>Dirección*</label>
								<input class="form-control elemento-desactivable" name="direccion" required="" aria-required="true" disabled="">
                            </div>
                        </fieldset>
                        <div class="form-row">
                            <div class="nice-form-group form-group col-md-6">
                                <label>Teléfono Fijo*</label>
								<input class="form-control elemento-desactivable" name="telefono" disabled="">
                            </div>
                            <div class="nice-form-group form-group col-md-6">
                                <label>Teléfono Móvil*</label>
								<input class="form-control elemento-desactivable" name="celular" required="" aria-required="true" disabled="">
                            </div>
                        </div>
						<div class="form-row">
							<div class="nice-form-group form-group col-md-6">
								<label class="control-label">Correo Personal*</label>
								<input type="email" class="form-control elemento-desactivable" name="correoPersonal" required="" aria-required="true" disabled="">
							</div>
							<div class="nice-form-group form-group col-md-6">
								<label>Religión</label>
								<input class="form-control elemento-desactivable" name="religion" disabled="">
							</div>
						</div>

							<div class="form-row">
								<div class="nice-form-group form-group col-md-6">
									<label>Lengua Materna</label>
									<input class="form-control elemento-desactivable" name="lenguaMaterna" disabled="">
								</div>
								<div class="nice-form-group form-group col-md-6">
									<label>Cuenta de Facebook</label>
									<input class="form-control elemento-desactivable" name="cuentaFacebook" disabled="">
								</div>
							</div>
						<div class="mt-3 text-left">
							<button type="button" id="modificarDatos" class="btn to-reset">
								<i class="fa-regular fa-pen-to-square"></i>Modificar
							</button>
							<button type="button" id="guardarDatos" class="btn toggle-code d-none" disabled="">
								<i class="fa-regular fa-floppy-disk"></i>Guardar
							</button>
						</div>
					</form>
				</section>

`;


