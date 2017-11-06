const mongoose = require('mongoose');
const Task = mongoose.model('Task', {
    id: {
        type: Number,
        required: true
    },
    label: {
        type: String,
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
            type: String,
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
		  type: Date,
		  default: Date.now
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
