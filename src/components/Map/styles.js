import styled from 'styled-components';

export const Modal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  visibility: hidden;
  z-index: 9999;
  transition: all 0.3s ease-in-out;
  opacity: 0;

  &.opened {
    visibility: visible;
    opacity: 1;
  }
`;

export const ModalForm = styled.form`
  background: #fff;
  position: absolute;
  width: 300px;
  left: 50%;
  top: 50%;
  padding: 15px;
  border: 1px #d3d3d3 solid;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  transition: all 0.4s ease-in-out;
  transform: translate(-50%, -50%) scale(0);

  .opened & {
    transform: translate(-50%, -50%) scale(1);
  }

  h3 {
    text-align: center;
    line-height: 1.5em;
    margin-bottom: 0.5em;
  }

  input {
    width: 100%;
    border: 1px solid #ddd;
    line-height: 1.5em;
    padding: 5px 15px;
    border-radius: 5px;
  }
`;

export const ModalFormActions = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px -5px 0;

  button {
    width: 50%;
    margin: 5px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    background: #ccc;
    color: #fff;
    font-weight: bold;
    line-height: 2em;
    transition: all 0.3s ease-in-out;

    &:hover {
      background: #bbb;
    }

    & + button {
      background: #00d1b2;

      &:hover {
        background: #009d86;
      }
    }
  }
`;
