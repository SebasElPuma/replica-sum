document.addEventListener('DOMContentLoaded', function() {
    const headerHTML = `
<header class="header">
	<a id="btn-collapse" href="#">
		<i class="fa-solid fa-bars"></i>
	</a>
	<a id="btn-toggle" href="#" class="sidebar-toggler break-point-lg">
		<i class="fa-solid fa-bars"></i>
	</a>
	
	<div id="btn-dark-mode" style="font-size: 18px; cursor: pointer; margin-right: auto; padding-left: 15px;" title="Cambiar Tema">
		<i class="fa-solid fa-moon text-secondary"></i>
	</div>

	<div class="d-flex align-items-center">
		<div class="timer mt-1 mr-2" data-minutes-left="15"></div>

		<div class="dropdown ml-2 mr-2 dd-hide">
			<a class="btn btn-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
				<span class="user-fullname"></span>
			</a>
			<div class="dropdown-menu">
				<input type="hidden" id="userSession" value="">
				<a class="dropdown-item" href="../mi_informacion/perfil.html"><i class="fa-regular fa-user"></i> Perfil</a>
				<a class="dropdown-item" href="../../auth/login.html"><i class="fa-solid fa-arrow-right-from-bracket"></i> Salir</a>
			</div>
		</div>
		<div class="ml-2 mt-1" style="font-size: 15px;">
			<a href="../../auth/login.html">
				<i class="fa-solid fa-power-off"></i> Salir
			</a>
		</div>
	</div>
</header>
    `;

    // Inject header immediately before the main content
    const content = document.querySelector('.content');
    if (content) {
        content.insertAdjacentHTML('beforebegin', headerHTML);
        
        // --- LÓGICA MODO OSCURO ---
        const btnDarkMode = document.getElementById('btn-dark-mode');
        const iconDarkMode = btnDarkMode.querySelector('i');
        
        // Al cargar, revisar estado actual
        if (localStorage.getItem('sum_theme') === 'dark') {
            document.body.classList.add('dark-mode');
            iconDarkMode.classList.remove('fa-moon', 'text-secondary');
            iconDarkMode.classList.add('fa-sun', 'text-warning');
        }

        // Evento click
        btnDarkMode.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-mode');
            if (isDark) {
                localStorage.setItem('sum_theme', 'dark');
                iconDarkMode.classList.remove('fa-moon', 'text-secondary');
                iconDarkMode.classList.add('fa-sun', 'text-warning');
            } else {
                localStorage.setItem('sum_theme', 'light');
                iconDarkMode.classList.remove('fa-sun', 'text-warning');
                iconDarkMode.classList.add('fa-moon', 'text-secondary');
            }
        });

        // Dispatch custom event to notify that header has loaded
        const event = new Event('headerLoaded');
        document.dispatchEvent(event);
    }
});
// Immediate application to prevent flash (if header.js is executed sync)
if (localStorage.getItem('sum_theme') === 'dark') {
    document.body.classList.add('dark-mode');
}
