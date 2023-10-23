import {
  responsiveDesktop,
  responsiveMobile,
  responsiveTablet
} from '@/utils/styles/globals'
import { Form } from 'antd'
import styled from 'styled-components'

export const AdvocacyLanding = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`

export const AdvocacyLandingHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 40px;

  @media screen and (max-width: ${responsiveTablet}) {
    padding: 0 20px;
  }
`

export const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  img {
    height: 40%;
  }
`

// ========================================== HERO

export const HeroBanner = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: fit-content;
  padding: 60px 40px;

  @media screen and (max-width: ${responsiveTablet}) {
    padding: 40px 20px;
  }
`

export const HeroBannerWrapper = styled.div`
  display: flex;
  column-gap: 60px;
  width: 100%;
  max-width: 1000px;

  /* border: 1px solid red; */

  @media screen and (max-width: ${responsiveTablet}) {
    flex-direction: column;
    row-gap: 60px;
  }
`

// ------------------------------------------ HERO CONTENT

export const HeroBannerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 25px;
  width: 60%;

  @media screen and (max-width: ${responsiveTablet}) {
    width: 100%;
  }
`

export const HeroBannerContentHeader = styled.div`
  display: flex;

  font-size: 32px;
  line-height: 38px;
  font-weight: 600;
`

export const HeroBannerContentLegend = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;

  font-size: 16px;
  line-height: 22px;
  font-weight: 300;
`

export const HeroBannerContentCta = styled.div`
  display: flex;
  column-gap: 10px;
  margin-top: 10px;

  font-size: 14px;
  line-height: 14px;
  font-weight: 400;

  svg {
    font-size: 20px;
  }
`

// ------------------------------------------ HERO FORM

export const HeroBannerFormContainer = styled.div`
  display: flex;
  width: 40%;

  @media screen and (max-width: ${responsiveTablet}) {
    justify-content: center;
    width: 100%;
  }
`

export const HeroBannerForm = styled(Form)`
  display: flex;
  flex-direction: column;
  row-gap: 25px;
  padding: 30px;
  border-radius: 10px;

  background-color: white;

  .ant-form-item {
    margin-bottom: 0px;
  }

  @media screen and (max-width: ${responsiveTablet}) {
    width: 100%;
    max-width: 460px;
  }
`

export const HeroBannerFormHeader = styled.div`
  display: flex;

  font-size: 18px;
  line-height: 22px;
  font-weight: 500;
  text-align: center;
`

export const HeroBannerFormContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  input {
    background-color: rgba(0, 0, 0, 0.05) !important;
  }
`

export const HeroBannerFormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`

// ================================================= BANNER WRAPPER

export const Banner = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 60px 40px;

  @media screen and (max-width: ${responsiveTablet}) {
    padding: 40px 20px;
  }
`

export const BannerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  width: 100%;
  max-width: 1000px;
`

export const BannerHeader = styled.div`
  display: flex;

  font-size: 24px;
  line-height: 24px;
  font-weight: 500;
`

export const BannerContent = styled.div`
  display: flex;
`

// ================================================= BENEFITS BANNER

export const BenefitsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`

export const Benefit = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 8px;

  width: calc((100% / 3) - (40px / 3));

  @media screen and (max-width: ${responsiveTablet}) {
    width: calc((100% / 2) - (20px / 2));
  }

  @media screen and (max-width: ${responsiveMobile}) {
    width: 100%;
  }
`

export const BenefitHeader = styled.div`
  display: flex;
  justify-content: flex-end;

  span {
    svg {
      font-size: 28px;

      color: #628bdd;
    }
  }
`

export const BenefitContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  b {
    font-size: 16px;
    line-height: 21px;
    font-weight: 600;

    /* color: #628bdd; */
  }

  p {
    font-size: 14px;
    line-height: 18px;
    font-weight: 400;
    /* text-align: justify; */

    color: rgba(255, 255, 255, 0.8);
  }
`

// ================================================= PORTFOLIO BANNER

export const PortfolioWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
`

export const Portfolio = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 8px;

  width: calc((100% / 3) - (40px / 3));

  @media screen and (max-width: ${responsiveTablet}) {
    width: calc((100% / 2) - (20px / 2));
  }

  @media screen and (max-width: ${responsiveMobile}) {
    width: 100%;
  }
`

export const PortfolioImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
`

// ================================================= PLANS BANNER

export const PlansWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;

  @media screen and (max-width: ${responsiveDesktop}) {
    flex-direction: column;
  }
`

export const Plan = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  height: fit-content;
  padding: 40px 25px;
  border-radius: 8px;

  width: calc((100% / 3) - (40px / 3));

  @media screen and (max-width: ${responsiveDesktop}) {
    width: 100%;
  }
`

export const PlanName = styled.div`
  font-size: 16px;
  line-height: 16px;
  font-weight: 300;

  b {
    font-weight: 500;
  }
`

export const PlanPrice = styled.div`
  display: flex;
  align-items: flex-end;
  column-gap: 6px;

  font-size: 32px;
  line-height: 32px;
  font-weight: 600;

  p {
    font-size: 12px;
    line-height: 12px;
    font-weight: 300;
  }
`

export const PlanDescription = styled.div`
  display: flex;

  font-size: 13px;
  line-height: 17px;
  font-weight: 300;
`

export const PlanFeatures = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;

  span {
    margin-bottom: 8px;

    font-size: 14px;
    line-height: 14px;
    font-weight: 300;

    b {
      font-weight: 500;
    }
  }
`

export const PlanFeature = styled.div`
  display: flex;
  column-gap: 8px;

  font-size: 13px;
  line-height: 18px;
  font-weight: 300;

  svg {
    font-size: 16px;
    line-height: 16px;
    font-weight: 600;
  }
`

// ================================================= FOOTER

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 15px 0;

  p {
    b {
      font-weight: 500;
    }

    font-size: 14px;
    line-height: 14px;
    font-weight: 300;

    color: rgba(255, 255, 255, 0.8);
  }
`
