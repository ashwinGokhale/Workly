import { ADD_JOB, REMOVE_JOB, SET_JOBS } from '../actions';

export default (
	state = {
		jobs: []
	},
	action
) => {
	switch (action.type) {
		case ADD_JOB: {
			return {
				...state,
				jobs: [...state.jobs, action.job]
			};
		}
		case REMOVE_JOB: {
			return {
				...state,
				jobs: state.jobs.filter(job => job._id !== action.job._id)
			};
		}

		case SET_JOBS: {
			return {
				...state,
				jobs: action.jobs
			};
		}
		default:
			return state;
	}
};
