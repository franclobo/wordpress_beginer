// Cargar grupos utilizando wp.apiFetch
const loadGroupsByRestButton = document.getElementById('groups-load-groups');
if (loadGroupsByRestButton) {
  loadGroupsByRestButton.addEventListener('click', function () {
    // Realizar una solicitud a la API REST
    wp.apiFetch({ path: '/wp/v2/groups' })
      .then((groups) => {
        const textarea = document.getElementById('groups-countries');
        textarea.value = ''; // Limpiar el contenido antes de añadir
        groups.forEach((group) => {
          textarea.value += `${group.title.rendered}, ${group.link}\n`;
        });
      })
      .catch((error) => {
        console.error('Error fetching groups:', error);
        alert('Failed to load groups.');
      });
  });
}

// Función para subir una imagen y obtener su ID
function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file); // Agregar el archivo de imagen

  return wp.apiFetch({
    path: '/wp/v2/media',
    method: 'POST',
    headers: {
      // Opcional: Si estás usando autenticación por token, inclúyelo aquí.
      // 'Authorization': `Bearer ${yourToken}`
    },
    body: formData,
  });
}

// Función para crear un grupo con una imagen destacada
function submitGroup() {
  const title = document.getElementById('groups-group-title').value;
  const content = document.getElementById('groups-group-content').value;
  const fileInput = document.getElementById('groups-group-image');
  const file = fileInput.files[0]; // Obtener el archivo seleccionado

  if (!file) {
    alert('Please select an image.');
    return;
  }

  // Subir la imagen primero
  uploadImage(file)
    .then((media) => {
      // Crear el grupo con la imagen destacada
      return wp.apiFetch({
        path: '/wp/v2/groups',
        method: 'POST',
        data: {
          title: title,
          content: content,
          featured_media: media.id, // Asociar la imagen subida
          status: 'publish',
        },
      });
    })
    .then(() => {
      alert('Group saved successfully.');
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred while saving the group.');
    });
}

// Asociar la función al botón de guardar grupo
const submitGroupsByRestButton = document.getElementById('groups-submit-group');
if (submitGroupsByRestButton) {
  submitGroupsByRestButton.addEventListener('click', submitGroup);
}

// Función para actualizar un grupo
// Función para actualizar un grupo incluyendo el banner
function updateGroupWithBanner() {
  const id = document.getElementById('groups-group-id').value;
  const newTitle = document.getElementById('groups-group-new-title').value;
  const newContent = document.getElementById('groups-group-new-content').value;
  const iconFileInput = document.getElementById('groups-group-new-icon-image');
  const bannerFileInput = document.getElementById('groups-group-new-banner-image');
  const iconFile = iconFileInput.files[0];
  const bannerFile = bannerFileInput.files[0];

  if (!id) {
      alert('Please provide the ID of the group to update.');
      return;
  }

  // Subir la nueva imagen del ícono (si existe)
  const uploadIcon = iconFile ? uploadImage(iconFile) : Promise.resolve(null);
  // Subir la nueva imagen del banner (si existe)
  const uploadBanner = bannerFile ? uploadImage(bannerFile) : Promise.resolve(null);

  Promise.all([uploadIcon, uploadBanner])
      .then(([iconMedia, bannerMedia]) => {
          const iconMediaId = iconMedia ? iconMedia.id : null;
          const bannerMediaId = bannerMedia ? bannerMedia.id : null;

          // Actualizar el grupo con los nuevos datos
          return wp.apiFetch({
              path: `/wp/v2/groups/${id}`,
              method: 'POST',
              data: {
                  title: newTitle,
                  content: newContent,
                  featured_media: iconMediaId || undefined,
                  meta: {
                      banner_image: bannerMediaId, // Guardar el ID del banner en un campo personalizado
                  },
              },
          });
      })
      .then(() => {
          alert('Group updated successfully with banner.');
      })
      .catch((error) => {
          console.error('Error updating group:', error);
          alert('An error occurred while updating the group.');
      });
}

// Asociar al botón de actualización
const updateGroupsWithBannerButton = document.getElementById('groups-update-group');
if (updateGroupsWithBannerButton) {
  updateGroupsWithBannerButton.addEventListener('click', updateGroupWithBanner);
}

// Función para eliminar un grupo
function deleteGroup() {
  const id = document.getElementById('groups-delete-id').value;

  // Verifica que el ID esté proporcionado
  if (!id) {
      alert('Please provide the ID of the group to delete.');
      return;
  }

  // Realiza la solicitud DELETE
  wp.apiFetch({
      path: `/wp/v2/groups/${id}`,
      method: 'DELETE',
  })
  .then(() => {
      alert('Group deleted successfully.');
  })
  .catch((error) => {
      console.error('Error deleting group:', error);
      alert('Failed to delete the group.');
  });
}

// Asociar al botón de eliminación
const deleteGroupsByRestButton = document.getElementById('groups-delete-group');
if (deleteGroupsByRestButton) {
  deleteGroupsByRestButton.addEventListener('click', deleteGroup);
}
