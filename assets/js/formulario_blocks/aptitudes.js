window.FormBlocks = window.FormBlocks || {};
window.FormBlocks.aptitudes = `
<section>
                <div class="href-target" id="aptitudesHabilidad"></div>
                <h1>
                    <i class="fa-regular fa-lightbulb"></i>Aptitudes y Habilidades
                </h1>
                <p>Marque si cuenta con algunas de las siguientes aptittudes o habilidades: </p>
                <form id="formAptitudesHabilidad" class="form-horizontal" role="form" novalidate="novalidate">
                    <div class="form-row">
                        <div class="nice-form-group form-group form-check col-md-4">
                            <label>Aptitudes Personales: </label>
                                <div class="form-check">
                                    <input class="form-check-input  elemento-desactivable" type="checkbox" id="respeto" name="respeto" value="SI" data-unchecked-value="NO" disabled="">
                                    <label class="form-check-label" for="respeto">Respeto</label><br>
                                    <input class="form-check-input elemento-desactivable" type="checkbox" id="sinceridad" name="sinceridad" value="SI" data-unchecked-value="NO" disabled="">
                                    <label class="form-check-label" for="sinceridad">Sinceridad</label><br>
                                    <input class="form-check-input elemento-desactivable" type="checkbox" id="tolerancia" name="tolerancia" value="SI" data-unchecked-value="NO" disabled="">
                                    <label class="form-check-label" for="tolerancia">Tolerancia</label><br>
                                    <input class="form-check-input elemento-desactivable" type="checkbox" id="solidaridad" name="solidaridad" value="SI" data-unchecked-value="NO" disabled="">
                                    <label class="form-check-label" for="solidaridad">Solidaridad</label><br>
                                    <input class="form-check-input elemento-desactivable" type="checkbox" id="disciplina" name="disciplina" value="SI" data-unchecked-value="NO" disabled="">
                                    <label class="form-check-label" for="disciplina">Disciplina</label><br>
                                    <input class="form-check-input elemento-desactivable" type="checkbox" id="creatividad" name="creatividad" value="SI" data-unchecked-value="NO" disabled="">
                                    <label class="form-check-label" for="creatividad">Creatividad</label><br>
                                    <input class="form-check-input elemento-desactivable" type="checkbox" id="adaptacion" name="adaptacion" value="SI" data-unchecked-value="NO" disabled="">
                                    <label class="form-check-label" for="adaptacion">Adaptación</label><br>
                                    <input class="form-check-input elemento-desactivable" type="checkbox" id="cortesia" name="cortesia" value="SI" data-unchecked-value="NO" disabled="">
                                    <label class="form-check-label" for="cortesia">Cortesía</label><br>
                                    <input class="form-check-input elemento-desactivable" type="checkbox" id="paciencia" name="paciencia" value="SI" data-unchecked-value="NO" disabled="">
                                    <label class="form-check-label" for="paciencia">Paciencia</label><br>
                                    <label>Otras aptitudes personales: </label><br>
                                    <textarea class="elemento-desactivable" name="otrosPersonal" rows="3" disabled=""></textarea>
                                </div>
                        </div>
                        <div class="nice-form-group form-group form-check col-md-4">
                            <label>Habilidades Profesionales: </label>
                            <div class="form-check">
                                <input class="form-check-input elemento-desactivable" type="checkbox" id="equipoPro" name="equipoPro" value="SI" data-unchecked-value="NO" disabled="">
                                <label class="form-check-label" for="equipoPro">Trabajo en equipo</label><br>
                                <input class="form-check-input elemento-desactivable" type="checkbox" id="liderazgoPro" name="liderazgoPro" value="SI" data-unchecked-value="NO" disabled="">
                                <label class="form-check-label" for="liderazgoPro">Liderazgo</label><br>
                                <input class="form-check-input elemento-desactivable" type="checkbox" id="estres" name="estres" value="SI" data-unchecked-value="NO" disabled="">
                                <label class="form-check-label" for="estres">Control de Estrés</label><br>
                                <input class="form-check-input elemento-desactivable" type="checkbox" id="analisis" name="analisis" value="SI" data-unchecked-value="NO" disabled="">
                                <label class="form-check-label" for="analisis">Capacidad Analítica</label><br>
                                <input class="form-check-input elemento-desactivable" type="checkbox" id="comunicacion" name="comunicacion" value="SI" data-unchecked-value="NO" disabled="">
                                <label class="form-check-label" for="comunicacion">Comunicación</label><br>
                                <input class="form-check-input elemento-desactivable" type="checkbox" id="innovacion" name="innovacion" value="SI" data-unchecked-value="NO" disabled="">
                                <label class="form-check-label" for="innovacion">Innovación</label><br>
                                <input class="form-check-input elemento-desactivable" type="checkbox" id="proactiva" name="proactiva" value="SI" data-unchecked-value="NO" disabled="">
                                <label class="form-check-label" for="proactiva">Proactiva</label><br>
                                <input class="form-check-input elemento-desactivable" type="checkbox" id="flexibilidad" name="flexibilidad" value="SI" data-unchecked-value="NO" disabled="">
                                <label class="form-check-label" for="flexibilidad">Flexibilidad</label><br>
                                <input class="form-check-input elemento-desactivable" type="checkbox" id="motivacion" name="motivacion" value="SI" data-unchecked-value="NO" disabled="">
                                <label class="form-check-label" for="motivacion">Motivación</label><br>
                                <label>Otras habilidades profesionales: </label><br>
                                <textarea class="elemento-desactivable" name="otrosProfesional" rows="3" disabled=""></textarea>
                            </div>
                        </div>
                        <div class="nice-form-group form-group form-check col-md-4">
                            <label>Habilidades Sociales: </label>
                            <div class="form-check">
                                <input class="form-check-input elemento-desactivable" type="checkbox" id="empatia" name="empatia" value="SI" data-unchecked-value="NO" disabled="">
                                <label class="form-check-label" for="empatia">Empatía</label><br>
                                <input class="form-check-input elemento-desactivable" type="checkbox" id="liderazgoSoc" name="liderazgoSoc" value="SI" data-unchecked-value="NO" disabled="">
                                <label class="form-check-label" for="liderazgoSoc">Liderazgo</label><br>
                                <input class="form-check-input elemento-desactivable" type="checkbox" id="escucha" name="escucha" value="SI" data-unchecked-value="NO" disabled="">
                                <label class="form-check-label" for="escucha">Escucha Activa</label><br>
                                <input class="form-check-input elemento-desactivable" type="checkbox" id="persuasion" name="persuasion" value="SI" data-unchecked-value="NO" disabled="">
                                <label class="form-check-label" for="persuasion">Persuasión</label><br>
                                <input class="form-check-input elemento-desactivable" type="checkbox" id="asertividad" name="asertividad" value="SI" data-unchecked-value="NO" disabled="">
                                <label class="form-check-label" for="asertividad">Asertividad</label><br>
                                <input class="form-check-input elemento-desactivable" type="checkbox" id="positivo" name="positivo" value="SI" data-unchecked-value="NO" disabled="">
                                <label class="form-check-label" for="positivo">Positivo</label><br>
                                <label>Otras habilidades sociales: </label><br>
                                <textarea class="elemento-desactivable" name="otrosSocial" rows="3" disabled=""></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3 text-left">
                        <button type="button" id="modificarAptitudesHabilidad" class="btn to-reset">
                            <i class="fa-regular fa-pen-to-square"></i>Modificar
                        </button>
                        <button type="button" id="guardarAptitudesHabilidad" class="btn toggle-code d-none" disabled="">
                            <i class="fa-regular fa-floppy-disk"></i>Guardar
                        </button>
                    </div>
                </form>
            </section>

`;

