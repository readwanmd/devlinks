const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		firstName: { type: 'string', required: true },
		lastName: { type: 'string', required: true },
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },

		avatar: {
			type: String,
			default: 'https://i.postimg.cc/qqgjcj35/user-1.png',
		},
	},
	{
		timestamps: true,
		toJSON: {
			transform: (doc, ret) => {
				delete ret.password;
				delete ret.createdAt;
				delete ret.updatedAt;
				delete ret.__v;
				return ret;
			},
		},
	}
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
