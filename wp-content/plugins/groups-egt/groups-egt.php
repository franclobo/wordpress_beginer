<?php
/**
 * Plugin Name: GroupsEGT
 * Description: A plugin to manage groups.
 * Version: 1.0.0
 * Requires PHP: 8.2.12
 * Author: Francisco Borja
 * License: GPL-2.0+
 * Text Domain: groupsEgt
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

// Incluir archivos necesarios
require_once plugin_dir_path(__FILE__) . 'includes/class-group-manager.php';
require_once plugin_dir_path(__FILE__) . 'includes/class-tab-renderer.php';
require_once plugin_dir_path(__FILE__) . 'includes/shortcode.php';

// Registrar estilos y scripts
function groupsEgt_enqueue_scripts() {
    wp_enqueue_style('groupsEgt-style', plugins_url('public/css/style.css', __FILE__));
    wp_enqueue_script(
        'groupsEgt-script',
        plugins_url('public/js/script.js', __FILE__),
        ['wp-element'], // Carga React y ReactDOM de WordPress
        '1.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'groupsEgt_enqueue_scripts');

// Registrar el tipo de contenido "group"
function groupsEgt_register_group_post_type() {
    $args = [
        'labels' => [
            'name' => 'Groups',
            'singular_name' => 'Group',
            'menu_name' => 'Groups',
            'add_new' => 'Add New Group',
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'supports' => ['title', 'editor', 'thumbnail'],
    ];
    register_post_type('group', $args);
}
add_action('init', 'groupsEgt_register_group_post_type');


add_action('wp_ajax_ugp_join_group', 'ugp_join_group');
add_action('wp_ajax_nopriv_ugp_join_group', 'ugp_join_group');

function ugp_join_group() {
    $group_id = intval($_POST['group_id']);
    $user_id = get_current_user_id();

    if ($group_id && $user_id) {
        // Guardar la relación usuario-grupo (puedes usar post meta o tu propia tabla)
        update_post_meta($group_id, '_group_member_' . $user_id, true);
        wp_send_json_success(['message' => 'You successfully joined the group!']);
    } else {
        wp_send_json_error(['message' => 'Error joining the group.']);
    }
}
