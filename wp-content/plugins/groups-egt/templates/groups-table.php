<?php
// Seguridad
if (!defined('ABSPATH')) exit;

// Consulta a la base de datos para obtener los grupos
global $wpdb;

// Supongamos que los grupos están almacenados como un Custom Post Type llamado 'group'
$groups = $wpdb->get_results("
    SELECT ID, post_title, post_content 
    FROM {$wpdb->prefix}posts 
    WHERE post_type = 'group' 
    AND post_status = 'publish'
");

if (!empty($groups)) : ?>
    <table class="ugp-groups-table">
        <thead>
            <tr>
                <th>Group Name</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($groups as $group) : ?>
                <tr>
                    <td>
                        <!-- El enlace lleva al detalle del grupo -->
                        <a href="<?php echo esc_url(get_permalink($group->ID)); ?>">
                            <?php echo esc_html($group->post_title); ?>
                        </a>
                    </td>
                    <td><?php echo esc_html(wp_trim_words($group->post_content, 20)); // Trunca el contenido a 20 palabras ?></td>
                    <td>
                        <button class="ugp-join-button" data-group-id="<?php echo esc_attr($group->ID); ?>">
                            Join Group
                        </button>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
<?php else : ?>
    <p>No groups available.</p>
<?php endif; ?>
