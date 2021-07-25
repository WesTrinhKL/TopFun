import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { ItemForm } from './ItemForm';

function ItemFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Add An Item</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ItemForm />
        </Modal>
      )}
    </>
  );
}

export default ItemFormModal;
