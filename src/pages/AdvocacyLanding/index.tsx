import { useState } from 'react'

import * as S from './styles'
import { IoCheckmarkDone } from 'react-icons/io5'

import { Button, ConfigProvider, Form, Input, theme } from 'antd'

import { Controller, useForm } from 'react-hook-form'

import { formatCurrency } from '@/utils/functions/formatCurrency'

import {
  IBenefit,
  IPlan,
  IPlanBenefits,
  IPortfolio,
  mockBenefits,
  mockPlans,
  mockPortfolio
} from '@/data/mockedData'

const AdvocacyLanding = () => {
  const { token } = theme.useToken()

  return (
    <S.AdvocacyLanding
      style={{
        backgroundColor: token.colorBgBase
      }}
    >
      <S.AdvocacyLandingHeader>
        <S.HeaderLogo>
          <img src="/logo_02.png" alt="" />
        </S.HeaderLogo>
      </S.AdvocacyLandingHeader>
      <HeroBanner />
      <BenefitsBanner />
      <PortfolioBanner />
      <PlansBanner />
      <Footer />
    </S.AdvocacyLanding>
  )
}

export default AdvocacyLanding

// ================================================= HERO BANNER

interface ISubmitContactData {
  userName: string
  userPhone: string
  userEmail: string
}

const HeroBanner = () => {
  const { token } = theme.useToken()

  const [contactLoading, setContactLoading] = useState(false)

  const { control, handleSubmit, reset, formState } =
    useForm<ISubmitContactData>()

  const { isValid } = formState

  const handleSubmitChatMessage = async (data: ISubmitContactData) => {
    setContactLoading(true)
    console.log(data)

    // reset()
    setContactLoading(false)
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#3C70E2'
        }
      }}
    >
      <S.HeroBanner
        style={{
          backgroundColor: token.colorBgContainer
        }}
      >
        <S.HeroBannerWrapper>
          <S.HeroBannerContent>
            <S.HeroBannerContentHeader
              style={{
                color: token.colorTextBase
              }}
            >
              Destaque-se Online com Nossas Landing Pages para Advogados
            </S.HeroBannerContentHeader>
            <S.HeroBannerContentLegend
              style={{
                color: token.colorTextBase
              }}
            >
              <p>
                Se você é um{' '}
                <b>advogado em busca de crescimento e visibilidade</b>, nossas
                landing pages especializadas são a resposta.{' '}
                <b>Conquiste a confiança de seus clientes</b> em potencial desde
                o primeiro clique.
              </p>
              <p>
                Nossa abordagem personalizada e design de alto impacto ajudam
                você a <b>transmitir sua experiência e credibilidade</b> de
                maneira irresistível. Deixe sua concorrência para trás e{' '}
                <b>comece a atrair oportunidades</b> inigualáveis hoje mesmo.
              </p>
            </S.HeroBannerContentLegend>
            <S.HeroBannerContentCta>
              <Button
                type="primary"
                size="large"
                shape="round"
                onClick={() =>
                  document.getElementById('models')?.scrollIntoView()
                }
              >
                Modelos
              </Button>
              <Button
                type="primary"
                size="large"
                shape="round"
                onClick={() =>
                  document.getElementById('plans')?.scrollIntoView()
                }
              >
                Planos
              </Button>
            </S.HeroBannerContentCta>
          </S.HeroBannerContent>
          <S.HeroBannerFormContainer>
            <S.HeroBannerForm
              layout="vertical"
              onFinish={handleSubmit(handleSubmitChatMessage)}
            >
              <S.HeroBannerFormHeader>
                Fale conosco e deixe-nos ajudá-lo a alcançar seus objetivos
              </S.HeroBannerFormHeader>
              <S.HeroBannerFormContent>
                <Form.Item label="Nome Completo">
                  <Controller
                    name="userName"
                    control={control}
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Digite seu nome completo"
                        size="large"
                        style={{
                          backgroundColor: token.colorBgContainer
                        }}
                      />
                    )}
                  />
                </Form.Item>
                <Form.Item label="E-mail">
                  <Controller
                    name="userPhone"
                    control={control}
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Digite seu e-mail"
                        size="large"
                        style={{
                          backgroundColor: token.colorBgContainer
                        }}
                      />
                    )}
                  />
                </Form.Item>
                <Form.Item label="Telefone">
                  <Controller
                    name="userPhone"
                    control={control}
                    rules={{ required: 'Este campo é obrigatório' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Digite seu telefone"
                        size="large"
                        style={{
                          backgroundColor: token.colorBgContainer
                        }}
                      />
                    )}
                  />
                </Form.Item>
              </S.HeroBannerFormContent>
              <S.HeroBannerFormFooter>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  disabled={contactLoading}
                >
                  Enviar
                </Button>
              </S.HeroBannerFormFooter>
            </S.HeroBannerForm>
          </S.HeroBannerFormContainer>
        </S.HeroBannerWrapper>
      </S.HeroBanner>
    </ConfigProvider>
  )
}

// ================================================= BANNER WRAPPER

interface IBannerWrapper {
  bannerId: string
  bannerHeader: string
  bannerColor: string
  children: React.ReactNode
}

const BannerWrapper = ({
  bannerId,
  bannerHeader,
  bannerColor,
  children
}: IBannerWrapper) => {
  const { token } = theme.useToken()

  return (
    <S.Banner
      id={bannerId}
      style={{
        backgroundColor: bannerColor,
        color: token.colorTextBase
      }}
    >
      <S.BannerWrapper>
        <S.BannerHeader>{bannerHeader}</S.BannerHeader>
        <S.BannerContent>{children}</S.BannerContent>
      </S.BannerWrapper>
    </S.Banner>
  )
}

// ================================================= BENEFITS BANNER

const BenefitsBanner = () => {
  const { token } = theme.useToken()

  return (
    <BannerWrapper
      bannerId="banefits"
      bannerHeader="Alguns de nossos benefícios"
      bannerColor={token.colorBgBase}
    >
      <S.BenefitsWrapper>
        {mockBenefits.map((benefit: IBenefit) => (
          <S.Benefit
            key={benefit.benefitId}
            style={{
              backgroundColor: token.colorBgElevated
            }}
          >
            <S.BenefitHeader>
              <span>{benefit.benefitIcon}</span>
            </S.BenefitHeader>
            <S.BenefitContent>
              <b>{benefit.benefitTitle}</b>
              <p>{benefit.benefitLegend}</p>
            </S.BenefitContent>
          </S.Benefit>
        ))}
      </S.BenefitsWrapper>
    </BannerWrapper>
  )
}

// ================================================= PORTFOLIO BANNER

const PortfolioBanner = () => {
  const { token } = theme.useToken()

  return (
    <BannerWrapper
      bannerId="models"
      bannerHeader="Alguns de nossos modelos"
      bannerColor={token.colorBgContainer}
    >
      <S.PortfolioWrapper>
        {mockPortfolio.map((project: IPortfolio) => (
          <S.Portfolio
            key={project.projectId}
            style={{
              backgroundColor: token.colorBgElevated
            }}
          >
            <S.PortfolioImage src={project.projectImage} alt="" />
          </S.Portfolio>
        ))}
      </S.PortfolioWrapper>
    </BannerWrapper>
  )
}

// ================================================= PLANS BANNER

const PlansBanner = () => {
  const { token } = theme.useToken()

  return (
    <BannerWrapper
      bannerId="plans"
      bannerHeader="Conheça nossos planos"
      bannerColor={token.colorBgBase}
    >
      <S.PlansWrapper>
        {mockPlans.map((plan: IPlan) => (
          <S.Plan
            key={plan.planId}
            style={{
              backgroundColor: token.colorBgElevated
            }}
          >
            <S.PlanName>
              Plano <b>{plan.planName}</b>
            </S.PlanName>
            <S.PlanPrice>
              <b
                style={{
                  color: '#3d7aff'
                }}
              >
                {formatCurrency(plan.planPrice)}
              </b>
              <p>/ sempre</p>
            </S.PlanPrice>
            <S.PlanDescription>{plan.planDescription}</S.PlanDescription>
            <S.PlanFeatures>
              <span
                style={{
                  color: token.colorTextTertiary
                }}
              >
                O <b>Plano {plan.planName}</b> contém:
              </span>
              {plan.planBenefits.map((benefit: IPlanBenefits) => (
                <S.PlanFeature key={`${plan.planId}_${benefit.planBenefitId}`}>
                  <IoCheckmarkDone
                    style={{
                      color: '#3d7aff'
                    }}
                  />
                  {benefit.planBenefitLabel}
                </S.PlanFeature>
              ))}
            </S.PlanFeatures>
          </S.Plan>
        ))}
      </S.PlansWrapper>
    </BannerWrapper>
  )
}

// ================================================= FOOTER

const Footer = () => {
  const { token } = theme.useToken()

  return (
    <S.Footer
      style={{
        backgroundColor: token.colorBgContainer
      }}
    >
      <p>
        © 2023 |{' '}
        <b
          style={{
            color: token.colorPrimary
          }}
        >
          VISO
        </b>{' '}
        Software
      </p>
    </S.Footer>
  )
}
