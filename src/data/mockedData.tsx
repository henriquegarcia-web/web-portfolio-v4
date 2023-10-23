import {
  IoAtCircleOutline,
  IoBulbOutline,
  IoChatbubblesOutline,
  IoRocketOutline,
  IoShieldCheckmarkOutline,
  IoStatsChartOutline
} from 'react-icons/io5'

export interface IBenefit {
  benefitId: string
  benefitIcon: React.ReactNode
  benefitTitle: string
  benefitLegend: React.ReactNode
}

const mockBenefits: IBenefit[] = [
  {
    benefitId: 'benefit_01',
    benefitIcon: <IoBulbOutline />,
    benefitTitle: 'Design Personalizado e Elegante',
    benefitLegend: (
      <>
        Alcance o topo das páginas de resultados com SEO avançado especializado
        para advogados - Aumente sua visibilidade online e conquiste um fluxo
        constante de clientes.
      </>
    )
  },
  {
    benefitId: 'benefit_02',
    benefitIcon: <IoStatsChartOutline />,
    benefitTitle: 'Conteúdo Jurídico Persuasivo',
    benefitLegend: (
      <>
        Conquiste clientes com conteúdo jurídico persuasivo e profissional,
        Projetado para transformar cliques em clientes satisfeitos e casos de
        sucesso.
      </>
    )
  },
  {
    benefitId: 'benefit_03',
    benefitIcon: <IoChatbubblesOutline />,
    benefitTitle: 'Formulários de Contato e Consulta',
    benefitLegend: (
      <>
        Inicie conversas instantâneas com clientes potenciais através de
        formulários de contato e consulta estratégicos - Sua jornada jurídica
        começa aqui.
      </>
    )
  },
  {
    benefitId: 'benefit_04',
    benefitIcon: <IoRocketOutline />,
    benefitTitle: 'SEO Avançado para Advogados',
    benefitLegend: (
      <>
        Alcance o topo das páginas de resultados com SEO avançado especializado
        para advogados - Aumente sua visibilidade online e conquiste um fluxo
        constante de clientes.
      </>
    )
  },
  {
    benefitId: 'benefit_05',
    benefitIcon: <IoAtCircleOutline />,
    benefitTitle: 'Integração com Redes Sociais',
    benefitLegend: (
      <>
        Amplifique sua presença online com integração simples em redes sociais,
        conectando-se a uma audiência maior e aumentando seu engajamento.
      </>
    )
  },
  {
    benefitId: 'benefit_06',
    benefitIcon: <IoShieldCheckmarkOutline />,
    benefitTitle: 'Hospedagem Segura e Confiável',
    benefitLegend: (
      <>
        Tenha a tranquilidade de uma hospedagem segura e confiável, garantindo
        que seu site esteja sempre disponível e protegido.
      </>
    )
  }
]

export interface IPlanBenefits {
  planBenefitId: string
  planBenefitLabel: string
}

export interface IPlan {
  planId: string
  planName: string
  planDescription: string
  planPrice: number
  planBenefits: IPlanBenefits[]
}

const defaultPlanBenefits = [
  {
    planBenefitId: 'default_benefit_01',
    planBenefitLabel: 'Design Responsivo'
  },
  {
    planBenefitId: 'default_benefit_02',
    planBenefitLabel: 'Hospedagem Segura'
  },
  {
    planBenefitId: 'default_benefit_03',
    planBenefitLabel: 'Otimização Avançada de SEO'
  },
  {
    planBenefitId: 'default_benefit_04',
    planBenefitLabel: 'Formulário de Contato'
  },
  {
    planBenefitId: 'default_benefit_05',
    planBenefitLabel: 'Botão de Fale pelo WhatsApp'
  }
  // {
  //   planBenefitId: 'default_benefit_0',
  //   planBenefitLabel: ''
  // },
  // {
  //   planBenefitId: 'default_benefit_0',
  //   planBenefitLabel: ''
  // }
]

const mockPlans: IPlan[] = [
  {
    planId: 'plan_basic',
    planName: 'Básico',
    planDescription:
      'A solução simples para uma presença online eficaz. O Plano Básico oferece design responsivo, hospedagem segura e um formulário de contato, ideal para advogados que estão começando.',
    planPrice: 497,
    planBenefits: [
      ...defaultPlanBenefits,
      {
        planBenefitId: 'plan_basic_01',
        planBenefitLabel: 'Website estático'
      },
      {
        planBenefitId: 'plan_basic_02',
        planBenefitLabel: 'Suporte por E-mail'
      }
      // {
      //   planBenefitId: 'plan_basic_03',
      //   planBenefitLabel: ''
      // },
      // {
      //   planBenefitId: 'plan_basic_04',
      //   planBenefitLabel: ''
      // },
      // {
      //   planBenefitId: 'plan_basic_05',
      //   planBenefitLabel: ''
      // }
    ]
  },
  {
    planId: 'plan_premium',
    planName: 'Premium',
    planDescription:
      'Com o Plano Premium, você obtém um site que faz a diferença. Personalização avançada, suporte rápido por e-mail e WhatsApp, e atualizações mensais para manter sua presença online em constante crescimento.',
    planPrice: 997,
    planBenefits: [
      {
        planBenefitId: 'plan_premium_01',
        planBenefitLabel: 'Website com dashboard de administrador'
      },
      {
        planBenefitId: 'plan_premium_02',
        planBenefitLabel: 'Suporte por E-mail e WhatsApp'
      },
      {
        planBenefitId: 'plan_premium_03',
        planBenefitLabel: 'Monitoramento de Desempenho Básico'
      },
      {
        planBenefitId: 'plan_premium_04',
        planBenefitLabel: 'Atualizações Mensais'
      },
      ...defaultPlanBenefits
      // {
      //   planBenefitId: 'plan_premium_05',
      //   planBenefitLabel: ''
      // }
    ]
  },
  {
    planId: 'plan_pro',
    planName: 'Pro',
    planDescription:
      'Com o Plano Pro, você obtém muito mais do que um site. Receba suporte prioritário, recursos avançados de análise, tradução multilíngue e atualizações mensais para uma presença online de excelência.',
    planPrice: 1297,
    planBenefits: [
      {
        planBenefitId: 'plan_pro_01',
        planBenefitLabel: 'Website com dashboard de administrador'
      },
      {
        planBenefitId: 'plan_pro_02',
        planBenefitLabel: 'Suporte Prioritário por E-mail e WhatsApp'
      },
      {
        planBenefitId: 'plan_pro_03',
        planBenefitLabel: 'Tradução Multilíngue'
      },
      {
        planBenefitId: 'plan_pro_04',
        planBenefitLabel: 'Análise de Métricas Avançadas'
      },
      {
        planBenefitId: 'plan_pro_05',
        planBenefitLabel: 'Agendamento Online'
      },
      {
        planBenefitId: 'plan_pro_06',
        planBenefitLabel: 'Modelos Personalizáveis'
      },
      {
        planBenefitId: 'plan_pro_07',
        planBenefitLabel: 'Blog Integrado'
      },
      {
        planBenefitId: 'plan_pro_08',
        planBenefitLabel: 'Atualizações Mensais'
      },
      ...defaultPlanBenefits
      // {
      //   planBenefitId: 'plan_pro_09',
      //   planBenefitLabel: ''
      // }
    ]
  }
]

export interface IPortfolio {
  projectId: string
  projectImage: string
  projectName: string
}

const mockPortfolio: IPortfolio[] = [
  {
    projectId: 'project_01',
    projectImage: '/projects/website_01.png',
    projectName: ''
  },
  {
    projectId: 'project_02',
    projectImage: '/projects/website_02.png',
    projectName: ''
  },
  {
    projectId: 'project_03',
    projectImage: '/projects/website_03.png',
    projectName: ''
  },
  {
    projectId: 'project_04',
    projectImage: '/projects/website_04.png',
    projectName: ''
  },
  {
    projectId: 'project_05',
    projectImage: '/projects/website_05.jpg',
    projectName: ''
  },
  {
    projectId: 'project_06',
    projectImage: '/projects/website_06.jpg',
    projectName: ''
  }
]

export { mockBenefits, mockPortfolio, mockPlans }
