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

?>

<div class="groups-egt-home">
    <div class="groups-egt-title">
        <h2>Our Groups</h2>
    </div>
    <div class="groups-egt-table-container">
        <?php if (!empty($groups)) : ?>
            <?php foreach ($groups as $group) : ?>
                <div class="groups-egt-item">
                    <div class="groups-egt-description">
                        <div class="groups-egt-info">
                            <div class="groups-egt-image">
                                <?php 
                                // Obtener la imagen destacada del grupo
                                $image_url = get_the_post_thumbnail_url($group->ID, 'medium');
                                if ($image_url) : ?>
                                    <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($group->post_title); ?>">
                                <?php else : ?>
                                    <img src="https://via.placeholder.com/150" alt="Placeholder">
                                <?php endif; ?>
                            </div>
                            <div class="groups-egt-item-title">
                                <h4 onclick="window.location.href='<?php echo esc_url(get_permalink($group->ID)); ?>'">
                                    <?php echo esc_html($group->post_title); ?>
                                </h4>
                                <p>
                                    <?php
                                    $group_type = get_post_meta($group->ID, 'group_type', true) ?: 'Public';
                                    $members_count = 1; // Puedes cambiar esto a la lógica de miembros reales
                                    echo esc_html($group_type) . " - " . 
                                         ($members_count === 1 ? '1 member' : "{$members_count} members");
                                    ?>
                                </p>
                            </div>
                        </div>
                    </div>
                    <button class="groups-egt-button" onclick="console.log('Join Group <?php echo $group->ID; ?>')">Join</button>
                </div>
            <?php endforeach; ?>
        <?php else : ?>
            <p>No groups yet.</p>
        <?php endif; ?>
    </div>
</div>
