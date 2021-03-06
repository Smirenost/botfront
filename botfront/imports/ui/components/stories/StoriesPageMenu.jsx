import {
    Menu,
    Icon,
    Popup,
    Label,
} from 'semantic-ui-react';
import React, { useContext } from 'react';
import moment from 'moment';

import { isTraining } from '../../../api/nlu_model/nlu_model.utils';
import TrainButton from '../utils/TrainButton';
import { PageMenu } from '../utils/Utils';
import LanguageDropdown from '../common/LanguageDropdown';
import SearchBar from './search/SearchBar';

import { ProjectContext } from '../../layouts/context';

export default function StoriesPageMenu() {
    const {
        project,
        project: { _id: projectId, training: { endTime, status } = {} },
        instance,
    } = useContext(ProjectContext);

    return (
        <PageMenu title='Stories' icon='book' className='stories-page-menu'>
            <Menu.Menu className='language-dropdown-menu'>
                <Menu.Item id='stories-language-dropdown'>
                    <LanguageDropdown />
                </Menu.Item>
            </Menu.Menu>
            <Menu.Menu position='right' className='stories-page-menu-searchbar'>
                <SearchBar />
            </Menu.Menu>
            <Menu.Menu className='training-menu'>
                <Menu.Item className='training-status'>
                    {!isTraining(project) && status === 'success' && (
                        <Popup
                            trigger={(
                                <Icon
                                    size='small'
                                    name='check'
                                    fitted
                                    circular
                                    style={{ color: '#2c662d' }}
                                />
                            )}
                            content={(
                                <Label
                                    basic
                                    content={(
                                        <div>
                                            {`Trained ${moment(
                                                endTime,
                                            ).fromNow()}`}
                                        </div>
                                    )}
                                    style={{
                                        borderColor: '#2c662d',
                                        color: '#2c662d',
                                    }}
                                />
                            )}
                        />
                    )}
                    {!isTraining(project) && status === 'failure' && (
                        <Popup
                            trigger={(
                                <Icon
                                    size='small'
                                    name='warning'
                                    color='red'
                                    fitted
                                    circular
                                />
                            )}
                            content={(
                                <Label
                                    basic
                                    color='red'
                                    content={(
                                        <div>
                                            {`Training failed ${moment(
                                                endTime,
                                            ).fromNow()}`}
                                        </div>
                                    )}
                                />
                            )}
                        />
                    )}
                </Menu.Item>
                <Menu.Item className='training-button'>
                    <TrainButton project={project} instance={instance} projectId={projectId} />
                </Menu.Item>
            </Menu.Menu>
        </PageMenu>
    );
}
