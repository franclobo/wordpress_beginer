<?php
/**
 * Render callback for the Bookstore Block.
 *
 * @param array $attributes Block attributes.
 * @param string $content Block content.
 *
 * @return string Rendered HTML.
 */
function render_bookstore_block() {
  // Hacer la consulta a la API REST de WordPress para obtener los libros.
  $response = wp_remote_get( 'https://wordpress/wp-json/wp/v2/books' );

  // Verificar si la respuesta es válida.
  if ( is_wp_error( $response ) ) {
    return 'Error al obtener los libros.';
  }

  // Obtener el cuerpo de la respuesta.
  $books = json_decode( wp_remote_retrieve_body( $response ), true );

  // Verificar si hay libros en la respuesta.
  if ( empty( $books ) ) {
    return 'No books found.';
  }

  // Empezar el búfer de salida.
  ob_start();
  ?>
  <ul>
    <?php foreach ( $books as $book ) : ?>
      <li>
        <a href="<?php echo esc_url( $book['link'] ); ?>">
          <?php echo esc_html( $book['title']['rendered'] ); ?>
        </a>
      </li>
    <?php endforeach; ?>
  </ul>
  <?php

  // Retornar el búfer de salida.
  return ob_get_clean();
}
