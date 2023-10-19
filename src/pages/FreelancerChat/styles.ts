import styled, { keyframes } from 'styled-components'
import { Window } from '@/utils/styles/globals'

interface IFreelancerChat {
  color: string
  background: string
}

const chatHeaderHeight = '55px'
const chatFooterHeight = '70px'

const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`

const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`

export const FreelancerChat = styled(Window)<IFreelancerChat>`
  justify-content: center;
  padding: 20px;

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-background-clip: text;
    -webkit-text-fill-color: ${({ color }) => color};
    transition: background-color 5000s ease-in-out 0s;
    box-shadow: inset 0 0 20px 20px ${({ background }) => background};
  }
`

export const Chat = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 680px;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
`

export const ChatBackground = styled.div`
  z-index: 5;
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.012;
  }
`

export const ChatHeader = styled.div`
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${chatHeaderHeight};
  padding: 0 15px;
`

export const ChatHeaderUserInfos = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`

export const UserInfosImage = styled.div`
  display: flex;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const UserInfosName = styled.div`
  display: flex;
  align-items: center;

  p {
    font-size: 14px;
    line-height: 14px;
    font-weight: 300;
  }
`

export const UserInfosMedias = styled.div`
  display: flex;
  column-gap: 5px;

  .ant-btn-icon-only {
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      font-size: 20px;
    }
  }
`

export const ChatHeaderMenu = styled.div`
  display: flex;
  column-gap: 8px;
`

export const ChatMessagesContainer = styled.div`
  z-index: 10;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  width: 100%;
  height: calc(100% - ${chatHeaderHeight} - ${chatFooterHeight});
  overflow: hidden auto;

  &::-webkit-scrollbar {
    width: 2px;
    z-index: 1000;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: #ff7a00;
  }
`

export const ChatMessagesWrapper = styled.div`
  position: sticky;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  width: 100%;
  height: fit-content;
  margin: 0 auto;
  padding: 30px 15px;
`

export const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`

const Message = styled.div`
  display: flex;
  width: fit-content;
  max-width: 55%;
  border-radius: 5px;
  padding: 8px 14px;
  white-space: pre-wrap;

  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
`

export const MessageBot = styled(Message)`
  position: relative;
  display: flex;

  background-color: rgba(255, 176, 0, 0.15);
  border: 1px solid rgba(255, 176, 0, 1);
  color: rgba(255, 176, 0, 1);

  animation: ${slideInFromLeft} 0.5s ease-in-out;

  &:before {
    content: 'Henrique';
    position: absolute;
    bottom: 100%;
    left: 0;
    margin-bottom: 7px;

    font-size: 12px;
    line-height: 12px;
    font-weight: 300;
  }
`

export const MessageUser = styled(Message)`
  position: relative;
  display: flex;
  margin-left: auto;

  background-color: rgba(98, 139, 221, 0.15);
  border: 1px solid rgba(98, 139, 221, 1);
  color: rgba(98, 139, 221, 1);

  animation: ${slideInFromRight} 0.5s ease-in-out;

  &:before {
    content: 'Você';
    position: absolute;
    bottom: 100%;
    right: 0;
    margin-bottom: 7px;

    font-size: 12px;
    line-height: 12px;
    font-weight: 300;
  }
`

export const ChatFooter = styled.form`
  z-index: 10;
  display: flex;
  column-gap: 8px;
  width: 100%;
  height: ${chatFooterHeight};
  padding: 15px;
`

export const ChatFooterMenu = styled.div`
  display: flex;
`

export const ChatFooterInput = styled.div`
  display: flex;
  flex: 1;
`

export const ChatFooterSubmit = styled.div`
  display: flex;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 8px;

    font-size: 14px;

    svg {
      font-size: 18px;
    }
  }
`

// ============================================ DRAWER

export const DrawerHeader = styled.div`
  display: flex;
  margin-bottom: 15px;
`

export const DrawerContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  width: 100%;
  height: calc(100% - 47px);
  overflow: auto;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 2px;
    z-index: 1000;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: #ff7a00;
  }
`

export const DrawerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  width: 100%;
  height: fit-content;
`

export const Service = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  padding: 8px;
  border-radius: 8px;

  border: 1px solid white;
`

export const ServiceTag = styled.div`
  display: flex;
  width: 70px;
  padding-right: 8px;

  border-right: 1px solid white;

  span {
    display: flex;
    justify-content: center;
    width: 100%;
    height: fit-content;
    border-radius: 4px;
    padding: 5px 0;

    font-size: 10px;
    line-height: 10px;
    font-weight: 500;
  }
`

export const ServiceLabel = styled.div`
  display: flex;
  flex: 1;

  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
`
