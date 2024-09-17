import { RegistrationStatus } from '../enums/registration-status.enum';

export interface MetricLabelsInterface {
	status: RegistrationStatus;
	userId?: number;
}
