jQuery(document).ready(function($) {
  $('.ugp-join-button').on('click', function() {
      const groupId = $(this).data('group-id');

      // Llamada AJAX para unirse al grupo
      $.post(ajaxurl, {
          action: 'ugp_join_group',
          group_id: groupId,
      }, function(response) {
          alert(response.message || 'You joined the group!');
      });
  });
});
