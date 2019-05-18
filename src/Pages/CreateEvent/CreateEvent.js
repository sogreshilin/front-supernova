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
    File,
} from "@vkontakte/vkui";
import Icon24Camera from '@vkontakte/icons/dist/24/camera';

import styles from './styles.scss';

import CreateEventDict from 'src/Services/Dictionary/CreateEvent';
import EventTypeDict from 'src/Services/Dictionary/EventType';
import FileApi from 'src/Services/File/api';
import GeoApi from 'src/Services/Geo/api';
import EventApi from 'src/Services/Event/api';

const InputStatus = {
    Error: 'error',
    Valid: 'valid',
    Default: 'default',
};


export default class CreateEvent extends React.Component {


    constructor(props) {
        super(props);

        this.state = this.getInitialState();
    }

    render() {
        const {date, time, title, description} = this.state;

        const dateMessage = date.isValid !== null ? 'Дата должна соответствовать формату ' + CreateEventDict.date.hint : null;
        let dateValidationStatus = InputStatus.Default;
        if (date.isValid === true) {
            dateValidationStatus = InputStatus.Valid;
        } else if (date.isValid === false) {
            dateValidationStatus = InputStatus.Error;
        }

        const timeMessage = time.isValid !== null ? 'Время должно соответствовать формату ' + CreateEventDict.time.hint : null;
        let timeValidationStatus = InputStatus.Default;
        if (time.isValid === true) {
            timeValidationStatus = InputStatus.Valid;
        } else if (time.isValid === false) {
            timeValidationStatus = InputStatus.Error;
        }

        const titleMessage = title.isValid !== null ? 'Заголовок должен иметь длину от 10 до 50 символов' : null;
        let titleValidationStatus = InputStatus.Default;
        if (title.isValid === true) {
            titleValidationStatus = InputStatus.Valid;
        } else if (title.isValid === false) {
            titleValidationStatus = InputStatus.Error;
        }

        const descriptionMessage = title.isValid !== null ? 'Описание должно иметь длину от 10 до 200 символов' : null;
        let descriptionValidationStatus = InputStatus.Default;
        if (description.isValid === true) {
            descriptionValidationStatus = InputStatus.Valid;
        } else if (description.isValid === false) {
            descriptionValidationStatus = InputStatus.Error;
        }

        return (
            <Panel id={this.props.id}>
                <PanelHeader>{CreateEventDict.tabTitle}</PanelHeader>
                <FormLayout className={styles.form}>
                    <FormLayoutGroup
                        top={CreateEventDict.eventTitle.label}
                        status={titleValidationStatus}
                        bottom={titleMessage}
                    >
                        <Input
                            type={'text'}
                            placeholder={CreateEventDict.eventTitle.hint}
                            onChange={this.onTitleChanged}
                            value={this.state.title.value}
                            status={titleValidationStatus}
                        />
                    </FormLayoutGroup>
                    <Textarea
                        top={CreateEventDict.description.label}
                        placeholder={CreateEventDict.description.hint}
                        onChange={this.onDescriptionChanged}
                        value={this.state.description.value}
                        status={descriptionValidationStatus}
                        bottom={descriptionMessage}
                    />
                    <FormLayoutGroup top={CreateEventDict.category.label}>
                        <Select
                            placeholder={CreateEventDict.category.hint}
                            onChange={this.onCategoryChanged}
                            value={this.state.category.value}
                        >
                            {
                                Object.keys(EventTypeDict).map(key =>
                                    <option key={key} value={key}>{EventTypeDict[key]}</option>
                                )
                            }
                        </Select>
                    </FormLayoutGroup>
                    <FormLayoutGroup
                        top={CreateEventDict.place.label}
                        bottom={this.state.place.message}
                        status={this.state.place.message !== null ? InputStatus.Error : InputStatus.Default}
                    >
                        <Input
                            type={'text'}
                            placeholder={CreateEventDict.place.hint}
                            onChange={this.onPlaceChanged}
                            value={this.state.place.value}
                        />
                        {
                            this.state.place.options &&
                            <Select onChange={this.onAddressOptionSelected}>
                                {this.state.place.options.map((sug, index) =>
                                    <option key={index} value={index}>{sug.value}</option>
                                )}
                            </Select>
                        }
                    </FormLayoutGroup>
                    <FormLayoutGroup
                        top={CreateEventDict.date.label}
                        status={dateValidationStatus}
                        bottom={dateMessage}
                    >
                        <Input type={'date'}
                               placeholder={CreateEventDict.date.hint}
                               onChange={this.onDateChanged}
                               value={date.value}
                               status={dateValidationStatus}
                        />
                    </FormLayoutGroup>
                    <FormLayoutGroup
                        top={CreateEventDict.time.label}
                        status={timeValidationStatus}
                        bottom={timeMessage}
                    >
                        <Input type={'time'}
                               placeholder={CreateEventDict.time.hint}
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
                    >{CreateEventDict.actions.finish}
                    </Button>
                </Div>
            </Panel>
        );
    }

    onAddressOptionSelected = (e) => {
        const optionIndex = Number.parseInt(e.target.value, 10);
        const address = this.state.place.options[optionIndex].value;
        this.setState({
                placeTimestamp: Date.now(),
                place: {
                    value: address,
                    options: this.state.place.options,
                    message: this.state.place.message,
                }
            },
            () => this.addressSuggestions(address));
    };

    onPlaceChanged = (e) => {
        const address = e.target.value.trim();
        if (address.length > 5 && (!this.state.placeTimestamp || Date.now() - this.state.placeTimestamp > 1000)) {
            console.log(address);
            this.setState({
                    placeTimestamp: Date.now(),
                    place: {
                        value: e.target.value,
                        options: this.state.place.options,
                        message: this.state.place.message,
                    }
                },
                () => this.addressSuggestions(address)
            );
        } else {
            this.setState({
                place: {
                    value: e.target.value,
                    options: this.state.place.options,
                    message: this.state.place.message,
                }
            });
        }
    };

    onAddFile = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            this.setState({
                file: files[0]
            })
        }
    };

    addressSuggestions = (address) =>
        GeoApi
            .suggestions(address)
            .then(({data}) => {
                const suggestions = data.suggestions;
                console.log(suggestions);
                if (suggestions.length === 0) {
                    console.log('no options');
                    return new Promise((_, reject) => {
                        this.setState({
                                place: {
                                    value: this.state.place.value,
                                    message: 'Введенный адрес не существует',
                                    options: null
                                }
                            },
                            () => reject(null)
                        );
                    });
                } else if (suggestions.length > 1) {
                    console.log('many options');
                    if (suggestions[0].data.geo_lat) {
                        return new Promise((resolve, _) => {
                            this.setState(
                                {
                                    place: {
                                        value: this.state.place.value,
                                        message: null,
                                        options: null,
                                    }
                                },
                                () => resolve(suggestions[0])
                            )
                        });
                    } else {
                        return new Promise((_, reject) => {
                            this.setState(
                                {
                                    place: {
                                        value: this.state.place.value,
                                        message: 'Укажите точный адрес',
                                        options: suggestions
                                    }
                                },
                                () => reject(null)
                            )
                        });
                    }
                } else {
                    console.log('single option');
                    return new Promise((resolve, _) => {
                        this.setState(
                            {
                                place: {
                                    value: this.state.place.value,
                                    message: null,
                                    options: null,
                                }
                            },
                            () => resolve(suggestions[0])
                        )
                    });
                }
            });

    uploadFile = () =>
        FileApi
            .upload(this.state.file)
            .then(response => {
                if (response.data) {
                    return response.data.id;
                }
            });

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
        } else {
            this
                .addressSuggestions(this.state.place.value)
                .then(suggestion =>
                    this.uploadFile().then(fileId => ({
                        fileId: fileId,
                        suggestion: suggestion,
                    }))
                )
                .then(({fileId, suggestion}) => {

                    const location = suggestion.data;
                    const address = location.street_with_type + ", " + location.house;
                    const formattedDate = (date.value.includes('-') ? date.value : date.value.split('.').reverse().join('-')) + 'T' + time.value + ':00Z';
                    const event = {
                        authorId: 1,
                        title: title.value,
                        description: description.value,
                        types: ['ARTS' /*category.value*/],
                        location: {
                            latitude: location.geo_lat,
                            longitude: location.geo_lat,
                            address: address,
                            city: location.city,
                        },
                        interval: {
                            from: formattedDate,
                            to: formattedDate,
                        },
                        imageIds: [fileId],
                    };
                    console.log(event);

                    return EventApi
                        .createEvent(event)
                        .then(_ => this.clearEventForm());
                })
                .catch(e => console.error(e));
        }
    };

    getInitialState = () => {
        return {
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
                message: null,
                options: null,
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
    };

    clearEventForm = () => {
        this.setState(this.getInitialState());
    };

    onTitleChanged = (e) => {
        const value = e.target.value;
        const length = value.trim().length;
        this.setState({
            title: {
                value: value,
                isValid: 10 <= length && length <= 50,
            }
        })
    };

    onDescriptionChanged = (e) => {
        const value = e.target.value;
        const length = value.trim().length;
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