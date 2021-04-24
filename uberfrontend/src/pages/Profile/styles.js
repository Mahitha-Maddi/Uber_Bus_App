import styled from "styled-components";
// import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    input {
      height: 44px;
      margin-top: 10px;
      padding: 0 15px;
      border: 1;
      border-radius: 12px;
      // background: rgba(0, 0, 0, 0.2);
      color: #000;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    input + span {
      align-self: flex-start;
      margin: 5px 15px 0;
      font-weight: bold;
      color: #fb6f91;
    }

    button {
      height: 44px;
      margin-top: 10px;
      border: 0;
      border-radius: 4px;

      color: #fff;
      font-weight: bold;
      font-size: 16px;
      transition: background 0.2s;
    }

    hr {
      border: 0;
      margin: 20px 0 10px;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
    }

    span {
      margin-top: 15px;
      font-size: 16px;
      color: #fff;
      opacity: 0.8;

      a {
        color: #fff;
        font-weight: bold;
        opacity: 0.8;

        &:hover {
          opacity: 1;
        }
      }
      EdiText {
        height: 44px;
        margin-top: 10px;
        padding: 0 15px;
        border: 1;
        border-radius: 12px;
        background: rgba(0, 0, 0, 1);
        color: #000;

        &::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }
      }
      EdiText + span {
        align-self: flex-start;
        margin: 10px 15px 0;
        font-weight: bold;
        color: #fb6f91;
      }
    }
  }
`;
