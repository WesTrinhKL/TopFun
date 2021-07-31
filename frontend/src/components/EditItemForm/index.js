import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { ModalVerify } from '../../context/Modal';
import { EditItemForm } from './EditItemForm';

function EditItemFormModal({listId}, {listItemDetails}) {
  const [showModal, setShowModal] = useState(false);
  const [verifyClose, setVerifyClose] = useState(false);


  return (
    <>
      <div className="" onClick={() => setShowModal(true)}>
          <i className="fas fa-edit"></i>
      </div>
      {/* <button className="add-item-button"  >Add an item</button> */}

      {verifyClose && (
        <ModalVerify  offVerify={() => setVerifyClose(false)} onClose={() => setShowModal(false)}>
          <div className="want-to-close">Are you sure you want to close?</div>
        </ModalVerify>
      )}
      {showModal && (
        <Modal onClose={() => setVerifyClose(true)} >

          <EditItemForm listId={listId} listItemDetails={listItemDetails}/>
        </Modal>
      )}

    </>
  );
}

export default EditItemFormModal;
