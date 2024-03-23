import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './../i18n';

interface CardProps {
    title: string;
    description: string;
    number: number
}

const CardTest = ({ title, description, number }: CardProps) => {
    const { t } = useTranslation();

    useEffect(() => {

    }, []);
    return (
        <div className='cardTest'>
            <div className='title'>{t(title)} {number}</div>
            <div className='description'>{t(description)}</div>
        </div>
    );
}

export default CardTest; 