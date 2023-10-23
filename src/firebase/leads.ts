import firebase from '@/firebase/firebase'

import { message } from 'antd'

// ============================================== CREATE ADMIN DATA

interface IContact {
  userName: string
  userEmail: string
  userPhone: string
}

const handleSubmitContactData = async (
  chatData: IContact
): Promise<boolean> => {
  try {
    const adminAccountsRef = firebase.database().ref('advocacy/contacts')

    await adminAccountsRef.push(chatData)

    message.open({
      type: 'success',
      content: 'Solicitação enviada com sucesso!'
    })

    return true
  } catch (error) {
    message.open({
      type: 'error',
      content: 'Falha ao enviar solicitação, tente novamente.'
    })
    return false
  }
}

export { handleSubmitContactData }
