/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import HeaderContainer from '../../containers/HeaderContainer';
import FooterContainer from '../../containers/FooterContainer';
import TooltipHelpContainer from '../../containers/TooltipHelpContainer';
import TooltipMarkerComponent from '../TooltipMarkerComponent';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConversionsDetailsIfNeeded } from '../../actions/conversions';
import { State } from '../../types/redux/state';
import { isRoleAdmin } from '../../utils/hasPermissions';
import { useEffect } from 'react';
import ConversionViewComponent from './ConversionViewComponent';
import CreateConversionModalComponent from './CreateConversionModalComponent';
import { ConversionData } from 'types/redux/conversions';
import { UnitData } from 'types/redux/units';


// Utilizes useDispatch and useSelector hooks
export default function ConversionsDetailComponent() {

	const dispatch = useDispatch();

	useEffect(() => {
		// Makes async call to conversions API for conversions details if one has not already been made somewhere else, stores conversion ids in state
		dispatch(fetchConversionsDetailsIfNeeded());
	}, []);

	// Conversions state
	const conversionsState = useSelector((state: State) => state.conversions.conversions);

	// Units state
	const unitsState = useSelector((state: State) => state.units.units);
	// let sourceId = 2;
	// let x = unitsState[sourceId].identifier;
	// let header = ;

	// .sort((unitA: UnitData, unitB: UnitData) => (unitA.identifier.toLowerCase() > unitB.identifier.toLowerCase()) ? 1 :
	// 						(( unitB.identifier.toLowerCase() > unitA.identifier.toLowerCase()) ? -1 : 0))

	// Check for admin status
	const currentUser = useSelector((state: State) => state.currentUser.profile);
	const loggedInAsAdmin = (currentUser !== null) && isRoleAdmin(currentUser.role);

	const titleStyle: React.CSSProperties = {
		textAlign: 'center'
	};

	const tooltipStyle = {
		display: 'inline-block',
		fontSize: '50%',
		// For now, only an admin can see the conversion page.
		tooltipConversionView: 'help.admin.conversionview'
	};
	return (
		<div>
			<HeaderContainer />
			<TooltipHelpContainer page='conversions' />

			<div className='container-fluid'>
				<h2 style={titleStyle}>
					<FormattedMessage id='conversions' />
					<div style={tooltipStyle}>
						<TooltipMarkerComponent page='conversions' helpTextId={tooltipStyle.tooltipConversionView} />
					</div>
				</h2>
				{loggedInAsAdmin &&
					<div className="edit-btn">
						<CreateConversionModalComponent
							unitsState = {unitsState}/>
					</div>}
				<div className="card-container">
					{/* Create a ConversionViewComponent for each ConversionData in Conversions State after sorting by identifier */}
					{Object.values(conversionsState)
						// .sort((conversionA: ConversionData, conversionB: ConversionData) =>
						// 	(conversionA.identifier.toLowerCase() > conversionB.identifier.toLowerCase()) ? 1 :
						// 		(( conversionB.identifier.toLowerCase() > conversionA.identifier.toLowerCase()) ? -1 : 0))
						.map(conversionData => (<ConversionViewComponent conversion={conversionData as ConversionData} key={(conversionData as ConversionData).sourceId}
							sourceIdentifier = {unitsState[conversionData.sourceId].identifier}
							destinationIdentifier = {unitsState[conversionData.destinationId].identifier} />))}
				</div>
			</div>
			<FooterContainer />
		</div>
	);
}
