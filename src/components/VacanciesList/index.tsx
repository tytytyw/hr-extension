// @ts-nocheck
import { useState, useEffect, FC } from 'react'
import styles from './VacanciesList.module.sass'
import Input from '../Input'
import Button from '../Button'
import classnames from 'classnames'
import Error from '../Error'


interface VacanciesListProps {
    vacancies: Array<{ GUID: string, title: string }>;
    requestParams: requestParamsProps;
    setShowLoader: (showLoader: boolean) => void
}

interface requestParamsProps {
    serverUrl: string,
    databaseUrl: string,
    portUrl: string,
    token: string
}

const VacanciesList: FC<VacanciesListProps> = ({ vacancies, requestParams, setShowLoader }) => {

    const [open, setOpen] = useState(false);
    const [selectValue, setSelectValue] = useState('');
    const [comment, setComment] = useState('');

    const [serverUrl] = useState<string>(requestParams.serverUrl)
    const [databaseUrl] = useState<string>(requestParams.databaseUrl)
    const [token] = useState<string>(requestParams.token)
    const [portUrl] = useState<string>(requestParams.portUrl)
    const [showError, setShowError] = useState<showError>({ show: false })

    const getSelectValue = () => {
        if (!selectValue) {
            return '';
        }

        const selectValueItem = vacancies.find((item) => item?.GUID === selectValue);
        return selectValueItem?.vacancy_name;
    };

    const sendCadidate = (double) => {
        if (selectValue) {
            // TODO: url = ''
            let candidateUrl = 'https://volgograd.hh.ru/resume/fc1f2fa500082a5e74002f5df04934726d4777?h';
            chrome && chrome.tab && chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                console.log(tabs[0].url);
                candidateUrl = tabs[0].url
            });

            if (candidateUrl) {
                setShowLoader(true)

                const data = {
                    GUID: selectValue,
                    URL: candidateUrl,
                    double: !!double,
                    comment: comment
                }

                fetch(`${serverUrl + (databaseUrl ? '/' + databaseUrl : '') + (portUrl ? ':' + portUrl : '')}/candidates/candidates`, {
                    method: 'POST',
                    headers: {
                        'Authorization': "Basic " + token,
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'

                    },
                    body: JSON.stringify(data)
                })
                    .then(res => {
                        if (res.status === 200) {
                            setShowError({ show: true, closeText: 'Закрыть', title: 'Отправлено', text: 'Кандидат успешно добавлен' })
                        }

                        else if (res.status === 401) {
                            // ошибка авториз
                            setShowError({ show: true, closeText: 'Закрыть', title: 'Ошибка авторизации', text: 'Пожалуйста, получите токен доступа для данного работного сайта в программе' })

                        } else if (res.status === 301) {
                            // сайте не поддерживается
                            setShowError({ show: true, text: 'Данный работный сайт не поддерживается программой', closeText: 'Закрыть' })

                        } else if (res.status === 201) {
                            // дубль
                            res.text().then(text => setShowError({ show: true, double: true, closeText: 'Отменить', title: 'Кандидат найден в базе', text: text ?? '' }))

                        } else {
                            setShowError({ show: true })
                        }
                    })
                    .catch(er => {

                        setShowError({ show: true })
                    })
                    .finally(() => setShowLoader(false))
            }
        }
    }


    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Добавление кандидата</h2>
            <div>
                <p className={styles.label}>Вакансия:</p>
                <div
                    className={classnames({
                        [styles.selectWrap]: true,
                    })}
                >
                    <div
                        onClick={() => setOpen(open => !open)}
                        className={classnames({
                            [styles.select]: true, [styles.active]: !!open,
                        })}
                    >
                        <div className={styles.selectValueWrap}>
                            {getSelectValue()}
                        </div>
                        <span
                            className={classnames({
                                [styles.arrow]: true,
                                [styles.active]: !!open
                            })}
                        />
                    </div>

                    <div
                        className={classnames(
                            {
                                [styles.contentWrap]: true,
                                [styles.active]: !!open
                            },
                        )}
                    >
                        <ul className={styles.content}>
                            {vacancies.length
                                ? vacancies.map((item, index) => (
                                    <li
                                        key={item.GUID}
                                        onClick={() => {
                                            setOpen(false);
                                            setSelectValue(item.GUID);
                                        }}
                                        className={classnames({
                                            [styles.option]: true,
                                            [styles.active]: selectValue === item.GUID
                                        })}
                                    >
                                        {item.vacancy_name}
                                    </li>
                                ))
                                : null}
                        </ul>
                    </div>
                </div>
            </div>
            <Input setValue={setComment} label={'Комментарий'} type='textarea' />
            <Button text='Добавить кандидата' disabled={!selectValue} callback={() => sendCadidate(false)} />
            {showError.show ?
                <Error setDouble={
                    showError.double ?
                        () => { sendCadidate(true) }
                        : null}
                    close={() => setShowError({ show: false })}
                    closeText={showError.closeText}
                    title={showError?.title}
                    text={showError?.text} /> : ''
            }

        </div>
    );
};


export default VacanciesList