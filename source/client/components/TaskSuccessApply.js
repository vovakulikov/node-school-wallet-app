import React from 'react';
import styled from 'emotion/react';
import PropTypes from 'prop-types';

import {Island} from './';

const MobilePaymentLayout = styled(Island)`
	width: 440px;
	background: #108051;
	position: relative;
	color: #fff;
`;

const Underline = styled.div`
	height: 1px;
	margin-bottom: 20px;
	background-color: rgba(0, 0, 0, 0.16);
`;

const HeaderContainer = styled.div`
    margin-bottom: 20px;
`;

const SuccessIcon = styled.div`
	width: 48px;
	height: 48px;
	background-image: url(/assets/round-check.svg);
	position: absolute;
	top: 27;
	right: 32;
`;

const Header = styled.div`
	font-size: 24px;
`;

const Sum = styled.div`
	font-size: 48px;
`;

const CommissionTips = styled.div`
	font-size: 13px;
	opacity: 0.6;
	margin-bottom: 20px;
`;

const Section = styled.div`
	margin-bottom: 20px;
`;

const SectionLabel = styled.div`
	font-size: 15px;
	display: inline-block;
	width: 50%;
	padding-right: 10px;
`;

const SectionValue = styled.div`
	font-size: 15px;
	display: inline-block;
	width: 50%;
`;

const Instruction = styled.div`
	margin-bottom: 40px;
	font-size: 15px;
`;

const RepeatPayment = styled.button`
	font-size: 13px;
	background-color: rgba(0, 0, 0, 0.08);
	height: 42px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
	width: 100%;
	position: absolute;
	left: 0;
	bottom: 0;
	cursor: pointer;
	text-transform: uppercase;
`;

const MobilePaymentSuccess = ({newTask, repeatAddTask}) => {
    const {label} = newTask;

    return (
        <MobilePaymentLayout>
            <HeaderContainer>
                <SuccessIcon />
                <Header>Задача успешно добавлена!</Header>
            </HeaderContainer>
            <Underline/>
            <Section>
                <SectionLabel>Лэйбл транзакции:</SectionLabel>
                <SectionValue>{label}</SectionValue>
            </Section>
            <Underline/>
            <Instruction>
                При выполнении задачи, вам будет выслано опевещение "Telegramm" на привязанный номер телефона.
            </Instruction>
            <RepeatPayment onClick={repeatAddTask}>Добавить еще задачу</RepeatPayment>
        </MobilePaymentLayout>
    );
};

MobilePaymentSuccess.propTypes = {
    newTask: PropTypes.shape({
        label: PropTypes.string,
    }).isRequired,
    repeatAddTask: PropTypes.func.isRequired
};

export default MobilePaymentSuccess;
