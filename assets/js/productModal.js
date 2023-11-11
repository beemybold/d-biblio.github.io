// Function to open the modal
const openModal = (productId, title, author, description, cover) => {
  const modal = document.getElementById('custom-modal');
  const backdrop = document.getElementById('modal-backdrop');
  const modalTitle = document.getElementById('modal-title');
  const modalAuthor = document.getElementById('modal-author');
  const modalImage = document.getElementById('modal-image');
  const modalDescription = document.getElementById('modal-description');

  // Assuming product images are in the "Book_Cover" directory
  modalImage.src = `../Book_Cover/${cover || 'default.png'}`;

  modalTitle.textContent = title;
  modalAuthor.textContent = `Auteur(e): ${author || 'Author Name'}`;
  modalDescription.textContent = description;

  modal.style.display = 'block';
  backdrop.style.display = 'block';
};

// Function to close the modal
const closeModal = () => {
  const modal = document.getElementById('custom-modal');
  const backdrop = document.getElementById('modal-backdrop');

  modal.style.display = 'none';
  backdrop.style.display = 'none';
};
