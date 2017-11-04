const mongoose = require('mongoose');
const Task = mongoose.model('Task', {
    id: {
        type: Number,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    from: {
        type: Number,
        required: true
    },
    target: {
        type: {
            type: String,
            required: true
        },
        number: {
            type: Number,
            required: true
        }
    },
    amount: {
        type: Number,
        required: true
    },
    period: {
        type: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        }
    },
    createDate: {
        type: String
    },
    lastExecution: {
        type: String,
        required: false
	 },
	executionTime: {
		hour: {
			type: Number,
			required: true
		},
		minute: {
			type: Number,
			required: true
		}
	} 
});

module.exports = Task;
