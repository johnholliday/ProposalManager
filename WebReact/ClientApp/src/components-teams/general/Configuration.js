﻿/* 
*  Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. 
*  See LICENSE in the source repository root for complete license information. 
*/
import React, { Component } from 'react';
import * as microsoftTeams from '@microsoft/teams-js';

import {
    Pivot,
    PivotItem,
    PivotLinkFormat,
    PivotLinkSize
} from 'office-ui-fabric-react/lib/Pivot';
import { Trans } from "react-i18next";
import { DealTypeListR } from './DealType/DealTypeListR';
import { Category } from '../../components/Administration/Category';
import { Region } from '../../components/Administration/Region';
import { Industry } from '../../components/Administration/Industry';
import { Tasks } from '../../components/Administration/Tasks';
import { ProcessTypesList } from './ProcessTypesList';
import { Permissions } from './Permissions';
import Accessdenied  from '../../helpers/AccessDenied';


export class Configuration extends Component {
    displayName = Configuration.name

    constructor(props) {
        super(props);

        this.authHelper = window.authHelper;
        this.sdkHelper = window.sdkHelper;


        try {
            microsoftTeams.initialize();
        }
        catch (err) {
            console.log(err);
        }
        finally {
            this.state = {
                teamName: "",
                groupId: "",
                haveGranularAccess: false
            };
        }
    }

    componentWillMount() {
        let selectedTab = window.location.hash.substr(1).length > 0 ? window.location.hash.substr(1) : "";
        this.setState({
            selectedTabName: selectedTab
        });

        this.authHelper.callCheckAccess(["Administrator"]).then((data) => {
            let haveGranularAccess = data;
            this.setState({ haveGranularAccess: haveGranularAccess });
        });
    }

    render() {
        return (

            <div className='ms-Grid'>
                <div className='ms-Grid-row'>
                    <div className='ms-Grid-col ms-sm6 ms-md8 ms-lg12  tabviewUpdates' >
                        {
                            this.state.haveGranularAccess
                                ?
                                <Pivot className='tabcontrols pt35' linkFormat={PivotLinkFormat.tabs} linkSize={PivotLinkSize.large} selectedKey={this.state.selectedTabName}>
                                    <PivotItem linkText={<Trans>category</Trans>} width='100%' itemKey="category" >
                                        <Category />
                                    </PivotItem>
                                    <PivotItem linkText={<Trans>region</Trans>} itemKey="region">
                                        <Region />
                                    </PivotItem>
                                    <PivotItem linkText={<Trans>industry</Trans>} itemKey="industry">
                                        <Industry />
                                    </PivotItem>
                                    <PivotItem linkText={<Trans>tasks</Trans>} itemKey="tasks">
                                        <Tasks />
                                    </PivotItem>
                                    <PivotItem linkText={<Trans>permissions</Trans>} itemKey="permissions">
                                        <Permissions />
                                    </PivotItem>
                                    <PivotItem linkText={<Trans>dealTypes</Trans>} itemKey="dealType">
                                        <DealTypeListR />
                                    </PivotItem>
                                    <PivotItem linkText={<Trans>processTypes</Trans>} itemKey="processType">
                                        <ProcessTypesList />
                                    </PivotItem>
                                </Pivot>
                                :
                                <Accessdenied />
                        }
                        
                    </div>
                </div>
            </div>
        );
    }

}
