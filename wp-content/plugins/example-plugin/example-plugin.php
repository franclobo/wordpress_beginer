<?php
/**
 * Plugin Name: Example Plugin
 * Description: Thid id an example plugin for the Wordpress developer pathway.
 * Version: 1.0
 */

 if ( ! defined( 'ABSPATH' ) ) {
 	exit; // Exit if accessed directly.
 };

 $arg = array(
  'labels' => array(
    'name' => 'Books',
    'singular_name' => 'Book',
    'menu_name' => 'Books',
    'add_new' => 'Add New Book',
    'add_new_item' => 'Add New Book',
    'new_item' => 'New Book',
    'edit_item' => 'Edit Book',
    'view_item' => 'View Book',
    'all_items' => 'All Books',
  ),
  'public' => true,
  'has_archive' => true,
  'show_in_rest' => true,
  'supports' => array(
    'title',
    'editor',
    'author',
    'thumbnail',
    'excerpt',
  ),
);

register_post_type('book', $arg);