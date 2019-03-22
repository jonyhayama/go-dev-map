import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 250px;
  background: #fff;
  height: calc(100vh - 40px);
  padding: 0 15px;
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;

  &.empty {
    transform: translateX(-50vw);
  }

  li {
    display: flex;
    flex-direction: row;
    margin: 15px 0;
    border-bottom: 1px solid #ddd;
    padding-bottom: 15px;

    &:last-child {
      border-bottom: none;
    }
  }

  img {
    width: 32px;
    height: 32px;
    margin-right: 5px;
    border-radius: 50%;
  }

  button {
    background: none;
    padding: 5px;
    color: #f66;
    cursor: pointer;
    border: none;
    font-size: 1.25em;
    transition: all 0.3s ease-in-out;

    &:hover {
      color: #f33;
    }
  }
`;

export const UserInfo = styled.div`
  color: #999;
  font-size: 13px;
  flex-grow: 1;

  & strong {
    display: block;
    font-size: 15px;
    color: #000;
  }
`;
