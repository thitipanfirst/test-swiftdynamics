import React, { useEffect, useState } from 'react';
import { Select, Input, Flex, DatePicker, Radio, Button, Table, Modal, TablePaginationConfig, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import './../i18n';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import { CLEAR_FORM, SET_birthDay, SET_countryCode, SET_editData, SET_expectedSalary, SET_gender, SET_idCard, SET_indexData, SET_lastName, SET_name, SET_nameTitle, SET_nationality, SET_passport, SET_tel } from '../stores/itemSlice/itemSlice'
import dayjs, { Dayjs } from "dayjs";

interface PersonData {
    nameTitle: string;
    name: string;
    lastName: string;
    birthDay: Dayjs | null;
    nationality: string;
    idNumbers: string[];
    gender: string;
    countryCode: string;
    tel: string;
    passport: string;
    expectedSalary: string;
}

interface DataSource {
    key: string;
    name: string;
    gender: string;
    tel: string;
    nationality: string;
}

const FormAndTable = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch()
    const name = useSelector((state: RootState) => state.itemSlice.name)
    const idNumbers = useSelector((state: RootState) => state.itemSlice.idCard)
    const nameTitle = useSelector((state: RootState) => state.itemSlice.nameTitle)
    const lastName = useSelector((state: RootState) => state.itemSlice.lastName)
    const birthDay = useSelector((state: RootState) => state.itemSlice.birthDay)
    const nationality = useSelector((state: RootState) => state.itemSlice.nationality)
    const gender = useSelector((state: RootState) => state.itemSlice.gender)
    const countryCode = useSelector((state: RootState) => state.itemSlice.countryCode)
    const tel = useSelector((state: RootState) => state.itemSlice.tel)
    const passport = useSelector((state: RootState) => state.itemSlice.passport)
    const expectedSalary = useSelector((state: RootState) => state.itemSlice.expectedSalary)
    const editData = useSelector((state: RootState) => state.itemSlice.editData)
    const indexData = useSelector((state: RootState) => state.itemSlice.indexData)
    const [personData, setPersonData] = useState<PersonData[]>([]);

    const handleIdNumberChange = (value: string, index: number) => {
        const updatedIdNumbers = [...idNumbers];
        updatedIdNumbers[index] = value.replace(/\D/g, '').slice(0, index === 1 ? 4 : index === 2 ? 5 : index === 3 ? 2 : 1);
        dispatch(SET_idCard(updatedIdNumbers));
    };

    const handleTelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, '');
        dispatch(SET_tel(numericValue));
    };

    const handleSalary = (e: { target: { value: string; }; }) => {
        const value = e.target.value.replace(/\D/g, '')
        dispatch(SET_expectedSalary(value));
    };

    const { confirm } = Modal;

    const [dataSource, setDataSource] = useState<DataSource[]>([]);

    useEffect(() => {
        if (personData) {
            const updatedDataSource = personData.map((data, index) => ({
                key: (index + 1).toString(),
                name: (data.nameTitle + ' ' + data.name + ' ' + data.lastName),
                gender: data.gender,
                tel: data.tel,
                nationality: data.nationality,
            }));
            setDataSource(updatedDataSource);
        }
    }, [personData]);

    const columns = [
        {
            title: t('name'),
            dataIndex: 'name',
            key: 'name',
            sorter: (a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name),
            render: (name: any) => `${name}`,
            width: '20%',
        },
        {
            title: t('gender'),
            dataIndex: 'gender',
            key: 'gender',
            sorter: (a: { gender: string; }, b: { gender: any; }) => a.gender.localeCompare(b.gender),
            render: (gender: string) => `${t(gender)}`,
            width: '20%',
        },
        {
            title: t('tel'),
            dataIndex: 'tel',
            key: 'tel',
            sorter: (a: { tel: string; }, b: { tel: any; }) => a.tel.localeCompare(b.tel),
            width: '20%',
        },
        {
            title: t('nationality'),
            dataIndex: 'nationality',
            key: 'nationality',
            sorter: (a: { nationality: string; }, b: { nationality: any; }) => a.nationality.localeCompare(b.nationality),
            render: (nationality: string) => `${t(nationality)}`,
            width: '20%',
        },
        {
            title: t('action'),
            key: 'action',
            render: (_: any, record: { key: any; }) => (
                <Flex>
                    <Button type="link" onClick={() => [handleEditForm(record), dispatch(SET_editData(true))]}>{t('edit')}</Button>
                    <Button type="link" onClick={() => showDeleteConfirm(record)}>{t('delete')}</Button>
                </Flex>
            ),
        },
    ];

    const showDeleteConfirm = (record: { key: any; }) => {
        confirm({
            title: t('confirmTitle'),
            okText: t('okText'),
            okType: 'danger',
            cancelText: t('cancelText'),
            onOk() {
                handleDelete(record.key);
            },
        });
    };

    const showDeleteConfirmAll = () => {
        if (selectedRowKeys.length) {
            confirm({
                title: t('confirmTitle'),
                okText: t('okText'),
                okType: 'danger',
                cancelText: t('cancelText'),
                onOk() {
                    handleDeleteAll();
                },
            });
        }
    };

    const handleDelete = (key: string) => {
        const updatedDataSource = personData.filter((item, index) => (index + 1).toString() !== key);
        localStorage.setItem('personData', JSON.stringify(updatedDataSource));
        setPersonData(updatedDataSource);
        Modal.success({ content: t('deleteSuccess') });
    };

    const [pagination, setPagination] = useState<TablePaginationConfig>({ current: 1, pageSize: 5 });
    const handleTableChange = (pagination: TablePaginationConfig, filters: any, sorter: any) => {
        setPagination(pagination);
    };

    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
    const handleDeleteAll = () => {
        const updatedDataSource = personData.filter((item, index) => !selectedRowKeys.includes((index + 1).toString()));
        localStorage.setItem('personData', JSON.stringify(updatedDataSource));
        setPersonData(updatedDataSource);
        setSelectedRowKeys([]);
        Modal.success({ content: t('deleteSuccess') });
    };

    const onSelectChange = (selectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(selectedRowKeys.map(key => String(key)));
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const onSelectAllChange = (e: CheckboxChangeEvent) => {
        const selectedKeys = e.target.checked ? dataSource.map(item => item.key) : [];
        setSelectedRowKeys(selectedKeys);
    };

    useEffect(() => {
        const dataString = localStorage.getItem('personData');
        if (dataString) {
            const data = JSON.parse(dataString);
            setPersonData(data);
        }
    }, []);

    const handleAddData = () => {
        if (name && idNumbers && nameTitle && lastName && birthDay && nationality && gender && countryCode && tel && expectedSalary) {
            const newObject = {
                name: name,
                idNumbers: idNumbers,
                nameTitle: nameTitle,
                lastName: lastName,
                birthDay: birthDay,
                nationality: nationality,
                gender: gender,
                countryCode: countryCode,
                tel: tel,
                passport: passport,
                expectedSalary: expectedSalary
            };
            const addData = [...personData, newObject];
            localStorage.setItem('personData', JSON.stringify(addData));
            setPersonData(addData)
            dispatch(CLEAR_FORM())
            Modal.success({ content: t('success') });
        } else {
            Modal.warning({ content: t('warning') });
        }
    }

    const handleEditForm = (record: { key: any; }) => {
        dispatch(SET_indexData(Number(record.key) - 1))
        const index = personData.findIndex((item, index) => index === (Number(record.key) - 1));



        if (index !== -1) {
            dispatch(SET_birthDay(personData[index].birthDay))
            dispatch(SET_countryCode(personData[index].countryCode))
            dispatch(SET_expectedSalary(personData[index].expectedSalary))
            dispatch(SET_gender(personData[index].gender))
            dispatch(SET_idCard(personData[index].idNumbers))
            dispatch(SET_lastName(personData[index].lastName))
            dispatch(SET_name(personData[index].name))
            dispatch(SET_nameTitle(personData[index].nameTitle))
            dispatch(SET_nationality(personData[index].nationality))
            dispatch(SET_passport(personData[index].passport))
            dispatch(SET_tel(personData[index].tel))
        }
    }



    const updateEditForm = () => {
        const index = personData.findIndex((item, index) => index === indexData);
        if (name && idNumbers && nameTitle && lastName && birthDay && nationality && gender && countryCode && tel && expectedSalary) {
            if (index !== -1) {
                const updatedData = [...personData];

                updatedData[index] = {
                    name: name,
                    idNumbers: idNumbers,
                    nameTitle: nameTitle,
                    lastName: lastName,
                    birthDay: birthDay,
                    nationality: nationality,
                    gender: gender,
                    countryCode: countryCode,
                    tel: tel,
                    passport: passport,
                    expectedSalary: expectedSalary
                };
                localStorage.setItem('personData', JSON.stringify(updatedData));
                setPersonData(updatedData)
                dispatch(CLEAR_FORM())
                Modal.success({ content: t('success') });
            }
        } else {
            Modal.warning({ content: t('warning') });
        }
        dispatch(SET_editData(false))
    }

    return (
        <div className='content'>
            <div className='containerContent mt-6'>
                <Flex className='cardForm' gap="middle" align="start" vertical>
                    <Flex gap={4} >
                        <Flex>
                            <div className='text-red'>*</div>
                            <div className='textForm'>{t('nameTitle')}: </div>
                        </Flex>
                        <Select
                            placeholder={t('nameTitle')}
                            value={nameTitle}
                            onChange={(selectedValue) => dispatch(SET_nameTitle(selectedValue))}
                            options={[
                                { value: t('miss'), label: t('miss') },
                                { value: t('mrs'), label: t('mrs') },
                                { value: t('mr'), label: t('mr') },
                            ]}
                            style={{ width: 80 }}
                        />

                        <Flex style={{ paddingLeft: '8px' }}>
                            <div className='text-red'>*</div>
                            <div className='textForm'>{t('realName')}: </div>
                        </Flex>
                        <Input
                            value={name}
                            onChange={(event) => dispatch(SET_name(event.target.value))}
                            style={{ width: '300px' }}
                        />

                        <Flex style={{ paddingLeft: '8px' }}>
                            <div className='text-red'>*</div>
                            <div className='textForm'>{t('lastName')}:</div>
                        </Flex>
                        <Input
                            value={lastName}
                            onChange={(event) => dispatch(SET_lastName(event.target.value))}
                            style={{ width: '300px' }}
                        />
                    </Flex>


                    <Flex gap={4} >
                        <Flex>
                            <div className='text-red'>*</div>
                            <div className='textForm'>{t('birthDay')}: </div>
                        </Flex>
                        <DatePicker
                            value={birthDay ? dayjs(birthDay, 'YYYY-MM-DD') : null}
                            onChange={(value) => [dispatch(SET_birthDay(value))]}
                            format="MM/DD/YYYY"
                            placeholder={t('dateFormat')}
                        />


                        <Flex style={{ paddingLeft: '24px' }}>
                            <div className='text-red'>*</div>
                            <div className='textForm'>{t('nationality')}: </div>
                        </Flex>
                        <Select
                            value={nationality}
                            placeholder={t('selection')}
                            onChange={(value) => dispatch(SET_nationality(value))}
                            options={[
                                { value: t('th'), label: t('th') },
                                { value: t('en'), label: t('en') },
                            ]}
                            style={{ width: 300 }}
                        />
                    </Flex>

                    <Flex gap={4}>
                        <div className='textForm'>{t('idCard')}: </div>
                        {idNumbers.map((value, index) => (
                            <Flex>
                                <Input
                                    key={index}
                                    value={value}
                                    onChange={(e) => handleIdNumberChange(e.target.value, index)}
                                    style={{ width: index === 1 ? '130px' : index === 2 ? '130px' : index === 3 ? '110px' : '80px' }}
                                    maxLength={index === 1 ? 4 : index === 2 ? 5 : index === 3 ? 2 : 1}
                                />
                                {index !== 4 ? (<div className='lineIDCard'>-</div>) : null}
                            </Flex>
                        ))}
                    </Flex>

                    <Flex justify="start" gap="small" >
                        <Flex>
                            <div className='text-red'>*</div>
                            <div className='textForm'>{t('gender')}: </div>
                        </Flex>
                        <Radio.Group onChange={(event) => dispatch(SET_gender(event.target.value))} value={gender}>
                            <Radio value={t('male')}>{t('male')}</Radio>
                            <Radio value={t('female')}>{t('female')}</Radio>
                            <Radio value={t('notSpecified')}>{t('notSpecified')}</Radio>
                        </Radio.Group>
                    </Flex>

                    <Flex justify="start" gap="small" >
                        <Flex>
                            <div className='text-red'>*</div>
                            <div className='textForm'>{t('tel')}: </div>
                        </Flex>

                        <Select
                            value={countryCode}
                            onChange={(value) => dispatch(SET_countryCode(value))}
                            options={[
                                { value: '+66', label: '+66 (TH)' }
                            ]}
                            style={{ width: 200 }}
                        />
                        <div className='lineIDCard'>-</div>
                        <Input
                            style={{ width: 'calc(100% - 120px)' }}
                            value={tel}
                            onChange={handleTelChange}
                        />

                    </Flex>

                    <Flex justify="start" gap="small" >
                        <div className='textForm'>{t('passport')}: </div>
                        <Input
                            value={passport}
                            onChange={(event) => dispatch(SET_passport(event.target.value))}
                            style={{ width: '300px' }}
                        />
                    </Flex>

                    <Flex justify="start" gap={140} >
                        <Flex justify="start" gap="small" >
                            <Flex>
                                <div className='text-red'>*</div>
                                <div className='textForm'>{t('expectedSalary')}: </div>
                            </Flex>
                            <Input
                                type="text"
                                value={expectedSalary ? Number(expectedSalary).toLocaleString() : ''}
                                onChange={(handleSalary)}
                                style={{ width: '265px' }}
                            />
                        </Flex>
                        <Flex justify="start" gap={60} >
                            <Button onClick={() => dispatch(CLEAR_FORM())}>{t('clear')}</Button>
                            {editData ? (<Button onClick={() => updateEditForm()}>{t('edit')}</Button>) : (<Button onClick={() => handleAddData()}>{t('add')}</Button>)}
                            {editData ? (<Button onClick={() => [dispatch(SET_editData(false)), dispatch(SET_indexData(null)), dispatch(CLEAR_FORM())]}>{t('cancel')}</Button>) : null}
                        </Flex>
                    </Flex>
                </Flex>
            </div>
            <Flex className='mt-6' vertical>
                <Flex gap={4} style={{ marginLeft: '5%', marginRight: '5%' }}>
                    <Flex gap={8}>
                        <Checkbox
                            indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < dataSource.length}
                            checked={selectedRowKeys.length === dataSource.length && dataSource.length !== 0}
                            onChange={onSelectAllChange}
                        />
                        <div className='textForm'>{t('selectAll')}</div>
                    </Flex>
                    <Button onClick={() => showDeleteConfirmAll()}>{t('delete')}</Button>
                </Flex>
                <div className='cardTable mt-2'>
                    <Table
                        dataSource={dataSource ? dataSource : []}
                        columns={columns}
                        pagination={pagination}
                        onChange={handleTableChange}
                        rowSelection={rowSelection}
                    />
                </div>
            </Flex>
        </div>
    );
}

export default FormAndTable; 