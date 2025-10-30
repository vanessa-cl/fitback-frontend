import React from "react";
import "./InativarQuestionario.css";

const InativarQuestionario = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Inativar Questionário</h2>

        <div className="modal-content">
          <div className="icon-alert">⚠️</div>
          <p>Tem certeza de que deseja inativar o questionário selecionado?</p>
        </div>

        <div className="modal-buttons">
          <button className="btn-cancelar" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-inativar" onClick={onConfirm}>
            Sim, inativar
          </button>
        </div>
      </div>
    </div>
  );
};

export default InativarQuestionario;