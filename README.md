# Documentación - API de Autores y Posts

Esta API permite gestionar autores y posts, facilitando el registro de autores con información personal y la creación de posts asociados a dichos autores. Proporciona endpoints para obtener información detallada de autores y posts, así como para crear y vincular nuevos registros.

## Librerías Utilizadas

- express
- mysql2
- multer
- dotenv
- dayjs

## Endpoints

### Autores

#### Obtener Todos los Autores

- URL: `GET /api/authors`
- Descripción: Devuelve una lista con todos los autores registrados, incluyendo información detallada de cada uno.
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con la lista de autores, incluyendo los campos `nombre`, `email`, `imagen`, y `created_at`.

#### Registrar un Nuevo Autor

- URL: `POST /api/authors`
- Descripción: Registra un nuevo autor con su información personal y, opcionalmente, una imagen de perfil.
- Body: Formato `multipart/form-data` con los siguientes campos:
  - `nombre`: Nombre completo del autor.
  - `email`: Correo electrónico único del autor.
  - `imagen`: Archivo de imagen opcional.
- Respuesta exitosa:
  - Código: 201
  - Contenido: JSON con los datos del autor recién creado, incluyendo la URL de la imagen si fue proporcionada.

### Posts

#### Obtener Todos los Posts

- URL: `GET /api/posts`
- Descripción: Devuelve una lista completa de todos los posts publicados, incluyendo información del autor de cada post.
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con la lista de posts. Cada post incluye detalles como `titulo`, `descripcion`, `fecha_creacion`, `categoria`, `autor_id`, y datos del autor (`autor_nombre`, `autor_email`, `autor_imagen`).

#### Crear un Nuevo Post

- URL: `POST /api/posts`
- Descripción: Crea un nuevo post asociado a un autor específico.
- Body: JSON con los siguientes campos:
  - `titulo`: Título del post.
  - `descripcion`: Contenido o descripción del post.
  - `categoria`: Categoría del post.
  - `autor_id`: ID del autor que escribe el post.
- Respuesta exitosa:
  - Código: 201
  - Contenido: JSON con los datos del post recién creado, incluyendo los datos del autor.

#### Obtener Todos los Posts de un Autor Específico

- URL: `GET /api/posts/author/:autor_id`
- Descripción: Devuelve todos los posts escritos por un autor específico.
- Parámetros:
  - `autor_id`: ID del autor.
- Respuesta exitosa:
  - Código: 200
  - Contenido: JSON con la lista de posts del autor, incluyendo `titulo`, `descripcion`, `fecha_creacion`, `categoria`, y datos del autor.
