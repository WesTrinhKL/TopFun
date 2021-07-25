import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { ModalVerify } from '../../context/Modal';
import { ItemForm } from './ItemForm';

function ItemFormModal() {
  const [showModal, setShowModal] = useState(false);
  const [verifyClose, setVerifyClose] = useState(false);


  return (
    <>
      <button onClick={() => setShowModal(true)}>Add An Item</button>
      {verifyClose && (
        <ModalVerify  offVerify={() => setVerifyClose(false)} onClose={() => setShowModal(false)}>
          <div className="want-to-close">Are you sure you want to close?</div>
        </ModalVerify>
      )}
      {showModal && (
        <Modal onClose={() => setVerifyClose(true)} >

          <ItemForm />
        </Modal>
      )}

    </>
  );
}

export default ItemFormModal;
