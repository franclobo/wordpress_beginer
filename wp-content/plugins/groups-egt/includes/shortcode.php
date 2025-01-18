<?php
function groupsEgt_shortcode() {
    ob_start();
    include plugin_dir_path(__FILE__) . './../templates/groups-table.php';
    return ob_get_clean();
}

function groupsEgt_register_shortcode() {
    add_shortcode('groupsEgt', 'groupsEgt_shortcode');
}
add_action('init', 'groupsEgt_register_shortcode');
