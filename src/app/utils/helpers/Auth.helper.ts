import { Role } from "../enums/Role.enum";

export const AuthHelper = {
	dbToRoleMap: (number): Role => {
		switch (number) {
			case 1:
				return Role.Admin
			case 6:
				return Role.GiistyAdmin
			default:
				return Role.User
		}
	}
};
