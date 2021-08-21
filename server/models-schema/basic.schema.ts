import { getCurrent } from '../../utils/date';
import { uuid } from '../../utils/uuid';

export const BasicSchema = {
	id: { type: String, required: true, unique: true, default: uuid(), immutable: true },
	createdBy: { type: String, required: false },
	createdAt: { type: String, required: true, default: getCurrent(), immutable: true },
	updatedAt: { type: String, required: false },
};
