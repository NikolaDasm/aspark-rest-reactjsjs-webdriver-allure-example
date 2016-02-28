/*
 *  Examples: ASpark REST ReactJS Isomorphic WEBDriver Allure
 *  Copyright (C) 2016  Nikolay Platov
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import ActionTypes from './../../shared/scripts/actiontypes';
import ActionsCreator from './../../shared/scripts/actions';
import RestAPI from './restapi';

const getTestCaseCountActionPreprocessor = function (action, getState, dispatch, next) {
	if (action.type == ActionTypes['ACTION_TYPE_GET_TESTCASE_COUNT']) {
		RestAPI.getTestCaseCount((count) => {
			dispatch(ActionsCreator.testCaseCountLoaded(count));
		}, () => {});
	} else {
		next(action);
	}
};

const getTestCasesActionPreprocessor = function (action, getState, dispatch, next) {
	if (action.type == ActionTypes['ACTION_TYPE_GET_TESTCASES']) {
		var startWith = getState().testCasesPerPage*(action.page-1);
		RestAPI.getTestCases((testCases) => {
			dispatch(ActionsCreator.testCasesLoaded(testCases));
		}, () => {},
		startWith,
		getState().testCasesPerPage);
	} else {
		next(action);
	}
};

const addTestCaseActionPreprocessor = function (action, getState, dispatch, next) {
	if (action.type == ActionTypes['ACTION_TYPE_ADD_TESTCASE']) {
		RestAPI.addTestCase(() => {
				dispatch(ActionsCreator.testCaseAdded());
			},
			(message) => {
				dispatch(ActionsCreator.testCaseDidntAdd(message));
			},
			action.testCase);
		next(action);
	} else {
		next(action);
	}
};

const getTestCaseActionPreprocessor = function (action, getState, dispatch, next) {
	if (action.type == ActionTypes['ACTION_TYPE_GET_TESTCASE']) {
		RestAPI.getTestCase((testCase) => {
			dispatch(ActionsCreator.testCaseLoaded(testCase));
		}, () => {},
		action.id);
	} else {
		next(action);
	}
};

const deleteTestCaseActionPreprocessor = function (action, getState, dispatch, next) {
	if (action.type == ActionTypes['ACTION_TYPE_DELETE_TESTCASE']) {
		RestAPI.deleteTestCase(() => {
			dispatch(ActionsCreator.testCaseDeleted());
		}, () => {},
		action.id);
		next(action);
	} else {
		next(action);
	}
};

const editTestCaseActionPreprocessor = function (action, getState, dispatch, next) {
	if (action.type == ActionTypes['ACTION_TYPE_EDIT_TESTCASE']) {
		RestAPI.editTestCase(() => {
				dispatch(ActionsCreator.testCaseEdited());
			},
			(message) => {
				dispatch(ActionsCreator.testCaseDidntEdit(message));
			},
			action.testCase);
		next(action);
	} else {
		next(action);
	}
};

const getTestCaseByTitleActionPreprocessor = function (action, getState, dispatch, next) {
	if (action.type == ActionTypes['ACTION_TYPE_GET_TESTCASE_BY_TITLE']) {
		RestAPI.getTestCaseByTitle((testCase) => {
			dispatch(ActionsCreator.testCaseLoaded(testCase));
		}, () => {},
		action.title);
	} else {
		next(action);
	}
};

export default [
	getTestCaseCountActionPreprocessor,
	getTestCasesActionPreprocessor,
	addTestCaseActionPreprocessor,
	getTestCaseActionPreprocessor,
	deleteTestCaseActionPreprocessor,
	editTestCaseActionPreprocessor,
	getTestCaseByTitleActionPreprocessor
];