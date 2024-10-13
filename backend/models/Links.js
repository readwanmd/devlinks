const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linksSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		links: [
			{
				platform: {
					type: String,
					required: true,
				},
				url: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
		toJSON: {
			transform: (doc, ret) => {
				delete ret.createdAt;
				delete ret.updatedAt;
				delete ret.__v;
				return ret;
			},
		},
	}
);

const Links = mongoose.model('Links', linksSchema);
module.exports = Links;
