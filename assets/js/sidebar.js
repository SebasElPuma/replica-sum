document.addEventListener('DOMContentLoaded', function() {
    const sidebarHTML = `
<aside id="sidebar" class="sidebar break-point-lg has-bg-image">
	<div class="image-wrapper">
		<img src="../../assets/images/escudo_unmsm.png" alt="sidebar background">
	</div>
	<div class="sidebar-layout">
		<div class="sidebar-header">
			<img src="../../assets/images/logo_sum_header.png" style="margin: auto;" class="white-logo">
		</div>
		<div class="sidebar-content">
			<nav class="menu open-current-submenu">
				<ul>
					<li class="menu-item">
						<a href="../dashboard/index.html">
                            <span class="menu-icon">
                                <i class="fa-solid fa-house"></i>
                            </span>
							<span class="menu-title">Inicio</span>
						</a>
					</li>
					
					<li class="menu-item sub-menu">
						<a href="#">
							<span class="menu-icon">
								<i class="fa-solid fa-user-gear"></i>
							</span>
							<span class="menu-title">Mi Información</span>
						</a>
						<div class="sub-menu-list">
							<ul>
								<li class="menu-item">
									<a href="../mi_informacion/perfil.html">
										<span class="menu-title">Mi Perfil</span>
									</a>
								</li>
								<li class="menu-item">
									<a href="../mi_informacion/historial.html">
										<span class="menu-title">Historial Académico</span>
									</a>
								</li>
								<li class="menu-item">
									<a href="javascript:void(0)">
										<span class="menu-title">Formulario de Datos</span>
									</a>
								</li>
								<li class="menu-item">
									<a href="../mi_informacion/ficha_soc.html">
										<span class="menu-title">Ficha Socioeconómica</span>
									</a>
								</li>
							</ul>
						</div>
					</li>
					<li class="menu-item sub-menu">
						<a href="#">
							<span class="menu-icon">
								<i class="fa-solid fa-user-pen"></i>
							</span>
							<span class="menu-title">Matrícula</span>
						</a>
						<div class="sub-menu-list">
							<ul>
								<li class="menu-item">
									<a href="../matricula/matricula_inter.html">
										<span class="menu-title">Matrícula Vía Internet</span>
									</a>
								</li>
								<li class="menu-item">
									<a href="../matricula/prog_asig.html">
										<span class="menu-title">Programación de Asignaturas</span>
									</a>
								</li>
							</ul>
						</div>
					</li>
					<li class="menu-item sub-menu">
						<a href="#">
							<span class="menu-icon">
								<i class="fa-solid fa-file-lines"></i>
							</span>
							<span class="menu-title">Reportes</span>
						</a>
						<div class="sub-menu-list">
							<ul>
								<li class="menu-item">
									<a href="../reportes/rep_premat.html">
										<span class="menu-title">Reporte Pre-Matrícula</span>
									</a>
								</li>
								<li class="menu-item">
									<a href="../reportes/rep_matricula.html">
										<span class="menu-title">Reporte Matrícula</span>
									</a>
								</li>
								<li class="menu-item">
									<a href="#">
										<span class="menu-title">Reporte Horario de Asignaturas Matriculadas</span>
									</a>
								</li>
								<li class="menu-item">
									<a href="../reportes/rep_eva.html">
										<span class="menu-title">Reporte Evaluaciones</span>
									</a>
								</li>
								<li class="menu-item">
									<a href="../reportes/rep_deuda.html">
										<span class="menu-title">Reporte Deudas</span>
									</a>
								</li>
							</ul>
						</div>
					</li>
					<li class="menu-item">
						<a href="../asistencia/asistencia.html">
                            <span class="menu-icon">
                                <i class="fa-solid fa-user-clock"></i>
                            </span>
							<span class="menu-title">Mis Asistencias</span>
						</a>
					</li>
					<li class="menu-item">
						<a href="../tutorias/tutorias.html">
                            <span class="menu-icon">
                                <i class="fa-solid fa-person-chalkboard"></i>
                            </span>
							<span class="menu-title">Mis Tutorías</span>
						</a>
					</li>
					<li class="menu-item">
						<a href="../plan_estudios/plan_estudios.html">
                            <span class="menu-icon">
                                <i class="fa-solid fa-book"></i>
                            </span>
							<span class="menu-title">Plan de Estudios</span>
						</a>
					</li>

					<li class="menu-item">
						<a href="../manual/manual.html">
                            <span class="menu-icon">
                                <i class="fab fa-youtube"></i>
                            </span>
							<span class="menu-title">Manuales y Tutoriales</span>
						</a>
					</li>

					<li class="menu-item">
						<a href="../debug/debug.html">
							<span class="menu-icon">
								<i class="fa-solid fa-bug"></i>
							</span>
							<span class="menu-title">Debug</span>
						</a>
					</li>

				</ul>
			</nav>
			<div class="sidebar-disclaimer" style="padding: 15px 20px; margin-top: 20px; margin-bottom: 20px; text-align: center; font-size: 11px; color: #a1a1a1; line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.1);">
				Esta réplica del SUM ha sido desarrollada estrictamente con <b>fines educativos, de investigación y demostración</b>. No guarda relación oficial con la institución original.
			</div>
		</div>
	</div>
</aside>
    `;

    // Inject sidebar immediately before the overlay
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.insertAdjacentHTML('beforebegin', sidebarHTML);
        
        // Dispatch custom event to notify that sidebar has loaded
        const event = new Event('sidebarLoaded');
        document.dispatchEvent(event);
    }
});
