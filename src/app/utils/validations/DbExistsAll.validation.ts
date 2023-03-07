import { Injectable } from "@nestjs/common";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments  } from "class-validator";
import { DatabaseService } from "../../services/database/Database.service";


@ValidatorConstraint({ name: 'DbModel', async: true })
@Injectable()
export class DbExistsAllValidation implements ValidatorConstraintInterface {
  constructor(private DB: DatabaseService) {}

  async validate(value: any,args: ValidationArguments) {
    try {
      let constraints = args.constraints;
      let column = constraints[1] ?? 'id'
      let where = {}
      where[column] = value
      let count = await this.DB.Models[constraints[0]].count({ where: where });
      if (count != value.length) {
        return false;
      }
    } catch (e) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Bad Request`;
  }
}
