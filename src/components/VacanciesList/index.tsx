import { useState, useEffect, FC } from 'react'
import styles from './VacanciesList.module.sass'
import Input from '../Input'
import Button from '../Button'
import classnames from 'classnames'


interface VacanciesListProps {
    setConnected: (connected: boolean) => void
}

const VacanciesList: FC<VacanciesListProps> = ({ setConnected }) => {

    const [vacancies, setVacancies] = useState([
        { id: '1', title: 'Менеджер 1С' },
        { id: '2', title: 'Программист 1С' },
        { id: '3', title: 'Программист-стажер 1С' },
        { id: '4', title: 'Ведущий программист 1С/ senior' },
        { id: '5', title: 'Консультант-аналитик' },
    ])


    const [open, setOpen] = useState(false);
    const [selectValue, setSelectValue] = useState('');
    const [comment, setComment] = useState('')

    const getSelectValue = () => {
        if (!selectValue) {
            return '';
        }

        const selectValueItem = vacancies.find((item) => item?.id === selectValue);
        return selectValueItem?.title;
    };


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
                                        key={index}
                                        onClick={() => {
                                            setOpen(false);
                                            setSelectValue(item.id);
                                            // onChange(item.id);
                                        }}
                                        className={classnames({
                                            [styles.option]: true,
                                            [styles.active]: selectValue === item.id
                                        })}
                                    >
                                        {item.title}
                                    </li>
                                ))
                                : null}
                        </ul>
                    </div>
                </div>
            </div>
            <Input setValue={setComment} label={'Комментарий'} type='textarea' />
            <Button text='Добавить кандидата' disabled={!selectValue} callback={() => { console.log(window.location.href); setConnected(false) }} />
        </div>
    );
};


export default VacanciesList