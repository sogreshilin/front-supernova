import React from 'react';
import {
    Panel,
    PanelHeader,
    FormLayout,
    FormLayoutGroup,
    Input,
    Select,
    Textarea,
    Button,
    Div,
    CellButton,
    File,
} from "@vkontakte/vkui";
import Icon24Camera from '@vkontakte/icons/dist/24/camera';

import styles from './styles.scss';

import dictionary from 'src/Services/CreateEvent/Dictionary';


const InputStatus = {
    Error: 'error',
    Valid: 'valid',
    Default: 'default',
};

export default class CreateEvent extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            title: {
                value: '',
                isValid: null,
            },
            description: {
                value: '',
            },
            category: {
                value: '',
            },
            place: {
                value: '',
            },
            date: {
                isValid: null,
                value: '',
            },
            time: {
                isValid: null,
                value: '',
            },
            image: null,
        };
    }

    render() {
        const {date, time, title, description} = this.state;

        const dateMessage = date.isValid !== null ? 'Дата должна соответствовать формату ' + dictionary.date.hint : null;
        let dateValidationStatus = InputStatus.Default;
        if (date.isValid === true) {
            dateValidationStatus = InputStatus.Valid;
        } else if (date.isValid === false) {
            dateValidationStatus = InputStatus.Error;
        }

        const timeMessage = time.isValid !== null ? 'Время должно соответствовать формату ' + dictionary.time.hint : null;
        let timeValidationStatus = InputStatus.Default;
        if (time.isValid === true) {
            timeValidationStatus = InputStatus.Valid;
        } else if (time.isValid === false) {
            timeValidationStatus = InputStatus.Error;
        }

        const titleMessage = time.isValid !== null ? 'Заголовок должен иметь длину от 10 до 50 символов' : null;
        let titleValidationStatus = InputStatus.Default;
        if (title.isValid === true) {
            titleValidationStatus = InputStatus.Valid;
        } else if (title.isValid === false) {
            titleValidationStatus = InputStatus.Error;
        }

        const descriptionMessage = time.isValid !== null ? 'Описание должно иметь длину от 10 до 200 символов' : null;
        let descriptionValidationStatus = InputStatus.Default;
        if (description.isValid === true) {
            descriptionValidationStatus = InputStatus.Valid;
        } else if (description.isValid === false) {
            descriptionValidationStatus = InputStatus.Error;
        }

        return (
            <Panel id={this.props.id}>
                <PanelHeader>{dictionary.tabTitle}</PanelHeader>
                <FormLayout className={styles.form}>
                    <FormLayoutGroup
                        top={dictionary.eventTitle.label}
                        status={titleValidationStatus}
                        bottom={titleMessage}
                    >
                        <Input
                            type={'text'}
                            placeholder={dictionary.eventTitle.hint}
                            onChange={this.onTitleChanged}
                            value={this.state.title.value}
                            status={titleValidationStatus}
                        />
                    </FormLayoutGroup>
                    <Textarea
                        top={dictionary.description.label}
                        placeholder={dictionary.description.hint}
                        onChange={this.onDescriptionChanged}
                        value={this.state.description.value}
                        status={descriptionValidationStatus}
                        bottom={descriptionMessage}
                    />
                    <FormLayoutGroup top={dictionary.category.label}>
                        <Select
                            placeholder={dictionary.category.hint}
                            onChange={this.onCategoryChanged}
                            value={this.state.category.value}
                        >
                            <option value='b'>Option1</option>
                            <option value='c'>Option2</option>
                        </Select>
                    </FormLayoutGroup>
                    <FormLayoutGroup top={dictionary.place.label}>
                        <Input type={'text'} placeholder={dictionary.place.hint}/>
                    </FormLayoutGroup>
                    <FormLayoutGroup
                        top={dictionary.date.label}
                        status={dateValidationStatus}
                        bottom={dateMessage}
                    >
                        <Input type={'date'}
                               placeholder={dictionary.date.hint}
                               onChange={this.onDateChanged}
                               value={date.value}
                               status={dateValidationStatus}
                        />
                    </FormLayoutGroup>
                    <FormLayoutGroup
                        top={dictionary.time.label}
                        status={timeValidationStatus}
                        bottom={timeMessage}
                    >
                        <Input type={'time'}
                               placeholder={dictionary.time.hint}
                               onChange={this.onTimeChanged}
                               value={time.value}
                               status={timeValidationStatus}
                        />
                    </FormLayoutGroup>
                    <FormLayoutGroup
                        top="Изображение мероприятия"
                    >
                        <div>
                            <File
                                // top="Изображение мероприятия"
                                before={<Icon24Camera/>}
                                size="l"
                                accept={'.png, .jpg, .jpeg'}
                                onChange={this.onAddFile}
                            >
                                Добавить
                            </File>
                            {
                                this.state.file ? (
                                    <p>{this.state.file.name}</p>
                                ) : (
                                    <p>Файл не выбран</p>
                                )
                            }
                        </div>
                    </FormLayoutGroup>
                </FormLayout>

                <Div style={{display: 'flex'}}>
                    <Button
                        size={'xl'}
                        stretched
                        onClick={this.onFinishClicked}
                    >{dictionary.actions.finish}
                    </Button>
                </Div>
            </Panel>
        );
    }

    onAddFile = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            this.setState({
                file: files[0]
            })
        }
    };

    onFinishClicked = (e) => {
        const {date, time, title, description, category} = this.state;
        const isValid = date.isValid && time.isValid && title.isValid && description.isValid && category.value !== '';

        if (!isValid) {
            this.setState({
                date: {
                    value: date.value,
                    isValid: date.isValid === true,
                },
                time: {
                    value: time.value,
                    isValid: time.isValid === true,
                },
                category: {
                    value: category.value,
                    isValid: category.value !== '',
                },
                title: {
                    value: category.value,
                    isValid: title.isValid === true,
                },
                description: {
                    value: category.value,
                    isValid: description.isValid === true,
                },
            })
        }
    };

    onTitleChanged = (e) => {
        const value = e.target.value;
        const length = value.time().length();
        this.setState({
            title: {
                value: value,
                isValid: 10 <= length && length <= 50,
            }
        })
    };

    onDescriptionChanged = (e) => {
        const value = e.target.value;
        const length = value.time().length();
        this.setState({
            description: {
                value: value,
                isValid: 10 <= length && length <= 200,
            }
        })
    };

    onCategoryChanged = (e) => {
        const value = e.target.value;
        this.setState({
            category: {
                value: value
            }
        })
    };

    onDateChanged = (e) => {
        const value = e.target.value.trim().substr(0, 10).replace(/^[\D.]/, '');
        console.log(value);

        const isValid = value.match(/^\d\d.\d\d.\d{4}$/) !== null || value.match(/^\d{4}-\d\d-\d\d$/) !== null;
        this.setState({
            date: {
                value: value,
                isValid: isValid,
            }
        });
    };

    onTimeChanged = (e) => {
        const value = e.target.value.trim().substr(0, 5).replace(/^[\D:]/, '');
        console.log(value);

        const isValid = value.match(/^\d\d:\d\d$/) !== null;
        this.setState({
            time: {
                value: value,
                isValid: isValid
            }
        });
    };

}