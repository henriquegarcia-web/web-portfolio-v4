import firebase from '@/firebase/firebase'

import { message } from 'antd'

// ============================================== CREATE ADMIN DATA

interface IChatData {}

const handleSubmitChatData = async (chatData: IChatData): Promise<boolean> => {
  try {
    const adminAccountsRef = firebase.database().ref('leadsProjects')

    await adminAccountsRef.set(chatData)

    message.open({
      type: 'error',
      content: 'Solicitação de projeto enviada com sucesso!'
    })

    return true
  } catch (error) {
    message.open({
      type: 'error',
      content: 'Falha ao enviar solicitação de projeto, tente novamente.'
    })
    return false
  }
}

export { handleSubmitChatData }
