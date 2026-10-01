# Documentación de Control de Versiones

**Proyecto:** Portafolio personal — Edwin Jaziel Quiroz García
**Repositorio:** https://github.com/EdwinQ12/QuirozGarciaEdwinJaziel_DWI_U2
**Asignatura:** Desarrollo Web Integral (DWI) — Unidad 2
**Última actualización:** 2025

---

## Índice

1. [Justificación de las plataformas y herramientas de versionamiento](#1-justificación-de-las-plataformas-y-herramientas-de-versionamiento)
2. [Flujo de trabajo del control de versiones](#2-flujo-de-trabajo-del-control-de-versiones)
3. [Parámetros de configuración de las plataformas y herramientas de versionamiento](#3-parámetros-de-configuración-de-las-plataformas-y-herramientas-de-versionamiento)
4. [Anexo: comandos más utilizados](#4-anexo-comandos-más-utilizados)

---

## 1. Justificación de las plataformas y herramientas de versionamiento

### 1.1 ¿Qué es el control de versiones y por qué se necesita en este proyecto?

El control de versiones es el sistema que registra **todos los cambios** del código fuente
a lo largo del tiempo, permitiendo volver a cualquier estado anterior del proyecto.

En un portafolio personal, el control de versiones resuelve cuatro problemas concretos:

| Problema                          | Cómo lo resuelve Git/GitHub                                    |
| --------------------------------- | -------------------------------------------------------------- |
| **Pérdida de trabajo**            | Cada commit guarda una instantánea completa del proyecto.       |
| **Errores difíciles de rastrear** | `git diff` y `git log` muestran exactamente qué cambió y cuándo. |
| **Trabajo en equipo o entre materias** | Las ramas permiten trabajar en paralelo sin romper el código principal. |
| **Despliegue manual y repetitivo** | GitHub Actions publica el sitio automáticamente en cada `push`.  |

Sin control de versiones, un error como borrar accidentalmente `styles.css` sería
irrecuperable. Con Git, ese cambio se revierte en un segundo con `git restore`.

### 1.2 Git — Justificación

Se eligió **Git** como sistema de control de versiones distribuido por las siguientes
razones:

- **Distribuido:** cada desarrollador tiene una copia completa del repositorio en su equipo.
  Si el servidor falla, el trabajo no se pierde.
- **Velocidad:** las operaciones locales (`add`, `commit`, `status`) no requieren conexión
  a internet, lo que permite trabajar sin interrupciones.
- **Gratuito y de código abierto:** no hay licencias ni costos para un estudiante.
- **Estándar de la industria:** es el estándar de facto; casi cualquier empresa o
  evaluador espera que el trabajo esté en Git.
- **Ramificación barata:** crear ramas es instantáneo, lo que permite experimentar sin
  riesgo.
- **Integración con GitHub:** funciona de forma nativa con la plataforma de hosting usada.

**Alternativas descartadas:**

- *Subversion (SVN):* centralizado, más lento y en desuso frente a Git.
- *Mercurial:* equivalente funcional, pero con mucha menos comunidad y documentación.
- *Microsoft Teams / Google Drive:* no registran historial por cambio, no permiten volver
  a un estado anterior y no generan conflictos de forma controlada.

### 1.3 GitHub — Justificación

Se eligió **GitHub** como plataforma de hosting remoto por:

- **Repositorio remoto gratuito** para repositorios públicos (necesario para esta
  evaluación).
- **GitHub Pages integrado:** publica sitios estáticos directamente desde el repositorio,
  sin necesidad de un servidor propio ni de un hosting de pago.
- **GitHub Actions (CI/CD):** permite automatizar el despliegue con un archivo YAML, que es
  exactamente lo que exige esta unidad.
- **Issues y Pull Requests:** para registrar tareas y revisar código antes de integrarlo.
- **Historial completo:** cada commit queda registrado con autor, fecha y mensaje, lo que
  funciona como evidencia del proceso de desarrollo.
- **Visibilidad y difusión:** el portafolio queda público y puede enlazarse desde un CV
  o una hoja de vida.

### 1.4 GitHub Actions — Justificación

La automatización se implementó con **GitHub Actions** porque:

- **Integración nativa con GitHub:** no requiere configurar un servidor de integración
  continua externo ni tokens de terceros.
- **Gratuito** para repositorios públicos.
- **Despliegue continuo:** cada `push` a `main` regenera y publica el sitio sin
  intervención manual, lo que reduce el error humano.
- **Trazabilidad:** cada ejecución queda registrada con su estado (éxito o error) en la
  pestaña **Actions** del repositorio.
- **Escalable:** si el proyecto creciera, el mismo archivo podría añadir linting, pruebas
  automáticas y Minificación de CSS/JS.

### 1.5 GitHub Pages — Justificación

Como hosting del sitio se eligió **GitHub Pages** por:

- Ser **gratuito** y suficiente para un sitio estático como este.
- Servir el proyecto **directamente desde el repositorio**, sin servidor de aplicación.
- Ofrecer **HTTPS y dominio gratuito** (`edwinq12.github.io`) de forma automática.
- Permitir que el sitio se actualice con cada commit, manteniendo siempre la última
  versión publicada sincronizada con el código.

### 1.6 Resumen de la plataforma elegida

```
        Editar código
             │
             ▼
      ┌─────────────┐    commit + push
      │     Git     │ ───────────────►   ┌────────────────────┐
      │  (local)    │                    │       GitHub       │
      └─────────────┘                    │  (repositorio      │
             ▲                            │   remoto)         │
             │  git pull / clone          └─────────┬──────────┘
             │                                      │ push a main
      ┌──────┴──────┐                               ▼
      │   VS Code   │                    ┌────────────────────┐
      │  (editor)   │                    │  GitHub Actions    │
      └─────────────┘                    │   (CI/CD)          │
                                         └─────────┬──────────┘
                                                   │ deploy
                                                   ▼
                                         ┌────────────────────┐
                                         │  GitHub Pages      │
                                         │  (sitio público)   │
                                         └────────────────────┘
```

---

## 2. Flujo de trabajo del control de versiones

### 2.1 Modelo adoptado: Git Flow simplificado

Para este proyecto se utiliza un modelo **Git Flow simplificado**, adaptado al
desarrollo de un sitio estático. Se eligió este modelo porque permite trabajar por
funcionalidades sin bloquear el sitio publicado y mantiene `main` siempre funcional.

```
main ──●─────────●──────────●──────────●──────►  (siempre desplegable)
       \      /      \       /
        feat/  fix/   docs/
```

### 2.2 Ramificaciones

| Rama           | Propósito                                  | Se despliega a producción |
| -------------- | ------------------------------------------ | ------------------------ |
| `main`         | Rama principal. Código estable y funcional | **Sí** |
| `feat/*`       | Nueva funcionalidad o sección del sitio     | No |
| `fix/*`        | Corrección de errores                       | No |
| `docs/*`       | Documentación y archivos de la rúbrica     | No |
| `chore/*`      | Tareas de mantenimiento (.gitignore, etc.)  | No |

**Regla de oro:** `main` siempre contiene un sitio que funciona. Nunca se hace `push`
directo a `main` mientras se desarrolla una funcionalidad nueva.

### 2.3 Ciclo de trabajo paso a paso

```
 1. SINCRONIZAR          git pull origin main
        │
 2. CREAR RAMA           git checkout -b feat/nueva-seccion
        │
 3. MODIFICAR            Editar index.html, css/styles.css, js/main.js
        │                (el sitio se prueba en el navegador)
        │
 4. VERIFICAR            Revisar los cambios antes de confirmarlos
        │                git status
        │                git diff
        │
 5. AGREGAR              git add .
        │
 6. CONFIRMAR            git commit -m "feat: agregar sección de proyectos"
        │
 7. PUBLICAR             git push -u origin feat/nueva-seccion
        │
 8. REVISIÓN             Pull Request en GitHub → revisión → Merge
        │
 9. INTEGRAR             git checkout main
                        git merge --no-ff feat/nueva-seccion
        │
10. SINCRONIZAR          git push origin main
        │
11. AUTOMATIZACIÓN       GitHub Actions detecta el push y despliega
                        el sitio en GitHub Pages
```

### 2.4 Convenciones de mensajes de commit (Conventional Commits)

Se adoptó el estándar **Conventional Commits** para que el historial sea legible:

```
<tipo>(<ámbito>): <descripción corta en imperativo>
```

| Tipo       | Cuándo se usa                              | Ejemplo                                              |
| ---------- | ------------------------------------------ | ---------------------------------------------------- |
| `feat`     | Nueva funcionalidad                        | `feat: agregar sección de proyectos`                 |
| `fix`      | Corrección de un error                     | `fix: corregir el menú móvil en pantallas de 360px`   |
| `docs`     | Solo cambios en documentación             | `docs: ampliar la justificación de GitHub Pages`     |
| `style`    | Cambios de formato sin afectar la lógica  | `style: reformatear el CSS con saltos de línea`      |
| `refactor` | Reestructuración del código               | `refactor: extraer validaciones a un módulo`         |
| `chore`    | Mantenimiento (dependencias, .gitignore)  | `chore: agregar reglas de .gitignore`                |

**Reglas de escritura de un buen mensaje:**

- Usar el imperativo: *"agregar"*, no *"agregué"* ni *"agregando"*.
- Máximo 50 caracteres en la primera línea.
- Empezar con el tipo de cambio en **negrita** si se lee en el log.
- Poner punto y coma y detailing en el cuerpo cuando el cambio no sea evidente.

### 2.5 Estrategia de integración

- **`git merge --no-ff`:** siempre se genera un commit de merge, de modo que el
  historial muestra explícitamente dónde se integró cada funcionalidad. Esto deja
  evidencia clara del proceso de desarrollo exigido en la rúbrica.
- **Pull Requests:** cada funcionalidad pasa por un PR antes de llegar a `main`, lo que
  permite revisar el código y evita subir código roto.
- **Resolución de conflictos:** si Git reporta un conflicto se localiza con
  `git status`, se revisan los archivos marcados con `<<<<<<<`, se corrigen y se
  completa con `git add` + `git commit`.

### 2.6 Publicación y despliegue

El paso `git push origin main` dispara automáticamente el flujo definido en
`.github/workflows/deploy.yml`:

```
push a main
     │
     ▼
actions/checkout      → descarga el código del repositorio
     │
     ▼
actions/configure-pages → configura el entorno de Pages
     │
     ▼
Preparación del sitio  → crea .nojekyll y copia los archivos a _site/
     │
     ▼
upload-pages-artifact  → empaqueta _site/
     │
     ▼
deploy-pages           → publica en https://edwinq12.github.io/QuirozGarciaEdwinJaziel_DWI_U2/
```

Como el proyecto no requiere compilación (no hay bundler, ni `npm install`, ni gestor de
paquetes), el workflow **no necesita paso de build**. Solo empaqueta y publica.

### 2.7 Manejo de incidencias

| Situación                        | Solución                                                    |
| -------------------------------- | ----------------------------------------------------------- |
| Modificaste algo por error       | `git restore css/styles.css`                                |
| Quieres descartar todos los cambios no confirmados | `git restore .`                    |
| "Ya lo subí y está mal"         | `git revert <hash>` (crea un commit nuevo, no borra historia) |
| Empezaste una línea y te arrepentiste | `git restore --staged .`                                |
| Necesitas volver a un commit    | `git log` para buscar el hash y `git checkout <hash>`       |
| La rama local se atrasó         | `git pull --rebase origin main`                              |

> **Importante:** se usa `revert` en lugar de `reset --hard` sobre commits ya
> publicados, porque reescribir la historia en un repositorio compartido puede
> desincronizar el trabajo de otras personas.

---

## 3. Parámetros de configuración de las plataformas y herramientas de versionamiento

### 3.1 Configuración global de Git

Estos parámetros se definen **una sola vez por usuario** en la máquina:

```bash
# Identidad del autor de los commits (aparece en el historial público)
git config --global user.name  "Edwin Jaziel Quiroz García"
git config --global user.email "TU_CORREO@ejemplo.com"

# Editor de texto predeterminado al hacer merge o rebase
git config --global core.editor "code --wait"

# Colorea la salida de git en la terminal (facilita leer el historial)
git config --global color.ui auto

# Divide el historial de forma visual por donde se ramifica
git config --global log.graph "oneline"

# Normaliza los finales de línea entre Windows y Linux
git config --global core.autocrlf input
```

**Descripción de cada parámetro:**

| Parámetro            | Valor                            | Función                                                              |
| -------------------- | -------------------------------- | -------------------------------------------------------------------- |
| `user.name`          | Nombre completo                  | Firma los commits; define la autoría del trabajo.                     |
| `user.email`         | Correo institucional             | Debe coincidir con el correo de la cuenta de GitHub para vincular el commit al perfil. |
| `core.editor`        | `code --wait`                    | Permite editar el mensaje de merge en VS Code en lugar de Notepad.    |
| `color.ui`           | `auto`                           | Colorea el texto de la terminal.                                      |
| `log.graph`          | `oneline`                        | Dibuja las ramas en el historial, útil en proyectos con varias ramas.  |
| `core.autocrlf`      | `input`                          | Evita que Git convierta los finales de línea al guardar, previniendo que todo el archivo aparezca modificado. |

### 3.2 Configuración del repositorio (`git config --local`)

Estos parámetros se aplican **solo a este proyecto**:

```bash
git remote add origin https://github.com/EdwinQ12/QuirozGarciaEdwinJaziel_DWI_U2.git
git config core.repositoryformatversion 0
git config pull.rebase true            # los cambios locales se re-aplican arriba, sin commits de merge extra
git config pull.ff only                # no permite merge al hacer pull
git config init.defaultBranch main
git config alias.est "status"          # atajo: git est
git config alias.lg "log --oneline --graph --decorate --all"
git config merge.conflictstyle diff3   # muestra el conflicto con la base común
```

**Descripción de cada parámetro:**

| Parámetro                    | Valor                | Función                                                                 |
| ---------------------------- | -------------------- | ----------------------------------------------------------------------- |
| `remote.origin.url`          | URL del repositorio  | Define dónde se envía y de dónde se descarga el código.                 |
| `remote.origin.fetch`        | `+refs/heads/*:refs/remotes/origin/*` | Permite listar las ramas remotas con `git branch -a`. |
| `core.repositoryformatversion` | `0`                 | Mantiene el formato de repositorio clásico, compatible con todas las herramientas. |
| `pull.rebase`                | `true`               | Historial lineal, sin merges innecesarios al actualizar.                 |
| `pull.ff`                    | `only`               | Evita que un `pull` cree commits de merge automáticos.                   |
| `init.defaultBranch`         | `main`               | La primera rama se llama `main`, no `master`.                           |
| `alias.est`                  | `status`             | Atajo para escribir `git est`.                                          |
| `alias.lg`                   | `log --oneline --graph --decorate --all` | Historial visual de todas las ramas.                      |
| `merge.conflictstyle`        | `diff3`              | Muestra también la versión original común al resolver conflictos.        |

### 3.3 Archivo `.gitignore`

Se configuró para que solo se versione lo necesario:

```
.DS_Store        → archivos del sistema operativo macOS
Thumbs.db        → miniaturas de Windows
desktop.ini      → configuración local de carpetas en Windows
.vscode/         → configuración personal del editor
.idea/           → configuración de IntelliJ / WebStorm
.env             → variables de entorno con datos sensibles
node_modules/    → dependencias (el proyecto no las usa, pero queda por si acaso)
```

### 3.4 Parámetros del archivo `.github/workflows/deploy.yml`

| Clave del YAML            | Valor                          | Función                                                       |
| ------------------------- | ------------------------------ | ------------------------------------------------------------- |
| `name`                    | `Desplegar a GitHub Pages`     | Nombre visible en la pestaña **Actions**.                     |
| `on.push.branches`        | `["main"]`                     | Solo se ejecuta con `push` a la rama principal.                |
| `on.workflow_dispatch`    | (activado)                     | Permite ejecutarlo manualmente desde la interfaz web.          |
| `permissions.contents`    | `read`                         | Permiso mínimo de lectura del código.                         |
| `permissions.pages`       | `write`                        | Necesario para publicar en Pages.                              |
| `permissions.id-token`    | `write`                        | Permite la autenticación OIDC segura del despliegue.           |
| `concurrency.group`       | `pages`                        | Serializa los despliegues.                                     |
| `concurrency.cancel-in-progress` | `true`                    | Cancela un despliegue si llega un `push` más nuevo.            |
| `runs-on`                 | `ubuntu-latest`                | Entorno Linux donde se ejecuta el workflow.                    |
| `actions/checkout@v4`     | —                              | Clona el repositorio en el runner.                             |
| `actions/configure-pages@v5` | —                            | Prepara la configuración de Pages.                             |
| `actions/upload-pages-artifact@v3` | `_site`             | Empaqueta el sitio como artefacto de despliegue.                |
| `actions/deploy-pages@v4` | —                              | Publica el artefacto en la URL de Pages.                       |
| `touch .nojekyll`         | —                              | Desactiva el procesamiento Jekyll de GitHub Pages.             |

### 3.5 Parámetros de GitHub Pages (configuración del repositorio)

En **Settings → Pages** del repositorio:

| Parámetro                | Valor        | Justificación                                             |
| ------------------------ | ------------ | ---------------------------------------------------------- |
| **Source / Build and deployment** | `GitHub Actions` | Despliegue automatizado, sin rama ni carpeta que seleccionar. |
| **Environment**          | `github-pages` | Entorno donde se publica el sitio.                       |
| **Custom domain**        | *(vacío)*    | Se usa el subdominio gratuito `edwinq12.github.io`.        |
| **Enforce HTTPS**        | `Sí`         | GitHub Pages emite certificado TLS gratuito.               |

### 3.6 Visibilidad y permisos del repositorio

| Parámetro              | Valor       | Justificación                                                  |
| ---------------------- | ----------- | -------------------------------------------------------------- |
| Visibilidad            | `Public`    | GitHub Pages en el plan gratuito solo publica repositorios públicos. |
| Branch por defecto     | `main`      | Coincide con la configuración de `on.push.branches`.           |
| Protección de rama     | `main` activa (opcional) | Evita pushes directos y obliga a pasar por Pull Request. |
| Permisos de la acción | `Read and write` | Necesario para que Actions publique.                     |

> **Nota sobre la protección de rama:** si se activa, el workflow de despliegue
> seguiría funcionando, porque se ejecuta desde el repositorio y no desde la rama.

### 3.7 Resumen: donde vive cada configuración

| Ámbito                  | Ubicación                                        | Ámbito del ajuste        |
| ----------------------- | ------------------------------------------------ | ------------------------ |
| Global del usuario      | Archivo personal de Git                          | Todos los repos del equipo |
| Local del repositorio   | `.git/config`                                     | Solo este proyecto        |
| Archivos a ignorar      | `.gitignore`                                      | Detección de cambios     |
| Permisos de despliegue  | `.github/workflows/deploy.yml`                    | Ejecución automática     |
| Hosting y URL           | GitHub → Settings → Pages                        | Publicación              |
| Autenticación           | Cuenta de GitHub                                  | Permisos del usuario     |

---

## 4. Anexo: comandos más utilizados

### 4.1 Configuración inicial

```bash
# Inicializar el repositorio en la carpeta del proyecto
cd C:\Users\Edwin Quiroz\proyectos\portafolio
git init

# Definir la rama inicial
git branch -M main

# Vincular con el repositorio remoto
git remote add origin https://github.com/EdwinQ12/QuirozGarciaEdwinJaziel_DWI_U2.git
```

### 4.2 Flujo diario

```bash
git status                          # ¿qué hay pendiente?
git diff                            # ¿qué cambió exactamente?
git add .                           # preparar todos los cambios
git commit -m "feat: mensaje"       # guardar
git push -u origin main             # publicar
```

### 4.3 Ramas

```bash
git branch                         # listar ramas locales
git branch -a                      # listar locales y remotas
git checkout -b feat/seccion       # crear y cambiar de rama
git checkout main                  # volver a main
git merge --no-ff feat/seccion     # integrar (deja registro)
git branch -d feat/seccion         # eliminar la rama ya integrada
```

### 4.4 Historial y diagnóstico

```bash
git log --oneline --graph --decorate --all   # historial visual
git show <hash>                              # ver un commit completo
git blame index.html                         # quién escribió cada línea
git reflog                                   # historial de referencias (recuperación)
```

### 4.5 Deshacer

```bash
git restore archivo.html          # descartar cambios de un archivo
git restore .                    # descartar todos los cambios sin confirmar
git restore --staged archivo     # sacar un archivo del área de preparación
git revert <hash>                # revertir un commit ya publicado
```

### 4.6 GitHub Pages

```bash
# Ver si el sitio está publicado
start https://edwinq12.github.io/QuirozGarciaEdwinJaziel_DWI_U2/

# Ver el estado de los workflows (en la terminal, requiere gh CLI)
gh run list
```

---

## Conclusión

Para el desarrollo de este portafolio se adoptó **Git** como sistema de control de
versiones distribuido, **GitHub** como plataforma remota, **GitHub Actions** como
herramienta de integración continua y **GitHub Pages** como hosting.

La combinación cumple con cuatro objetivos: conservar el historial completo del
proyecto, permitir el trabajo seguro por ramas, documentar el proceso de desarrollo
mediante commits y Pull Requests, y automatizar el despliegue para que cada cambio
publicado en `main` se refleje automáticamente en el sitio público.

La documentación resultante no solo describe **qué** herramientas se usaron, sino
también **por qué** se eligieron, **cómo** se usaron en el día a día y **con qué
parámetros** quedaron configuradas, que es justamente lo que evalúa la unidad.

---

**Autor:** Edwin Jaziel Quiroz García
**Repositorio:** https://github.com/EdwinQ12/QuirozGarciaEdwinJaziel_DWI_U2
