<div align="center">

# Portafolio personal — Edwin Quiroz

**Desarrollador Web Full Stack**

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-22d3ee?style=flat-square&logo=github)](https://edwinq12.github.io/QuirozGarciaEdwinJaziel_DWI_U2/)
[![Deploy](https://github.com/EdwinQ12/QuirozGarciaEdwinJaziel_DWI_U2/actions/workflows/deploy.yml/badge.svg)](https://github.com/EdwinQ12/QuirozGarciaEdwinJaziel_DWI_U2/actions/workflows/deploy.yml)

Sitio one-page con HTML, CSS y JavaScript sin frameworks ni dependencias.
Desplegado automáticamente con GitHub Actions.

</div>

---

## 📁 Estructura del proyecto

```
portafolio/
├── .github/
│   └── workflows/
│       └── deploy.yml        # CI/CD: publica el sitio en GitHub Pages
├── assets/
│   ├── descargas/            # CV, portafolio PDF (coloca aquí tus archivos)
│   └── favicon.svg
├── css/
│   └── styles.css            # Estilos completos del sitio
├── js/
│   └── main.js               # Interactividad (vanilla JS)
├── .gitignore
├── DOCUMENTACION_VERSIONAMIENTO.md   # Guía de Git, GitHub y GitHub Pages
├── index.html                # One-page del portafolio
└── README.md
```

## 🛠️ Tecnologías

| Categoría      | Tecnologías                                                   |
| -------------- | ------------------------------------------------------------- |
| **Markup**     | HTML5 semántico                                                |
| **Estilos**    | CSS3 — Grid, Flexbox, variables CSS, animaciones, responsive   |
| **Lógica**     | JavaScript ES6+ — `IntersectionObserver`, `FormData`, `fetch`   |
| **Versionado** | Git · GitHub · GitHub Actions · GitHub Pages                   |
| **Hosting**    | GitHub Pages (gratuito, HTTPS automático)                      |

**Cero dependencias.** No hay `package.json` ni `node_modules`: el sitio funciona
tal cual se abre el `index.html`.

## ✨ Funcionalidades

- **Diseño dark mode** con acento cian/violeta, glassmorphism y orbes animados
- **Responsive** en móvil, tablet y escritorio (probado desde 360 px)
- **Animaciones de entrada** con `IntersectionObserver` (se desactivan con
  `prefers-reduced-motion`)
- **Navbar inteligente:** efecto glass al hacer scroll, sección activa resaltada,
  menú móvil accesible
- **Contadores animados** en las estadísticas
- **Máquina de escribir** en el hero
- **Formulario de contacto** con validación en el cliente y envío por Formspree
  (con respaldo automático a `mailto:`)
- **Accesibilidad:** HTML semántico, `aria-label`, `skip-link`, foco visible
- **Despliegue automático** a GitHub Pages con GitHub Actions

## 🚀 Ver el sitio en local

No requiere instalar nada:

```bash
# Opción 1 — abrir directamente
start index.html

# Opción 2 — con servidor local (recomendado para probar el formulario)
python -m http.server 8000
# luego abre http://localhost:8000
```

## 🔗 Publicar en GitHub Pages

El repositorio ya incluye el workflow `.github/workflows/deploy.yml`. Para
activarlo:

1. En GitHub ve a **Settings → Pages**.
2. En **Build and deployment**, elige **Source: GitHub Actions**.
3. Listo: cada `push` a `main` publica el sitio automáticamente.

> Si es la primera vez, haz un `git commit --allow-empty -m "ci: activar GitHub Pages"`
> y `push` para disparar la primera ejecución.

## ✏️ Personalizar el contenido

Busca los comentarios `REEMPLAZA` en `index.html` y ajusta:

| Qué cambiar              | Dónde                                              |
| ------------------------ | -------------------------------------------------- |
| Correo electrónico       | `mailto:edwin.quiroz@email.com` y `MY_EMAIL` en `js/main.js` |
| Teléfono / WhatsApp      | `https://wa.me/51900000000` y `tel:+51900000000`  |
| Usuario de GitHub        | `https://github.com/EdwinQ12`                     |
| LinkedIn                 | `https://linkedin.com/in/edwin-quiroz`             |
| Proyectos                | Bloque `<article class="project">`                  |
| Certificaciones          | Bloque `<article class="cert">`                     |
| Endpoint del formulario  | Atributo `action` de `#form` en `index.html`       |

### Activar envío real del formulario

1. Crea una cuenta en [Formspree](https://formspree.io).
2. Crea un formulario y copia tu ID.
3. Reemplaza `TU_ID_AQUI` en el atributo `action` del formulario.

Mientras el ID siga siendo el placeholder, el sitio funciona igual: abre el
programa de correo del visitante con los datos ya rellenados.

### Agregar tu CV

Coloca tus archivos en `assets/descargas/` manteniendo los nombres usados en el
HTML, o actualiza los atributos `href` de los enlaces `<a class="dl">`.

## 📚 Documentación de la entrega

La justificación de las plataformas, el flujo de trabajo del control de versiones y
los parámetros de configuración están en
**[`DOCUMENTACION_VERSIONAMIENTO.md`](DOCUMENTACION_VERSIONAMIENTO.md)**.

## 🔐 Ramas y commits

```bash
git checkout -b feat/nueva-seccion     # trabajar aislado
git add .
git commit -m "feat: agregar sección de proyectos"
git push -u origin feat/nueva-seccion  # abrir Pull Request
```

Convenciones de commit basadas en
[Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/):
`feat`, `fix`, `docs`, `style`, `refactor`, `chore`.

## 📄 Licencia

Uso académico. © 2025 Edwin Jaziel Quiroz García.
