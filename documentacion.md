```markdown
# Documentacion Tecnica - WWE Skins Portfolio

---

## 1. Instrucciones de Instalacion y Ejecucion

### Requisitos Previos

Antes de comenzar, asegurate de tener instalado:

- **Git** - Para clonar el repositorio
- **Node.js** - Para ejecutar el servidor (descargar en https://nodejs.org)
- **Visual Studio Code** con la extension **Live Server** instalada - Necesaria para lanzar el proyecto correctamente (sin ella, abrir el archivo con F5 o directamente desde el explorador de archivos no funcionara)

> **Como instalar Live Server:** Abre VS Code → Ve a la pestaña de Extensiones (icono de cuadrados en la barra lateral izquierda o `Ctrl+Shift+X`) → Busca "Live Server" → Instala la extension de Ritwick Dey.

### Pasos para Ejecutar el Proyecto

**1. Clonar el repositorio**

Abre una terminal (CMD en Windows) y ejecuta:
```

git clone URL_DEL_REPOSITORIO

```plaintext

**2. Acceder a la carpeta del proyecto**
```

cd nombre-del-repositorio

```plaintext

**3. Iniciar el servidor**
```

node server.js

```plaintext

**4. Abrir en el navegador con Live Server**

Con el proyecto abierto en VS Code, haz clic en el boton **"Go Live"** que aparece en la barra de estado inferior, normalmente en la esquina inferior derecha de la ventana. Esto abrira automaticamente el proyecto en el navegador.

Tambien puedes acceder manualmente a la siguiente direccion:
```

[http://localhost:5500](http://localhost:5500)

```plaintext

**5. Detener el servidor**

Pulsa `Ctrl + C` en la terminal.

---

## 2. Estructura del Proyecto

```

/
├── index.html          → Estructura HTML
├── styles.css          → Estilos CSS
├── script.js           → Logica JavaScript
├── server.js           → Servidor Node.js
├── messages.json       → Base de datos JSON
├── documentacion.md    → Documentacion
└── img/                → Imagenes

```plaintext

---

## 3. Lista de Funcionalidades

| Funcionalidad | Descripcion |
|---------------|-------------|
| Animacion de Intro | Secuencia animada del ring al cargar |
| Efecto Magnetico | Parallax interactivo en la seccion hero |
| Buscador de Skins | Filtrado de tarjetas en tiempo real |
| Modal de Imagenes | Visor ampliado de skins |
| Formulario Backend | Guardado de mensajes en JSON |

---

## 4. Funcionalidad 1: Animacion de Intro

### Descripcion
Al cargar la pagina se muestra una animacion del ring de WWE con luces que se desvanecen progresivamente antes de mostrar el contenido principal.

### Fragmento de Codigo (script.js)

```javascript
document.body.style.overflow = 'hidden';

setTimeout(() => {
    ringLuz2.style.opacity = '0';
}, 600);

setTimeout(() => {
    ringLuz1.style.opacity = '0';
}, 1800);

setTimeout(() => {
    ringScene.style.display = 'none';
    mainContent.style.display = 'block';
    document.body.style.overflow = '';
}, 5500);
```

### Explicacion

- `document.body.style.overflow = 'hidden'` bloquea el scroll durante la animacion
- `setTimeout()` ejecuta codigo despues de un tiempo en milisegundos
- `opacity = '0'` desvanece el elemento con transicion CSS
- Al finalizar se oculta la escena y se muestra el contenido


---

## 5. Funcionalidad 2: Efecto Magnetico

### Descripcion

El texto y fondo del hero se mueven en direcciones opuestas segun la posicion del raton, creando sensacion de profundidad.

### Fragmento de Codigo (script.js)

```javascript
function lerp(a, b, t) {
    return a + (b - a) * t;
}

hero.addEventListener('mousemove', (e) => {
    const bounds = hero.getBoundingClientRect();
    targetX = ((e.clientX - bounds.left) / bounds.width - 0.5) * 2;
    targetY = ((e.clientY - bounds.top) / bounds.height - 0.5) * 2;
});

heroText.style.transform = `translate(${currentX * 24}px, ${currentY * 18}px)`;
heroBg.style.transform = `translate(${-currentX * 10}px, ${-currentY * 7}px)`;
```

### Explicacion

- `lerp()` suaviza el movimiento mediante interpolacion lineal
- `getBoundingClientRect()` obtiene las dimensiones del elemento
- Se normaliza la posicion del raton a valores entre -1 y 1
- El texto y fondo se mueven en direcciones opuestas


---

## 6. Funcionalidad 3: Buscador de Skins

### Descripcion

Permite filtrar las tarjetas de skins escribiendo el nombre del skin o del luchador en el campo de busqueda.

### Fragmento de Codigo (script.js)

```javascript
function searchSkins(query, skinsArray) {
    const queryLower = query.toLowerCase();
    return skinsArray.filter(skin =>
        skin.name.toLowerCase().includes(queryLower) ||
        skin.wrestler.toLowerCase().includes(queryLower)
    );
}

searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const results = searchSkins(e.target.value, skins);
        renderGroupedCards(results);
    }, 300);
});
```

### Explicacion

- `filter()` devuelve un array con los elementos que coinciden
- `includes()` verifica si el texto contiene la busqueda
- `toLowerCase()` permite buscar sin importar mayusculas
- El debounce de 300ms evita busquedas excesivas mientras se escribe


---

## 7. Funcionalidad 4: Modal de Imagenes

### Descripcion

Al hacer clic en una tarjeta se abre un modal con la imagen ampliada, nombre del skin, hashtags y creador.

### Fragmento de Codigo (script.js)

```javascript
function openModal(imgSrc, name, tags, creator) {
    modalImage.src = imgSrc;
    modalName.textContent = name;
    modalCreator.textContent = `Creator: ${creator}`;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});
```

### Explicacion

- `classList.add('active')` muestra el modal anadiendo una clase CSS
- `classList.remove('active')` oculta el modal quitando la clase
- El modal se puede cerrar con la tecla Escape, el boton X o haciendo clic fuera


---

## 8. Funcionalidad 5: Formulario con Backend

### Descripcion

Los usuarios pueden enviar su email y un mensaje a traves del formulario. Los datos se guardan en el archivo `messages.json` del servidor.

### Fragmento de Codigo Frontend (script.js)

```javascript
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    
    const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message })
    });
    
    if (response.ok) {
        showFormMessage('Mensaje enviado!', 'success');
        contactForm.reset();
    }
});
```

### Fragmento de Codigo Backend (server.js)

```javascript
if (req.method === 'POST' && req.url === '/api/contact') {
    let body = '';
    
    req.on('data', chunk => {
        body += chunk.toString();
    });
    
    req.on('end', () => {
        const { email, message } = JSON.parse(body);
        
        let messages = [];
        if (fs.existsSync('messages.json')) {
            messages = JSON.parse(fs.readFileSync('messages.json', 'utf8'));
        }
        
        messages.push({
            id: Date.now(),
            email: email,
            message: message,
            date: new Date().toLocaleString()
        });
        
        fs.writeFileSync('messages.json', JSON.stringify(messages, null, 2));
        res.end(JSON.stringify({ success: true }));
    });
}
```

### Explicacion

- `e.preventDefault()` evita que el formulario recargue la pagina
- `fetch()` envia una peticion HTTP al servidor
- `JSON.stringify()` convierte objetos a formato JSON
- `fs.readFileSync()` y `fs.writeFileSync()` leen y escriben el archivo
- Cada mensaje incluye id, email, mensaje y fecha


---

## 9. Responsividad

### Descripcion

La pagina se adapta a distintos tamanos de pantalla mediante media queries CSS.

### Fragmento de Codigo (styles.css)

```css
@media (max-width: 1024px) {
    .grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 768px) {
    .menu-toggle {
        display: flex;
    }
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 480px) {
    .grid {
        grid-template-columns: 1fr;
    }
}
```

### Explicacion

- `@media (max-width: Xpx)` aplica estilos segun el ancho de pantalla
- En tablets se muestran 3 columnas, en movil 2, y en pantallas pequenas 1
- El menu hamburguesa aparece en pantallas menores a 768px


---

## 10. Tecnologias

- HTML5
- CSS3
- JavaScript (ES6+)
- Node.js
- JSON
```
