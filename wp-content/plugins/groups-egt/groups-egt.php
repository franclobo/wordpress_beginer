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

// Registrar el tipo de contenido "group"
add_action('init', 'groupsEgt_register_group_post_type');
function groupsEgt_register_group_post_type() {
    $args = [
        'labels' => [
            'name' => 'Groups',
            'singular_name' => 'Group',
            'menu_name' => 'Groups',
            'add_new' => 'Add New Group',
            'add_new_item' => 'Add New Group',
            'new_item' => 'New Group',
            'edit_item' => 'Edit Group',
            'view_item' => 'View Group',
            'all_items' => 'All Groups',
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'rest_base' => 'groups',
        'supports' => array(
            'title',
            'editor',
            'author',
            'thumbnail',
            'excerpt',
            'custom-fields'
        ),
    ];
    register_post_type('group', $args);
    register_meta(
        'post',
        'group_type',
        array(
            'single' => true,
            'type' => 'string',
            'default' => '',
            'show_in_rest' => true,
        )
    );
}

add_action('init', 'groupsEgt_register_banner_meta');
function groupsEgt_register_banner_meta() {
    register_post_meta('group', 'banner_image', [
        'type' => 'integer',
        'single' => true,
        'show_in_rest' => true,
    ]);
}

add_action('init', 'groupsEgt_register_group_taxonomy');
function groupsEgt_register_group_taxonomy() {
    $args = [
        'labels' => [
            'name' => 'Countries',
            'singular_name' => 'Country',
            'menu_name' => 'Countries',
            'all_items' => 'All Countries',
            'edit_item' => 'Edit Country',
            'update_item' => 'Update Country',
            'add_new_item' => 'Add New Country',
            'new_item_name' => 'New Country Name',
            'menu_name' => 'Country',
        ],
        'public' => true,
        'hierarchical' => true,
        'show_in_rest' => true,
        'rest_base' => 'group-types',
    ];
    register_taxonomy('group_type', 'group', $args);
}

add_action('admin_menu', 'groupsEgt_add_admin_submenu');
function groupsEgt_add_admin_submenu() {
    add_submenu_page(
        'edit.php?post_type=group',
        'Group List',
        'Group List',
        'manage_options',
        'group-list',
        'groupsEgt_render_grouplist'
    );
}

function groupsEgt_render_grouplist() {
    ?>
    <div class="wrap" id="groups_grouplist_admin">
        <h1>Groups</h1>
        <button id="groups-load-groups">Load Groups</button>
        <h2>Countries</h2>
        <textarea id="groups-countries" rows="15" cols="125"></textarea>
    </div>
    <div style="width: 50%;">
        <h2>Update Group</h2>
        <form>
            <div>
                <label for="groups-group-id">Group ID</label>
                <input type="text" id="groups-group-id" placeholder="ID of the group to update" />
            </div>
            <div>
                <label for="groups-group-new-title">New Title</label>
                <input type="text" id="groups-group-new-title" placeholder="New Title" />
            </div>
            <div>
                <label for="groups-group-new-content">New Content</label>
                <textarea id="groups-group-new-content" cols="100" rows="5"></textarea>
            </div>
            <div>
                <label for="groups-group-new-image">New Icon Image</label>
                <input type="file" id="groups-group-new-icon-image" accept="image/*" />
            </div>
            <div>
                <label for="groups-group-new-image">New Banner Image</label>
                <input type="file" id="groups-group-new-banner-image" accept="image/*" />
            </div>
            <div>
                <input type="button" id="groups-update-group" value="Update Group" />
            </div>
        </form>

        <h2>Delete Group</h2>
        <form>
            <div>
                <label for="groups-delete-id">Group ID</label>
                <input type="text" id="groups-delete-id" placeholder="ID of the group to delete" />
            </div>
            <div>
                <input type="button" id="groups-delete-group" value="Delete Group" />
            </div>
        </form>
    </div>
    <?php
}

add_action('wp_enqueue_scripts', 'groupsEgt_enqueue_scripts');
function groupsEgt_enqueue_scripts() {
    wp_enqueue_script('groupsEgt-script', plugin_dir_url(__FILE__) . 'public/js/script.js', ['jquery'], '1.0.0', true);
    wp_enqueue_style('groupsEgt-style', plugin_dir_url(__FILE__) . 'public/css/style.css');
}

add_action('admin_enqueue_scripts', 'groupsEgt_admin_enqueue_scripts');
function groupsEgt_admin_enqueue_scripts() {
    wp_enqueue_script('groupsEgt-admin-script', plugin_dir_url(__FILE__) . 'admin/js/script.js', ['wp-api', 'wp-api-fetch'], '1.0.0', true);
    wp_enqueue_style('groupsEgt-admin-style', plugin_dir_url(__FILE__) . 'admin/css/style.css');
}