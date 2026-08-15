# Réplica SUM - Dashboard Frontend

Este proyecto es una réplica del frontend (Dashboard y Perfil) del Sistema Único de Matrícula (SUM), modernizado y adaptado para funcionar de manera estática (sin backend). Fue creado principalmente con fines educativos, de demostración y para personalizar la interfaz de usuario.

## ⚠️ Aclaración Importante (Disclaimer)

**Este proyecto es una iniciativa personal y no oficial.** No está afiliado, respaldado, asociado, mantenido ni patrocinado de ninguna manera por la Universidad Nacional Mayor de San Marcos (UNMSM). Se trata únicamente de una prueba de concepto creada de forma independiente con fines puramente académicos y de aprendizaje sobre diseño web.

## Características Principales

*   **100% Frontend Estático**: No requiere un servidor backend para funcionar. Construido con Vanilla HTML, CSS y JavaScript.
*   **Persistencia Local**: Utiliza el `LocalStorage` del navegador para simular una base de datos. Los cambios en los datos personales y la foto de perfil se guardan y se mantienen entre recargas de página.
*   **Gestor de Perfil Integrado (`modules/mi_informacion/perfil.html`)**:
    *   Edición fluida de nombres y apellidos con interfaz de guardado "lado a lado".
    *   Subida de foto de perfil con compresión automática a Base64 mediante el API de Canvas para optimizar y cuidar los límites de espacio en LocalStorage.
    *   Botones de interfaz modernos e iconos en *hover* para rápida actualización y borrado de la foto.
    *   Fallback dinámico de imagen (avatar de perrito por defecto) si el usuario borra su foto.
*   **Diseño Modular y Homologado**: Estilos consistentes en botones, tablas y tarjetas de información a través de los múltiples módulos.

## Estructura del Proyecto

El proyecto está organizado en las siguientes carpetas principales:

```text
replica_sum/
├── assets/          # Archivos estáticos
│   ├── css/         # Hojas de estilo generales y específicas por módulo
│   ├── js/          # Lógica de la aplicación (dashboard.js, perfil_foto.js, etc.)
│   ├── images/      # Iconos, logos y demás recursos gráficos
│   └── data/        # Archivos que actúan como base de datos de respaldo (foto_default.js, etc.)
├── auth/            # Módulo de inicio de sesión (simulado estáticamente)
├── modules/         # Contiene las diferentes vistas principales del sistema
│   ├── dashboard/       # Vista principal de aterrizaje (Inicio)
│   ├── mi_informacion/  # Gestión del perfil, ficha socioeconómica e información
│   ├── reportes/        # Historial académico, consolidado y reportes
│   ├── matricula/       # Vista para procesos de matrícula
│   ├── plan_estudios/   # Módulo de cursos y plan curricular
│   ├── asistencia/      # Registro y reporte de asistencia
│   └── tutorias/        # Módulo de apoyo académico
├── README.md        # Documentación del proyecto (este archivo)
└── LICENSE          # Licencia de código abierto MIT
```

## Tecnologías Utilizadas

*   **HTML5** Semántico para la estructura modular de las vistas.
*   **CSS3** (Vanilla + Variables CSS para temas de colores consistentes y animaciones ligeras).
*   **JavaScript (ES6)** para manejo de eventos, manipulación del DOM, FileReader (Canvas) y LocalStorage.
*   **FontAwesome** para la iconografía interactiva.
*   **Bootstrap** como base ligera para algunos componentes estructurales.

## Cómo empezar (Despliegue Local)

1. Clona este repositorio usando git o descarga el código fuente en formato `.zip`.
2. Al ser completamente estático, **no necesitas instalar dependencias**, NPM o Node.js.
3. Simplemente abre el archivo `modules/dashboard/index.html` (o haz un redirect desde un `index.html` en la raíz) en tu navegador web de preferencia.
4. Explora las secciones de información, sube tu propia foto o modifica tu perfil para probar la persistencia local.

## Contribución

Si deseas realizar mejoras en la interfaz, optimizar los estilos CSS, o añadir funcionalidades y nuevas vistas, siéntete libre de hacer un *fork* del repositorio y enviar un *pull request*. Toda contribución que mejore el valor educativo del proyecto es bienvenida.

## Licencia

Este proyecto se distribuye bajo la licencia **MIT**. Eres libre de utilizarlo, modificarlo y distribuirlo para fines de aprendizaje. Consulta el archivo `LICENSE` en la raíz del proyecto para más detalles formales.
