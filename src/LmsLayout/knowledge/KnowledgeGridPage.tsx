import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Page from '../../layout/Page/Page';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Input from '../../components/bootstrap/forms/Input';
import Button from '../../components/bootstrap/Button';
import Select from '../../components/bootstrap/forms/Select';
import Card, { CardBody, CardTitle } from '../../components/bootstrap/Card';
import Badge from '../../components/bootstrap/Badge';
import { demoPagesMenu } from '../../menu';
import useDarkMode from '../../hooks/useDarkMode';
import useTourStep from '../../hooks/useTourStep';
import { getKnoladgeBaseList } from '../../services/KnowladgeBase.service';
import AuthContext from '../../contexts/authContext';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { UpdatekBList } from '../../@features/KnowladgeBase/KbSlice';
import { BASE_URL } from '../../common/data/constants';
import { IKnowledgeBase, getRandomBootstrapColor } from './helper/dummyKnowledgeData';

interface HTMLStringProps {
    htmlString: string;
}
export const HTMLStringComponent: React.FC<HTMLStringProps> = ({ htmlString }) => {
    const removeHTMLTags = (html: string): string => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;
        return tempElement.textContent || tempElement.innerText || '';
    };

    const codeContent = removeHTMLTags(htmlString);

    return <code className='text-decoration-none'>{codeContent}</code>;
};

const Item: FC<IKnowledgeBase> = ({
    id,
    title,
    description,
    tags,
    thumbnail,
    isPopular,
    category,
    categoryID,
}) => {
    useTourStep(15);
    const { darkModeStatus } = useDarkMode();

    const navigate = useNavigate();
    const handleOnClick = useCallback(
        () => navigate(`../${demoPagesMenu.knowledge.subMenu.itemID.path}/${id}`),
        [navigate, id],
    );
    let kbState = useSelector((store: RootState) => store.knowladgeBaseStore);
    const [btColor, setBtColor] = useState('success');
    useEffect(() => {
        setBtColor(getRandomBootstrapColor);
    }, []);
    const thumbnailPath = thumbnail;
    const normalizedPath = thumbnailPath.replace(/\\/g, '/').replace(/^\//, '');
    const absoluteURL = `${BASE_URL}/${normalizedPath}`;

    return (
        <Card
            className='cursor-pointer shadow-3d-primary shadow-3d-hover'
            onClick={handleOnClick}
            data-tour={title}>
            <CardBody>
                <div
                    className={classNames(
                        'ratio ratio-1x1',
                        'rounded-2',
                        `bg-l${darkModeStatus ? 'o25' : '10'}-${btColor}`,
                        'mb-3',
                    )}>
                    <img
                        src={absoluteURL}
                        alt=''
                        width='100%'
                        height='auto'
                        className='object-fit-contain p-3'
                    />
                </div>
                <CardTitle>{title}</CardTitle>
                <p className='text-muted truncate-line-2'>
                    <HTMLStringComponent htmlString={description} />
                </p>
                {/* <div className='row g-2'>
					{!!tags &&
						// eslint-disable-next-line react/prop-types
						tags.map((tag) => (
							<div key={tag.text} className='col-auto'>
								<Badge isLight color={tag.color} className='px-3 py-2'>
									{tag.text}
								</Badge>
							</div>
						))}
				</div> */}
            </CardBody>
        </Card>
    );
};

const KnowledgeGridPage = () => {
    const { darkModeStatus } = useDarkMode();
    let kbState = useSelector((store: RootState) => store.knowladgeBaseStore);
    const { session } = useContext(AuthContext);
    const [filterableData, setFilterableData] = useState(kbState.kBList);
    const [knowladgeBaseList, setKnowladgeBaseList] = useState(kbState.kBList);
    let commonState = useSelector((store: RootState) => store.common);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setKnowladgeBaseList(kbState.kBList);
    }, [kbState]);

    useEffect(() => {
        getKnoladgeBaseList(session?.accessToken).then((res) => {
            dispatch(UpdatekBList(res.items));
            console.log(res.items);
        });
    }, [session?.accessToken, dispatch]);

    const searchAndFilterData = (searchValue: string, category: string) => {
        let tempData = kbState.kBList;

        // if (category)
        // 	tempData = kbState.kBList.filter((item) =>
        // 		item.categories.find((categ) => categ.value === category),
        // 	);

        return tempData.filter((item) => {
            return (
                item.title.toLowerCase().includes(searchValue) ||
                item.description.toLowerCase().includes(searchValue)
                // item.content.toLowerCase().includes(searchValue) ||
                // item.categories.find((categ) => categ.text.toLowerCase().includes(searchValue)) ||
                // item.tags.find((tag) => tag.text.toLowerCase().includes(searchValue))
            );
        });
    };

    const debounce = (func: any, wait: number | undefined) => {
        let timeout: string | number | NodeJS.Timeout | undefined;

        return function executedFunction(...args: any[]) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    const onFormSubmit = (values: { category: any; search: any }) => {
        const searchValue = values.search.toString().toLowerCase();
        const newData = searchAndFilterData(searchValue, values.category);

        if (!values.search && !values.category) {
            setFilterableData(kbState.kBList);
        } else {
            setFilterableData(newData);
        }
    };

    const formik = useFormik({
        initialValues: {
            search: '',
            category: '',
        },
        onSubmit: onFormSubmit,
        onReset: () => setFilterableData(kbState.kBList),
    });

    return (
        <PageWrapper title={demoPagesMenu.knowledge.subMenu.grid.text}>
            <Page>
                <div className='row'>
                    <div className='col-12 text-center my-5'>
                        <span className='display-5 fw-bold'>Hello, May I help you?</span>
                    </div>
                    <div
                        className='col-xxl-6 mx-auto text-center my-5'
                        data-tour='knowledge-filter'>
                        <form
                            className={classNames(
                                'row',
                                'pb-4 px-3 mx-0 g-4',
                                'rounded-3  d-flex justify-content-end',
                                [
                                    `bg-l${darkModeStatus ? 'o25' : '10'
                                    }-${getRandomBootstrapColor()}-primary`,
                                ],
                            )}
                            onSubmit={formik.handleSubmit}>
                            <div className='col-md-5'>
                                <div className='w-100' style={{ marginLeft: '8px' }}>
                                    <select
                                        className={classNames(
                                            'rounded-1 form-select form-control form-control-lg pt-2 pb-3',
                                            {
                                                'bg-white': !darkModeStatus,
                                            },
                                        )}
                                        data-kt-select2='true'
                                        data-placeholder='Select option'
                                        data-allow-clear='true'
                                        placeholder='Select Category...'
                                        // defaultValue={dropdownPriority[0]}
                                        disabled={false}
                                        onChange={(e: { target: { value: any } }) => {
                                            formik.handleChange(e);

                                            if (e.target.value)
                                                debounce(
                                                    () =>
                                                        onFormSubmit({
                                                            ...formik.values,
                                                            category: e.target.value,
                                                        }),
                                                    1000,
                                                )();
                                        }}
                                        value={formik.values.category}>
                                        {commonState.CategoryList.map(
                                            (dropItem: any, key: number) => (
                                                <option key={key} value={dropItem.value}>
                                                    {dropItem.text}
                                                </option>
                                            ),
                                        )}
                                    </select>
                                </div>
                                {/* <Select
									id='category'
									size='lg'
									ariaLabel='Category'
									placeholder='All Category'
									list={Object.keys(CATEGORIES).map((c) => CATEGORIES[c])}
									className={classNames('rounded-1', {
										'bg-white': !darkModeStatus,
									})}
									onChange={(e: { target: { value: any } }) => {
										formik.handleChange(e);

										if (e.target.value)
											debounce(
												() =>
													onFormSubmit({
														...formik.values,
														category: e.target.value,
													}),
												1000,
											)();
									}}
									value={formik.values.category}
								/> */}
                            </div>
                            <div className='col-md-5'>
                                <Input
                                    id='search'
                                    size='lg'
                                    placeholder='Type your knowladge base query...'
                                    className={classNames('rounded-1', {
                                        'bg-white': !darkModeStatus,
                                    })}
                                    onChange={(e: { target: { value: string | any[] } }) => {
                                        formik.handleChange(e);

                                        if (e.target.value.length > 2)
                                            debounce(
                                                () =>
                                                    onFormSubmit({
                                                        ...formik.values,
                                                        search: e.target.value,
                                                    }),
                                                1000,
                                            )();

                                        if (e.target.value.length === 0) formik.resetForm();
                                    }}
                                    value={formik.values.search}
                                />
                            </div>
                            <div className='col-md-2'>
                                <Button
                                    size='lg'
                                    icon='Clear'
                                    color='primary'
                                    className='w-100'
                                    rounded={1}
                                    onClick={formik.resetForm}
                                    type='reset'
                                    isDisable={!(formik.values.search || formik.values.category)}>
                                    Clear
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='row mb-5'>
                    {filterableData.map((item) => (
                        <div key={item.id} className='col-xl-3 col-lg-4 col-md-6'>
                            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                            <Item {...item} />
                        </div>
                    ))}
                </div>
            </Page>
        </PageWrapper>
    );
};

export default KnowledgeGridPage;
