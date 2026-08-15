window.FormBlocks = window.FormBlocks || {};
window.FormBlocks.dependenciaEconomica = `
					<section>
						<div class="href-target" id="depEconomica"></div>
						<h1>
							<i class="fa-regular fa-money-bill-1"></i>Dependencia Económica
						</h1>
						<form id="formDependenciaEconomica" class="form-horizontal" role="form" novalidate="novalidate">
							<div class="nice-form-group form-group">
								<label>¿Depende económicamente de sus padres o tutores?</label>
								<select id="dependePadres" class="form-control elemento-desactivable" name="codDependencia" aria-hidden="true" disabled="">
									<option value="" selected="">Seleccione Opción</option>
									<option value="ST">Si, totalmente</option>
									<option value="SM">Si, medianamente</option>
									<option value="CN">Casi no dependo de mis padres</option>
									<option value="ND">No, no dependo de mis padres</option>
									<option value="NP">No, soy el principal sosten de mi familia</option>
								</select>
							</div>
							<div class="form-row">
								<div class="nice-form-group form-group col-md-6">
									<label>Número de Hijos</label>
									<input class="elemento-desactivable" name="numHijos" pattern="[A-Za-z0-9 .]+" disabled="">
								</div>
								<div class="nice-form-group form-group col-md-6">
									<label>Cantidad de personas con las que vive</label>
									<input class="elemento-desactivable" name="personasVive" pattern="[A-Za-z0-9 .]+" disabled="">
								</div>
							</div>
							<fieldset class="well2">
								<legend class="well-legend2">Datos del Trabajo</legend>
								<div class="nice-form-group form-group">
									<label>¿Usted trabaja en la actualidad?</label>
									<select id="tipTrabajos" class="form-control elemento-desactivable" name="codTipTrabajo" aria-hidden="true" disabled="">
										<option value="" selected="">Seleccione Opción</option>
										<option value="NUN">Nunca he trabajado</option>
										<option value="TAN">He trabajado anteriormente pero actualmente no trabajo</option>
										<option value="SMV">Sí, con más de 20 horas a la semana</option>
										<option value="SNV">Sí, con menos de 20 horas a la semana</option>
									</select>
								</div>
								<div class="form-row">
									<div class="nice-form-group form-group col-md-6" id="trabajoActividad" style="display: none;">
										<label>Actividad del trabajo</label>
										<input class="elemento-desactivable" id="traActividad" name="traActividad" pattern="[A-Za-z0-9 .]+" disabled="">
									</div>
									<div class="nice-form-group form-group col-md-6" id="trabajoTelefono" style="display: none;">
										<label>Teléfono del trabajo</label>
										<input class="elemento-desactivable" id="traTelefono" name="traTelefono" pattern="[A-Za-z0-9 .]+" disabled="">
									</div>
								</div>
								<div class="nice-form-group form-group" id="trabajoLugar" style="display: none;">
									<label>Lugar de Trabajo</label>
									<input class="elemento-desactivable" id="traLugar" name="traLugar" pattern="[A-Za-z0-9 .]+" disabled="">
								</div>
							</fieldset>
							<div class="mt-3 text-left">
								<button type="button" id="modificarDependenciaEconomica" class="btn to-reset">
									<i class="fa-regular fa-pen-to-square"></i>Modificar
								</button>
								<button type="button" id="guardarDependenciaEconomica" class="btn toggle-code d-none" disabled="">
									<i class="fa-regular fa-floppy-disk"></i>Guardar
								</button>
							</div>
						</form>
					</section>
`;
