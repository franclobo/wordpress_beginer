<?php
	$block_props = get_block_wrapper_attributes();
	$starting_year = $attributes['startingYear'];
	$current_year = date('Y');
?>
<p <?= $block_props ?>>
	Copyright &copy; <?= $starting_year == $current_year ? $current_year : $starting_year . '-' . $current_year ?>
</p>
