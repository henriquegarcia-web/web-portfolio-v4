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
  isFinalQuestion: boolean
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
    // console.log(mockQuestions[0])

    const initalQuestionArray = [mockQuestions[0]]

    console.log(initalQuestionArray)

    setMessages(initalQuestionArray)
    setChatLoading(false)
    setChatEnded(false)
    setCurrentQuestionIndex(0)
  }

  // useEffect(() => {
  //   console.log(mockQuestions[0])
  // }, [mockQuestions])

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
      }, 1000)
    } else {
      setChatEnded(true)
      setChatLoading(false)
    }

    // updatedMessages.push({
    //   questionId: 10,
    //   questionLabel:
    //     'Obrigado por preencher esse formulário! Clique em "Enviar" para enviar sua solicitação',
    //   questionAnswer: '',
    //   isFinalQuestion: false
    // })
  }

  const { control, handleSubmit, reset, formState } = useForm<ChatForm>()

  const { isValid } = formState

  const handleSubmitChatMessage = async (data: ChatForm) => {
    handleAnswerChange(data.userResponse)
    reset()
  }

  // ---------------------------------------------------------

  function formatQuestions(questions: Message[]) {
    questions.pop()

    const formattedQuestions = questions.map((question) => {
      const { isFinalQuestion, questionId, ...formattedQuestion } = question
      return formattedQuestion
    })

    return formattedQuestions
  }

  const handleSubmitChat = async () => {
    setChatLoading(true)

    console.log(messages)

    // const fomattedQuestions = formatQuestions(messages)
    // const submitChatResponse = await handleSubmitChatData(fomattedQuestions)

    // if (submitChatResponse) {
    //   setChatSended(true)
    // }

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
                  href="https://www.google.com"
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
                return (
                  <S.MessageWrapper key={message.questionId}>
                    <S.MessageBot>{message.questionLabel}</S.MessageBot>
                    {message.questionAnswer &&
                      message.questionAnswer !== '' && (
                        <S.MessageUser>{message.questionAnswer}</S.MessageUser>
                      )}
                  </S.MessageWrapper>
                )
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
              ) : chatSended ? (
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
            </S.ChatFooterSubmit>
          </S.ChatFooter>
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
    questionId: 0,
    questionLabel: 'Qual é o seu nome?',
    isFinalQuestion: false
  },
  {
    questionId: 1,
    questionLabel:
      'Você tem algum número de telefone ou outra forma de contato preferencial, como E-mail ou WhatsApp?',
    isFinalQuestion: false
  },
  {
    questionId: 2,
    questionLabel:
      'Qual tipo de projeto você está interessado em? Website, Aplicativo e/ou Sistema?',
    isFinalQuestion: false
  },
  {
    questionId: 3,
    questionLabel: 'Descreva brevemente o seu projeto e suas necessidades.',
    isFinalQuestion: false
  },
  {
    questionId: 4,
    questionLabel: 'Qual é o seu orçamento para este projeto?',
    isFinalQuestion: false
  },
  {
    questionId: 5,
    questionLabel:
      'Qual é o prazo estimado para a conclusão deste projeto? Há uma data específica que você gostaria de cumprir?',
    isFinalQuestion: false
  },
  {
    questionId: 6,
    questionLabel:
      'Você tem algum site, sistema ou aplicativo de referência que gostaria que seu projeto se assemelhasse?',
    isFinalQuestion: true
  }
  // {
  //   questionId: 7,
  //   questionLabel: '',
  //   questionAnswer: '',
  //   isFinalQuestion: true
  // },
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
