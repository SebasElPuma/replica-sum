window.FormBlocks = window.FormBlocks || {};
window.FormBlocks.colegio = `
					<section>
						<div class="href-target" id="colegio"></div>
						<h1>
							<i class="fa-solid fa-school"></i>Colegio de Procedencia
						</h1>
						<form id="formColegioProcedencia" class="form-horizontal" role="form" novalidate="novalidate">
							<fieldset class="well2">
								<legend class="well-legend2">Ubicación del Colegio</legend>
								<div class="form-row">
									<div class="nice-form-group form-group col-md-6">
										<label>País*</label>
										<select id="paisesCol" class="form-control elemento-desactivable" name="codPaisCol" required="" data-select2-id="select2-data-paisesCol" aria-required="true" disabled="">
											<option value=\"\" selected=\"\">Seleccione País</option>
${window.FormBlocks.opcionesPais}</select>
									</div>
									<div class="nice-form-group form-group col-md-6">
										<label>Departamento*</label>
										<select id="departamentosCol" class="form-control elemento-desactivable" name="codDepartamentoCol" required="" data-select2-id="select2-data-departamentosCol" aria-required="true" disabled="">
											<option value=\"\" selected=\"\">Seleccione Departamento</option>
${window.FormBlocks.opcionesDepartamento}</select>
									</div>
								</div>
								<div class="form-row">
									<div class="nice-form-group form-group col-md-6">
										<label>Provincia*</label>
										<select id="provinciasCol" class="form-control elemento-desactivable" name="codProvinciaCol" required="" data-select2-id="select2-data-provinciasCol" aria-required="true" disabled="">
											<option value=\"\" selected=\"\">Seleccione Provincia</option>
${window.FormBlocks.opcionesProvincia}</select>
									</div>
									<div class="nice-form-group form-group col-md-6">
										<label>Distrito*</label>
										<select id="distritosCol" class="form-control elemento-desactivable" name="codDistritoCol" required="" data-select2-id="select2-data-distritosCol" aria-required="true" disabled="">
											<option value=\"\" selected=\"\">Seleccione Distrito</option>
${window.FormBlocks.opcionesDistrito}</select>
									</div>
								</div>
							</fieldset>
							
							<div class="form-row">
								<div class="nice-form-group form-group col-md-6">
									<label>Tipo de Colegio*</label>
									<select id="tiposColegio" class="form-control elemento-desactivable" name="codTipoColegio" required="" data-select2-id="select2-data-tiposColegio" aria-required="true" disabled="">
										<option value=\"\" selected=\"\">Seleccione Tipo de Colegio</option>
										<option value="ESTATAL">ESTATAL</option>
										<option value="ESTATAL - RELIGIOSO">ESTATAL - RELIGIOSO</option>
										<option value="ESTATAL - MILITAR">ESTATAL - MILITAR</option>
										<option value="NO ESCOLARIZADO">NO ESCOLARIZADO</option>
										<option value="OTROS">OTROS</option>
										<option value="PRE - UNIVERSITARIO">PRE - UNIVERSITARIO</option>
										<option value="PRIVADO">PRIVADO</option>
										<option value="PRIVADO - RELIGIOSO">PRIVADO - RELIGIOSO</option>
									</select>
								</div>
								<div class="nice-form-group form-group col-md-6">
									<label>nombre de Colegio*</label>
									<input class="elemento-desactivable" name="nombreColegio" required="" aria-required="true" disabled="">
								</div>
							</div>
							<div class="form-row">
								<div class="nice-form-group form-group col-md-6">
									<label>Pago Mensual*</label>
									<input class="elemento-desactivable" name="pagoMensualCol" pattern="[A-Za-z0-9 .,]+" required="" aria-required="true" disabled="">
								</div>
								<div class="nice-form-group form-group col-md-6">
									<label>Año de conclusión de Secundaria*</label>
									<select id="anios" class="form-control elemento-desactivable" name="anioConclusionCol" required="" data-select2-id="select2-data-anios" aria-required="true" disabled="">
										<option value="" selected="" data-select2-id="select2-data-40-fl09">Seleccione Año</option>
										<option value="2025">2025</option>
										<option value="2024">2024</option>
										<option value="2023">2023</option>
										<option value="2022">2022</option>
										<option value="2021">2021</option>
										<option value="2020" data-select2-id="select2-data-94-1c63">2020</option>
										<option value="2019">2019</option>
										<option value="2018">2018</option>
										<option value="2017">2017</option>
										<option value="2016">2016</option>
										<option value="2015">2015</option>
										<option value="2014">2014</option>
										<option value="2013">2013</option>
										<option value="2012">2012</option>
										<option value="2011">2011</option>
										<option value="2010">2010</option>
										<option value="2009">2009</option>
										<option value="2008">2008</option>
										<option value="2007">2007</option>
										<option value="2006">2006</option>
										<option value="2005">2005</option>
										<option value="2004">2004</option>
										<option value="2003">2003</option>
										<option value="2002">2002</option>
										<option value="2001">2001</option>
										<option value="2000">2000</option>
										<option value="1999">1999</option>
										<option value="1998">1998</option>
										<option value="1997">1997</option>
										<option value="1996">1996</option>
										<option value="1995">1995</option>
										<option value="1994">1994</option>
										<option value="1993">1993</option>
										<option value="1992">1992</option>
										<option value="1991">1991</option>
										<option value="1990">1990</option>
										<option value="1989">1989</option>
										<option value="1988">1988</option>
										<option value="1987">1987</option>
										<option value="1986">1986</option>
										<option value="1985">1985</option>
										<option value="1984">1984</option>
										<option value="1983">1983</option>
										<option value="1982">1982</option>
										<option value="1981">1981</option>
										<option value="1980">1980</option>
										<option value="1979">1979</option>
										<option value="1978">1978</option>
										<option value="1977">1977</option>
										<option value="1976">1976</option>
										<option value="1975">1975</option>
										<option value="1974">1974</option>
										<option value="1973">1973</option>
										<option value="1972">1972</option>
										<option value="1971">1971</option>
										<option value="1970">1970</option>
										<option value="1969">1969</option>
										<option value="1968">1968</option>
										<option value="1967">1967</option>
										<option value="1966">1966</option>
										<option value="1965">1965</option>
										<option value="1964">1964</option>
										<option value="1963">1963</option>
										<option value="1962">1962</option>
										<option value="1961">1961</option>
									</select>
								</div>
							</div>
							<div class="form-row">
								<div class="nice-form-group form-group col-md-6">
									<label>Tipo de Preparación Universitaria*</label>
									<select id="tiposPreparacion" class="form-control elemento-desactivable" name="codTipoPrepaUniv" required="" data-select2-id="select2-data-tiposPreparacion" aria-required="true" disabled="">
										<option value="" selected="" data-select2-id="select2-data-42-sp5h">Seleccione Tipo de Preparación Universitaria</option>
										<option value="CASA">CASA</option>
										<option value="CEPU">CENTRO PRE UNIVERSITARIO</option>
										<option value="DICO">DIRECTO DEL COLEGIO</option>
										<option value="OTRO">OTROS</option>
										<option value="ACPU" data-select2-id="select2-data-95-s8s4">ACADEMIA PRE UNIVERSITARIA</option>
										<option value="PRPA">PROFESOR PARTICULAR</option>
									</select>
								</div>
							</div>
							<div class="mt-3 text-left">
								<button type="button" id="modificarDatosColegio" class="btn to-reset">
									<i class="fa-regular fa-pen-to-square"></i>Modificar
								</button>
								<button type="button" id="guardarDatosColegio" class="btn toggle-code d-none" disabled="">
									<i class="fa-regular fa-floppy-disk"></i>Guardar
								</button>
							</div>
						</form>
					</section>

`;
