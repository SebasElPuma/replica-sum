(function() {
    function initDashboard() {
        // Inject CSS for submenu logic
        const style = document.createElement('style');
        style.textContent = `
            .layout .sidebar:not(.collapsed) .menu .menu-item.sub-menu.open > .sub-menu-list,
            .layout .sidebar:not(.collapsed) .menu .menu-item.sub-menu.closing > .sub-menu-list {
                display: block;
            }
            .layout .sidebar.collapsed .menu > ul > .menu-item.sub-menu > .sub-menu-list {
                display: none !important;
            }
            /* Permitir que el submenú salga de los límites del sidebar */
            .layout .sidebar.collapsed,
            .layout .sidebar.collapsed .sidebar-layout,
            .layout .sidebar.collapsed .sidebar-content,
            .layout .sidebar.collapsed .menu {
                overflow: visible !important;
            }
            /* Estilos para el submenú flotante */
            .layout .sidebar.collapsed .menu > ul > .menu-item.sub-menu {
                position: relative;
            }
            .layout .sidebar.collapsed .menu > ul > .menu-item.sub-menu:hover > .sub-menu-list {
                display: block !important;
                position: absolute;
                left: 100%;
                top: 0;
                width: 240px;
                background-color: #2a3140; /* Color del sidebar */
                box-shadow: 5px 5px 15px rgba(0,0,0,0.2);
                border-radius: 0 8px 8px 0;
                z-index: 9999;
                padding: 5px 0;
                max-height: none !important;
                overflow: visible !important;
                border: 1px solid rgba(255,255,255,0.05);
            }
            /* Asegurar que el texto del submenú sea visible cuando está flotante */
            .layout .sidebar.collapsed .menu > ul > .menu-item.sub-menu:hover > .sub-menu-list .menu-title {
                display: block !important;
                opacity: 1 !important;
                visibility: visible !important;
                color: #fff;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .layout .sidebar.collapsed .menu > ul > .menu-item.sub-menu:hover > .sub-menu-list a {
                padding: 10px 20px !important;
                display: block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .layout .sidebar.collapsed .menu > ul > .menu-item.sub-menu:hover > .sub-menu-list a:hover {
                background-color: rgba(255,255,255,0.05);
            }
        `;
        document.head.appendChild(style);

        // 1. Sidebar Toggle
        const sidebar = document.querySelector('.sidebar');
        const btnCollapse = document.getElementById('btn-collapse');
        const btnToggle = document.getElementById('btn-toggle');
        const overlay = document.getElementById('overlay');

        // Restore sidebar state from localStorage
        if (sidebar && localStorage.getItem('sidebarState') === 'collapsed') {
            sidebar.classList.add('collapsed');
        }

        function closeAllSubMenus() {
            document.querySelectorAll('.menu-item.sub-menu').forEach(menu => {
                menu.classList.remove('open');
                menu.classList.remove('closing');
                const list = menu.querySelector('.sub-menu-list');
                if (list) {
                    list.removeAttribute('style');
                }
            });
        }

        if (btnCollapse) {
            btnCollapse.addEventListener('click', function(e) {
                e.preventDefault();
                if (sidebar) {
                    sidebar.classList.toggle('collapsed');
                    if (sidebar.classList.contains('collapsed')) {
                        localStorage.setItem('sidebarState', 'collapsed');
                    } else {
                        localStorage.removeItem('sidebarState');
                    }
                }
                closeAllSubMenus();
            });
        }

        if (btnToggle) {
            btnToggle.addEventListener('click', function(e) {
                e.preventDefault();
                if (sidebar) sidebar.classList.toggle('toggled');
            });
        }

        if (overlay) {
            overlay.addEventListener('click', function() {
                if (sidebar) sidebar.classList.remove('toggled');
            });
        }

        // 2. Sidebar Sub-menus (Accordion with Animation)
        const subMenus = document.querySelectorAll('.menu-item.sub-menu > a');
        subMenus.forEach(btn => {
            btn.addEventListener('click', function(e) {
                const parent = this.closest('.menu-item.sub-menu');
                
                if (sidebar && sidebar.classList.contains('collapsed')) {
                    // Si está contraído, no hacemos nada al hacer clic, 
                    // ya que el menú flotante se abre por :hover (CSS)
                    e.preventDefault();
                } else {
                    e.preventDefault();
                    toggleAccordion(parent);
                }
            });
        });

        function toggleAccordion(parent) {
            const list = parent.querySelector('.sub-menu-list');
            const isOpen = parent.classList.contains('open');
            
            // Close other sub-menus (Accordion effect)
            document.querySelectorAll('.menu-item.sub-menu').forEach(menu => {
                if (menu !== parent && menu.classList.contains('open')) {
                    menu.classList.add('closing');
                    menu.classList.remove('open');
                    const otherList = menu.querySelector('.sub-menu-list');
                    if (otherList) {
                        otherList.style.maxHeight = otherList.scrollHeight + 'px';
                        otherList.style.overflow = 'hidden';
                        otherList.style.transition = 'max-height 0.3s ease-out';
                        
                        setTimeout(() => {
                            otherList.style.maxHeight = '0px';
                        }, 10);
                        setTimeout(() => {
                            if (menu.classList.contains('closing')) {
                                menu.classList.remove('closing');
                                otherList.removeAttribute('style');
                            }
                        }, 300);
                    }
                }
            });
            
            if (!isOpen) {
                parent.classList.remove('closing');
                parent.classList.add('open');
                list.style.transition = 'max-height 0.3s ease-out';
                list.style.overflow = 'hidden';
                list.style.maxHeight = '0px';
                
                setTimeout(() => {
                    list.style.maxHeight = list.scrollHeight + 'px';
                }, 10);
                
                setTimeout(() => {
                    if (parent.classList.contains('open')) {
                        list.style.maxHeight = 'none';
                    }
                }, 300);
            } else {
                parent.classList.add('closing');
                parent.classList.remove('open');
                
                list.style.maxHeight = list.scrollHeight + 'px';
                list.style.overflow = 'hidden';
                list.style.transition = 'max-height 0.3s ease-out';
                
                setTimeout(() => {
                    list.style.maxHeight = '0px';
                }, 10);
                setTimeout(() => {
                    if (parent.classList.contains('closing')) {
                        parent.classList.remove('closing');
                        list.removeAttribute('style');
                    }
                }, 300);
            }
        }

        // 3. Dropdown Menu (Top right profile)
        document.addEventListener('click', function(e) {
            const toggleBtn = e.target.closest('.dropdown-toggle');
            const allDropdowns = document.querySelectorAll('.dropdown-menu');
            
            if (toggleBtn) {
                e.preventDefault();
                const parent = toggleBtn.closest('.dropdown');
                const menu = parent.querySelector('.dropdown-menu');
                const isShowing = menu.classList.contains('show');
                
                allDropdowns.forEach(d => d.classList.remove('show'));
                
                if (!isShowing && menu) {
                    menu.classList.add('show');
                }
            } else if (!e.target.closest('.dropdown-menu')) {
                allDropdowns.forEach(d => d.classList.remove('show'));
            }
        });

        // 4. Timer (15 minutes countdown)
        const timerEl = document.querySelector('.timer');
        if (timerEl) {
            let totalSeconds = 15 * 60;
            
            timerEl.innerHTML = `
                <div class="jst-hours">00:</div>
                <div class="jst-minutes">15:</div>
                <div class="jst-seconds">00</div>
                <div class="jst-clearDiv"></div>
            `;
            
            const minEl = timerEl.querySelector('.jst-minutes');
            const secEl = timerEl.querySelector('.jst-seconds');

            if (minEl && secEl) {
                const timerInterval = setInterval(() => {
                    if (totalSeconds > 0) {
                        totalSeconds--;
                    } else {
                        clearInterval(timerInterval);
                        window.location.href = '../../auth/login.html';
                        return;
                    }
                    
                    const m = Math.floor(totalSeconds / 60);
                    const s = totalSeconds % 60;
                    
                    minEl.textContent = (m < 10 ? '0' + m : m) + ':';
                    secEl.textContent = (s < 10 ? '0' + s : s);
                }, 1000);
            }
        }

        // 5. Page Transition Loader
        const loader = document.querySelector('.loader');
        if (loader) {
            let extraLag = 0;
            const chaosActive = localStorage.getItem('sum_chaos_active') === '1';
            
            if (chaosActive) {
                try {
                    const configStr = localStorage.getItem('sum_chaos_config');
                    if (configStr) {
                        const config = JSON.parse(configStr);
                        if (config.lag_loader) extraLag = parseInt(config.lag_loader);
                    }
                } catch (e) {}
            }

            // Hide loader after a short delay on page load + chaos lag
            setTimeout(() => {
                loader.classList.remove('loader--active');
            }, 150 + extraLag);
        }
    }

    let componentsLoaded = 0;
    function checkInit() {
        componentsLoaded++;
        if (componentsLoaded >= 2) {
            initDashboard();
        }
    }

    if (document.querySelector('.sidebar') && document.querySelector('.header')) {
        initDashboard();
    } else {
        document.addEventListener('sidebarLoaded', checkInit);
        document.addEventListener('headerLoaded', checkInit);
    }
})();


document.addEventListener('DOMContentLoaded', function() {
    let perfilData = window.PERFIL_DEFAULT_DATA;
    try {
        const localData = localStorage.getItem('sum_perfil_data');
        if (localData) {
            perfilData = JSON.parse(localData);
        }
    } catch (e) {
        console.error("Error reading from localStorage", e);
    }

    if (perfilData) {
        const p = perfilData.datos_personales;
        if (p && p.nombres && p.apellidos) {
            const fullName = p.apellidos + ", " + p.nombres;
            document.querySelectorAll('.user-fullname').forEach(el => {
                el.textContent = fullName;
            });
        }
        // Populate index.html academic info if present
        let resumenData = window.RESUMEN_DEFAULT_DATA;
        try {
            const localRes = localStorage.getItem('sum_resumen_data');
            if (localRes) {
                resumenData = JSON.parse(localRes);
            }
        } catch (e) {
            console.error("Error reading resumen from localStorage", e);
        }
        
        if (resumenData) {
            const dashFac = document.getElementById("dashFacultad");
            if (dashFac) dashFac.textContent = resumenData.facultad;
            
            const dashProg = document.getElementById("dashPrograma");
            if (dashProg) dashProg.textContent = resumenData.escuela;
            
            const dashEsp = document.getElementById("dashEspecialidad");
            if (dashEsp) dashEsp.textContent = resumenData.especialidad;
            
            const dashPer = document.getElementById("dashPeriodo");
            if (dashPer) {
                dashPer.textContent = resumenData.periodoAcademico;
            }
        }

        const a = perfilData.academico;
        if (a) {
            // Populate hardcoded name/code in dashboard header if it exists
            const dashHeaderName = document.querySelector(".page-header .row h5");
            if (dashHeaderName && a.codigoAlumno) {
                dashHeaderName.textContent = `${p.nombres} ${p.apellidos} - ${a.codigoAlumno}`;
            }

            // Populate dashboard card profile name
            const dashName = document.querySelector(".top-container .name");
            if (dashName) {
                dashName.textContent = `${p.apellidos}, ${p.nombres}`;
            }

            // Populate dashboard card student code
            const dashCodigo = document.getElementById("dashCodigo");
            if (dashCodigo && a.codigoAlumno) {
                dashCodigo.textContent = a.codigoAlumno;
            }
        }
    }

    // CARGAR FOTO DE PERFIL GLOBAL
    const savedPic = localStorage.getItem('sum_profile_pic');
    const finalPic = savedPic || (typeof FOTO_DEFAULT_B64 !== 'undefined' ? FOTO_DEFAULT_B64 : null);
    
    if (finalPic) {
        document.querySelectorAll('.profile-image, #foto').forEach(img => {
            img.src = finalPic;
        });
    }
});
