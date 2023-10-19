import { useEffect, useMemo, useRef, useState } from 'react'

import * as S from './styles'
import { IoSendOutline, IoSearch } from 'react-icons/io5'
import { LiaWhatsapp, LiaGithub, LiaBehance } from 'react-icons/lia'

import { Button, Drawer, Input, theme } from 'antd'

import { Controller, useForm } from 'react-hook-form'
import { handleSubmitChatData } from '@/firebase/leads'

type Message = {
  questionId: number
  questionLabel: string
  questionAnswer?: string
  questionType: string
}

interface IService {
  serviceId: string
  serviceIcon: string
  serviceLabel: string
  serviceTag: string
}

interface ChatForm {
  userResponse: string
}

interface ISubmitForm {
  questionName: string
  questionContact: string
  questionInterest: string
  questionNeeds: string
  questionBudget: string
  questionTerm: string
  questionReference: string
}

const FreelancerChat = () => {
  const { token } = theme.useToken()

  const [openDrawer, setOpenDrawer] = useState(false)
  const [servicesSearch, setServicesSearch] = useState('')

  const [chatEnded, setChatEnded] = useState(false)
  const [chatSended, setChatSended] = useState(false)
  const [chatLoading, setChatLoading] = useState(false)

  const [messages, setMessages] = useState([mockQuestions[0]])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const resetChat = () => {
    const initalQuestionArray = [mockQuestions[0]]

    setMessages(initalQuestionArray)
    setChatLoading(false)
    setChatEnded(false)
    setCurrentQuestionIndex(0)
  }

  const handleAnswerChange = (message: string) => {
    setChatLoading(true)

    const updatedMessages = [...messages]
    const currentQuestion = mockQuestions[currentQuestionIndex]

    updatedMessages[currentQuestionIndex] = {
      ...currentQuestion,
      questionAnswer: message
    }

    setMessages(updatedMessages)

    if (currentQuestionIndex < mockQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        updatedMessages.push(mockQuestions[currentQuestionIndex + 1])
        setMessages(updatedMessages)

        setChatLoading(false)
      }, 500)
    } else {
      setTimeout(() => {
        updatedMessages.push({
          questionId: 10,
          questionLabel:
            'Obrigado por preencher esse formulário! Clique em "Enviar" para enviar sua solicitação',
          questionType: 'message'
        })

        setMessages(updatedMessages)
        setChatEnded(true)
        setChatLoading(false)
      }, 500)
    }
  }

  const { control, handleSubmit, reset, formState } = useForm<ChatForm>()

  const { isValid } = formState

  const handleSubmitChatMessage = async (data: ChatForm) => {
    handleAnswerChange(data.userResponse)
    reset()
  }

  // ---------------------------------------------------------

  function formatQuestions(questions: Message[]) {
    const formattedData: any = {}

    for (const item of questions) {
      if (item.questionType !== 'message') {
        formattedData[item.questionType] = item.questionAnswer
      }
    }

    return formattedData
  }

  const handleSubmitChat = async () => {
    setChatLoading(true)

    const fomattedQuestions = formatQuestions(messages)
    const submitChatResponse = await handleSubmitChatData(fomattedQuestions)

    if (submitChatResponse) {
      setChatSended(true)
    }

    setChatLoading(false)
  }

  // ---------------------------------------------------------

  const showDrawer = () => {
    setOpenDrawer(true)
  }

  const closeDrawer = () => {
    setOpenDrawer(false)
  }

  // ---------------------------------------------------------

  const handleServiceSearch = (value: string) => setServicesSearch(value)

  const filteredServices = useMemo(() => {
    if (!servicesSearch) {
      return mockServices
    }

    return mockServices.filter((service) => {
      const objectAsString = JSON.stringify(service).toLowerCase()
      return objectAsString.includes(servicesSearch.toLowerCase())
    })
  }, [servicesSearch])

  return (
    <>
      <S.FreelancerChat
        style={{
          backgroundColor: token.colorBgBase
        }}
        color={token.colorText}
        background={token.colorBgContainer}
      >
        <S.Chat
          style={{
            backgroundColor: token.colorBgElevated
          }}
        >
          <S.ChatHeader
            style={{
              backgroundColor: token.colorBgContainer
            }}
          >
            <S.ChatHeaderUserInfos>
              <S.UserInfosImage
                style={{
                  border: `1px solid ${token.colorPrimary}`
                }}
              >
                <img src="/personal_photo_01.jpeg" alt="" />
              </S.UserInfosImage>
              <S.UserInfosName
                style={{
                  color: token.colorTextBase
                }}
              >
                <p>Henrique Pereira Garcia</p>
              </S.UserInfosName>
            </S.ChatHeaderUserInfos>
            <S.ChatHeaderMenu>
              <S.UserInfosMedias>
                <Button
                  icon={<LiaWhatsapp />}
                  href="https://whatsa.me/5584998147860"
                  target="_blank"
                />
              </S.UserInfosMedias>
              <Button type="primary" onClick={showDrawer}>
                Serviços
              </Button>
            </S.ChatHeaderMenu>
          </S.ChatHeader>
          <S.ChatMessagesContainer>
            <S.ChatMessagesWrapper>
              {messages.map((message) => {
                if (message.questionType === 'message') {
                  return (
                    <S.MessageWrapper key={message.questionId}>
                      <S.MessageBot>{message.questionLabel}</S.MessageBot>
                    </S.MessageWrapper>
                  )
                } else {
                  return (
                    <S.MessageWrapper key={message.questionId}>
                      <S.MessageBot>{message.questionLabel}</S.MessageBot>
                      {message.questionAnswer &&
                        message.questionAnswer !== '' && (
                          <S.MessageUser>
                            {message.questionAnswer}
                          </S.MessageUser>
                        )}
                    </S.MessageWrapper>
                  )
                }
              })}
            </S.ChatMessagesWrapper>
          </S.ChatMessagesContainer>
          <S.ChatFooter
            onSubmit={handleSubmit(handleSubmitChatMessage)}
            style={{
              backgroundColor: token.colorBgContainer
            }}
          >
            {/* <S.ChatFooterMenu></S.ChatFooterMenu> */}
            <S.ChatFooterInput>
              <Controller
                name="userResponse"
                control={control}
                rules={{ required: 'Este campo é obrigatório' }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Digite sua resposta aqui"
                    size="small"
                    disabled={chatEnded}
                  />
                )}
              />
            </S.ChatFooterInput>
            <S.ChatFooterSubmit>
              {!chatEnded ? (
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<IoSendOutline />}
                  loading={chatLoading}
                  disabled={chatEnded || !isValid}
                  style={{
                    width: 40,
                    height: 40
                  }}
                />
              ) : (
                <>
                  {chatSended ? (
                    <Button
                      type="primary"
                      onClick={resetChat}
                      loading={chatLoading}
                      style={{
                        width: 100,
                        height: 40
                      }}
                    >
                      Reiniciar
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      onClick={handleSubmitChat}
                      loading={chatLoading}
                      style={{
                        width: 100,
                        height: 40
                      }}
                    >
                      Enviar <IoSendOutline />
                    </Button>
                  )}
                </>
              )}
            </S.ChatFooterSubmit>
          </S.ChatFooter>

          <S.ChatBackground>
            <img src="/chat_bg.png" alt="" />
          </S.ChatBackground>
        </S.Chat>
      </S.FreelancerChat>

      <Drawer
        title="Meus Serviços"
        placement="right"
        onClose={closeDrawer}
        open={openDrawer}
      >
        <S.DrawerHeader>
          <Input
            addonAfter={<IoSearch />}
            placeholder="Pesquise por um serviço aqui ..."
            value={servicesSearch}
            onChange={(e) => handleServiceSearch(e.target.value)}
          />
        </S.DrawerHeader>
        <S.DrawerContainer>
          <S.DrawerWrapper>
            {filteredServices.map((service: IService) => (
              <S.Service
                key={service.serviceId}
                style={{
                  backgroundColor: token.colorBgContainer,
                  border: `1px solid ${token.colorBorder}`
                }}
              >
                <S.ServiceTag
                  style={{
                    borderRight: `1px solid ${token.colorBorder}`
                  }}
                >
                  <span
                    style={{
                      color: token.colorPrimary,
                      backgroundColor: token.colorBgElevated,
                      border: `1px solid ${token.colorPrimary}`
                    }}
                  >
                    {service.serviceTag}
                  </span>
                </S.ServiceTag>
                <S.ServiceLabel
                  style={{
                    color: token.colorText
                  }}
                >
                  {service.serviceLabel}
                </S.ServiceLabel>
              </S.Service>
            ))}
          </S.DrawerWrapper>
        </S.DrawerContainer>
      </Drawer>
    </>
  )
}

export default FreelancerChat

const mockQuestions: Message[] = [
  {
    questionId: 1,
    questionLabel: 'Qual é o seu nome?',
    questionType: 'questionName'
  },
  {
    questionId: 2,
    questionLabel:
      'Você tem algum número de telefone ou outra forma de contato preferencial, como E-mail ou WhatsApp?',
    questionType: 'questionContact'
  },
  {
    questionId: 3,
    questionLabel:
      'Qual tipo de projeto você está interessado em? Website, Aplicativo e/ou Sistema?',
    questionType: 'questionInterest'
  },
  {
    questionId: 4,
    questionLabel: 'Descreva brevemente o seu projeto e suas necessidades.',
    questionType: 'questionNeeds'
  },
  {
    questionId: 5,
    questionLabel: 'Qual é o seu orçamento para este projeto?',
    questionType: 'questionBudget'
  },
  {
    questionId: 6,
    questionLabel:
      'Qual é o prazo estimado para a conclusão deste projeto? Há uma data específica que você gostaria de cumprir?',
    questionType: 'questionTerm'
  },
  {
    questionId: 7,
    questionLabel:
      'Você tem algum site, sistema ou aplicativo de referência que gostaria que seu projeto se assemelhasse?',
    questionType: 'questionReference'
  }
]

const mockServices: IService[] = [
  {
    serviceId: 'service_01',
    serviceIcon: '',
    serviceLabel: 'Website personalizado',
    serviceTag: 'Website'
  },
  {
    serviceId: 'service_02',
    serviceIcon: '',
    serviceLabel: 'Aplicativo personalizado',
    serviceTag: 'Aplicativo'
  },
  {
    serviceId: 'service_03',
    serviceIcon: '',
    serviceLabel: 'Sistema personalizado',
    serviceTag: 'Sistema'
  },
  {
    serviceId: 'service_04',
    serviceIcon: '',
    serviceLabel: 'Website institucional',
    serviceTag: 'Website'
  },
  {
    serviceId: 'service_05',
    serviceIcon: '',
    serviceLabel: 'Blog pessoal/profissional',
    serviceTag: 'Website'
  },
  {
    serviceId: 'service_06',
    serviceIcon: '',
    serviceLabel: 'Loja online (e-commerce)',
    serviceTag: 'Website'
  },
  {
    serviceId: 'service_07',
    serviceIcon: '',
    serviceLabel: 'Aplicativo móvel para Android e iOS',
    serviceTag: 'Aplicativo'
  },
  {
    serviceId: 'service_08',
    serviceIcon: '',
    serviceLabel: 'Plataforma de reservas online',
    serviceTag: 'Website'
  },
  {
    serviceId: 'service_09',
    serviceIcon: '',
    serviceLabel: 'Portal de notícias',
    serviceTag: 'Website'
  },
  {
    serviceId: 'service_10',
    serviceIcon: '',
    serviceLabel: 'Plataforma de cursos online',
    serviceTag: 'Website'
  },
  {
    serviceId: 'service_11',
    serviceIcon: '',
    serviceLabel: 'Sistema de delivery',
    serviceTag: 'Sistema'
  },
  {
    serviceId: 'service_12',
    serviceIcon: '',
    serviceLabel: 'Sistema de controle de estoque',
    serviceTag: 'Sistema'
  },
  {
    serviceId: 'service_13',
    serviceIcon: '',
    serviceLabel: 'Sistema de agendamentos',
    serviceTag: 'Sistema'
  },
  {
    serviceId: 'service_14',
    serviceIcon: '',
    serviceLabel: 'Sistema de reserva de salas',
    serviceTag: 'Sistema'
  },
  {
    serviceId: 'service_15',
    serviceIcon: '',
    serviceLabel: 'Sistema de gestão de projetos',
    serviceTag: 'Sistema'
  },
  {
    serviceId: 'service_16',
    serviceIcon: '',
    serviceLabel: 'Sistema de gestão de conteúdo (CMS)',
    serviceTag: 'Sistema'
  },
  {
    serviceId: 'service_17',
    serviceIcon: '',
    serviceLabel: 'Sistema de relacionamento com o cliente (CRM)',
    serviceTag: 'Sistema'
  },
  {
    serviceId: 'service_18',
    serviceIcon: '',
    serviceLabel: 'Sistema de gerenciamento de imobiliárias',
    serviceTag: 'Sistema'
  },
  {
    serviceId: 'service_19',
    serviceIcon: '',
    serviceLabel: 'Sistema de automação de marketing',
    serviceTag: 'Sistema'
  },
  {
    serviceId: 'service_20',
    serviceIcon: '',
    serviceLabel: 'Sistema de atendimento ao cliente',
    serviceTag: 'Sistema'
  },
  {
    serviceId: 'service_21',
    serviceIcon: '',
    serviceLabel: 'Aplicativo de delivery',
    serviceTag: 'Aplicativo'
  },
  {
    serviceId: 'service_22',
    serviceIcon: '',
    serviceLabel: 'Aplicativo de planejamento de viagens',
    serviceTag: 'Aplicativo'
  },
  {
    serviceId: 'service_23',
    serviceIcon: '',
    serviceLabel: 'Aplicativo de controle financeiro pessoal',
    serviceTag: 'Aplicativo'
  },
  {
    serviceId: 'service_24',
    serviceIcon: '',
    serviceLabel: 'Aplicativo de leitura de livros digitais',
    serviceTag: 'Aplicativo'
  },
  {
    serviceId: 'service_25',
    serviceIcon: '',
    serviceLabel: 'Aplicativo de edição de fotos e vídeos',
    serviceTag: 'Aplicativo'
  },
  {
    serviceId: 'service_26',
    serviceIcon: '',
    serviceLabel: 'Aplicativo de controle de gastos',
    serviceTag: 'Aplicativo'
  },
  {
    serviceId: 'service_27',
    serviceIcon: '',
    serviceLabel: 'Aplicativo de notícias personalizadas',
    serviceTag: 'Aplicativo'
  },
  {
    serviceId: 'service_28',
    serviceIcon: '',
    serviceLabel: 'Aplicativo de namoro e relacionamentos',
    serviceTag: 'Aplicativo'
  },
  {
    serviceId: 'service_29',
    serviceIcon: '',
    serviceLabel: 'Aplicativo de reservas de hotéis',
    serviceTag: 'Aplicativo'
  }
]
